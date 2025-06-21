---
title: 建站日志Day4
date: 2025-06-21 11:34:08
toc: true
tags:
  - Hexo
  - Git
  - Netlify
categories:
  - 建站日志
---
### 吐槽

昨天Gemini大姨妈，经历了无数次左手拿起来右手又放下了的过程，四个小时没解决手机汉堡的问题，搞得我气急败坏。
代码总是能和TOC冲突，而我又不懂代码，在那排除半天搞不明白是什么问题。
后来觉得应该是记忆出现了问题，上下文太长，搞得Gemini已经分不清我的需求了，也可能是我的提示词没写好，提示词以后还得再琢磨琢磨
后来新建了一个对话，今天终于把问题解决了。诉求还是得一次性结构化地说清楚。
可惜的是昨天失败的过程被删除，没做日志记录。算是人机交互的磨合失败的记录，还是挺宝贵的一次经验。
至此，建站过程应该算告一段落了，基础功能基本都满足了。后面想出来有什么优化角度的话再说了。
我得花点时间消化一下这个过程和代码。

---

##建站日志Day4

为基于 Hexo 和 `hexo-theme-ringo` 主题的博客添加响应式移动端导航（“汉堡菜单”）的全过程，旨在解决桌面端侧边栏导航在移动设备上可访问性不佳的问题。

## 1. 背景与目标

### 1.1. 现有问题

本站使用的 `hexo-theme-ringo` 主题默认导航菜单位于页面左侧的侧边栏 (`sidebar`) 中。在桌面端浏览器上，此布局清晰直观。但在屏幕宽度较窄的移动设备上，该侧边栏默认被隐藏或挤压，导致访客无法方便地访问“分类”、“标签”、“关于”等主要页面。

### 1.2. 优化目标

为了提升移动端用户的浏览体验，本次优化的核心目标是：
1.  **实现一个“汉堡”按钮**：该按钮固定在移动端视图的显眼位置。
2.  **构建一个弹出式导航菜单**：点击汉堡按钮后，从侧方滑出导航菜单面板。
3.  **确保内容动态同步**：移动端菜单的链接应自动读取主题配置文件，与桌面端导航保持一致，便于后期维护。

## 2. 实施方案与步骤

本次优化遵循“结构(HTML)、表现(CSS)、行为(JavaScript)”分离的原则，通过修改主题文件来实现功能。

### 2.1. HTML 结构搭建

首先，在主题的布局文件中添加必要的 HTML 元素。

#### 2.1.1. 添加汉堡按钮与脚本容器

在 `themes/ringo/layout/_partial/header.ejs` 文件中，我们进行了如下修改：
1.  在文件顶部，增加一个用于承载汉堡按钮的 `<div>` 容器。
2.  在文件底部，引入了即将创建的移动菜单面板 `mobile-nav.ejs`，并直接添加了用于交互的 `<script>` 标签，以便管理所有相关逻辑。

```ejs
<%# 新增的移动端导航汉堡按钮 %>
<div class="mobile-nav-toggle">
    <button id="mobile-nav-toggle-btn" aria-label="Toggle Navigation">☰</button>
</div>

<%# ... 原有的 header 和 sidebar 内容 ... %>

<%# 新增的移动菜单面板的引入 %>
<%- partial('_partial/mobile-nav') %>

<%# 新增的控制移动菜单的 JavaScript %>
<script>
// JavaScript 逻辑将在 2.3 节详述
</script>
```

#### 2.1.2. 创建移动菜单面板

为保持代码整洁，我们创建了一个新的 EJS 局部文件 `themes/ringo/layout/_partial/mobile-nav.ejs`。此文件的核心是利用 EJS 循环，动态地遍历主题配置文件 `_config.yml` 中定义的 `menu` 对象，从而生成导航链接。

```ejs
<div id="mobile-nav-panel">
    <nav class="mobile-nav">
        <%# 这段代码会自动读取你主题 _config.yml 文件中的 menu 配置 %>
        <% for (name in theme.menu) { %>
            <a class="mobile-nav-link" href="<%- url_for(theme.menu[name]) %>">
                <%= name %>
            </a>
        <% } %>
    </nav>
</div>
```
这样做的好处是，未来任何对导航菜单的修改（增、删、改）都只需在 `_config.yml` 中进行，移动端菜单会自动同步，无需改动模板代码。

