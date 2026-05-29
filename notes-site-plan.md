# Markdown notes Site 第一版方案

## 结论

新建独立项目 `notes-site`，做成一个 GitHub Pages 自动部署的 Markdown 知识库静态站点。

第一版只做内容展示、文章切换、目录跳转、全文搜索和 GitHub 自动部署。不做编辑、登录、评论、数据库、后台管理和 AI 问答。Markdown 文件是唯一数据源。

## 技术方案

使用 `Astro + TypeScript`。

核心依赖：

- `astro`：静态站点生成
- `shiki`：代码高亮
- `minisearch`：前端全文搜索

第一版不引入 React，搜索、移动端抽屉和 Outline 高亮使用 Astro + vanilla TypeScript 实现。

Astro 默认启用 GFM，第一版不额外配置 Markdown remark 插件。

构建结果输出到 `dist/`，由 GitHub Actions 发布到 GitHub Pages。

## 项目结构

```text
notes-site/
├── CLAUDE.md
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── components/
│   │   ├── ArticleList.astro
│   │   ├── ArticleOutline.astro
│   │   ├── SearchPanel.astro
│   │   └── TopBar.astro
│   ├── content/
│   │   └── notes/
│   │       ├── TTS.md
│   │       └── 自建中文到英文实时同传方案.md
│   ├── content.config.ts
│   ├── layouts/
│   │   └── NoteLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── search-index.json.ts
│   │   └── notes/
│   │       └── [...slug].astro
│   ├── lib/
│   │   ├── notes.ts
│   │   ├── search.ts
│   │   ├── search-tags.ts
│   │   ├── search-tokenize.ts
│   │   └── slug.ts
│   └── styles/
│       └── global.css
├── public/
│   └── CNAME
├── astro.config.mjs
├── package-lock.json
├── package.json
├── tests/
│   ├── notes.test.ts
│   ├── search-tags.test.ts
│   └── search-tokenize.test.ts
└── tsconfig.json
```

## 内容规范

Markdown 文件统一放在：

```text
src/content/notes/
```

每篇文章建议使用 frontmatter：

```md
---
title: Live Translation - 本地同声传译管道
slug: live-translation-local-pipeline
description: MacBook Pro 上的全本地同声传译系统
tags: [tts, ai, translation]
created: 2026-05-29
updated: 2026-05-29
---
```

`tags` 必须使用 inline array 格式：

```yaml
tags: [tts, ai, translation]
```

不使用 YAML block list 格式：

```yaml
tags:
  - tts
  - ai
  - translation
```

兼容旧 Markdown：

- 有 `title` 时使用 `title`
- 没有 `title` 时使用第一个一级标题
- 没有一级标题时使用文件名

URL slug 规则：

- 有 frontmatter `slug` 时使用 `slug`
- 没有 `slug` 时使用 Markdown 文件相对路径生成 slug
- `slug` 必须唯一，冲突时 build 失败
- 新增文章推荐显式填写稳定英文 `slug`

文章排序规则：

1. `updated` 降序
2. `created` 降序
3. `title` 升序
4. 文件路径升序

`src/content.config.ts` 使用 `defineCollection`、`glob({ pattern: "**/*.md", base: "./src/content/notes" })` 和 Zod schema 定义 `notes` collection。

## 页面设计

页面参考 Typora 阅读界面。

桌面端布局：

- 左侧栏宽度约 `260px`
- 右侧为正文阅读区
- 正文阅读区取消最大宽度，宽度占满右侧可用空间
- 正文阅读区外边距保持紧凑
- 顶部固定显示站点标题 `AdiHuang's notes`

左侧栏包含三种状态：

- `Articles`：文章列表
- `Outline`：当前文章目录
- `Search`：搜索结果

左侧文章列表：

- 左侧栏固定视口高度，列表内部滚动
- 每个文章 item 使用横线分隔
- item 顶部显示最多 3 个 tags 和 `updated` 时间
- item 中间显示文章标题
- item 底部显示文章 description，不显示文件路径

正文样式：

- 白色背景
- 浅灰边框和分割线
- 中文阅读行高优化
- 正文顶部显示文件路径、`created` 时间和 `updated` 时间
- 代码块浅灰背景
- inline code 灰底
- 表格细边框
- 引用块左边框
- 任务列表保留 checkbox

