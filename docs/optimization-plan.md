# notes-site 优化实施方案

## 目标与范围

保持 Astro、Markdown、MiniSearch 和当前首页阅读体验。第一轮修复可观察的搜索与键盘交互问题，延迟搜索初始化，补 canonical 和 404，并复用已有内容入口。保持现有 slug、标签显示和代码块搜索契约。

## 基线（2026-09-16，本地）

- 88 篇笔记；18 个单元测试通过；check 和 build 通过。
- 搜索 JSON：122656 bytes；本地 gzip：43375 bytes（不是生产传输量）。
- 搜索脚本：20.58 kB；gzip：6.96 kB。
- 尚无浏览器初始化耗时、首次搜索延迟或真实用户 INP 基线。

## 实施顺序和验收

1. 搜索采用 idle/loading/ready/error 状态；首次 focus/input 才请求索引并动态导入 MiniSearch；并发事件共用 Promise；失败可重试，阅读和完整文章列表仍可用；完成后使用最新输入。
2. loading/error/结果数量独立于标签区域显示；标签使用原生 button click 激活，焦点在组件内部移动时保持弹层，Escape 关闭。
3. Tabs 共用状态函数，同时同步 class、aria-selected、tabindex、hidden；方向键和 Home/End 支持自动激活。搜索触发 Articles 时复用同一函数。
4. 搜索仅消费结果 id，因此移除 storeFields；保持下载文档格式与全文范围，避免改变召回契约。
5. 首页 canonical 指向当前文章，文章 self-canonical；404 使用独立静态页面。页面统一复用现有内容读取入口。
6. 单元测试覆盖失败、重试、并发初始化、状态一致性；运行 test/check/build。获得专项授权后运行浏览器 smoke，验证延迟加载、最新输入、标签键盘、Tabs、错误和移动端阅读路径。
7. CI 专项授权后新增 ci.yml：pull_request 和 push main，contents: read，npm ci/test/check/build；部署工作流保持现状。GitHub required checks 是独立仓库设置，不以本地配置完成代替远程确认。

## 后续候选（不计入本轮验收）

- 内容缺失元数据报告、日期先后关系验证；不补造旧日期、不迁移 slug。
- sitemap、RSS、首页、Tags、Archive：按实际发现需求单独决定。
- 代码块是否纳入全文搜索：先定义契约和回归用例。
- 预构建或分块索引：实际低端设备耗时和传输量显示瓶颈后再评估。

## 验证记录

- 本轮 1–7 的本地实施已完成；CI 配置已获授权并新增。
- 25 个单元测试通过；Astro check 为 0 errors/warnings/hints；build 生成 90 个页面；git diff --check 通过。
- 搜索入口脚本从 20.58 kB / gzip 6.96 kB 降至 4.94 kB / gzip 2.27 kB；MiniSearch 独立延迟模块约 17.98 kB / gzip 5.91 kB。这是初始加载减少，不代表搜索后的总 JS 减少。
- 搜索 JSON 格式和内容保持相同；删除 storeFields 不减少其网络体积。
- Chromium 浏览器验证通过：首次交互前 0 索引请求且不加载 MiniSearch；并发输入只初始化一次并使用最新值；空结果可见；键盘标签选择、Escape、Tabs 方向键/Home；移动端搜索切换 Articles 及文章导航；404、非法 JSON、非法结构、网络失败及重试恢复；首页 canonical 与自定义 404。
- 浏览器测试发现并修复 focusout 过早关闭标签弹层，以及 search input 的 Escape 默认清空行为导致弹层重开。
- 浏览器脚本及截图保存在 `output/playwright/`，作为可复查的验证材料保留。使用运行环境已有 Playwright 和 Chromium，未新增项目依赖。
- 复现：先运行 `npm run build` 和 `npm run preview -- --host 127.0.0.1`，再运行 `node output/playwright/smoke.cjs`。可通过 `PLAYWRIGHT_PACKAGE` 指定 Playwright 模块路径，通过 `CHROMIUM_EXECUTABLE` 指定已有 Chromium 可执行文件。
- 远程 CI 运行及 GitHub required checks 尚待后续提交推送和仓库设置确认；本轮不将本地通过视为远程门禁启用。
- 本轮产生的临时构建日志：`/tmp/notes-site-build.log`；保留用于结果复核。
