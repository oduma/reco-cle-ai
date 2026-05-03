#!/bin/bash
# start.sh — starts the Reasonic app on Linux.
# Must be placed in the same folder as the Reco.Api binary (the dist folder).
# See deploy-linux.md for full setup instructions.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load secrets from .env.local if it exists next to this script.
# Never commit .env.local — it contains your API keys.
if [ -f "$SCRIPT_DIR/.env.local" ]; then
    echo "Loading environment from .env.local..."
    set -a
    # shellcheck source=/dev/null
    source "$SCRIPT_DIR/.env.local"
    set +a
fi

# Warn if required secrets are missing.
# From Phase 11 onward these can also be entered via the in-app settings panel after startup.
if [ -z "$GEMINI_API_KEY" ]; then
    echo ""
    echo "WARNING: GEMINI_API_KEY is not set."
    echo "  Add it to .env.local, or open the settings panel in the app after startup."
    echo ""
fi
if [ -z "$LASTFM_API_KEY" ]; then
    echo ""
    echo "WARNING: LASTFM_API_KEY is not set. Album art will be unavailable."
    echo "  Add it to .env.local, or open the settings panel in the app after startup."
    echo ""
fi

export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS="http://localhost:12500"

# Optional overrides — uncomment and edit as needed.
# From Phase 11 onward, all of these (except REASONIC_DB_PATH) can also be
# changed live via the in-app settings panel without restarting the app.
#
# export REASONIC_DB_PATH="/home/youruser/reasonic.db"         # default: reasonic.db next to binary (NOT UI-configurable)
# export GEMINI_MODEL="gemini-2.5-pro"
# export GEMINI_BASE_URL="https://generativelanguage.googleapis.com"
# export LASTFM_BASE_URL="https://ws.audioscrobbler.com/2.0/"
# export OLLAMA_BASE_URL="http://localhost:11434"
# export OLLAMA_WHISPER_MODEL="llama3.1:8b"                    # Inner Whisper
# export OLLAMA_SHOUT_MODEL="gemma4:e4b"                       # Inner Shout
# export CLEMENTINE_DB_PATH="/home/youruser/clementine.db"
# export CLEMENTINE_EXE_PATH="clementine"
# export CLEMENTINE_MATCH_THRESHOLD="0.75"
# export RECOMMENDATION_MIN_TRACKS="10"
# export RECOMMENDATION_MAX_TRACKS="20"
# export RECOMMENDATION_SUGGESTION_CACHE_MINUTES="60"
# export SESSION_MEMORY_SIZE="25"
# export SESSION_DEFAULT_TRACK_DURATION_SECONDS="210"

# Make binary executable (safe to run multiple times)
chmod +x "$SCRIPT_DIR/Reco.Api"

echo "Starting Reasonic at http://localhost:12500 — press Ctrl+C to stop"
cd "$SCRIPT_DIR"
./Reco.Api
