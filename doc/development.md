# Typora AI Edit — Development Progress and Technical Implementation

## Project Status

**Current version**: v0.1.0 (development / debugging phase)
**Last updated**: 2026-03-24

## Project Structure

```
TyporaEdit/
├── src/
│   └── typora-ai-edit.js        ← Main plugin script (~850 lines, single-file IIFE)
├── bin/
│   ├── install.sh               ← macOS install script
│   └── uninstall.sh             ← macOS uninstall script
├── doc/
│   ├── requirements.md          ← Requirements document
│   └── development.md           ← This document (development progress and technical implementation)
├── typora-copilot-main/         ← Reference project: Typora Copilot (GitHub Copilot plugin)
└── ChatGPTPlus/                 ← Reference project lives at /Users/shiyu/Projects/ChatGPTPlus
```

## Feature Completion Status

| Feature | Status | Notes |
|------|------|------|
| Context menu injection | ✅ Done | Custom menu on right-click in the editing area |
| AI optimize selection | ✅ Done | Selection → prompt dialog → API call → replace selection |
| AI optimize (with full document context) | ✅ Done | Same as above, with full document passed as extra context |
| Pre-optimize input dialog | ✅ Done | Extra optimization instructions + web search checkbox |
| Model selection | ✅ Done | Submenu on right-click, checkmark for current model |
| Web search toggle | ✅ Done | Available from context menu and optimize dialog |
| Prompt settings panel | ✅ Done | Edit system/user prompts in a dialog, restore defaults supported |
| Cut / Copy | ✅ Done | `document.execCommand("cut"/"copy")` |
| Paste | ✅ Done | Electron `clipboard.readText()` + `insertText` |
| Dark theme | ✅ Done | All UI respects `prefers-color-scheme: dark` |
| Token loading | ⚠️ To verify | Multi-path fallback; confirm what works on macOS Typora |
| Install script | ✅ Done | One-step install: `sudo bash bin/install.sh` |
| Uninstall script | ✅ Done | One-step uninstall: `sudo bash bin/uninstall.sh` |

## Technical Implementation Details

### 1. Script Injection

**How it works**: Typora is Electron-based; its WYSIWYG editor is driven by JS loaded from `index.html`. Appending a `<script>` tag to that HTML runs custom code in Typora’s renderer process.

**Install location**:
```
/Applications/Typora.app/Contents/Resources/TypeMark/index.html
```

**Injection** (`bin/install.sh`):
After Typora’s own `main.js` script tag, insert one line with `perl`:
```html
<script src="./appsrc/main.js" aria-hidden="true" defer></script>
<script src="./ai-edit/typora-ai-edit.js" defer></script>   ← inserted line
```

**Plugin file on disk**:
```
/Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
```

**Notes**:
- Typora upgrades may overwrite `index.html`; run `install.sh` again
- Modifying the app bundle requires `sudo`
- macOS `com.apple.provenance` extended attributes may block writes

### 2. Configuration

**Storage**: `localStorage` (built-in browser storage, available in Electron’s renderer)

**Why `localStorage` instead of files**:
- On macOS, Typora’s `window.bridge` API only exposes `readText`; no reliable file write path was found
- `localStorage` needs no extra permissions and persists across sessions in Electron
- Avoids file I/O complexity

**Storage key**: `typora-ai-edit-config`

**Data shape**:
```javascript
{
  model: "gpt-5.4",           // currently selected model
  web_search: false,           // default web search state
  models: ["gpt-5.4", ...],   // available models
  prompts: {
    optimize: { system, user },
    optimize_with_context: { system, user }
  }
}
```

**Load strategy**: `loadConfig()` reads from `localStorage` each time and merges with `DEFAULT_CONFIG` so new fields get defaults.

### 3. OAuth Token Loading

**Token file path**:
```
~/Library/Application Support/oauth-cli-kit/auth/codex.json
```

**Token shape**:
```json
{
  "access": "eyJhbGci...",       // Bearer token (JWT)
  "refresh": "rt_5gN-...",       // Refresh token
  "expires": 1775115058422,      // Expiry (Unix ms)
  "account_id": "234b6e3e-..."   // ChatGPT account ID
}
```

**Home directory resolution** (`getHomePath()`, multi-path fallback):
```
1. process.env.HOME                           — Node.js env
2. window._options.appDataPath → regex        — Typora internal config
3. window._options.userPath / homePath        — Typora fallbacks
4. bridge.callSync("controller.runCommandSync", "whoami") — macOS bridge
5. window.dirname / __dirname → regex       — script directory
```

**File read** (`readFileContent()`, three paths):
```
1. window.bridge.callSync("path.readText", path)  — macOS Typora
2. window.reqnode("fs").readFileSync(path)         — Windows/Linux Typora
3. require("fs").readFileSync(path)                — generic Node.js
```

**Expiry**: If `Date.now() > token.expires`, prompt the user to sign in again.

### 4. Codex Responses API Calls

**Endpoint**: `POST https://chatgpt.com/backend-api/codex/responses`

**Headers**:
```javascript
{
  "Authorization": "Bearer <token.access>",
  "chatgpt-account-id": "<token.account_id>",
  "OpenAI-Beta": "responses=experimental",
  "originator": "typora-ai-edit",
  "User-Agent": "typora-ai-edit/1.0",
  "accept": "text/event-stream",
  "content-type": "application/json"
}
```

**Body**:
```javascript
{
  model: "gpt-5.4",
  store: false,
  stream: true,
  instructions: "<system prompt>",
  input: [{
    role: "user",
    content: [{ type: "input_text", text: "<user prompt>" }]
  }],
  include: ["reasoning.encrypted_content"]
}
```

