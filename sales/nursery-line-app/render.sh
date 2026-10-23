#!/bin/sh
# 営業資料（A4 両面）を PDF にする。Google Chrome が必要。
#   sh sales/nursery-line-app/render.sh
set -eu
DIR=$(cd "$(dirname "$0")" && pwd)
OUT="$DIR/../../docs/downloads/nursery-line-app.pdf"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf="$OUT" "file://$DIR/index.html" 2>/dev/null
echo "wrote $OUT"
