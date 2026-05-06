# Deploying Reasonic to Linux (SUSE)

This guide walks through deploying the Reasonic app to a Linux machine running SUSE.
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

Make sure the Angular dependencies are installed (only needed once, or after `package.json` changes):

```powershell
cd src\client
npm install
cd ..\..
```

Then run the build script from the repo root:

```powershell
.\linux\build-linux.ps1
```

This will:
1. Build the Angular frontend (production mode)
2. Copy the Angular output into the API's `wwwroot`
3. Publish the .NET API as a **self-contained** `linux-x64` binary
4. Copy `start.sh` and `deploy-linux.md` alongside the binary

Output goes to `linux\dist\` in the repo. That folder contains everything needed to run
the app — no .NET installation required on the Linux side.

---

## Step 2 — Transfer files to Linux

Copy the entire `linux\dist\` folder to your Linux machine.

**Option A — using `scp` (from your Windows machine, in PowerShell or Command Prompt):**

```powershell
scp -r linux\dist youruser@192.168.x.x:/home/youruser/reasonic
```

Replace `youruser` and `192.168.x.x` with your actual Linux username and IP address.
The destination `/home/youruser/reasonic` will be created if it doesn't exist.

**Option B — using `rsync` (faster for re-deployments, run from Windows Git Bash or WSL):**

```bash
rsync -av --delete linux/dist/ youruser@192.168.x.x:/home/youruser/reasonic/
```

After re-running `build-linux.ps1`, `rsync` with `--delete` will synchronise only changed
files — much quicker than a full copy.

---

## Step 3 — Configure API keys on Linux

On the Linux machine, navigate to the folder where you copied the app:

```bash
cd /home/youruser/reasonic
```

Create a file called `.env.local` in that folder. This file holds your secrets and is
**never committed to git** (the `.gitignore` already excludes it by name).

```bash
nano .env.local
```

At a minimum, set both required API keys:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
```

If you also want Clementine integration or other overrides, add them on separate lines:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
CLEMENTINE_DB_PATH=/home/youruser/clementine.db
```

Save and close (`Ctrl+O`, `Enter`, `Ctrl+X` in nano).

Restrict the file so only you can read it:

```bash
chmod 600 .env.local
```

> **How this works**: `start.sh` reads `.env.local` with `source` before launching the
> app. The variables are set only for that process — they do not pollute your shell
> session or system environment.

> **Phase 11 — in-app settings panel**: From Phase 11 onward, all settings except
> `REASONIC_DB_PATH` can be changed from inside the app via the gear icon in the header.
> Settings entered through the panel are persisted in `reasonic.db` and take effect on
> the next request without restarting the app. `.env.local` values act as the initial
> fallback if the database has no value for a key.

### Full list of supported variables

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `GEMINI_API_KEY` | Yes | — | Google Gemini authentication key |
| `LASTFM_API_KEY` | Yes | — | Last.fm key for album art |
| `REASONIC_DB_PATH` | No | `reasonic.db` next to binary | **Not UI-configurable** |
| `GEMINI_MODEL` | No | `gemini-2.5-pro` | |
| `GEMINI_BASE_URL` | No | `https://generativelanguage.googleapis.com` | |
| `LASTFM_BASE_URL` | No | `https://ws.audioscrobbler.com/2.0/` | |
| `OLLAMA_BASE_URL` | No | `http://localhost:11434` | |
| `OLLAMA_WHISPER_MODEL` | No | `llama3.1:8b` | Inner Whisper model |
| `OLLAMA_SHOUT_MODEL` | No | `gemma4:e4b` | Inner Shout model |
| `CLEMENTINE_DB_PATH` | No | — | Required for Clementine integration |
| `CLEMENTINE_EXE_PATH` | No | `clementine` | |
| `CLEMENTINE_MATCH_THRESHOLD` | No | `0.75` | Fuzzy-match threshold 0–1 |
| `RECOMMENDATION_MIN_TRACKS` | No | `10` | |
| `RECOMMENDATION_MAX_TRACKS` | No | `20` | |
| `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` | No | `60` | |
| `SESSION_MEMORY_SIZE` | No | `25` | Max AI replies kept in memory |
| `SESSION_DEFAULT_TRACK_DURATION_SECONDS` | No | `210` | Assumed duration for tracks without Clementine data |

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

### C — Per-application .env.local file (what Reasonic uses)

This is what `start.sh` already does for you. You create a `.env.local` file in the
app's folder, and the start script loads it automatically before launching the binary.
The variables only exist for the lifetime of that `Reco.Api` process.

This is the **recommended approach** for Reasonic — secrets stay next to the app, are
never exported globally, and are easy to update without touching your shell config.

### D — In-app settings panel (Phase 11+)

From Phase 11 onward, most settings (including API keys) can be changed via the gear
icon in the app header. Changes are persisted to `reasonic.db` and take effect
immediately on the next request — no restart needed. This is the most convenient way
to make runtime changes after initial deployment.

`REASONIC_DB_PATH` cannot be changed via the UI (the database must already exist before
the settings table inside it can be read).

### E — systemd service (for running at startup)

