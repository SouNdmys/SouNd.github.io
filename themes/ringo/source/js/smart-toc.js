(function() {
  function initSmartToc() {
    var tocWrapper = document.querySelector('.smart-toc-container');
    if (!tocWrapper) return;

    var postContent = document.querySelector('.post-content');
    if (!postContent) { tocWrapper.style.display = 'none'; return; }

    var headings = postContent.querySelectorAll('h2, h3, h4, h5, h6');
    if (headings.length === 0) { tocWrapper.style.display = 'none'; return; }

    // 1. 生成TOC内容
    var tocContent = tocWrapper.querySelector('.toc-content');
    var tocHTML = '<ul>';
    headings.forEach(function(heading, index) {
      var level = parseInt(heading.tagName.substring(1));
      var text = heading.textContent || heading.innerText;
      var id = heading.id || 'toc-heading-' + index;
      heading.id = id;
      tocHTML += '<li class="toc-level-' + level + '"><a class="toc-link" href="#' + id + '">' + text + '</a></li>';
    });
    tocHTML += '</ul>';
    tocContent.innerHTML = tocHTML;

    // 2. 绑定点击事件
    var tocTitle = tocWrapper.querySelector('.toc-title');
    tocTitle.innerHTML = '☰'; // 在手机端，标题就是一个图标
    tocTitle.style.borderBottom = 'none'; // 手机端不要下划线

    // 点击按钮或遮罩层来开关
    function toggleToc() {
        var isOpen = tocWrapper.classList.toggle('is-open');
        if (isOpen) {
            tocTitle.innerHTML = '×'; // 打开后，图标变成关闭按钮
        } else {
            tocTitle.innerHTML = '☰'; // 关闭后，恢复成汉堡图标
        }
    }
    tocWrapper.addEventListener('click', function(e) {
      // 如果点击的是链接，则只关闭，不阻止跳转
      if (e.target.tagName === 'A') {
        if (tocWrapper.classList.contains('is-open')) {
            toggleToc();
        }
        return;
      }
      // 否则，点击容器的任何地方都开关
      toggleToc();
    });

    // 3. 桌面端恢复标题
    function checkDesktopView() {
        if (window.innerWidth >= 1200) {
            tocTitle.innerHTML = 'Table of Contents';
            tocTitle.style.borderBottom = '1px solid #ddd';
        } else {
            if (!tocWrapper.classList.contains('is-open')) {
                tocTitle.innerHTML = '☰';
                tocTitle.style.borderBottom = 'none';
            }
        }
    }

    checkDesktopView(); // 页面加载时检查一次
    window.addEventListener('resize', checkDesktopView); // 窗口大小变化时再检查
  }

  window.addEventListener('load', initSmartToc);
})();