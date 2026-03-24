# Typora AI Edit — 开发进展与技术实现文档

## 项目状态

**当前版本**：v0.1.0（开发调试阶段）
**更新日期**：2026-03-24

## 项目结构

```
TyporaEdit/
├── src/
│   └── typora-ai-edit.js        ← 插件主脚本（~850 行，单文件 IIFE）
├── bin/
│   ├── install.sh               ← macOS 安装脚本
│   └── uninstall.sh             ← macOS 卸载脚本
├── doc/
│   ├── requirements.md          ← 需求文档
│   └── development.md           ← 本文档（开发进展与技术实现）
├── typora-copilot-main/         ← 参考项目：Typora Copilot（GitHub Copilot 插件）
└── ChatGPTPlus/                 ← 参考项目位于 /Users/shiyu/Projects/ChatGPTPlus
```

## 功能完成度

| 功能 | 状态 | 说明 |
|------|------|------|
| 右键菜单注入 | ✅ 已完成 | 编辑区域右键弹出自定义菜单 |
| AI 优化选中文字 | ✅ 已完成 | 选中文字 → 弹出输入框 → 调用 API → 替换选区 |
| AI 优化（参考全文） | ✅ 已完成 | 同上，额外传入全文作为上下文 |
| 优化前输入弹窗 | ✅ 已完成 | 支持输入额外优化指示 + 联网搜索勾选 |
| 模型选择 | ✅ 已完成 | 右键子菜单切换，勾选标记当前模型 |
| 联网搜索开关 | ✅ 已完成 | 右键菜单 + 优化弹窗两处均可控制 |
| 提示词设置面板 | ✅ 已完成 | 弹窗编辑 system/user prompt，支持恢复默认 |
| 剪切 / 复制 | ✅ 已完成 | `document.execCommand("cut"/"copy")` |
| 粘贴 | ✅ 已完成 | Electron `clipboard.readText()` + `insertText` |
| 暗色主题适配 | ✅ 已完成 | 所有 UI 组件支持 `prefers-color-scheme: dark` |
| Token 读取 | ⚠️ 待验证 | 多路径回退策略，需确认 macOS Typora 实际可用方式 |
| 安装脚本 | ✅ 已完成 | `sudo bash bin/install.sh` 一键安装 |
| 卸载脚本 | ✅ 已完成 | `sudo bash bin/uninstall.sh` 一键卸载 |

## 技术实现详解

### 1. 脚本注入机制

**原理**：Typora 基于 Electron，其 WYSIWYG 编辑器由 `index.html` 加载的 JS 驱动。通过在该 HTML 中追加 `<script>` 标签，可以在 Typora 渲染进程中执行自定义代码。

**安装位置**：
```
/Applications/Typora.app/Contents/Resources/TypeMark/index.html
```

**注入方式**（`bin/install.sh`）：
在 Typora 自身的 `main.js` 加载标签之后，用 `perl` 插入一行：
```html
<script src="./appsrc/main.js" aria-hidden="true" defer></script>
<script src="./ai-edit/typora-ai-edit.js" defer></script>   ← 插入此行
```

**插件文件部署**：
```
/Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
```

**注意事项**：
- Typora 升级可能覆盖 `index.html`，需重新执行 `install.sh`
- 修改应用目录需要 `sudo` 权限
- macOS 的 `com.apple.provenance` 扩展属性可能阻止写入

### 2. 配置管理

**存储方式**：`localStorage`（浏览器内置存储，Electron 渲染进程可用）

**选择 localStorage 而非文件的原因**：
- macOS 上 Typora 的 `window.bridge` API 仅提供 `readText`，未发现可靠的文件写入方法
- `localStorage` 读写无需权限，且在 Electron 中跨会话持久化
- 避免引入文件 I/O 复杂度

**存储 Key**：`typora-ai-edit-config`

**数据结构**：
```javascript
{
  model: "gpt-5.4",           // 当前选中模型
  web_search: false,           // 联网搜索默认状态
  models: ["gpt-5.4", ...],   // 可用模型列表
  prompts: {
    optimize: { system, user },
    optimize_with_context: { system, user }
  }
}
```

