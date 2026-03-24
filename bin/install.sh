#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PLUGIN_FILE="$PROJECT_DIR/src/typora-ai-edit.js"

TYPORA_APP="/Applications/Typora.app"
RESOURCE_DIR="$TYPORA_APP/Contents/Resources/TypeMark"
INDEX_HTML="$RESOURCE_DIR/index.html"
PLUGIN_DIR="$RESOURCE_DIR/ai-edit"
SCRIPT_TAG='<script src="./ai-edit/typora-ai-edit.js" defer></script>'

INJECT_AFTER_CANDIDATES=(
  '<script src="./app/main.js" defer></script>'
  '<script src="./app/main.js" aria-hidden="true" defer></script>'
  '<script src="./appsrc/main.js" defer></script>'
  '<script src="./appsrc/main.js" aria-hidden="true" defer></script>'
)

echo "=== Typora AI Edit 插件安装 ==="

if [ ! -d "$TYPORA_APP" ]; then
  echo "错误: 未找到 Typora.app，请确认 Typora 已安装在 /Applications"
  exit 1
fi

if [ ! -f "$INDEX_HTML" ]; then
  echo "错误: 未找到 $INDEX_HTML"
  exit 1
fi

if [ ! -f "$PLUGIN_FILE" ]; then
  echo "错误: 未找到插件文件 $PLUGIN_FILE"
  exit 1
fi

if grep -q "ai-edit/typora-ai-edit.js" "$INDEX_HTML"; then
  echo "插件脚本标签已存在，跳过注入"
else
  injected=false
  for candidate in "${INJECT_AFTER_CANDIDATES[@]}"; do
    if grep -qF "$candidate" "$INDEX_HTML"; then
      perl -i -pe "s|\Q${candidate}\E|${candidate}\n\t${SCRIPT_TAG}|" "$INDEX_HTML"
      injected=true
      echo "已在 index.html 中注入脚本标签（位于 $candidate 之后）"
      break
    fi
  done
  if [ "$injected" = false ]; then
    echo "错误: 未在 index.html 中找到可注入位置"
    exit 1
  fi
fi

mkdir -p "$PLUGIN_DIR"
cp "$PLUGIN_FILE" "$PLUGIN_DIR/"
echo "已复制插件文件到 $PLUGIN_DIR"

echo ""
echo "安装完成！请重启 Typora 生效。"
echo "使用方法: 选中文字后右键即可看到 AI 编辑菜单。"