**Web search** (when `web_search = true`, append):
```javascript
{
  tools: [{ type: "web_search" }],
  tool_choice: "auto"
}
```

### 5. SSE Stream Parsing

**Protocol**: Server-Sent Events; events separated by `\n\n`, each line starts with `data:`.

**Pipeline** (`parseSSE()`):
```
1. response.body.getReader() for ReadableStream reader
2. Loop reader.read() for chunks
3. TextDecoder, split on "\n\n" into events
4. Per event, take "data:" lines and join into JSON
5. Skip empty data and "[DONE]"
6. Parse JSON, dispatch by type:
   - "response.output_text.delta" → append delta to result
   - "error" / "response.failed" → throw
```

**Buffering**: Incomplete events stay in `buf` until the next chunk completes them.

### 6. Editor Interaction

**Selected text**:
```javascript
window.getSelection().toString()
```

**Full document**:
```javascript
window.File.editor.getMarkdown()
// window.File overrides the standard File object; effectively Typora.Files
```

**Save selection**:
```javascript
// Saved on context menu, because clicking the menu changes focus/selection
savedSelection = {
  range: window.getSelection().getRangeAt(0).cloneRange(),
  text: window.getSelection().toString()
};
```

**Restore selection and replace**:
```javascript
window.getSelection().removeAllRanges();
window.getSelection().addRange(savedSelection.range);
document.execCommand("insertText", false, newText);
```

`insertText` replaces the current selection and integrates with Typora’s undo/redo stack.

### 7. Context Menu

**Hook**: Intercept `contextmenu` in the capture phase (`capture: true`) for the editor (`#write` or `.CodeMirror`).

**Layout** (when text is selected):
```
┌──────────────────────────────────┐
│ ✦ AI optimize selection          │
│ ✦ AI optimize selection (ctx)    │
│ ─────────────────────────────── │
│ ✂ Cut                     ⌘X   │
│ ⧉ Copy                    ⌘C   │
│ 📋 Paste                  ⌘V   │
│ ─────────────────────────────── │
│ ⚙ AI model                 ▸   │
│   ├ ✓ gpt-5.4                  │
│   ├   gpt-5.4-mini             │
│   └   ...                      │
│ 🌐   AI web search             │
│ ─────────────────────────────── │
│ ⚙ AI edit settings…            │
└──────────────────────────────────┘
```

**No selection**: Hide AI optimize and cut/copy; keep paste and settings.

**Positioning**: Place by mouse coordinates; clamp when near window edges.

### 8. Pre-optimize Input Dialog

**Trigger**: Opens after “AI optimize selection” or “AI optimize selection (with full document context)”.

**Contents**:
- Text field: optional extra optimization instructions
- Web search checkbox: inherits global setting from context menu; can override for this run only
- “Start optimization” / ⌘+Enter
- “Cancel”

**Prompt assembly**:
```
final user prompt = "Extra requirements: <user input>\n\n" + configured user prompt template
system prompt = configured system prompt (unchanged)
```

If the user leaves extra instructions empty, only the template is used.

### 9. Prompt Settings Panel

**Contents**: Two groups (feature one / feature two), each with System Prompt and User Prompt text areas.

**Actions**:
- “Save”: write to `localStorage`
- “Restore defaults”: fill defaults from `DEFAULT_CONFIG` (still need Save to persist)
- “Cancel” / click overlay: close without saving

### 10. Paste Implementation

`document.execCommand("paste")` is blocked in Electron for security reasons.

**Fallback** (`doPaste()`):
```
1. try require("electron").clipboard.readText()     — direct require
2. try window.reqnode("electron").clipboard.readText() — Typora reqnode
3. fallback navigator.clipboard.readText()                — Web Clipboard API
4. insert via document.execCommand("insertText")
```

### 11. Styling and Dark Theme

All UI (menu, dialogs, toasts) is styled via injected `<style>`:
- Light: white background + frosted glass (`backdrop-filter: blur`)
- Dark: `@media(prefers-color-scheme: dark)` for dark surfaces
- Motion: menu scale-in, toast slide-in, dialog fade-in

## Known Issues

| Issue | Status | Notes |
|------|------|------|
| Token path resolution | ⚠️ To confirm | Which branch of `getHomePath()` actually runs in macOS Typora—verify in DevTools |
| Typora upgrade overwrite | Known | Re-run `install.sh` after Typora updates |
| Paste via Electron | ⚠️ To confirm | Whether `require("electron")` works in macOS Typora’s renderer |
| Token refresh | Not implemented | Only expiry check + prompt; no automatic refresh-token renewal |

## Install and Usage

### Install
```bash
# Quit Typora first
sudo bash /Users/shiyu/Projects/TyporaEdit/bin/install.sh
# Reopen Typora
```

### Update plugin file
```bash
sudo cp /Users/shiyu/Projects/TyporaEdit/src/typora-ai-edit.js \
  /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
# Restart Typora
```

### Uninstall
```bash
sudo bash /Users/shiyu/Projects/TyporaEdit/bin/uninstall.sh
```

### Debugging
In Typora, press `Option+Command+I` for DevTools; watch Console for lines prefixed with `[AI Edit]`.

## Roadmap

| Priority | Item |
|--------|--------|
| P0 | Fix token loading (confirm working file read path on macOS) |
| P1 | Automatic token refresh (using refresh token) |
| P2 | Preview before replace (diff, confirm, then replace) |
| P2 | Undo verification (confirm `execCommand("insertText")` integrates with ⌘Z) |
| P3 | Streamed output in UI (show result as it arrives instead of one-shot replace) |
