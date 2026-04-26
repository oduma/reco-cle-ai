# Clementine Remote Integration Architecture

## 1. Purpose

This document defines the **architecture and integration requirements** for the Clementine Remote connection in the Personal Music Discovery Web App.

It covers:

- the Clementine Remote protocol,
- backend service design,
- configuration strategy,
- Phase 4.1 (add track to current playlist) and Phase 4.2 (build playlist from local suggestions),
- and the prerequisite changes to the existing Clementine DB adapter.

---

## 2. Background

The app already reads from a **copy** of the Clementine SQLite database to annotate suggestions with an `inLocalLibrary` flag. This gives the app read access to the library inventory but does not allow it to control the player.

**Clementine Remote** is a TCP-based remote control protocol built into Clementine. It uses **Protocol Buffers** to exchange messages with the running player. Through this protocol the app can:

- add one or more tracks to the current playlist (`INSERT_URLS`),
- create a new named playlist and populate it (`CREATE_PLAYLIST` + `INSERT_URLS`).

---

## 3. Protocol Summary

### 3.1 Transport

- **Protocol:** TCP
- **Default port:** 5501 (configurable via `CLEMENTINE_REMOTE_PORT` or `CLEMENTINE_REMOTE_URL`)
- **Host:** `localhost` by default — the app always runs on the same machine as Clementine
- **Connection model:** short-lived TCP connection per operation (open, send, close)

### 3.2 Message format

All messages are serialized using **Google Protocol Buffers**. The schema is defined in Clementine's public `.proto` files, principally `remotecontrolmessages.proto`.

Key message types used:

| Message | Purpose |
|---|---|
| `INSERT_URLS` | Add one or more file paths to the current playlist |
| `CREATE_PLAYLIST` | Create a new playlist with a specified name |
| `PLAYLIST_SONGS` | (response) Acknowledge playlist contents |

### 3.3 File path requirement

`INSERT_URLS` requires the **local file path** of each track, not the artist/title string. This means:

- The Clementine DB adapter must be extended to also read the `filename` column from the `songs` table.
- `TrackSuggestion` must carry a `FilePath: string?` property for local tracks.
- Only local (blue) tracks have a file path; discovery (magenta) tracks do not.

---

## 4. Required NuGet Packages

```
Google.Protobuf
```

The Clementine `.proto` files must be included in the server project and compiled at build time, or the generated C# classes can be committed directly.

---

## 5. Configuration

### 5.1 New options class: `ClementineRemoteOptions`

```csharp
public class ClementineRemoteOptions
{
    public const string SectionName = "ClementineRemote";
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 5501;
}
```

### 5.2 Environment variable overrides

| Variable | Purpose |
|---|---|
| `CLEMENTINE_REMOTE_HOST` | Override host (default `localhost`) |
| `CLEMENTINE_REMOTE_PORT` | Override port (default `5501`) |

### 5.3 `appsettings.json` default

```json
"ClementineRemote": {
  "Host": "localhost",
  "Port": 5501
}
```

---

## 6. Backend Service Design

### 6.1 Interface

```csharp
public interface IClementineRemoteService
{
    Task AddTrackToCurrentPlaylistAsync(string filePath, CancellationToken cancellationToken = default);
    Task CreatePlaylistFromTracksAsync(string playlistName, IReadOnlyList<string> filePaths, CancellationToken cancellationToken = default);
}
```

### 6.2 Implementation notes

- Open a TCP connection to `{Host}:{Port}`.
- Serialize the appropriate protobuf message.
- Send and close the connection.
- On connection refused, throw a typed exception surfaced as a 503 response.
- Do not keep the connection open between requests.

### 6.3 Registration

```csharp
builder.Services.AddScoped<IClementineRemoteService, ClementineRemoteService>();
```

---

## 7. API Endpoints

### 7.1 Phase 4.1 — Add single track to current playlist

```
POST /api/playlist/track
{
  "filePath": "/path/to/track.mp3"
}
```

**Success:** `204 No Content`
**Clementine not running:** `503 Service Unavailable` with message `"Clementine is not running or Remote is not enabled."`

### 7.2 Phase 4.2 — Build playlist from local suggestions

```
POST /api/playlist/create
{
  "name": "Reco — Jazz Rainy Day",
  "filePaths": ["/path/a.mp3", "/path/b.mp3"]
}
```

**Success:** `204 No Content`
**Clementine not running:** `503 Service Unavailable`

---

## 8. Frontend Changes

### 8.1 Phase 4.1 — Add-to-playlist icon on local cards

- A small Clementine icon (or music queue icon) appears on **local (blue) track cards only**.
- Clicking the icon calls `POST /api/playlist/track` with the track's `filePath`.
- Success: brief `MatSnackBar` confirmation — `"Added to playlist"`.
- Failure (Clementine not running): `MatSnackBar` warning — `"Could not add track — is Clementine running and Remote enabled?"`.

### 8.2 Phase 4.2 — Build playlist button in suggestions panel

- A **"Build playlist from local songs"** button appears in the suggestions panel header.
- The button is visible only when at least one local track is present in the current results.
- Clicking it sends all local tracks' `filePaths` to `POST /api/playlist/create`.
- The default playlist name is `"Reco — {timestamp}"` or similar.
- Success / failure feedback via `MatSnackBar` as above.

---

## 9. Prerequisite: Extend Clementine DB Adapter

The current `ClementineService` reads `title`, `artist`, and `album` from the `songs` table.

Before Phase 4.1 or 4.2 can work, it must also read the `filename` column.

This change flows through:

1. `ClementineService.LoadInventoryAsync` — add `filename` to SELECT
2. `LocalTrack` model — add `FilePath: string?`
3. `TrackSuggestion` DTO — add `FilePath: string?`
4. `RecommendationOrchestrationService` — copy `FilePath` from matched `LocalTrack` onto the annotated `TrackSuggestion`
5. Frontend `TrackSuggestion` model — add `filePath?: string`

This is a prerequisite that must be completed before any Phase 4 endpoint or UI work begins.

---

## 10. Failure Handling

| Failure | Backend behavior | Frontend behavior |
|---|---|---|
| Clementine not running | Catch `SocketException` / connection refused → 503 | Snackbar warning |
| Remote not enabled | Connection refused on port 5501 → 503 | Snackbar warning |
| Empty file path list | 400 Bad Request | Button disabled when no local tracks present |
| Track file path null | 400 Bad Request | Add icon hidden on non-local cards |

---

## 11. Deployment Notes

Clementine Remote must be explicitly enabled in Clementine:

> Tools → Preferences → Network Remote → Enable remote control

The port (default 5501) must match `CLEMENTINE_REMOTE_PORT`.

Both Windows and Linux deployments require this configuration step. The app and Clementine run on the same machine, so no firewall rules are needed unless the OS blocks localhost TCP by default.

---

## 12. Executive Summary

Phase 4 adds direct Clementine player integration using the built-in TCP/protobuf Remote protocol.

- Phase 4.1: click a queue icon on a local track card → track appears in Clementine's current playlist.
- Phase 4.2: click "Build playlist from local songs" → a new named Clementine playlist is created from all local suggestions.

Prerequisites: read `filename` from the Clementine DB copy; surface it through `TrackSuggestion.FilePath`.

Configuration: `CLEMENTINE_REMOTE_HOST` (default `localhost`) and `CLEMENTINE_REMOTE_PORT` (default `5501`).