**加载策略**：`loadConfig()` 每次从 `localStorage` 读取并与 `DEFAULT_CONFIG` 合并，确保新增字段有默认值。

### 3. OAuth Token 读取

**Token 文件路径**：
```
~/Library/Application Support/oauth-cli-kit/auth/codex.json
```

**Token 结构**：
```json
{
  "access": "eyJhbGci...",       // Bearer Token（JWT）
  "refresh": "rt_5gN-...",       // Refresh Token
  "expires": 1775115058422,      // 过期时间（毫秒时间戳）
  "account_id": "234b6e3e-..."   // ChatGPT 账号 ID
}
```

**主目录检测**（`getHomePath()`，多路径回退）：
```
1. process.env.HOME                           — Node.js 环境变量
2. window._options.appDataPath → 正则提取     — Typora 内部配置
3. window._options.userPath / homePath        — Typora 备选属性
4. bridge.callSync("controller.runCommandSync", "whoami") — macOS bridge
5. window.dirname / __dirname → 正则提取     — 脚本目录路径
```

**文件读取**（`readFileContent()`，三种方式）：
```
1. window.bridge.callSync("path.readText", path)  — macOS Typora
2. window.reqnode("fs").readFileSync(path)         — Windows/Linux Typora
3. require("fs").readFileSync(path)                — 通用 Node.js
```

**过期检查**：`Date.now() > token.expires` 时提示用户重新登录。

### 4. Codex Responses API 调用

**端点**：`POST https://chatgpt.com/backend-api/codex/responses`

**请求头**：
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

**请求体**：
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

**联网搜索**（`web_search = true` 时追加）：
```javascript
{
  tools: [{ type: "web_search" }],
  tool_choice: "auto"
}
```

### 5. SSE 流式响应解析

**协议**：Server-Sent Events，事件以 `\n\n` 分隔，每行以 `data:` 开头。

**解析流程**（`parseSSE()`）：
```
1. response.body.getReader() 获取 ReadableStream reader
2. 循环 reader.read() 读取 chunks
3. TextDecoder 解码，按 "\n\n" 拆分事件
4. 每个事件提取 "data:" 行，拼接为 JSON
5. 跳过空数据和 "[DONE]" 标记
6. 解析 JSON，按 type 分发：
   - "response.output_text.delta" → 累加 delta 字段到结果
   - "error" / "response.failed" → 抛出错误
```

**缓冲处理**：未完整的事件保留在 `buf` 中，等待下一个 chunk 补全。

### 6. 编辑器交互

**获取选中文字**：
```javascript
window.getSelection().toString()
```

**获取全文**：
```javascript
window.File.editor.getMarkdown()
// window.File 是 Typora 对标准 File 对象的覆盖，实际为 Typora.Files 类型
```

**保存选区**：
```javascript
// 在右键时保存，因为后续菜单点击会改变焦点和选区
savedSelection = {
  range: window.getSelection().getRangeAt(0).cloneRange(),
  text: window.getSelection().toString()
};
```

**恢复选区并替换**：
```javascript
window.getSelection().removeAllRanges();
window.getSelection().addRange(savedSelection.range);
document.execCommand("insertText", false, newText);
```

`insertText` 命令会替换当前选区内容，并与 Typora 的 undo/redo 栈集成。

### 7. 右键菜单

**拦截方式**：在 `contextmenu` 事件的捕获阶段（`capture: true`）拦截，对编辑区域（`#write` 或 `.CodeMirror`）生效。

**菜单结构**（选中文字时）：
```
┌──────────────────────────────────┐
│ ✦ AI 优化选中文字                │
│ ✦ AI 优化选中文字（参考全文）     │
│ ─────────────────────────────── │
│ ✂ 剪切                    ⌘X   │
│ ⧉ 复制                    ⌘C   │
│ 📋 粘贴                   ⌘V   │
│ ─────────────────────────────── │
│ ⚙ AI 模型                  ▸   │
│   ├ ✓ gpt-5.4                  │
│   ├   gpt-5.4-mini             │
│   └   ...                      │
│ 🌐   AI 联网搜索               │
│ ─────────────────────────────── │
│ ⚙ AI 编辑设置…                  │
└──────────────────────────────────┘
```

