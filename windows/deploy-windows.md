# Deploying Reasonic on Windows 11

This guide walks through building and running Reasonic as a self-contained Windows
application. **No .NET, Node.js, or PowerShell installation is required on the target
machine** — the build produces a single folder that runs anywhere on Windows 11.

---

## What you need

| Machine | Requirements |
|---------|-------------|
| Build machine | .NET SDK, Node.js, PowerShell 7 — already installed if you developed locally |
| Target machine | Windows 11. Nothing else required. |

---

## Step 1 — Build

Run the build script from the repo root (or from within the `windows\` folder):

```powershell
.\windows\build-windows.ps1
```

This will:
1. Build the Angular frontend (production mode)
2. Copy the Angular output into the API's `wwwroot`
3. Publish the .NET API as a **self-contained** `win-x64` executable
4. Copy `start.ps1` and `deploy-windows.md` into the output folder

Output goes to `windows\dist\` in the repo. That folder is completely self-contained.

---

## Step 2 — Copy to the target location

Copy the entire `windows\dist\` folder to wherever you want to run the app from.
This can be anywhere on your machine — a folder in `Documents`, a USB drive, a
network share, etc.

```powershell
# Example: copy to a local app folder
xcopy /E /I windows\dist "C:\Users\youruser\Apps\Reasonic"
```

Or just drag and drop in Explorer.

---

## Step 3 — Configure API keys

Navigate to the folder you copied the app to and create a file called `.env.local`:

```powershell
notepad .env.local
```

Add your two required API keys:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
```

If you want Clementine integration, also add the path to your Clementine database copy:

```
GEMINI_API_KEY=your-gemini-api-key-here
LASTFM_API_KEY=your-lastfm-api-key-here
CLEMENTINE_DB_PATH=C:\Users\youruser\clementine.db
```

If you want to store `reasonic.db` in a non-default location, add:

```
REASONIC_DB_PATH=C:\Users\youruser\AppData\Local\Reasonic\reasonic.db
```

Save and close Notepad.

> **First-run seeding**: On the very first startup, Reasonic reads any values present in
> `.env.local` and writes them into `reasonic.db`. After that, `.env.local` is only needed
> for the two API keys (which retain an env-var fallback). All other settings live
> permanently in the database and can be changed from the in-app settings panel.

### Environment variables reference

| Variable | Required | Notes |
|----------|----------|-------|
| `GEMINI_API_KEY` | **Yes** | Google Gemini authentication key. Seeded to DB on first run; env var kept as fallback. |
| `LASTFM_API_KEY` | **Yes** | Last.fm key for album art. Same seeding behaviour. |
| `REASONIC_DB_PATH` | No | Path to `reasonic.db`. Default: `reasonic.db` next to the binary. **Not UI-configurable.** |
| `CLEMENTINE_DB_PATH` | No | Path to your Clementine database copy. Seeded to DB on first run if present; configure via settings panel afterward. |

> **All other settings** are seeded into `reasonic.db` automatically on first run.
> Change them any time via the in-app settings panel (gear icon in the header).

---

## Step 4 — Run

In the folder where you copied the app, right-click `start.ps1` and choose
**Run with PowerShell**, or run it from a terminal:

```powershell
.\start.ps1
```

You should see:

```
Loading environment from .env.local...
Starting Reasonic at http://localhost:12500 — press Ctrl+C to stop
```

Open your browser and go to `http://localhost:12500`.

> **If PowerShell blocks the script**: Windows may show an execution policy error on
> some machines. Run this once in an elevated PowerShell window to allow local scripts:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### Accessing from another machine on the same network

By default the app listens only on `localhost`. To make it reachable from other machines,
edit `start.ps1` and change:

```powershell
$env:ASPNETCORE_URLS = "http://localhost:12500"
```

to:

```powershell
$env:ASPNETCORE_URLS = "http://0.0.0.0:12500"
```

Then allow the port through Windows Firewall:

```powershell
New-NetFirewallRule -DisplayName "Reasonic" -Direction Inbound -Protocol TCP -LocalPort 12500 -Action Allow
```

You can then access the app at `http://<your-ip>:12500` from any device on the
same network.

---

## Re-deploying after code changes

1. On the build machine, run `.\windows\build-windows.ps1` again.
2. Stop the running app (Ctrl+C in the terminal).
3. Copy the new `windows\dist\` contents to the target folder, overwriting existing files.
4. Run `start.ps1` again.

Your `.env.local` and `reasonic.db` files are **not** created by the build and are
**not** overwritten when you copy new files — they stay in place.

Any settings configured via the in-app settings panel are stored in `reasonic.db`
alongside the binary.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `start.ps1 cannot be loaded because running scripts is disabled` | PowerShell execution policy | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in an elevated terminal |
| `Address already in use: 12500` | Port taken by another process | Run `netstat -ano \| findstr :12500` to find the PID, then kill it, or change the port in `start.ps1` |
| App starts but browser shows nothing | Windows Firewall blocking | Add the firewall rule shown above |
| `WARNING: GEMINI_API_KEY is not set` | Key not in `.env.local` and not in DB | Add `GEMINI_API_KEY=...` to `.env.local`, or set it via the in-app settings panel |
| `WARNING: LASTFM_API_KEY is not set` | Key not in `.env.local` and not in DB | Add `LASTFM_API_KEY=...` to `.env.local`, or set it via the in-app settings panel |
| Album art missing | `LASTFM_API_KEY` not set | Set via `.env.local` (first run) or in-app settings panel |
| AI not responding | `GEMINI_API_KEY` wrong or missing | Check via in-app settings panel or `.env.local` |
| Ollama models not working | Ollama not running or wrong URL | Ensure Ollama is running; check `OLLAMA_BASE_URL` in the settings panel |
