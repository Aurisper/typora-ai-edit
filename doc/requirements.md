# Typora AI 编辑插件 — 需求文档

## 项目概述

为 macOS 上的 Typora Markdown 编辑器开发一个轻量级插件，通过 ChatGPT Plus 订阅的 AI 能力，为用户提供文档编辑优化功能。

## 技术背景

### Typora

- 商业闭源 Markdown 编辑器，基于 Electron 构建
- 支持通过修改资源目录中的 HTML 文件注入自定义 JavaScript 脚本
- macOS 注入路径：`Contents/Resources/TypeMark/index.html`

### AI 能力来源

- 使用 ChatGPT Plus 订阅账号的 Codex Responses API
- API 端点：`https://chatgpt.com/backend-api/codex/responses`
- 认证方式：`oauth-cli-kit` 进行 OAuth 登录，Token 持久化于 `~/Library/Application Support/oauth-cli-kit/auth/codex.json`
- 协议：HTTP POST + SSE（Server-Sent Events）流式响应

## 功能需求

### 功能一：选中文字 AI 优化

- **触发方式**：选中文字后，通过右键菜单触发
- **右键菜单项**：「AI 优化选中文字」
- **输入**：用户在 Typora 中选中的文字
- **处理逻辑**：将选中文字发送给 AI，要求对该段文字进行润色/优化
- **输出**：AI 返回优化后的文字，替换当前选区内容

### 功能二：全文参考的选中文字 AI 优化

- **触发方式**：选中文字后，通过右键菜单触发
- **右键菜单项**：「AI 优化选中文字（参考全文）」
- **输入**：用户在 Typora 中选中的文字 + 当前文档全文
- **处理逻辑**：将全文作为上下文参考，AI 针对选中部分进行优化，确保优化结果与全文风格、逻辑一致
- **输出**：AI 返回优化后的文字，替换当前选区内容

### 功能三：模型选择

- **触发方式**：通过右键菜单的子菜单触发
- **右键菜单项**：「AI 模型」→ 展开子菜单显示可用模型列表
- **可用模型**（基于 ChatGPT Plus 订阅）：
  - gpt-5.4
  - gpt-5.4-mini
  - gpt-5.2
  - gpt-5.1
  - gpt-5
  - gpt-5.3-codex
  - gpt-5.2-codex
  - gpt-5.1-codex
  - gpt-5-codex
- **交互**：当前选中的模型前显示勾选标记（✓），点击切换模型
- **持久化**：选择的模型保存到配置文件，下次启动 Typora 自动恢复

### 功能四：联网搜索开关

- **触发方式**：通过右键菜单触发
- **右键菜单项**：「AI 联网搜索」（可切换，勾选表示开启）
- **功能**：开启后 AI 在优化文字时可访问互联网获取参考信息，关闭则纯离线推理
- **持久化**：开关状态保存到配置文件

### 功能五：提示词设置

- **触发方式**：通过右键菜单触发
- **右键菜单项**：「AI 编辑设置...」
- **功能**：弹出浮动设置面板，可视化编辑提示词配置，底层读写配置文件

## 提示词配置

所有配置统一存放在用户目录下的配置文件中，用户可随时修改而无需改动代码。

### 配置文件路径

```
~/Library/Application Support/typora-ai-edit/config.json
```

选择用户目录而非 Typora 安装目录，避免 Typora 升级时被覆盖。

### 配置文件格式

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
      "system": "你是一位专业的中文编辑，擅长文字润色与优化。",
      "user": "请优化以下文字，保持原意不变，提升表达的流畅性和专业性。只返回优化后的文字，不要添加任何解释。\n\n{selection}"
    },
    "optimize_with_context": {
      "system": "你是一位专业的中文编辑，擅长在理解全文语境的基础上对局部文字进行润色与优化。",
      "user": "以下是完整文档：\n\n<document>\n{document}\n</document>\n\n请优化其中以下选中的部分，确保优化结果与全文的风格、逻辑、术语保持一致。只返回优化后的文字，不要添加任何解释。\n\n<selection>\n{selection}\n</selection>"
    }
  }
}
```

### 配置项说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `model` | string | 当前选中的模型名称 |
| `web_search` | boolean | 是否启用联网搜索能力 |
| `models` | string[] | 可用模型列表，用于右键子菜单渲染 |
| `prompts.optimize` | object | 功能一的提示词（system + user） |
| `prompts.optimize_with_context` | object | 功能二的提示词（system + user） |

### 提示词变量

| 变量 | 含义 |
|------|------|
| `{selection}` | 用户在 Typora 中选中的文字 |
| `{document}` | 当前文档的全文内容 |

### 设计要点

- **首次运行自动生成**：插件启动时检测配置文件是否存在，不存在则创建默认版本
- **热加载**：每次触发操作时重新读取配置文件，修改后立即生效，无需重启 Typora
- **自定义扩展**：用户可自行添加新的提示词条目或修改模型列表

## 非功能需求

- 不需要行内自动补全
- 不需要 Chat 聊天面板
- 不需要 GitHub Copilot 相关功能

## 技术方案概要

### 架构

轻量级独立 JS 脚本，通过 Typora 的脚本注入机制加载，无需依赖 `@github/copilot-language-server` 等重型组件。

### 核心模块

| 模块 | 说明 |
|------|------|
| Token 读取 | 从本地 `oauth-cli-kit` 存储中读取 OAuth Token |
| 编辑器交互 | 利用 Typora 暴露的全局对象获取选中文字、全文内容，替换选区 |
| API 调用 | 向 Codex Responses API 发送请求，解析 SSE 流式响应 |
| UI 入口 | 右键菜单注入（五个菜单项/子菜单） |
| 设置面板 | 浮动弹窗，可视化编辑提示词配置 |

### 核心流程

```
用户选中文字
    ↓
触发操作（右键菜单 / 快捷键）
    ↓
读取 oauth-cli-kit Token
    ↓
构造请求（选中文字 / 选中文字 + 全文）
    ↓
POST Codex Responses API（SSE 流式）
    ↓
接收 AI 返回的优化文字
    ↓
替换 Typora 中的选区内容
```

## 参考项目

| 项目 | 用途 |
|------|------|
| `typora-copilot-main` | 参考 Typora 脚本注入方式、编辑器 API 调用方式 |
| `ChatGPTPlus` | 参考 OAuth 认证流程、Codex API 调用方式、SSE 解析 |
