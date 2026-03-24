# Typora AI Edit

[中文文档](README.zh-CN.md)

A powerful AI editing plugin for [Typora](https://typora.io/) on macOS — turn Typora into an AI-powered writing & productivity studio.

Supports ChatGPT Plus OAuth and any OpenAI-compatible API. Everything happens inline — AI responses are native Markdown, instantly rendered by Typora, ready to export as PDF and share.

## Why Typora AI Edit?

- **Write with AI, not in a chat window** — AI edits and answers appear directly in your document, not a separate app
- **Flowcharts & diagrams via AI** — Ask AI to generate Mermaid flowcharts, sequence diagrams, Gantt charts, etc. — Typora renders them instantly. Edit and refine through follow-up Q&A
- **Cumulative Q&A** — Ask follow-up questions in the same document; the full conversation context is preserved as Markdown, naturally forming a knowledge base
- **Web search built in** — Let AI search the web for up-to-date information, then write the results directly into your document
- **Everything is Markdown** — All AI output is native Markdown (text, code blocks, tables, Mermaid diagrams, math). Export to PDF, HTML, or share the `.md` file directly
- **Multi-model freedom** — Switch between GPT, Claude, DeepSeek, Qwen, Kimi, or any OpenAI-compatible model with one click

## Features

### AI Writing & Editing
- **AI Text Optimization** — Select text, right-click, optimize with one click
- **Context-Aware Optimization** — Optimize selected text with full document context for style consistency
- **Custom Instructions** — Enter additional instructions before each action (e.g., "make it more formal", "translate to English")
- **Stop Generation** — Cancel ongoing AI processing at any time

### AI Q&A & Knowledge Building
- **Inline AI Q&A** — Press `⌘E` to ask AI questions; answers are inserted as Markdown blockquotes
- **Cumulative Follow-up** — Keep asking in the same document; enable "Include full document context" so AI remembers everything above
- **Flowcharts & Diagrams** — Ask AI to draw Mermaid flowcharts, sequence diagrams, class diagrams — rendered live by Typora
- **Web Search** — Toggle web search for real-time information; AI cites sources inline

### AI Image Analysis
- **AI Image Description** — Right-click any image for AI-powered analysis (auto-hidden when model lacks vision)
- **Smart Compression** — Images auto-resized (max 2048px) and converted to JPEG (80% quality) before sending
- **Image Resize** — Right-click image to resize (100% / 75% / 50% / 33% / 25% / 10%)

### Multi-Provider & Model Management
- **Multi-Provider Support** — ChatGPT OAuth login or any OpenAI-compatible API (custom URL, key, models)
- **Auto Model Testing** — Tests each model for availability, web search, and vision capability with real-time progress log
- **Capability-Aware UI** — Menus and dialogs auto-adapt based on model capabilities (vision, web search)
- **Model Switching** — Switch models via right-click submenu; unavailable models shown with ✗

### Productivity
- **Native Markdown Output** — All AI content is Markdown — rendered by Typora, exportable to PDF / HTML / Word
- **Configurable Shortcuts** — Customize keyboard shortcuts in the settings panel (default: `⌘E` for Q&A)
- **Prompt Customization** — Visually edit system/user prompts through the settings panel
- **Auto Language Detection** — Chinese or English UI based on system language
- **Dark Mode** — All UI components adapt to system dark mode

## Use Cases

| Scenario | How |
|----------|-----|
| Polish a paragraph | Select text → right-click → AI Optimize |
| Generate a flowchart | `⌘E` → "Draw a flowchart for user registration process" |
| Edit an existing diagram | `⌘E` → "Add an error handling branch to the flowchart above" |
| Research a topic | `⌘E` + enable Web Search → "What are the latest trends in AI agents?" |
| Analyze an image | Right-click image → AI Describe Image → "Extract all visible data" |
| Build a Q&A knowledge base | Keep asking follow-up questions in one document with full context enabled |
| Create a presentation outline | `⌘E` → "Create a 10-slide outline for a product launch presentation" |
| Translate content | Select text → right-click → AI Optimize → "Translate to Japanese" |

## Prerequisites

- macOS + [Typora](https://typora.io/) (Electron-based)
- **Option A: ChatGPT Plus** — OAuth login via [oauth-cli-kit](https://pypi.org/project/oauth-cli-kit/) (token persisted locally)
- **Option B: OpenAI-compatible API** — Any API endpoint with an API key (e.g., OpenAI, Azure, local LLM, third-party providers)

```bash
# For ChatGPT Plus users:
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

## Quick Start

### Text Optimization

1. **Select text** in Typora
2. **Right-click** → **"AI Optimize Selection"** (or "With Context" for full-document awareness)
3. Enter optional instructions, click **"Start"**
4. The optimized result replaces the selected text

### AI Q&A & Flowcharts

1. Place cursor anywhere (no text selected), press **`⌘E`** or right-click → **"AI Q&A"**
2. Type your question — e.g., *"Draw a Mermaid flowchart for a CI/CD pipeline"*
3. Optionally enable **Web Search** and/or **Include full document context**
4. Click **"Start"** — AI response is inserted as a Markdown blockquote
5. For diagrams: Typora instantly renders Mermaid code into visual flowcharts
6. Ask follow-up questions to refine — e.g., *"Add a rollback step after deployment failure"*

### Image Description

1. **Right-click on any image** in Typora
2. Click **"AI Describe Image"**
3. Enter optional instructions, click **"Start"**
4. View AI analysis — **Copy** or **Insert Below Image**

### Context Menu

```
┌──────────────────────────────────────┐
│ 🖼 AI Describe Image                 │  ← when right-clicking an image
│ ──────────────────────────────────── │
│ ✦ AI Optimize Selection              │  ← when text is selected
│ ✦ AI Optimize (With Context)         │
│ ──────────────────────────────────── │
│ 💬 AI Q&A                       ⌘E  │  ← when no text selected
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
| AI API | ChatGPT Codex Responses API or OpenAI-compatible `/v1/chat/completions` (SSE streaming) |
| Authentication | Reads local `oauth-cli-kit` token file or API Key |
| Editor Interaction | `window.getSelection()` + `document.execCommand("insertText")` |
| Document Content | `window.File.editor.getMarkdown()` (Typora internal API) |
| File Reading | `window.bridge.callSync("path.readText")` (macOS) |
| Config Storage | `localStorage` |
| Image Handling | Local files → base64, web URLs → download & convert, canvas fallback, auto-compress |
| Context Menu | Intercept `contextmenu` event with custom HTML overlay |
| Diagram Rendering | AI generates Mermaid code → Typora renders natively |

## Changelog

### v0.5.1 (2026-03-24)

- **Improved: Real-time test log** — Model testing now shows a live progress log in the settings panel (fetching models, testing availability, web search, vision for each model)
- **Improved: Auto-fetch models** — When model list is left empty, automatically fetches all available models from the API endpoint
- **Improved: Test feedback** — "Save & Test" button shows disabled state during testing; clear error messages when URL or Key is missing

### v0.5.0 (2026-03-24)

- **New: Multi-Provider Support** — Choose between ChatGPT OAuth or any OpenAI-compatible API in the settings panel
  - OpenAI-compatible: enter API URL, API Key, and model names (comma-separated)
  - "Save & Test" button automatically validates each model for availability, web search (tools), and vision (image) support
  - Connection status shown for ChatGPT OAuth; test results shown for OpenAI-compatible models
- **New: Capability-aware UI** — Features auto-adapt based on model capabilities
  - Image description menu hidden when model lacks vision support
  - Web search toggle/checkbox grayed out when model doesn't support tools
  - Unavailable models shown with cross mark in the model submenu

### v0.4.0 (2026-03-24)

- **New: AI Q&A in Document** — Press `⌘E` (or right-click → AI Q&A) to open a question dialog; AI answers are inserted as Markdown blockquotes
  - Prompt dialog with optional **Web Search** and **Include full document context** checkboxes
  - Only available when no text is selected (selected text uses the existing AI Optimize flow)
- **New: Configurable keyboard shortcut** — Customize the Q&A shortcut in the AI Edit Settings panel; click input field + press key combination to record
- **New: Q&A prompt customization** — System/user prompts for Q&A (with and without document context) are editable in settings

### v0.3.2 (2026-03-24)

- **New: Image compression** — Images are automatically resized (max 2048px) and converted to JPEG (quality 80%) before sending to AI, significantly reducing upload size
- **Improved: Smart prompt logic for images** — When custom instructions are provided, uses only your instructions as the prompt (no interference from default "describe image" prompts); when left empty, uses the default prompts as before

### v0.3.1 (2026-03-24)

- **New: Image resize submenu** — Right-click image to resize with 100% / 75% / 50% / 33% / 25% / 10% options; checkmark shows current size
- **Fix: Web image download** — Web images are now downloaded locally (canvas or Node.js https) and converted to base64 before sending to API, fixing errors with signed/protected URLs

### v0.3.0 (2026-03-24)

- **New: Auto language detection** — Automatically detects system language via `navigator.language`; shows Chinese UI on Chinese systems, English on all others
- Default prompts are also language-aware

### v0.2.0 (2026-03-24)

- **New: AI Image Description** — Right-click any image for AI-powered analysis with prompt dialog and result dialog
- **New: Image prompt settings** — Customizable system/user prompts for image description

### v0.1.0 (2026-03-24)

- Initial release — AI text optimization, instruction dialog, model switching, web search, stop generation, prompt customization, clipboard operations, dark mode, macOS install/uninstall scripts

## Notes

- Typora upgrades may overwrite `index.html` — re-run `install.sh` after updating Typora
- Re-login via `oauth-cli-kit` when token expires (ChatGPT OAuth)
- Press `Option+Command+I` to open Typora DevTools and check `[AI Edit]` logs
- Typora natively supports Mermaid — AI-generated flowcharts render automatically

## License

MIT
