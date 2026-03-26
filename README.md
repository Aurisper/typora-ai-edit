<div align="center">

# Typora AI Edit

**Turn Typora into an AI-powered writing & productivity studio.**

[![Release](https://img.shields.io/github/v/release/Aurisper/typora-ai-edit?style=for-the-badge&color=blue)](https://github.com/Aurisper/typora-ai-edit/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-macOS-lightgrey?style=for-the-badge&logo=apple)](https://typora.io/)
[![Typora](https://img.shields.io/badge/Typora-plugin-8B5CF6?style=for-the-badge)](https://typora.io/)

[![OpenAI Compatible](https://img.shields.io/badge/API-OpenAI%20Compatible-412991?style=flat-square&logo=openai)](https://platform.openai.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](src/modules/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/Aurisper/typora-ai-edit/pulls)
[![GitHub stars](https://img.shields.io/github/stars/Aurisper/typora-ai-edit?style=flat-square&color=yellow)](https://github.com/Aurisper/typora-ai-edit/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Aurisper/typora-ai-edit?style=flat-square)](https://github.com/Aurisper/typora-ai-edit/issues)

[中文文档](README.zh-CN.md) · [Report Bug](https://github.com/Aurisper/typora-ai-edit/issues/new?template=bug_report.md) · [Request Feature](https://github.com/Aurisper/typora-ai-edit/issues/new?template=feature_request.md)

</div>

---

A powerful AI editing plugin for [Typora](https://typora.io/) on macOS. Supports ChatGPT Plus OAuth and any OpenAI-compatible API. Everything happens inline — AI responses are native Markdown, instantly rendered by Typora, ready to export as PDF and share.

## Why Typora AI Edit?

- **Write with AI, not in a chat window** — AI edits and answers appear directly in your document, not a separate app
- **Flowcharts & diagrams via AI** — Ask AI to generate flowcharts as HTML/CSS/SVG or Mermaid code — Typora renders them instantly as live visuals. Edit and refine through follow-up Q&A
- **Cumulative Q&A** — Ask follow-up questions in the same document; the full conversation context is preserved as Markdown, naturally forming a knowledge base
- **Web search built in** — Let AI search the web for up-to-date information, then write the results directly into your document
- **Everything is Markdown** — All AI output is native Markdown (text, code, tables, HTML/SVG diagrams, Mermaid, math). Export to PDF, HTML, or share the `.md` file directly
- **Multi-model freedom** — Switch between GPT, Claude, DeepSeek, Qwen, Kimi, or any OpenAI-compatible model with one click

## Example: AI-Generated Flowchart

Ask AI to generate a flowchart — it outputs HTML/CSS/SVG code that Typora renders as a live, styled diagram directly in your document.

![AI-generated flowchart in Typora](assets/flowchart-example.png)

> **Prompt:** *"Draw a flowchart for a content publishing workflow"*
> The AI generates an HTML block with CSS styling and SVG graphics. Typora renders it inline as a visual diagram — no extra tools needed. You can ask follow-up questions like *"Add a review step before publishing"* to iteratively refine the diagram. AI can also generate Mermaid code for simpler diagrams.

## Features

<table>
<tr>
<td width="50%">

### AI Writing & Editing
- **AI Text Optimization** — Select text, right-click, optimize
- **Context-Aware Optimization** — Optimize with full document context
- **Custom Instructions** — Enter instructions before each action
- **Stop Generation** — Cancel ongoing AI processing

</td>
<td width="50%">

### AI Q&A & Knowledge Building
- **Inline AI Q&A** — Press `⌘E` to ask questions inline
- **Cumulative Follow-up** — Full document context preserved
- **Flowcharts & Diagrams** — HTML/SVG/Mermaid, rendered live
- **Web Search** — Real-time information with source citations

</td>
</tr>
<tr>
<td width="50%">

### AI Image Analysis
- **AI Image Description** — Right-click any image for AI analysis
- **Smart Compression** — Auto-resize (max 2048px) + JPEG 80%
- **Image Resize** — 100% / 75% / 50% / 33% / 25% / 10%

</td>
<td width="50%">

### Multi-Provider & Model Management
- **Multi-Provider** — ChatGPT OAuth or any OpenAI-compatible API
- **Auto Model Testing** — Validates availability, search, vision
- **Capability-Aware UI** — Menus auto-adapt to model features
- **One-Click Switching** — Switch models via right-click submenu

</td>
</tr>
</table>

### Feishu Integration

- **Save as Feishu Doc** — Right-click → "Save as Feishu Doc" to create a Feishu online doc
- **Edit Feishu Docs Locally** — Load any archived doc back into Typora for editing, then save back to overwrite the original
- **Stop Archiving** — Cancel the archive process at any step with a single click
- **AI Title Generation** — Automatically generates a concise title from your content
- **Pure JS DOCX** — In-memory Markdown→DOCX conversion with image embedding, zero external dependencies (no Pandoc)
- **Session Management** — Same document overwrites previous version; different documents are isolated
- **Document Manager** — Browse, search (title + full text), paginate, edit, and delete archived Feishu docs
- **Operation Log** — View log, one-click copy, one-click clear

### Productivity

- **Native Markdown Output** — Exportable to PDF / HTML / Word
- **Configurable Shortcuts** — Customize keyboard shortcuts (default: `⌘E`)
- **Prompt Customization** — Visually edit system/user prompts
- **Auto Language Detection** — Chinese or English UI based on system language
- **Dark Mode** — All UI components adapt to system dark mode

## Use Cases

| Scenario | How |
|----------|-----|
| Polish a paragraph | Select text → right-click → AI Optimize |
| Generate a flowchart | `⌘E` → "Draw a flowchart for user registration process" |
| Edit an existing diagram | `⌘E` → "Add an error handling branch to the flowchart above" |
| Research a topic | `⌘E` + Web Search → "What are the latest trends in AI agents?" |
| Analyze an image | Right-click image → AI Describe Image → "Extract all visible data" |
| Build a Q&A knowledge base | Keep asking follow-up questions with full context enabled |
| Translate content | Select text → right-click → AI Optimize → "Translate to Japanese" |
| Save as Feishu Doc | Right-click → "Save as Feishu Doc" → auto title & online doc |
| Edit a Feishu doc | "Feishu Documents" → click "Edit" → modify in Typora → "Save to Feishu" |
| Manage Feishu docs | Right-click → "Feishu Documents" → search, browse, edit, delete |
| View operation log | Right-click → "View Log" → check history, copy or clear |

## Getting Started

### Prerequisites

- macOS + [Typora](https://typora.io/) (Electron-based)
- **Option A: ChatGPT Plus** — OAuth login via [oauth-cli-kit](https://pypi.org/project/oauth-cli-kit/)
- **Option B: OpenAI-compatible API** — Any API endpoint with an API key

```bash
# For ChatGPT Plus users:
pip install oauth-cli-kit
```

### Installation

```bash
# Close Typora first
sudo bash bin/install.sh
# Reopen Typora
```

The install script will:
1. Copy the plugin file to Typora's resource directory
2. Inject a `<script>` tag into Typora's `index.html`

### Uninstall

```bash
sudo bash bin/uninstall.sh
```

## Quick Start

### Text Optimization

1. **Select text** in Typora
2. **Right-click** → **"AI Optimize Selection"** (or "With Context")
3. Enter optional instructions, click **"Start"**
4. The optimized result replaces the selected text

### AI Q&A & Flowcharts

1. Place cursor anywhere (no text selected), press **`⌘E`** or right-click → **"AI Q&A"**
2. Type your question — e.g., *"Draw an HTML flowchart for a CI/CD pipeline"*
3. Optionally enable **Web Search** and/or **Include full document context**
4. Click **"Start"** — AI response is inserted as a Markdown blockquote
5. For diagrams: Typora renders HTML/SVG and Mermaid code into visual flowcharts
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
│ 📤 Save as Feishu Doc                │
│ 📂 Feishu Documents                 │
│ 📋 View Log                         │
│ ──────────────────────────────────── │
│ ⚙ AI Edit Settings…                 │
└──────────────────────────────────────┘
```

## Development

### Updating the Plugin

After modifying module files in `src/modules/`:

```bash
bash build.sh
sudo cp src/typora-ai-edit.js \
  /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
# Restart Typora
```

### Project Structure

```
├── src/
│   ├── modules/                # Modular source files (edit these)
│   │   ├── 01-i18n.js          # Language detection & localized strings
│   │   ├── 02-config.js        # Constants, defaults, load/save
│   │   ├── 03-platform.js      # File I/O, token, image helpers
│   │   ├── 04-api.js           # API calls, SSE parsing, abort
│   │   ├── 05-model-test.js    # OpenAI model testing
│   │   ├── 06-editor.js        # Selection, code blocks, replacement
│   │   ├── 07-ui-core.js       # Toast, clipboard, shortcuts
│   │   ├── 08-ui-menu.js       # Context menu & paste
│   │   ├── 09-ui-dialogs.js    # Optimize & image dialogs
│   │   ├── 10-ui-qa.js         # AI Q&A dialog
│   │   ├── 11-ui-settings.js   # Settings panel
│   │   ├── 12-styles.js        # CSS injection
│   │   ├── 13-main.js          # Initialization & event binding
│   │   ├── 14a-feishu-core.js  # Feishu API: auth, upload, import, delete
│   │   ├── 14b-feishu-ui.js    # Feishu doc flow & progress UI
│   │   ├── 14c-md2docx.js      # Pure JS in-memory Markdown → DOCX
│   │   └── 15-logger.js        # Operation log panel
│   └── typora-ai-edit.js       # Built output (auto-generated)
├── build.sh                    # Build: modules → single IIFE
├── bin/
│   ├── install.sh              # Install script
│   └── uninstall.sh            # Uninstall script
└── doc/
    ├── requirements.md         # Requirements document
    ├── development.md          # Technical details
    └── feishu-dev-plan.md      # Feishu integration dev plan
```

### Technical Overview

| Module | Implementation |
|--------|---------------|
| Script Injection | Modify Typora's `index.html` with `<script>` tag |
| AI API | ChatGPT Codex Responses API or OpenAI `/v1/chat/completions` (SSE) |
| Authentication | Local `oauth-cli-kit` token or API Key |
| Editor Interaction | `window.getSelection()` + `execCommand` + CodeMirror API |
| Document Content | `window.File.editor.getMarkdown()` (Typora internal) |
| Config Storage | `localStorage` |
| Image Handling | Local → base64, web → download, canvas fallback, auto-compress |
| Context Menu | Custom HTML overlay on `contextmenu` event |
| Diagram Rendering | AI generates HTML/CSS/SVG or Mermaid → Typora renders inline |
| Feishu Online Doc | Pure JS DOCX generation (CRC32+ZIP+OOXML) with embedded images (DOM canvas + multi-fallback) → `fetch` upload → import API |
| Document Manager | Session-based doc list with search, pagination, local editing, save-back, delete |
| Operation Log | In-memory log store (500 entries) + modal panel with copy/clear |

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

- [Bug Report](https://github.com/Aurisper/typora-ai-edit/issues/new?template=bug_report.md) — Found a bug? Let us know
- [Feature Request](https://github.com/Aurisper/typora-ai-edit/issues/new?template=feature_request.md) — Have an idea? Share it
- [Pull Requests](https://github.com/Aurisper/typora-ai-edit/pulls) — PRs are always welcome

Please also review our [Code of Conduct](CODE_OF_CONDUCT.md) and [Security Policy](SECURITY.md).

## Changelog

<details open>
<summary><strong>v0.8.1</strong> — DOCX Image Embedding (2026-03-26)</summary>

- **New: Image support in Feishu archive** — Images in Markdown documents are now embedded into the DOCX file and visible in Feishu online docs
- **New: DOM canvas extraction** — Primary image loading strategy extracts pixel data directly from Typora's rendered `<img>` elements via canvas, bypassing file path resolution issues
- **New: Multi-fallback image loading** — 4-layer strategy: DOM canvas → resolved file path → `getImageDataUrl` → network fetch; handles local files, `file://` URLs, HTTP URLs, and data URIs
- **New: HTML `<img>` tag support** — DOCX engine now recognizes both `![alt](url)` and `<img src="...">` image formats
- **New: Image loading diagnostics** — Toast notification shows image load results (e.g., "2/3 images loaded") with URL details for debugging
- **Improved: Standard OOXML structure** — Image drawing XML now includes `effectExtent`, `cNvGraphicFramePr`, and proper namespace declarations on the root element for maximum parser compatibility
- **Fix: Paths with spaces** — Image URLs containing spaces (e.g., `Application Support`) are now handled correctly

</details>

<details>
<summary><strong>v0.8.0</strong> — Feishu Doc Editing & Archive Control (2026-03-26)</summary>

- **New: Edit Feishu docs locally** — Click "Edit" in the document manager to load an archived doc back into Typora; a blue status bar appears at the top with a "Save to Feishu" button to overwrite the original
- **New: Stop archiving** — A "Stop" button on the archive progress overlay lets you cancel the process at any step; uses `AbortController` to abort in-flight fetch requests and polling
- **New: Full content caching** — Archived documents now store the complete Markdown (not just the first 5000 chars), enabling lossless local editing
- **Improved: Feishu API abort support** — All Feishu API functions (`getFeishuTenantToken`, `feishuUploadBlob`, `feishuCreateImportTask`, `feishuPollImportResult`) accept an optional `AbortSignal` for cancellation
- **Improved: Document manager UI** — Each document now shows both "Edit" and "Delete" buttons side by side

</details>

<details>
<summary><strong>v0.7.0</strong> — Feishu Integration & Document Management (2026-03-25)</summary>

- **New: Save as Feishu Doc** — Right-click → "Save as Feishu Doc" to create an online Feishu document from the current Markdown
- **New: AI title generation** — Automatically generates a concise document title via AI
- **New: Pure JS DOCX engine** — In-memory Markdown→DOCX conversion using custom CRC32 + ZIP + OOXML, zero external dependencies (no Pandoc, no Node.js fs/child_process)
- **New: Feishu document manager** — Browse all archived docs, search by title or full text (cached), paginate (10/page), delete with one click
- **New: Feishu session management** — Same document overwrites previous version; different documents are isolated; content cached for search
- **New: Operation log panel** — Right-click → "View Log" to inspect plugin activity, errors, one-click copy & clear
- **New: Feishu settings** — Configure App ID, App Secret, and target folder token in the settings panel
- **Improved: Logging integration** — All major operations and errors are captured in the log panel
- **Architecture: Feishu modules** — `14a-feishu-core.js` (API), `14b-feishu-ui.js` (flow & UI), `14c-md2docx.js` (DOCX engine), `15-logger.js` (log)

</details>

<details>
<summary><strong>v0.6.0</strong> — Modular Architecture & Code Block Editing (2026-03-24)</summary>

- **New: Modular codebase** — Split 2500-line plugin into 13 focused modules under `src/modules/`
- **New: Build script** — `build.sh` concatenates modules, wraps in IIFE
- **Improved: Code block AI editing** — Full support for Mermaid, HTML/SVG, and fenced code blocks
- **Improved: HTML block replacement** — File-level Markdown replacement for rendered HTML blocks
- **Improved: Streaming dialogs** — All AI operations stream output with Stop/Confirm buttons
- **Fix: Q&A insert failure** — Saves cursor position before dialog opens
- **Fix: CodeMirror selection** — Reliable text detection inside code blocks

</details>

<details>
<summary><strong>v0.5.x</strong> — Multi-Provider Support (2026-03-24)</summary>

- **New: Multi-Provider** — ChatGPT OAuth or any OpenAI-compatible API
- **New: Auto Model Testing** — Validates availability, web search, and vision
- **New: Capability-aware UI** — Menus auto-adapt based on model capabilities
- **Improved: Real-time test log** — Live progress in settings panel
- **Improved: Auto-fetch models** — Automatically fetches from API endpoint

</details>

<details>
<summary><strong>v0.4.0</strong> — AI Q&A (2026-03-24)</summary>

- **New: Inline AI Q&A** — `⌘E` to ask questions, answers inserted as blockquotes
- **New: Configurable shortcut** — Customize Q&A shortcut in settings
- **New: Q&A prompt customization** — Editable system/user prompts

</details>

<details>
<summary><strong>v0.3.x</strong> — Image Analysis & i18n (2026-03-24)</summary>

- **New: AI Image Description** — Right-click image for AI analysis
- **New: Image compression** — Auto-resize + JPEG conversion
- **New: Image resize submenu** — 100% / 75% / 50% / 33% / 25% / 10%
- **New: Auto language detection** — Chinese/English UI auto-switch

</details>

<details>
<summary><strong>v0.1.0</strong> — Initial Release (2026-03-24)</summary>

- AI text optimization, instruction dialog, model switching, web search, stop generation, prompt customization, clipboard operations, dark mode, macOS install/uninstall scripts

</details>

## Notes

- Typora upgrades may overwrite `index.html` — re-run `install.sh` after updating Typora
- Re-login via `oauth-cli-kit` when token expires (ChatGPT OAuth)
- Press `Option+Command+I` to open Typora DevTools and check `[AI Edit]` logs
- Typora renders HTML blocks and Mermaid natively — AI-generated diagrams display automatically

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**If you find this project useful, please consider giving it a ⭐**

[Report Bug](https://github.com/Aurisper/typora-ai-edit/issues/new?template=bug_report.md) · [Request Feature](https://github.com/Aurisper/typora-ai-edit/issues/new?template=feature_request.md) · [Contributing](CONTRIBUTING.md)

</div>
