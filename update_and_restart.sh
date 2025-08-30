#!/usr/bin/env bash

# logging
LOG_FILE="/var/log/fitm/frontend/update.log"
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

echo
log "UPDATE && RESTART"

mkdir -p "$(dirname "$LOG_FILE")"
touch "$LOG_FILE"
exec >> "$LOG_FILE" 2>&1

# pull changes
if [[ -z "$MODEEP_FRONTEND_ROOT" ]]; then
    log "error: MODEEP_FRONTEND_ROOT is not set"
    exit 1
fi
cd "$MODEEP_FRONTEND_ROOT" || { log "error: could not navigate to $MODEEP_FRONTEND_ROOT"; exit 1; }
git stash
git pull
git stash pop

# dependency updates
[[ -z "$(npm outdated)" ]] || npm update

# bye bye
PID=$(pgrep -f "node ./dist/server/entry.mjs")
if [[ -n "$PID" ]]; then
    kill $PID
    log "killed old server process"
fi

# rebuild
rm -rf dist
npm run build

# tmux session
if ! tmux has-session -t fitm-frontend 2>/dev/null; then
    tmux new-session -d -s fitm-frontend
    log "created new fitm-frontend tmux session"
fi

tmux send-keys -t fitm-frontend "cd $MODEEP_FRONTEND_ROOT && ./start_server.sh" ENTER
tmux detach -s fitm-frontend

log "update complete and server restarted"
