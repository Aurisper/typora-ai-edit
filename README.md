# Typora AI Edit

为 macOS 上的 [Typora](https://typora.io/) Markdown 编辑器开发的轻量级 AI 编辑插件，通过 ChatGPT Plus 订阅的 AI 能力，实现选中文字的智能优化。

## 功能

- **AI 优化选中文字** — 选中文字后右键，一键润色优化
- **AI 优化（参考全文）** — 结合全文语境，对选中部分进行风格一致的优化
- **自定义优化指示** — 每次优化前可输入额外要求（如"缩短到100字"、"改为英文"等）
- **模型切换** — 右键子菜单切换 GPT-5.4 / GPT-5.4-mini 等多种模型
- **联网搜索** — 可选开启，让 AI 参考互联网信息进行优化
- **停止生成** — 优化过程中可随时点击停止
- **提示词自定义** — 通过设置面板可视化编辑 System / User Prompt
- **剪切 / 复制 / 粘贴** — 保留常规编辑功能
- **暗色主题适配** — 所有 UI 自动跟随系统暗色模式

## 前置条件

- macOS + [Typora](https://typora.io/)（基于 Electron）
- ChatGPT Plus 订阅账号
- 通过 [oauth-cli-kit](https://pypi.org/project/oauth-cli-kit/) 完成 OAuth 登录（Token 持久化于本地）

```bash
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
3. 点击「AI 优化选中文字」或「AI 优化选中文字（参考全文）」
4. 在弹窗中输入额外优化指示（可留空），点击「开始优化」
5. AI 返回优化结果后自动替换选区

### 右键菜单

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
│ 🌐   AI 联网搜索               │
│ ─────────────────────────────── │
│ ⚙ AI 编辑设置…                  │
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
| AI 接口 | ChatGPT Codex Responses API（SSE 流式） |
| 认证 | 读取 `oauth-cli-kit` 本地 Token 文件 |
| 编辑器交互 | `window.getSelection()` + `document.execCommand("insertText")` |
| 全文获取 | `window.File.editor.getMarkdown()`（Typora 内部 API） |
| 文件读取 | `window.bridge.callSync("path.readText")` (macOS) |
| 配置存储 | `localStorage` |
| 右键菜单 | 拦截 `contextmenu` 事件，自定义 HTML 浮层 |

## 注意事项

- Typora 升级后可能需要重新执行 `install.sh`
- Token 过期后需通过 `oauth-cli-kit` 重新登录
- 按 `Option+Command+I` 可打开 Typora 开发者工具查看 `[AI Edit]` 日志

## License

MIT
