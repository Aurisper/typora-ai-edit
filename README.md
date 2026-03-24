# Typora AI Edit

[中文文档](README.zh-CN.md)

A lightweight AI editing plugin for [Typora](https://typora.io/) on macOS. Leverages your ChatGPT Plus subscription to provide intelligent text optimization directly within the editor.

## Features

- **AI Text Optimization** — Select text, right-click, and optimize with one click
- **Context-Aware Optimization** — Optimize selected text with full document context for style consistency
- **Custom Instructions** — Enter additional optimization instructions before each run (e.g., "make it more formal", "translate to English")
- **Model Switching** — Switch between GPT-5.4 / GPT-5.4-mini and other models via right-click submenu
- **Web Search** — Optionally enable web search for AI-assisted optimization
- **Stop Generation** — Cancel ongoing optimization at any time
- **Prompt Customization** — Visually edit system/user prompts through the settings panel
- **Cut / Copy / Paste** — Standard editing operations preserved in the context menu
- **Dark Mode** — All UI components adapt to system dark mode automatically

## Prerequisites

- macOS + [Typora](https://typora.io/) (Electron-based)
- ChatGPT Plus subscription
- OAuth login via [oauth-cli-kit](https://pypi.org/project/oauth-cli-kit/) (token persisted locally)

```bash
pip install oauth-cli-kit
# Follow oauth-cli-kit documentation to complete ChatGPT OAuth login
```

## Installation

```bash
# Close Typora first
sudo bash bin/install.sh
# Reopen Typora
```

The install script will:
1. Copy the plugin file to Typora's resource directory
2. Inject a `<script>` tag into Typora's `index.html`

## Usage

1. **Select text** in Typora
2. **Right-click** to open the AI edit context menu
3. Click **"AI Optimize Selection"** or **"AI Optimize Selection (With Context)"**
4. Enter optional extra instructions in the dialog, click **"Start"**
5. The optimized result replaces the selected text automatically

### Context Menu

```
┌──────────────────────────────────────┐
│ ✦ AI Optimize Selection              │
│ ✦ AI Optimize Selection (With Context)│
│ ──────────────────────────────────── │
│ ✂ Cut                          ⌘X   │
│ ⧉ Copy                         ⌘C   │
│ 📋 Paste                       ⌘V   │
│ ──────────────────────────────────── │
│ ⚙ AI Model                      ▸   │
│ 🌐   AI Web Search                  │
│ ──────────────────────────────────── │
│ ⚙ AI Edit Settings…                 │
└──────────────────────────────────────┘
```

## Updating the Plugin

After modifying `src/typora-ai-edit.js`:

```bash
sudo cp src/typora-ai-edit.js /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
# Restart Typora
```

## Uninstall

```bash
sudo bash bin/uninstall.sh
```

## Project Structure

```
├── src/
│   └── typora-ai-edit.js    # Main plugin script (single-file IIFE, no build step)
├── bin/
│   ├── install.sh           # Install script
│   └── uninstall.sh         # Uninstall script
└── doc/
    ├── requirements.md      # Requirements document
    └── development.md       # Development progress & technical details
```

## Technical Overview

| Module | Implementation |
|--------|---------------|
| Script Injection | Modify Typora's `index.html` with an additional `<script>` tag |
| AI API | ChatGPT Codex Responses API (SSE streaming) |
| Authentication | Reads local `oauth-cli-kit` token file |
| Editor Interaction | `window.getSelection()` + `document.execCommand("insertText")` |
| Document Content | `window.File.editor.getMarkdown()` (Typora internal API) |
| File Reading | `window.bridge.callSync("path.readText")` (macOS) |
| Config Storage | `localStorage` |
| Context Menu | Intercept `contextmenu` event with custom HTML overlay |

## Notes

- Typora upgrades may overwrite `index.html` — re-run `install.sh` after updating Typora
- Re-login via `oauth-cli-kit` when token expires
- Press `Option+Command+I` to open Typora DevTools and check `[AI Edit]` logs

## License

MIT