If you want the app to start automatically when the Linux machine boots, see the
[Optional: Run as a systemd service](#optional-run-as-a-systemd-service) section below.
systemd has its own mechanism for environment variables that avoids shell config files
entirely.

---

## Step 4 — Make start.sh executable and run

On the Linux machine:

```bash
cd /home/youruser/reasonic
chmod +x start.sh
./start.sh
```

You should see:

```
Loading environment from .env.local...
Starting Reasonic at http://localhost:12500 — press Ctrl+C to stop
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

This makes Reasonic start automatically at boot and restart if it crashes.

**1. Create the service file:**

```bash
sudo nano /etc/systemd/system/reasonic.service
```

Paste this content (adjust paths and username):

```ini
[Unit]
Description=Reasonic Music Discovery App
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/home/youruser/reasonic
ExecStart=/home/youruser/reasonic/Reco.Api
EnvironmentFile=/home/youruser/reasonic/.env.local
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
sudo systemctl enable reasonic
sudo systemctl start reasonic
```

**3. Check it is running:**

```bash
sudo systemctl status reasonic
```

**4. View logs:**

```bash
sudo journalctl -u reasonic -f
```

**5. Stop or restart:**

```bash
sudo systemctl stop reasonic
sudo systemctl restart reasonic
```

---

## Re-deploying after code changes

1. On Windows, run `.\linux\build-linux.ps1` again.
2. Stop the app on Linux: `Ctrl+C`, or `sudo systemctl stop reasonic` if running as a service.
3. Copy the new `linux\dist\` to Linux (use `rsync --delete` for speed).
4. Start the app again: `./start.sh` or `sudo systemctl start reasonic`.

Your `.env.local` file on the Linux machine is **not** overwritten by this process —
it lives outside the repo and outside the dist folder.

Any settings you configured via the in-app settings panel are stored in `reasonic.db`.
That file also lives in the app folder on the Linux machine and is **not** overwritten
by `rsync` unless you explicitly delete it.

### Database migrations on startup

From this release onward, Reasonic uses **EF Core migrations** to keep the database
schema up to date. There is nothing manual to do — migrations run automatically when
the app starts.

**What happens at startup:**

1. The app checks whether your `reasonic.db` has already been migrated (by looking for
   the `__EFMigrationsHistory` table that EF Core maintains).
2. **First-ever upgrade from a pre-migration version**: if your database has the existing
   tables but no migration history, the app stamps it as already at the baseline schema
   and then applies only the new migrations on top. Your data is untouched.
3. **Fresh install**: all migrations run in order, creating the complete schema from scratch.
4. **Subsequent upgrades**: only migrations that have not yet been applied are run.

After the migration runs, you should see log lines like:

```
Applying migration '20260506182629_InitialSchema'.   ← only on a brand-new install
Applying migration '20260506182637_CleanupRenamedPromptKeys'.
```

Or, if you are upgrading from a pre-migration database:

```
Stamping existing database at InitialSchema baseline.
Applying migration '20260506182637_CleanupRenamedPromptKeys'.
```

**What `CleanupRenamedPromptKeys` does to your settings:**

| Old key (removed) | Action |
|---|---|
| `GEMINI_RECOMMENDATION_INSTRUCTION` | Value copied to `RECOMMENDATION_INSTRUCTION` if you had customised it, then deleted |
| `OLLAMA_RECOMMENDATION_INSTRUCTION` | Deleted (both providers now share one prompt) |
| `CHAT_SYSTEM_INSTRUCTION` | Deleted (dead code removed in this release) |

If you had customised `GEMINI_RECOMMENDATION_INSTRUCTION`, your text is automatically
carried over to `RECOMMENDATION_INSTRUCTION`. Nothing else in your settings is affected.

> **If something goes wrong with the database**: stop the app, make a backup copy of
> `reasonic.db`, then restart. The migration is wrapped in a transaction — either it
> fully applies or the database is left unchanged.

---

## Developer: adding a new migration

When a future phase changes the database schema or needs to migrate seed data, add a
migration on the **Windows development machine** before building:

```powershell
# From the repo root, restore the local dotnet-ef tool (once per machine)
cd src\server
dotnet tool restore

# Create a new migration (from inside the API project)
cd Reco.Api
dotnet ef migrations add Phase16_YourDescription
```

This generates three files inside `Migrations\` — commit all of them. The migration
runs automatically on the next app startup via `MigrateAsync()`.

For **data migrations** (renaming keys, backfilling values), open the generated
`Up()` method and add `migrationBuilder.Sql("...")` calls. The `Down()` method is
optional for data migrations.

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    // Schema change — generated automatically by EF:
    migrationBuilder.AddColumn<string>("new_column", "some_table", nullable: true);

    // Data migration — written by hand:
    migrationBuilder.Sql("""
        UPDATE app_settings SET value = 'new-default'
        WHERE key = 'SOME_KEY' AND value = 'old-default';
        """);
}
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `Permission denied: ./Reco.Api` | Binary not executable | `chmod +x Reco.Api` |
| `error while loading shared libraries: libssl.so.x` | Missing openssl | `sudo zypper install libopenssl3` |
| `error while loading shared libraries: libicu*` | Missing ICU | `sudo zypper install libicu` or add `export DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1` to `.env.local` |
| `Address already in use :12500` | Port taken by another process | `lsof -i :12500` then kill the process, or change the port in `start.sh` |
| App starts but browser shows nothing | Firewall blocking port | `sudo firewall-cmd --add-port=12500/tcp --permanent && sudo firewall-cmd --reload` |
| `WARNING: GEMINI_API_KEY is not set` | Key not in `.env.local` | Add key to `.env.local`, or use the in-app settings panel |
| `WARNING: LASTFM_API_KEY is not set` | Key not in `.env.local` | Add key to `.env.local`, or use the in-app settings panel; album art will be absent until set |
| Album art missing | `LASTFM_API_KEY` not set | Set via `.env.local` or in-app settings panel |
| AI not responding | `GEMINI_API_KEY` wrong or missing | Check key in `.env.local` or via in-app settings panel |
| Ollama models not working | Ollama not running or wrong URL | Ensure Ollama is running; check `OLLAMA_BASE_URL` in settings |