**未选中文字时**：隐藏 AI 优化和剪切/复制项，保留粘贴和设置项。

**定位逻辑**：根据鼠标坐标定位，超出窗口边界时自动调整。

### 8. 优化前输入弹窗

**触发**：点击「AI 优化选中文字」或「AI 优化选中文字（参考全文）」后弹出。

**弹窗内容**：
- 文本框：输入额外优化指示（可留空）
- 联网搜索勾选框：继承右键菜单全局设置，可针对本次单独修改
- 「开始优化」按钮 / ⌘+Enter 快捷键
- 「取消」按钮

**提示词拼接逻辑**：
```
最终 user prompt = "额外要求: <用户输入>\n\n" + 配置中的 user prompt 模板
system prompt = 配置中的 system prompt（不变）
```

如果用户未输入额外指示，则直接使用配置模板。

### 9. 提示词设置面板

**内容**：分两组（功能一 / 功能二），每组包含 System Prompt 和 User Prompt 文本域。

**操作**：
- 「保存」：写入 `localStorage`
- 「恢复默认」：填充 `DEFAULT_CONFIG` 中的默认提示词（需点保存确认）
- 「取消」/ 点击遮罩层：关闭不保存

### 10. 粘贴实现

`document.execCommand("paste")` 在 Electron 中因安全策略被阻止。

**替代方案**（`doPaste()`）：
```
1. 尝试 require("electron").clipboard.readText()     — 直接 require
2. 尝试 window.reqnode("electron").clipboard.readText() — Typora reqnode
3. 回退 navigator.clipboard.readText()                — Web Clipboard API
4. 获取文本后通过 document.execCommand("insertText") 插入
```

### 11. 样式与暗色主题

所有 UI 组件（菜单、弹窗、Toast）通过动态注入 `<style>` 标签实现，支持：
- 亮色主题：白底 + 毛玻璃效果（`backdrop-filter: blur`）
- 暗色主题：`@media(prefers-color-scheme: dark)` 自动切换深色背景
- 动画：菜单弹出 `scale` 动画、Toast 滑入动画、弹窗渐入动画

## 已知问题

| 问题 | 状态 | 说明 |
|------|------|------|
| Token 路径检测 | ⚠️ 待确认 | macOS Typora 中 `getHomePath()` 的实际命中路径需通过开发者工具确认 |
| Typora 升级覆盖 | 已知 | Typora 升级后需重新执行 `install.sh` |
| 粘贴 Electron 方式 | ⚠️ 待确认 | `require("electron")` 在 macOS Typora 渲染进程中能否正常工作 |
| Token 过期刷新 | 未实现 | 当前仅检测过期并提示，未自动使用 refresh token 续期 |

## 安装与使用

### 安装
```bash
# 先关闭 Typora
sudo bash /Users/shiyu/Projects/TyporaEdit/bin/install.sh
# 重新打开 Typora
```

### 更新插件代码
```bash
sudo cp /Users/shiyu/Projects/TyporaEdit/src/typora-ai-edit.js \
  /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
# 重启 Typora
```

### 卸载
```bash
sudo bash /Users/shiyu/Projects/TyporaEdit/bin/uninstall.sh
```

### 调试
在 Typora 中按 `Option+Command+I` 打开开发者工具，查看 Console 中 `[AI Edit]` 开头的日志。

## 迭代计划

| 优先级 | 计划项 |
|--------|--------|
| P0 | 修复 Token 读取问题（确认 macOS 下实际可用的文件读取方式） |
| P1 | Token 过期自动刷新（使用 refresh token） |
| P2 | 优化结果预览（替换前显示 diff 对比，确认后再替换） |
| P2 | 撤销支持确认（验证 `execCommand("insertText")` 是否集成 ⌘Z） |
| P3 | 流式输出展示（优化结果实时显示，而非等待完成后一次替换） |
