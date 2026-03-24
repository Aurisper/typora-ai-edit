# Typora AI Edit Plugin — Requirements

## Project Overview

A powerful AI editing plugin for the Typora Markdown editor on macOS, supporting ChatGPT Plus OAuth and any OpenAI-compatible API. All AI operations happen inline — text optimization, Q&A, image analysis, and diagram generation — with results rendered as native Markdown.

## Technical Background

### Typora

- Commercial, closed-source Markdown editor built on Electron
- Supports injecting custom JavaScript by editing HTML files in the resource bundle
- macOS injection path: `Contents/Resources/TypeMark/index.html`
- Renders HTML blocks, Mermaid, and math natively

### AI Capabilities

- **ChatGPT Plus (OAuth)**: Codex Responses API at `https://chatgpt.com/backend-api/codex/responses`, authenticated via `oauth-cli-kit`
- **OpenAI-compatible API**: Any endpoint implementing `/v1/chat/completions` (OpenAI, Azure, DeepSeek, Qwen, Kimi, local LLM, etc.)
- Protocol: HTTP POST + SSE (Server-Sent Events) streaming responses

## Functional Requirements

### Feature 1: AI Optimize Selection

- **Trigger**: Right-click on selected text → "AI Optimize Selection"
- **Input**: User-selected text + optional extra instructions
- **Behavior**: Opens a prompt dialog for additional instructions and web search toggle. Streams AI output in the dialog. User confirms before replacement.
- **Output**: Replaces selected text after user confirmation

### Feature 2: AI Optimize Selection (With Context)

- **Trigger**: Right-click on selected text → "AI Optimize (With Context)"
- **Input**: Selected text + full document content + optional extra instructions
- **Behavior**: Same as Feature 1, but passes the full document as context for style/logic consistency
- **Output**: Replaces selected text after user confirmation

### Feature 3: AI Image Description

- **Trigger**: Right-click on an image → "AI Describe Image"
- **Input**: Image data (local file, web URL, data URI) + optional user instructions
- **Behavior**: Auto-compresses image (max 2048px, JPEG 80%), sends to AI. Streams output in dialog. Smart prompt logic: custom instructions override default prompts.
- **Output**: Copy to clipboard or insert below image
- **Image source handling**: Web URLs (download via Node.js http/https), local files (base64), data URIs, canvas fallback

### Feature 4: AI Q&A

- **Trigger**: Press `⌘E` (configurable) or right-click (when no text selected) → "AI Q&A"
- **Input**: User question + optional web search + optional full document context
- **Behavior**: Opens prompt dialog. If cursor is inside a code block, auto-detects code content and injects it into the prompt with specialized coding instructions. Streams AI output.
- **Output**: Insert as Markdown blockquote, or "Replace Code Block" when in a code block
- **Code block support**: Detects active CodeMirror blocks (Mermaid, fenced code) and rendered HTML blocks via `.md-focus` class, `document.activeElement`, and `.CodeMirror-focused`

### Feature 5: Model Selection

- **Trigger**: Right-click → "AI Model" submenu
- **ChatGPT OAuth**: Lists preset models (gpt-5.4, gpt-5.4-mini, etc.)
- **OpenAI-compatible**: Lists tested models; unavailable models hidden from menu
- **Persistence**: Saved in `localStorage`

### Feature 6: Web Search Toggle

- **Trigger**: Right-click → "AI Web Search" toggle
- **Behavior**: When enabled, AI may use the internet. Grayed out when current model doesn't support web search (OpenAI-compatible).

### Feature 7: Multi-Provider API Support

- **Trigger**: Settings panel → API Provider dropdown
- **ChatGPT OAuth Login**: Uses `oauth-cli-kit` token, shows connection status
- **OpenAI Compatible**: Manual input for API URL, API Key, and comma-separated model names
- **Save & Test**: Automatically tests each model for availability, web search (tools), and vision (image) capability with real-time progress log
- **Auto-fetch**: When model list is empty, fetches all available models from `/v1/models`

### Feature 8: Prompt Settings Panel

- **Trigger**: Right-click → "AI Edit Settings…"
- **Contents**: Editable system/user prompts for all features (Optimize, Optimize with Context, Image Description, Q&A, Q&A with Context), API provider config, keyboard shortcut recorder, model test UI
- **Actions**: Save, Restore Defaults, Cancel

### Feature 9: Clipboard Operations

- **Context menu items**: Cut (`⌘X`), Copy (`⌘C`), Paste (`⌘V`)
- **Paste**: Electron clipboard → `document.execCommand("insertText")`

### Feature 10: Stop Generation

- All AI operations support cancellation via `AbortController`
- Stop button visible in streaming dialogs

### Feature 11: Code Block Editing

- **Detection**: `findFocusedBlock()` detects active code blocks via Typora `.md-focus` class, `document.activeElement`, and `.CodeMirror-focused`
- **CodeMirror integration**: Read/write code via `cm.getValue()` / `cm.setValue()`. Re-activates stale CM instances after dialog closes.
- **Rendered HTML blocks**: File-level Markdown replacement via `fs.writeFileSync` + Typora reload API

## Configuration

### Storage

`localStorage` (key: `typora-ai-edit-config`)

### Data Shape

```javascript
{
  provider: "chatgpt" | "openai_compat",
  model: "gpt-5.4",
  web_search: false,
  openai_compat: {
    base_url: "",
    api_key: "",
    models_input: "",
    models: [{ name, available, web_search, vision }]
  },
  models: ["gpt-5.4", ...],
  prompts: {
    optimize: { system, user },
    optimize_with_context: { system, user },
    describe_image: { system, user },
    qa: { system, user },
    qa_with_context: { system, user }
  },
  shortcuts: {
    qa: { key, metaKey, shiftKey, ctrlKey, altKey }
  }
}
```

### Prompt Variables

| Variable | Used In | Meaning |
|----------|---------|---------|
| `{selection}` | Optimize prompts | Text selected in Typora |
| `{document}` | Context prompts | Full document Markdown content |
| `{question}` | Q&A prompts | User's question |

## Non-functional Requirements

- Auto language detection: Chinese or English UI based on `navigator.language`
- Dark mode: All UI adapts to `prefers-color-scheme: dark`
- Modular codebase: 13 modules under `src/modules/`, built via `build.sh`
- No inline autocomplete, no chat panel, no GitHub Copilot features

## Architecture

### Core Flow

```
User action (right-click / ⌘E)
    ↓
Detect context (selection, image, code block)
    ↓
Open prompt dialog (with streaming UI)
    ↓
Read token (OAuth) or use API Key (OpenAI-compatible)
    ↓
Build request (prompts + context + image)
    ↓
POST to API (SSE streaming)
    ↓
Stream output in dialog + Stop button
    ↓
User confirms → Insert / Replace / Copy
```

### Module Structure

| Module | Role |
|--------|------|
| 01-i18n | Language detection + localized strings (Chinese/English) |
| 02-config | Constants, defaults, load/save config |
| 03-platform | File I/O, OAuth token, image processing |
| 04-api | Codex API + OpenAI-compatible API + SSE parsing |
| 05-model-test | Automated model capability testing |
| 06-editor | Selection, code block detection, replacement |
| 07-ui-core | Toast, clipboard, shortcut helpers |
| 08-ui-menu | Context menu building and event handling |
| 09-ui-dialogs | Optimize + Image prompt dialogs with streaming |
| 10-ui-qa | AI Q&A dialog with code block support |
| 11-ui-settings | Settings panel with model testing UI |
| 12-styles | CSS injection (light + dark theme) |
| 13-main | Initialization, event binding, startup |
