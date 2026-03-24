# Typora AI Edit Plugin — Requirements

## Project overview

Develop a lightweight plugin for the Typora Markdown editor on macOS that uses AI capabilities from a ChatGPT Plus subscription to help users polish and improve their documents.

## Technical background

### Typora

- Commercial, closed-source Markdown editor built on Electron
- Supports injecting custom JavaScript by editing HTML files in the resource bundle
- macOS injection path: `Contents/Resources/TypeMark/index.html`

### AI capabilities

- Uses the Codex Responses API with a ChatGPT Plus subscription account
- API endpoint: `https://chatgpt.com/backend-api/codex/responses`
- Authentication: OAuth via `oauth-cli-kit`, with tokens persisted in `~/Library/Application Support/oauth-cli-kit/auth/codex.json`
- Protocol: HTTP POST + SSE (Server-Sent Events) streaming responses

## Functional requirements

### Feature 1: AI polish for selected text

- **Trigger**: After selecting text, invoke from the context menu
- **Context menu item**: “AI polish selection”
- **Input**: Text selected by the user in Typora
- **Behavior**: Send the selection to the AI and ask it to polish or improve that passage
- **Output**: Replace the current selection with the AI’s improved text

### Feature 2: AI polish for selection with full-document context

- **Trigger**: After selecting text, invoke from the context menu
- **Context menu item**: “AI polish selection (with full document)”
- **Input**: The user’s selection plus the full text of the current document
- **Behavior**: Use the full document as context so the AI can refine the selection while keeping style and logic consistent with the whole document
- **Output**: Replace the current selection with the AI’s improved text

### Feature 3: Model selection

- **Trigger**: Via a submenu in the context menu
- **Context menu item**: “AI model” → submenu listing available models
- **Available models** (ChatGPT Plus subscription):
  - gpt-5.4
  - gpt-5.4-mini
  - gpt-5.2
  - gpt-5.1
  - gpt-5
  - gpt-5.3-codex
  - gpt-5.2-codex
  - gpt-5.1-codex
  - gpt-5-codex
- **Interaction**: Show a checkmark (✓) next to the active model; click to switch
- **Persistence**: Save the chosen model in the config file and restore it on the next Typora launch

### Feature 4: Web search toggle

- **Trigger**: Via the context menu
- **Context menu item**: “AI web search” (toggle; checked means on)
- **Behavior**: When on, the AI may use the internet for reference while polishing; when off, inference stays offline-only
- **Persistence**: Save the toggle state in the config file

### Feature 5: AI image description

- **Trigger**: Right-click on an image in the editor
- **Context menu item**: "AI Describe Image"
- **Input**: The image clicked by the user (local file, web URL, or embedded base64)
- **Behavior**: Extract image data and send it to the AI along with an image description prompt; user may enter additional instructions (e.g., "focus on the chart data", "extract visible text")
- **Output**: Display the AI's description in a result dialog with options to:
  - **Copy** the result to clipboard
  - **Insert Below Image** to place the description text after the image in the document
- **Image source handling**:
  - Web URLs (`https://…`) — passed directly to the API
  - Local files (absolute path or `file://`) — read via `fs.readFileSync()` and converted to base64
  - Data URIs (`data:image/…`) — used directly
  - Canvas fallback — extract pixel data from rendered `<img>` element

### Feature 6: Prompt settings

- **Trigger**: Via the context menu
- **Context menu item**: “AI edit settings…”
- **Behavior**: Open a floating settings panel to edit prompt configuration visually; read/write the underlying config file

## Prompt configuration

All settings live in a single config file under the user’s home directory so users can change them without touching code.

### Config file path

```
~/Library/Application Support/typora-ai-edit/config.json
```

Using the user data directory avoids the file being wiped when Typora updates.

### Config file format

```json
{
  "model": "gpt-5.4",
  "web_search": false,
  "models": [
    "gpt-5.4",
    "gpt-5.4-mini",
    "gpt-5.2",
    "gpt-5.1",
    "gpt-5",
    "gpt-5.3-codex",
    "gpt-5.2-codex",
    "gpt-5.1-codex",
    "gpt-5-codex"
  ],
  "prompts": {
    "optimize": {
      "system": "You are a professional Chinese editor skilled in polishing and refining text.",
      "user": "Please improve the following text. Preserve the original meaning and make the wording clearer and more professional. Return only the improved text with no explanation.\n\n{selection}"
    },
    "optimize_with_context": {
      "system": "You are a professional Chinese editor who polishes selected passages with full awareness of the surrounding document.",
      "user": "Here is the full document:\n\n<document>\n{document}\n</document>\n\nPlease improve only the selected part below so it matches the document’s style, logic, and terminology. Return only the improved text with no explanation.\n\n<selection>\n{selection}\n</selection>"
    },
    "describe_image": {
      "system": "You are a professional image analyst skilled at interpreting and describing visual content in detail.",
      "user": "Please analyze and describe the following image in detail. Provide a comprehensive interpretation including key elements, context, and any text visible in the image."
    }
  }
}
```

### Configuration fields

| Field | Type | Description |
|------|------|------|
| `model` | string | Name of the currently selected model |
| `web_search` | boolean | Whether web search is enabled |
| `models` | string[] | List of available models for the submenu |
| `prompts.optimize` | object | Prompts for Feature 1 (`system` + `user`) |
| `prompts.optimize_with_context` | object | Prompts for Feature 2 (`system` + `user`) |
| `prompts.describe_image` | object | Prompts for Feature 5 (`system` + `user`) |

### Prompt variables

| Variable | Meaning |
|------|------|
| `{selection}` | Text selected in Typora |
| `{document}` | Full content of the current document |

### Design notes

- **First-run defaults**: On startup, if the config file is missing, create it with defaults
- **Hot reload**: Reread the config on each action so changes apply immediately without restarting Typora
- **Extensibility**: Users may add prompt entries or change the model list as needed

## Non-functional requirements

- No inline autocomplete
- No chat panel
- No GitHub Copilot–related features

## Technical approach (summary)

### Architecture

A small standalone JS script loaded via Typora’s injection mechanism; no dependency on heavy components such as `@github/copilot-language-server`.

### Core modules

| Module | Role |
|------|------|
| Token loading | Read the OAuth token from local `oauth-cli-kit` storage |
| Editor integration | Use Typora’s global APIs to read selection and full document and replace the selection |
| API calls | Call the Codex Responses API and parse the SSE stream |
| Image handling | Read local/remote/embedded images and convert to base64 for API input |
| UI entry | Context menu (six items / submenus) |
| Settings panel | Floating dialog for editing prompt configuration |

### Core flow

```
User selects text or right-clicks image
    ↓
Trigger action (context menu)
    ↓
Read oauth-cli-kit token
    ↓
Build request (selection / selection + full document / image + prompt)
    ↓
POST to Codex Responses API (SSE stream)
    ↓
Receive result from the AI
    ↓
Replace selection / show image result dialog
```

## Reference projects

| Project | Purpose |
|------|------|
| `typora-copilot-main` | Reference for Typora injection and editor API usage |
| `ChatGPTPlus` | Reference for OAuth, Codex API calls, and SSE parsing |
