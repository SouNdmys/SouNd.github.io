(function() {
  // 这个函数包含了我们所有的TOC逻辑
  function initializeToc() {
    var tocWrapper = document.querySelector('.smart-toc-container');
    var postContent = document.querySelector('.post-content');
    if (!tocWrapper || !postContent) return;

    var headings = postContent.querySelectorAll('h2, h3');
    var tocContainer = tocWrapper.querySelector('.toc-content');
    if (headings.length === 0) {
      tocWrapper.style.display = 'none';
      return;
    }

    // 1. 生成TOC内容 (这部分不变)
    var tocHTML = '<ul>';
    headings.forEach(function(heading, index) {
      var level = parseInt(heading.tagName.substring(1));
      var text = heading.textContent || heading.innerText;
      var id = heading.id || 'toc-heading-' + index;
      heading.id = id;
      tocHTML += '<li class="toc-level-' + level + '"><a class="toc-link" href="#' + id + '">' + text + '</a></li>';
    });
    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;

    // --- 以下是核心改动 ---

    var tocTitle = tocWrapper.querySelector('.toc-title');
    var desktopTitle = 'Table of Contents';
    var mobileIconOpen = '☰';
    var mobileIconClose = '×';

    // 2. 定义一个函数，根据窗口大小更新TOC标题的显示
    function updateTocTitle() {
      if (window.innerWidth >= 1200) {
        // 在桌面端，永远显示文字
        tocTitle.innerHTML = desktopTitle;
        tocTitle.style.cursor = 'default';
      } else {
        // 在移动端，根据是否展开来显示不同图标
        if (tocWrapper.classList.contains('is-open')) {
          tocTitle.innerHTML = mobileIconClose;
        } else {
          tocTitle.innerHTML = mobileIconOpen;
        }
        tocTitle.style.cursor = 'pointer';
      }
    }

    // 3. 为TOC容器（而不再是标题）绑定点击事件
    tocWrapper.addEventListener('click', function(e) {
      // 如果点击的是链接，则只在移动端展开时关闭菜单
      if (e.target.closest('.toc-link')) {
        if (window.innerWidth < 1200 && tocWrapper.classList.contains('is-open')) {
          tocWrapper.classList.remove('is-open');
          updateTocTitle(); // 更新标题为汉堡图标
        }
        return;
      }
      // 否则，点击容器的任何地方（包括标题）都开关菜单
      tocWrapper.classList.toggle('is-open');
      updateTocTitle(); // 每次点击后都更新标题
    });

    // 4. 监听窗口大小变化
    window.addEventListener('resize', updateTocTitle);

    // 5. 页面加载时，立即执行一次更新
    updateTocTitle();
  }

  // 确保在页面完全加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToc);
  } else {
    initializeToc();
  }
})();