# Typora AI Edit

[中文文档](README.zh-CN.md)

A lightweight AI editing plugin for [Typora](https://typora.io/) on macOS. Leverages your ChatGPT Plus subscription to provide intelligent text optimization directly within the editor.

## Features

- **AI Text Optimization** — Select text, right-click, and optimize with one click
- **Context-Aware Optimization** — Optimize selected text with full document context for style consistency
- **AI Image Description** — Right-click any image to get AI-powered analysis and description
- **Image Resize** — Right-click image to resize (100% / 75% / 50% / 33% / 25% / 10%)
- **Custom Instructions** — Enter additional instructions before each AI action (e.g., "make it more formal", "focus on the chart data")
- **Auto Language Detection** — Automatically shows Chinese or English UI based on system language
- **Model Switching** — Switch between GPT-5.4 / GPT-5.4-mini and other models via right-click submenu
- **Web Search** — Optionally enable web search for AI-assisted tasks
- **Stop Generation** — Cancel ongoing AI processing at any time
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
3. Click **"AI Optimize Selection"** or **"AI Optimize (With Context)"**
4. Enter optional extra instructions in the dialog, click **"Start"**
5. The optimized result replaces the selected text automatically

### Image Description

1. **Right-click on any image** in Typora
2. Click **"AI Describe Image"** in the context menu
3. Enter optional instructions (e.g., "extract all visible text"), click **"Start"**
4. View the AI's description in the result dialog — **Copy** or **Insert Below Image**

Supports web URLs, local files, and embedded base64 images.

### Context Menu

```
┌──────────────────────────────────────┐
│ 🖼 AI Describe Image                 │  ← when right-clicking an image
│ ──────────────────────────────────── │
│ ✦ AI Optimize Selection              │  ← when text is selected
│ ✦ AI Optimize (With Context)         │
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
| Image Handling | Local files → base64, web URLs → pass-through, canvas fallback |
| Context Menu | Intercept `contextmenu` event with custom HTML overlay |

## Changelog

### v0.3.1 (2026-03-24)

- **New: Image resize submenu** — Right-click image to resize with 100% / 75% / 50% / 33% / 25% / 10% options; checkmark shows current size
- **Fix: Web image download** — Web images are now downloaded locally (canvas or Node.js https) and converted to base64 before sending to API, fixing errors with signed/protected URLs

### v0.3.0 (2026-03-24)

- **New: Auto language detection** — Automatically detects system language via `navigator.language`; shows Chinese UI (menus, dialogs, toasts, default prompts) on Chinese systems, English on all others
- Default prompts are also language-aware (Chinese prompts for Chinese users, English for others)

### v0.2.0 (2026-03-24)

- **New: AI Image Description** — Right-click any image (local file, web URL, or embedded) to get AI-powered analysis
  - Prompt dialog with optional extra instructions before analysis
  - Result dialog with Copy and Insert Below Image actions
  - Automatic image source detection and base64 conversion for local files
- **New: Image prompt settings** — Customizable system/user prompts for image description in the settings panel

### v0.1.0 (2026-03-24)

- Initial release
- AI text optimization (selection only / with full document context)
- Pre-optimize instruction dialog with web search toggle
- Model switching via right-click submenu (GPT-5.4 / GPT-5.4-mini / etc.)
- Web search toggle
- Stop generation during AI processing
- Prompt customization settings panel
- Cut / Copy / Paste in context menu
- Dark mode support
- macOS install/uninstall scripts

## Notes

- Typora upgrades may overwrite `index.html` — re-run `install.sh` after updating Typora
- Re-login via `oauth-cli-kit` when token expires
- Press `Option+Command+I` to open Typora DevTools and check `[AI Edit]` logs

## License

MIT
