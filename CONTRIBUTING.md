# Contributing to Typora AI Edit

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- macOS with [Typora](https://typora.io/) installed
- Basic knowledge of JavaScript (ES6+)
- A text editor or IDE
- Git

### Setting Up the Development Environment

1. **Fork and clone the repository**

```bash
git clone https://github.com/<your-username>/typora-ai-edit.git
cd typora-ai-edit
```

2. **Install the plugin in development mode**

```bash
sudo bash bin/install.sh
```

3. **Open Typora DevTools** — Press `Option+Command+I` to view `[AI Edit]` console logs

### Project Structure

The plugin is split into 13 modules under `src/modules/`, numbered for load order:

| Module | Purpose |
|--------|---------|
| `01-i18n.js` | Language detection & localized strings |
| `02-config.js` | Constants, defaults, load/save |
| `03-platform.js` | File I/O, token, image helpers |
| `04-api.js` | API calls, SSE parsing, abort |
| `05-model-test.js` | OpenAI model testing |
| `06-editor.js` | Selection, code blocks, replacement |
| `07-ui-core.js` | Toast, clipboard, shortcuts |
| `08-ui-menu.js` | Context menu |
| `09-ui-dialogs.js` | Optimize & image dialogs |
| `10-ui-qa.js` | AI Q&A dialog |
| `11-ui-settings.js` | Settings panel |
| `12-styles.js` | CSS injection |
| `13-main.js` | Initialization & event binding |

### Build & Deploy

```bash
# Build the single-file plugin from modules
bash build.sh

# Deploy to Typora
sudo cp src/typora-ai-edit.js \
  /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js

# Restart Typora to see changes
```

## How to Contribute

### Reporting Bugs

- Use the [Bug Report](https://github.com/Aurisper/typora-ai-edit/issues/new?template=bug_report.md) template
- Include your macOS, Typora, and plugin versions
- Paste relevant `[AI Edit]` console logs

### Suggesting Features

- Use the [Feature Request](https://github.com/Aurisper/typora-ai-edit/issues/new?template=feature_request.md) template
- Describe the problem and your proposed solution

### Submitting Pull Requests

1. **Create a feature branch** from `main`:

```bash
git checkout -b feature/your-feature-name
```

2. **Edit module files** in `src/modules/` — do **not** edit `src/typora-ai-edit.js` directly (it's auto-generated)

3. **Build and test**:

```bash
bash build.sh
sudo cp src/typora-ai-edit.js \
  /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
```

4. **Test your changes** in Typora:
   - AI Optimize (with and without context)
   - AI Q&A (`⌘E`)
   - AI Image Description
   - Code block editing
   - Light mode and dark mode
   - Both ChatGPT OAuth and OpenAI-compatible providers (if possible)

5. **Commit and push**:

```bash
git add .
git commit -m "feat: description of your change"
git push origin feature/your-feature-name
```

6. **Open a Pull Request** against `main`

### Commit Message Convention

We follow a simplified [Conventional Commits](https://www.conventionalcommits.org/) format:

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code refactoring (no behavior change) |
| `style:` | CSS / UI changes |
| `chore:` | Build, tooling, or config changes |

Example: `feat: add support for Ollama local models`

## Code Style

- **No frameworks** — vanilla JavaScript only (Typora's Electron environment)
- **ES6+** syntax — `const`/`let`, arrow functions, template literals, `async`/`await`
- **Module boundaries** — keep each module under ~300 lines; add a new module if needed
- **i18n** — all user-facing strings go through the `L` object in `01-i18n.js`
- **Dark mode** — all UI components must support dark mode (check Typora's body classes)
- Avoid obvious comments — code should be self-explanatory

## Need Help?

- Open a [Discussion](https://github.com/Aurisper/typora-ai-edit/issues) if you have questions
- Check the [README](README.md) for usage documentation
- Review `doc/development.md` for technical implementation details

Thank you for contributing!
