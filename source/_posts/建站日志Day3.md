---
title: 建站日志Day3
date: 2025-06-19 18:04:59
toc: true
tags:
  - Hexo
  - Git
  - Netlify
categories:
  - 建站日志
---

## 建站Day3日志

---

**核心目标：** 实现文章目录 (TOC) 功能，并对网站 UI 进行深度定制和问题排查。

## 一、文章目录 (TOC) 功能实现与调试

### 初步实现

**操作**：为项目安装了 `hexo-toc` 插件，用于生成文章目录。

**指令**：
Bash
```
npm install hexo-toc --save
```

**使用方法**：学习并确认了通过在 Markdown 文件中添加 `` 占位符，可以在文章内指定位置生成目录。

### TOC 布局与样式优化

**需求**：希望将 TOC 从文章内文，改为一个固定在屏幕右侧的“悬浮窗”，并实现点击标题后的“平滑滚动”效果。

**初次尝试（失败并回滚）**：
尝试通过修改 `layout.ejs` 和 `post.ejs` 模板文件，以及编写复杂的 Flexbox 布局 CSS，来创建一个“主内容区+侧边栏”的两栏结构。此方案因与主题原有布局冲突，导致页面错乱，后通过 `git reset --hard origin/master` 命令将所有修改回滚至上一个稳定版本。

**最终方案（成功）**：

**策略**：采用“非侵入式”方法，不改变主题单栏布局，仅通过 CSS 将 TOC 容器设置为 `position: fixed`（固定定位），使其“悬浮”于页面之上。

**操作**：

修改 `themes/ringo/layout/post.ejs` 文件，在文章主体外添加了一个专门的 `div` 容器，并在其中放置了 `` 占位符。

在 `themes/ringo/source/css/custom.css` 文件中，为该容器编写了完整的 `position: fixed` 相关样式，包括位置、尺寸、背景、阴影、滚动条以及响应式（小屏幕下自动隐藏）等规则。

同时，在 `custom.css` 中加入了 `html { scroll-behavior: smooth; }` 规则，以实现平滑滚动。

### TOC 链接功能调试

**遇到的问题**：悬浮窗内的目录只显示文本，无法点击跳转。

**诊断与排查**：

初步判断为 Hexo 内置的 `toc()` 辅助函数未能正确生成链接。

尝试更换 Markdown 渲染器（卸载 `hexo-renderer-marked`，安装 `hexo-renderer-kramed`）和修改 `_config.yml` 中的 `marked:` 配置，但问题依旧。

通过浏览器开发者工具进行最终诊断，发现生成的 `<a>` 标签缺少 `href` 属性。

**解决方案**：

放弃使用 Hexo 内置的 `toc()` 辅助函数。

创建了一个新的自定义脚本 `themes/ringo/source/js/toc-generator.js`，该脚本在浏览器端运行，负责扫描文章内的所有标题、为它们动态创建 `id`、并生成包含正确 `href` 链接的完整目录列表，最后注入到悬浮窗容器中。

修改 `post.ejs` 和 `footer.ejs` 以加载并启用该脚本，问题得到解决。

## 二、主题模板与样式微调

### 模板文件错误排查

**遇到的问题**：在修改模板过程中，服务器启动报错，提示 `Partial ... does not exist`。

**诊断**：发现在回滚或修改模板文件时，部分文件（如 `post.ejs`）中残留了对已被删除的局部模板文件（如 `sidebar.ejs`, `comment/comment.ejs`）的调用指令。

**解决方案**：精确定位到报错的模板文件和代码行，删除或注释掉了多余的 `<%- partial(...) %>` 调用。

### 标签页 (Tags Page) 样式优化

**需求**：为 `/tags/` 页面中过于紧凑的标签增加间距和美化样式。

**诊断**：通过开发者工具检查，发现主题的标签列表 HTML 结构不规范（`<ul>` 下直接是 `<a>`，缺少 `<li>`），导致常规的 CSS 选择器失效。

**解决方案**：根据实际的 HTML 结构，编写了正确的 CSS 选择器 `.post-archive a`，并在 `custom.css` 中为其添加了 `margin`、`padding`、`background-color`、`border-radius` 等一系列样式，成功实现了“MUJI 风格”的美化效果。
