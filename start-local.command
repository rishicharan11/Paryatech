#!/bin/zsh
cd "$(dirname "$0")" || exit 1
echo "Paryatech: http://localhost:4179"
echo "Keep this window open while viewing the website. Press Control-C to stop."
exec python3 -m http.server 4179 --bind 127.0.0.1 --directory dist
