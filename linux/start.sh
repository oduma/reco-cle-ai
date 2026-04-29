#!/bin/bash
# start.sh — starts the Reco app on Linux.
# Must be placed in the same folder as the Reco.Api binary (the dist folder).
# See deploy-linux.md for full setup instructions.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load secrets from .env.local if it exists next to this script.
# Never commit .env.local — it contains your API key.
if [ -f "$SCRIPT_DIR/.env.local" ]; then
    echo "Loading environment from .env.local..."
    set -a
    # shellcheck source=/dev/null
    source "$SCRIPT_DIR/.env.local"
    set +a
fi

# Validate required secret
if [ -z "$GEMINI_API_KEY" ]; then
    echo ""
    echo "ERROR: GEMINI_API_KEY is not set."
    echo ""
    echo "Create a file called .env.local in the same folder as start.sh:"
    echo "  echo 'GEMINI_API_KEY=your-key-here' > .env.local"
    echo ""
    echo "See deploy-linux.md for full instructions."
    exit 1
fi

export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS="http://localhost:12500"

# Optional overrides — uncomment and edit as needed:
# export GEMINI_MODEL="gemini-2.5-pro"
# export CLEMENTINE_DB_PATH="/home/youruser/clementine.db"
# export CLEMENTINE_MATCH_THRESHOLD="0.75"
# export RECOMMENDATION_MIN_TRACKS="10"
# export RECOMMENDATION_MAX_TRACKS="20"
# export RECOMMENDATION_SUGGESTION_CACHE_MINUTES="60"
# export OLLAMA_BASE_URL="http://localhost:11434"
# export OLLAMA_MODEL="llama3.1:8b"
# export CLEMENTINE_REMOTE_HOST="localhost"
# export CLEMENTINE_REMOTE_PORT="5500"

# Make binary executable (safe to run multiple times)
chmod +x "$SCRIPT_DIR/Reco.Api"

echo "Starting Reco at http://localhost:12500 — press Ctrl+C to stop"
cd "$SCRIPT_DIR"
./Reco.Api
