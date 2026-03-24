#!/bin/bash
# Build typora-ai-edit.js from modular source files
# Usage: bash build.sh

set -e
cd "$(dirname "$0")"

OUTPUT="src/typora-ai-edit.js"

{
  echo '(function () {'
  echo '  "use strict";'
  echo ''
  for f in src/modules/[0-9]*.js; do
    cat "$f"
    echo ''
  done
  echo '})();'
} > "$OUTPUT"

LINES=$(wc -l < "$OUTPUT" | tr -d ' ')
echo "Built: $OUTPUT ($LINES lines)"
