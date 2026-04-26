# Deploying Reco to Linux (SUSE)

This guide walks through deploying the Reco app to a Linux machine running SUSE.
You do **not** need to install .NET, Node.js, or PowerShell on the Linux machine.
The build happens entirely on your Windows machine, and the result is a self-contained
binary that carries its own runtime.

---

## What you need

| Machine | Requirements |
|---------|-------------|
| Windows (build machine) | .NET SDK, Node.js — already installed if you developed locally |
| Linux (SUSE, target machine) | Nothing pre-installed for the app itself — see note below |

> **Note on system libraries**: The self-contained .NET binary relies on a small set of
> standard Linux libraries that are almost always present on a modern SUSE installation:
> `libstdc++`, `libgcc`, `libssl` (openssl), and `zlib`. If the app fails to start with
> a message about a missing shared library, install the missing package with
> `sudo zypper install <package-name>`.

---

## Step 1 — Build on Windows

Open PowerShell in your repo root and run:

```powershell
.\linux\build-linux.ps1
```

This will:
1. Build the Angular frontend (production mode)
2. Copy the Angular output into the API's `wwwroot`
3. Publish the .NET API as a **self-contained** `linux-x64` binary

Output goes to `linux\dist\` in the repo. That folder contains everything needed to run
the app — no .NET installation required on the Linux side.

---

## Step 2 — Transfer files to Linux

Copy the entire `linux\dist\` folder to your Linux machine.

**Option A — using `scp` (from your Windows machine, in PowerShell or Command Prompt):**

```powershell
scp -r linux\dist youruser@192.168.x.x:/home/youruser/reco
```

Replace `youruser` and `192.168.x.x` with your actual Linux username and IP address.
The destination `/home/youruser/reco` will be created if it doesn't exist.

**Option B — using `rsync` (faster for re-deployments, run from Windows Git Bash or WSL):**

```bash
rsync -av --delete linux/dist/ youruser@192.168.x.x:/home/youruser/reco/
```

After re-running `build-linux.ps1`, `rsync` with `--delete` will synchronise only changed
files — much quicker than a full copy.

---

## Step 3 — Set up your API key on Linux

On the Linux machine, navigate to the folder where you copied the app:

```bash
cd /home/youruser/reco
```

Create a file called `.env.local` in that folder. This file holds your secrets and is
**never committed to git** (the `.gitignore` already excludes it by name).

```bash
nano .env.local
```

Add the following line — replace the value with your real key:

```
GEMINI_API_KEY=your-gemini-api-key-here
```

If you also want to override other settings, add them on separate lines:

```
GEMINI_API_KEY=your-gemini-api-key-here
CLEMENTINE_DB_PATH=/home/youruser/clementine.db
RECOMMENDATION_SUGGESTION_CACHE_MINUTES=120
```

Save and close (`Ctrl+O`, `Enter`, `Ctrl+X` in nano).

Restrict the file so only you can read it:

```bash
chmod 600 .env.local
```

> **How this works**: `start.sh` reads `.env.local` with `source` before launching the
> app. The variables are set only for that process — they do not pollute your shell
> session or system environment.

---

## Understanding environment variables in Linux

There are several ways to set environment variables in Linux. Here is a plain-language
explanation of the main approaches, from simplest to most permanent.

### A — Session-only (disappears when you close the terminal)

```bash
export GEMINI_API_KEY=your-key-here
```

Use this when you want to test something quickly. The variable exists only in your
current terminal session and is gone the moment you close it.

### B — Persistent for your user (survives reboots, applies to every new terminal)

Add the `export` line to `~/.bashrc` (for interactive shells) or `~/.profile` (for
login shells). Most of the time `~/.bashrc` is the right choice on SUSE.

```bash
echo 'export GEMINI_API_KEY=your-key-here' >> ~/.bashrc
source ~/.bashrc   # apply immediately without restarting the terminal
```

This is convenient but puts secrets in a plain-text file in your home directory, which
is fine for a personal machine but not ideal for shared servers.

### C — Per-application .env.local file (what Reco uses)

This is what `start.sh` already does for you. You create a `.env.local` file in the
app's folder, and the start script loads it automatically before launching the binary.
The variables only exist for the lifetime of that `Reco.Api` process.

This is the **recommended approach** for Reco — secrets stay next to the app, are
never exported globally, and are easy to update without touching your shell config.

### D — systemd service (for running at startup)

If you want the app to start automatically when the Linux machine boots, see the
[Optional: Run as a systemd service](#optional-run-as-a-systemd-service) section below.
systemd has its own mechanism for environment variables that avoids shell config files
entirely.

---

## Step 4 — Make start.sh executable and run

On the Linux machine:

```bash
cd /home/youruser/reco
chmod +x start.sh
./start.sh
```

You should see:

```
Loading environment from .env.local...
Starting Reco at http://localhost:12500 — press Ctrl+C to stop
```

Open a browser on the Linux machine and go to `http://localhost:12500`.

### Accessing from another machine on the same network

By default the app listens only on `localhost`. To make it reachable from other machines
(like your Windows PC), edit `start.sh` and change:

```bash
export ASPNETCORE_URLS="http://localhost:12500"
```

to:

```bash
export ASPNETCORE_URLS="http://0.0.0.0:12500"
```

Then open the port in the SUSE firewall:

```bash
sudo firewall-cmd --add-port=12500/tcp --permanent
sudo firewall-cmd --reload
```

You can then access the app at `http://<linux-ip>:12500` from any device on the
same network.

---

## Optional: Run as a systemd service

This makes Reco start automatically at boot and restart if it crashes.

**1. Create the service file:**

```bash
sudo nano /etc/systemd/system/reco.service
```

Paste this content (adjust paths and username):

```ini
[Unit]
Description=Reco Music Discovery App
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/home/youruser/reco
ExecStart=/home/youruser/reco/Reco.Api
EnvironmentFile=/home/youruser/reco/.env.local
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:12500
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

**2. Enable and start the service:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable reco
sudo systemctl start reco
```

**3. Check it is running:**

```bash
sudo systemctl status reco
```

**4. View logs:**

```bash
sudo journalctl -u reco -f
```

**5. Stop or restart:**

```bash
sudo systemctl stop reco
sudo systemctl restart reco
```

---

## Re-deploying after code changes

1. On Windows, run `.\linux\build-linux.ps1` again.
2. Stop the app on Linux: `Ctrl+C`, or `sudo systemctl stop reco` if running as a service.
3. Copy the new `linux\dist\` to Linux (use `rsync --delete` for speed).
4. Start the app again: `./start.sh` or `sudo systemctl start reco`.

Your `.env.local` file on the Linux machine is **not** overwritten by this process —
it lives outside the repo and outside the dist folder.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `Permission denied: ./Reco.Api` | Binary not executable | `chmod +x Reco.Api` |
| `error while loading shared libraries: libssl.so.x` | Missing openssl | `sudo zypper install libopenssl3` |
| `error while loading shared libraries: libicu*` | Missing ICU | `sudo zypper install libicu` or add `export DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1` to `.env.local` |
| `Address already in use :12500` | Port taken by another process | `lsof -i :12500` then kill the process, or change the port in `start.sh` |
| App starts but browser shows nothing | Firewall blocking port | `sudo firewall-cmd --add-port=12500/tcp --permanent && sudo firewall-cmd --reload` |
| `GEMINI_API_KEY is not set` | `.env.local` missing or wrong path | Ensure `.env.local` is in the same folder as `start.sh` and `Reco.Api` |
