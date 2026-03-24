# Typora AI Edit

为 macOS 上的 [Typora](https://typora.io/) Markdown 编辑器开发的轻量级 AI 编辑插件，支持 ChatGPT Plus OAuth 和任意 OpenAI 兼容 API，实现选中文字的智能优化。

## 功能

- **多 Provider 支持** — 在设置面板中选择 ChatGPT OAuth 登录或 OpenAI 兼容登录（自定义 API 地址、Key、模型）
- **自动模型测试** — 保存配置后自动测试每个模型的可用性、联网搜索支持和图片解析能力
- **AI 优化选中文字** — 选中文字后右键，一键润色优化
- **AI 优化（参考全文）** — 结合全文语境，对选中部分进行风格一致的优化
- **AI 图片解读** — 右键点击图片，AI 自动分析并生成详细描述（不支持视觉的模型自动隐藏此功能）
- **图片缩放** — 右键图片可选择显示大小（100% / 75% / 50% / 33% / 25% / 10%）
- **AI 问答** — 在文档中直接向 AI 提问，弹出输入框输入问题，可选联网搜索和包含全文上下文，回答以 Markdown 引用格式插入
- **可配置快捷键** — 在设置面板中自定义 AI 问答快捷键（默认：`⌘E`）
- **自定义指示** — 每次 AI 操作前可输入额外要求（如"缩短到100字"、"关注图中数据"等）
- **自动语言检测** — 根据系统语言自动切换中文或英文界面
- **模型切换** — 右键子菜单切换模型，不可用的模型显示 ✗ 标记
- **联网搜索** — 可选开启，让 AI 参考互联网信息（不支持的模型自动灰化）
- **停止生成** — AI 处理过程中可随时点击停止
- **提示词自定义** — 通过设置面板可视化编辑 System / User Prompt
- **剪切 / 复制 / 粘贴** — 保留常规编辑功能
- **暗色主题适配** — 所有 UI 自动跟随系统暗色模式

## 前置条件

- macOS + [Typora](https://typora.io/)（基于 Electron）
- **方案 A: ChatGPT Plus** — 通过 [oauth-cli-kit](https://pypi.org/project/oauth-cli-kit/) 完成 OAuth 登录
- **方案 B: OpenAI 兼容 API** — 任意兼容 API 端点 + API Key（如 OpenAI、Azure、本地 LLM 等）

```bash
# ChatGPT Plus 用户：
pip install oauth-cli-kit
# 按照 oauth-cli-kit 文档完成 ChatGPT OAuth 登录
```

## 安装

```bash
# 关闭 Typora
sudo bash bin/install.sh
# 重新打开 Typora
```

安装脚本会：
1. 将插件文件复制到 Typora 资源目录
2. 在 Typora 的 `index.html` 中注入 `<script>` 标签

## 使用方法

1. 在 Typora 中**选中文字**
2. **右键**弹出 AI 编辑菜单
3. 点击「AI Optimize Selection」或「AI Optimize (With Context)」
4. 在弹窗中输入额外指示（可留空），点击「Start」
5. AI 返回优化结果后自动替换选区

### 图片解读

1. 在 Typora 中**右键点击图片**
2. 点击菜单中的「AI Describe Image」
3. 输入额外指示（如"提取图中文字"），点击「Start」
4. 在结果弹窗中查看 AI 描述 — 可**复制**或**插入到图片下方**

支持网络图片、本地文件和嵌入式 base64 图片。

### AI 问答

1. 光标在空白位置（不选中文字），按 **`⌘E`** 或右键点击「AI 问答」
2. 弹出输入框，输入问题，可勾选 **联网搜索** 和/或 **包含全文上下文**
3. 点击「开始」（或 `⌘Enter`）
4. AI 回答以 Markdown 引用格式（`> ...`）插入到光标下方
5. 快捷键可在 **AI 编辑设置** 中自定义

### 右键菜单

```
┌──────────────────────────────────┐
│ 🖼 AI Describe Image             │  ← 右键图片时显示
│ ─────────────────────────────── │
│ ✦ AI Optimize Selection          │  ← 选中文字时显示
│ ✦ AI Optimize (With Context)     │
│ ─────────────────────────────── │
│ 💬 AI Q&A                   ⌘E  │  ← 无选区时显示
│ ─────────────────────────────── │
│ ✂ Cut                      ⌘X   │
│ ⧉ Copy                     ⌘C   │
│ 📋 Paste                   ⌘V   │
│ ─────────────────────────────── │
│ ⚙ AI Model                  ▸   │
│ 🌐   AI Web Search              │
│ ─────────────────────────────── │
│ ⚙ AI Edit Settings…             │
└──────────────────────────────────┘
```

## 更新插件

修改 `src/typora-ai-edit.js` 后：

```bash
sudo cp src/typora-ai-edit.js /Applications/Typora.app/Contents/Resources/TypeMark/ai-edit/typora-ai-edit.js
# 重启 Typora
```

## 卸载

```bash
sudo bash bin/uninstall.sh
```

## 项目结构

```
├── src/
│   └── typora-ai-edit.js    # 插件主脚本（单文件 IIFE，无需构建）
├── bin/
│   ├── install.sh           # 安装脚本
│   └── uninstall.sh         # 卸载脚本
└── doc/
    ├── requirements.md      # 需求文档
    └── development.md       # 开发进展与技术实现文档
```

## 技术要点

| 模块 | 实现方式 |
|------|---------|
| 脚本注入 | 修改 Typora `index.html`，追加 `<script>` 标签 |
| AI 接口 | ChatGPT Codex Responses API 或 OpenAI 兼容 `/v1/chat/completions`（SSE 流式） |
| 认证 | 读取 `oauth-cli-kit` 本地 Token 文件 |
| 编辑器交互 | `window.getSelection()` + `document.execCommand("insertText")` |
| 全文获取 | `window.File.editor.getMarkdown()`（Typora 内部 API） |
| 文件读取 | `window.bridge.callSync("path.readText")` (macOS) |
| 配置存储 | `localStorage` |
| 图片处理 | 本地文件 → base64，网络 URL → 直传，canvas 兜底 |
| 右键菜单 | 拦截 `contextmenu` 事件，自定义 HTML 浮层 |

## 更新日志

### v0.5.0 (2026-03-24)

- **新增：多 Provider 支持** — 在设置面板中选择 ChatGPT OAuth 或 OpenAI 兼容 API
  - OpenAI 兼容：输入 API 地址、API Key 和模型名（逗号分隔）
  - 「保存并测试」按钮自动验证每个模型的可用性、联网搜索（tools）和图片解析（vision）能力
  - ChatGPT OAuth 显示连接状态；OpenAI 兼容显示模型测试结果
- **新增：能力感知 UI** — 界面根据模型能力自动调整
  - 不支持视觉的模型：图片解读菜单自动隐藏
  - 不支持联网的模型：联网搜索开关/复选框自动灰化
  - 不可用的模型在子菜单中显示 ✗ 标记

### v0.4.0 (2026-03-24)

- **新增：AI 问答** — 按 `⌘E`（或右键 → AI 问答）弹出问题输入框，AI 回答以 Markdown 引用格式插入
  - 弹窗内可选 **联网搜索** 和 **包含全文上下文**
  - 仅在无选区时可用（选中文字走原有的 AI 优化流程）
- **新增：可配置快捷键** — 在 AI 编辑设置面板中自定义问答快捷键，点击输入框后按下组合键即可录入
- **新增：问答提示词自定义** — 问答的 System / User Prompt 均可在设置面板中编辑（含全文上下文版本）

### v0.3.2 (2026-03-24)

- **新增：图片压缩** — 发送前自动缩放图片（长边不超过 2048px）并转为 JPEG（质量 80%），大幅减少上传体积
- **优化：图片智能提示词** — 输入了自定义指示时，仅使用你的指示作为提示词（不再叠加默认的"图片描述"提示词）；留空时使用默认提示词

### v0.3.1 (2026-03-24)

- **新增：图片缩放子菜单** — 右键图片可选择 100% / 75% / 50% / 33% / 25% / 10%，当前缩放级别显示 ✓ 标记
- **修复：网络图片下载** — 网络图片现在先在本地下载转 base64（canvas 或 Node.js https），修复签名/防盗链 URL 导致 API 报错的问题

### v0.3.0 (2026-03-24)

- **新增：自动语言检测** — 通过 `navigator.language` 自动检测系统语言，中文系统显示中文界面（菜单、弹窗、提示、默认提示词），非中文系统显示英文
- 默认提示词也随语言切换（中文系统使用中文提示词，其他使用英文）

### v0.2.0 (2026-03-24)

- **新增：AI 图片解读** — 右键点击图片（本地文件、网络 URL 或嵌入式），AI 自动分析生成描述
  - 分析前可输入额外指示的弹窗
  - 结果弹窗支持复制和插入到图片下方
  - 自动检测图片来源并转换本地文件为 base64
- **新增：图片提示词设置** — 设置面板中可自定义图片解读的 System / User Prompt

### v0.1.0 (2026-03-24)

- 首次发布
- AI 优化选中文字（仅选区 / 参考全文）
- 优化前指示弹窗，含联网搜索开关
- 右键子菜单切换模型（GPT-5.4 / GPT-5.4-mini 等）
- 联网搜索开关
- AI 处理过程中可停止生成
- 提示词自定义设置面板
- 右键菜单保留剪切 / 复制 / 粘贴
- 暗色模式适配
- macOS 安装 / 卸载脚本

## 注意事项

- Typora 升级后可能需要重新执行 `install.sh`
- Token 过期后需通过 `oauth-cli-kit` 重新登录
- 按 `Option+Command+I` 可打开 Typora 开发者工具查看 `[AI Edit]` 日志

## License

MIT