### 2.2. CSS 样式实现

所有新增的样式都被添加到了 `themes/ringo/source/css/custom.css` 文件中，以确保不影响主题原有样式并方便管理。

主要样式规则包括：
1.  **汉堡按钮样式**：使用 `position: fixed` 将其固定在屏幕左上角，并设置了合适的 `z-index` 以确保其在最上层。
2.  **菜单面板样式**：同样使用 `position: fixed`，默认通过 `left: -280px;` 将其隐藏在屏幕左侧外。
3.  **激活状态**：通过一个 `.mobile-nav-active` 类（由 JavaScript 添加到 `<body>` 标签）来控制菜单面板的滑入效果 (`left: 0;`)。
4.  **响应式媒体查询**：使用 `@media (max-width: 800px)` 作为断点，仅在小于此宽度的设备上显示汉堡按钮，并隐藏原有的桌面侧边栏 `#sidebar`。

```css
/* 移动端导航菜单（汉堡菜单）样式 */

/* 1. 汉堡按钮 */
.mobile-nav-toggle {
    display: none; /* 默认在桌面端不显示 */
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1001;
}
#mobile-nav-toggle-btn {
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border: 1px solid #eee;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* 2. 移动菜单面板 */
#mobile-nav-panel {
    position: fixed;
    top: 0;
    left: -280px; /* 默认藏在左边 */
    width: 260px;
    height: 100%;
    background: #f9f9f9;
    padding: 80px 20px 20px 20px;
    box-shadow: 2px 0 15px rgba(0,0,0,0.15);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
}

/* 3. 菜单激活时的样式 */
.mobile-nav-active #mobile-nav-panel {
    left: 0; /* 将菜单从左边滑入 */
}

/* 4. 菜单链接样式 */
.mobile-nav-link {
    display: block;
    padding: 12px 15px;
    font-size: 16px;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
}
.mobile-nav-link:hover {
    background-color: #333;
    color: #fff;
}

/* 5. 媒体查询 */
@media (max-width: 800px) {
    .mobile-nav-toggle {
        display: block; /* 在移动端显示汉堡按钮 */
    }
    #sidebar {
        display: none; /* 在移动端隐藏桌面侧边栏 */
    }
}
```

### 2.3. JavaScript 交互逻辑

交互逻辑脚本直接内联在 `header.ejs` 的末尾，以减少额外的 HTTP 请求。脚本在 `DOMContentLoaded` 事件触发后执行。

其主要功能点：
1.  获取汉堡按钮和菜单面板的 DOM 元素。
2.  为按钮添加 `click` 事件监听器。
3.  点击时，切换 `<body>` 元素的 `.mobile-nav-active` 类，从而触发 CSS 中定义的菜单滑入/滑出动画。
4.  同时，根据菜单的激活状态，将按钮的文本内容在 `☰` (汉堡) 和 `×` (关闭) 之间切换，提升用户体验。
5.  增加全局点击事件监听，实现点击菜单面板以外区域时自动关闭菜单的功能。

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('mobile-nav-toggle-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    if (toggleBtn && mobileNavPanel) {
        toggleBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            document.body.classList.toggle('mobile-nav-active');
            if (document.body.classList.contains('mobile-nav-active')) {
                toggleBtn.innerHTML = '×';
            } else {
                toggleBtn.innerHTML = '☰';
            }
        });

        document.addEventListener('click', function(event) {
            if (document.body.classList.contains('mobile-nav-active') && !mobileNavPanel.contains(event.target)) {
                document.body.classList.remove('mobile-nav-active');
                toggleBtn.innerHTML = '☰';
            }
        });
    }
});
```

## 3. 成果与总结

通过以上步骤，博客成功集成了一个功能完善的响应式移动导航系统。最终成果满足了所有预设目标：
- **体验提升**：移动端访客现在可以通过清晰的入口访问全站主要链接。
- **动态维护**：导航内容与站点配置完全同步，无需重复劳动。
- **代码清晰**：通过创建独立的局部文件和样式块，保持了主题代码的整洁和可维护性。

此次实践证明，即使是针对现有主题的二次开发，通过对 Hexo 模板系统和前端基础技术的综合运用，也能够高效地实现深度定制，显著优化网站的用户体验。