移动端：

- 左侧栏收起为抽屉
- 正文宽度自适应
- 顶部保留菜单按钮和站点标题

## 第一版功能

必须实现：

- 自动读取 `src/content/notes/**/*.md`
- 为每篇 Markdown 生成静态文章页
- 首页默认打开排序后的第一篇文章
- 左侧显示文章列表，包含 tags、updated 时间、标题和 description
- 点击文章跳转到对应静态文章页
- 当前文章自动生成 Outline
- 点击 Outline 跳转到对应标题
- 滚动时高亮当前标题
- 全文搜索文章标题、摘要、正文和标签
- 搜索支持中文中间词命中，例如 `Git基础` 可通过 `基础` 命中
- Search input 为空时显示全部 tags
- 点击 tag 后将 tag 写入 Search input 并执行 tag 搜索
- 搜索结果显示标题、片段和所属文件
- Markdown 渲染支持标题、列表、表格、引用、代码块、任务列表
- GitHub Actions 自动构建并发布到 GitHub Pages

明确不做：

- 在线编辑
- 登录
- 评论
- 数据库
- 后台管理
- AI 问答
- 多用户协作

## 搜索设计

使用 `MiniSearch` 做前端本地搜索。

搜索索引由 Astro endpoint 在构建时生成：

```text
src/pages/search-index.json.ts
```

访问路径为 `/search-index.json`。

前端请求搜索索引时必须使用：

```ts
import.meta.env.BASE_URL + "search-index.json"
```

索引字段：

- `title`
- `description`
- `tags`
- `body`
- `url`

搜索行为：

- 用户输入关键词后左侧栏切换到 `Search`
- Search input 为空时显示去重并排序后的全部 tags
- 点击 tag 后填入 Search input，并立即执行搜索
- 搜索结果按相关度排序
- 每条结果显示文章标题、命中片段和文件名
- 点击结果跳转到对应文章

中文搜索：

- MiniSearch 使用自定义 tokenizer
- 英文和数字按连续片段生成 token
- 中文、日文、韩文按连续字符组生成单字和双字 token
- 目的是支持中文标题、摘要和正文中的中间词搜索

## GitHub Pages 部署

`astro.config.mjs`：

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://notes.adihuang.com",
  base: "/",
});
```

站点访问地址为：

```text
https://notes.adihuang.com/
```

自定义域名文件：

```text
public/CNAME
```

内容：

```text
notes.adihuang.com
```

DNS 记录：

```text
notes CNAME hd1987.github.io
```

`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: withastro/action@v6

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

## 实施顺序

1. 新建 `notes-site` 独立项目。
2. 创建 `CLAUDE.md`，写清目录、内容、部署和验证规则。
3. 初始化 `Astro + TypeScript`。
4. 创建 `src/content/notes/`。
5. 导入现有 Markdown 文件。
6. 实现 Markdown 读取、slug 生成和静态路由。
7. 实现首页直接渲染排序后的第一篇文章。
8. 实现 Typora 风格页面布局。
9. 实现文章列表。
10. 实现当前文章 Outline。
11. 实现全文搜索索引和搜索面板。
12. 配置 GitHub Actions 和 GitHub Pages。
13. 本地执行构建验证。
14. 本地验证通过后，由用户决定是否 push 到 GitHub；push 后检查 Pages 站点。

## 验收标准

本地验证命令：

```bash
npm run build
npm run preview
```

本地验收：

- 首页能打开默认文章
- 所有 Markdown 文件能生成页面
- 文章列表能切换文章
- Outline 能跳转到标题
- 滚动时 Outline 高亮正确
- 搜索能命中文章正文
- 搜索能命中文章标题中的中文中间词
- Search input 为空时能显示全部 tags
- 点击 tag 后能执行 tag 搜索
- 代码块显示正常
- 表格显示正常
- 任务列表显示正常
- 移动端没有明显遮挡

GitHub Pages 验收：

- push 到 `main` 后 Actions 成功
- Source 使用 `GitHub Actions`
- Custom domain 设置为 `notes.adihuang.com`
- DNS 检查成功
- `github-pages` environment 允许 `main` 分支部署
- GitHub Pages 能访问
- 刷新文章详情页不 404
- CSS 和 JS 路径正确
- 中文标题显示正常
- 搜索索引加载正常
