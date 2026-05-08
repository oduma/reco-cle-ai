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

You only need to set the two API keys — everything else is automatically configured by
the app on first run:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
```

If you want Clementine integration, also add the path to your Clementine database copy:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
CLEMENTINE_DB_PATH=/home/youruser/clementine.db
```

If you want to store `reasonic.db` in a non-default location, add:

```
REASONIC_DB_PATH=/home/youruser/data/reasonic.db
```

Save and close (`Ctrl+O`, `Enter`, `Ctrl+X` in nano).

Restrict the file so only you can read it:

```bash
chmod 600 .env.local
```

> **How this works**: `start.sh` reads `.env.local` with `source` before launching the
> app. The variables are set only for that process — they do not pollute your shell
> session or system environment.

> **First-run seeding**: On the very first startup, Reasonic reads any values present in
> `.env.local` and writes them into `reasonic.db`. After that, `.env.local` is only needed
> for the two API keys (which retain an env-var fallback). All other settings live
> permanently in the database and can be changed from the in-app settings panel.

### Environment variables reference

Only these two variables are **required**. All others are optional or become unnecessary
after the first run.

| Variable | Required | Notes |
|----------|----------|-------|
| `GEMINI_API_KEY` | **Yes** | Google Gemini authentication key. Seeded to DB on first run; env var kept as fallback. |
| `LASTFM_API_KEY` | **Yes** | Last.fm key for album art. Seeded to DB on first run; env var kept as fallback. |
| `REASONIC_DB_PATH` | No | Path to `reasonic.db`. Default: `reasonic.db` next to the binary. **Not UI-configurable.** Must remain in `.env.local` if you use a non-default path. |
| `CLEMENTINE_DB_PATH` | No | Path to your Clementine database copy. Required only for Clementine integration. Seeded to DB on first run if present; configure via settings panel afterward. |

> **All other settings** (model names, API URLs, thresholds, track limits, etc.) are
> seeded into `reasonic.db` automatically on first run using built-in defaults. You never
> need to set them in `.env.local`. Change them any time via the in-app settings panel
> (gear icon in the header).

---

## Step 4 — Make start.sh executable and run

On the Linux machine:

```bash
cd /home/youruser/reasonic
chmod +x start.sh
./start.sh
```

You should see startup output including lines like:

```
Applying migration 'Phase19_AppSettingDefaults'.
GEMINI_API_KEY configured (starts with: AIza…)
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

Reasonic uses **EF Core migrations** to keep the database schema up to date. There is
nothing manual to do — migrations run automatically when the app starts.

**What happens at startup:**

1. The app checks whether your `reasonic.db` has already been migrated (by looking for
   the `__EFMigrationsHistory` table that EF Core maintains).
2. **First-ever upgrade from a pre-migration version**: if your database has the existing
   tables but no migration history, the app stamps it as already at the baseline schema
   and then applies only the new migrations on top. Your data is untouched.
3. **Fresh install**: all migrations run in order, creating the complete schema from scratch.
4. **Subsequent upgrades**: only migrations that have not yet been applied are run.

After migrations, the app seeds default values for all settings into `reasonic.db` if
they are not already present. This happens on every startup, so new defaults introduced
in an upgrade are always available.

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
dotnet ef migrations add Phase20_YourDescription
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
| `WARNING: GEMINI_API_KEY is not set` | Key not in `.env.local` and not in DB | Add `GEMINI_API_KEY=...` to `.env.local`, or set it via the in-app settings panel |
| `WARNING: LASTFM_API_KEY is not set` | Key not in `.env.local` and not in DB | Add `LASTFM_API_KEY=...` to `.env.local`, or set it via the in-app settings panel; album art will be absent until set |
| Album art missing | `LASTFM_API_KEY` not set | Set via `.env.local` (first run) or in-app settings panel |
| AI not responding | `GEMINI_API_KEY` wrong or missing | Check via in-app settings panel or `.env.local` |
| Ollama models not working | Ollama not running or wrong URL | Ensure Ollama is running; check `OLLAMA_BASE_URL` in settings panel |
| Settings reset after upgrade | `reasonic.db` was deleted during re-deploy | Use `rsync --delete` carefully; the DB file is not in `dist/` and will not be deleted by rsync unless the target folder is wiped |
