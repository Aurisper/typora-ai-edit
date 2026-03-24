#!/bin/bash
set -e

TYPORA_APP="/Applications/Typora.app"
RESOURCE_DIR="$TYPORA_APP/Contents/Resources/TypeMark"
INDEX_HTML="$RESOURCE_DIR/index.html"
PLUGIN_DIR="$RESOURCE_DIR/ai-edit"

echo "=== Typora AI Edit 插件卸载 ==="

if [ ! -f "$INDEX_HTML" ]; then
  echo "未找到 Typora index.html，可能已卸载"
  exit 0
fi

if grep -q "ai-edit/typora-ai-edit.js" "$INDEX_HTML"; then
  sed -i '' '/ai-edit\/typora-ai-edit\.js/d' "$INDEX_HTML"
  echo "已从 index.html 移除脚本标签"
else
  echo "index.html 中未找到插件标签，跳过"
fi

if [ -d "$PLUGIN_DIR" ]; then
  rm -rf "$PLUGIN_DIR"
  echo "已删除插件目录 $PLUGIN_DIR"
fi

echo ""
echo "卸载完成！请重启 Typora 生效。"
