document.addEventListener('DOMContentLoaded', function() {
  var tocContainer = document.getElementById('toc-container');
  // 如果页面上没有TOC容器，就什么也不做
  if (!tocContainer) {
    return;
  }

  var content = document.querySelector('.post-content');
  // 如果没有文章内容区域，也什么都不做
  if (!content) {
    return;
  }

  // 寻找所有h2, h3, h4标题
  var headings = content.querySelectorAll('h2, h3, h4');
  if (headings.length === 0) {
    tocContainer.innerHTML = '<span>(本文无目录)</span>';
    return;
  }

  var tocHTML = '<ul>';
  var headingCount = {};

  headings.forEach(function(heading) {
    var level = parseInt(heading.tagName.substring(1));

    // 创建一个对URL友好的ID
    var text = heading.textContent || heading.innerText;
    var baseId = text.trim().toLowerCase().replace(/[\s\W\.]+/g, '-').replace(/^-+|-+$/g, '');

    // 处理重复ID
    if (headingCount[baseId] === undefined) {
      headingCount[baseId] = 0;
    } else {
      headingCount[baseId]++;
      baseId += '-' + headingCount[baseId];
    }

    var id = baseId;
    heading.id = id;

    tocHTML += '<li class="toc-item toc-level-' + level + '">';
    tocHTML += '<a class="toc-link" href="#' + id + '">' + text + '</a>';
    tocHTML += '</li>';
  });

  tocHTML += '</ul>';
  tocContainer.innerHTML = tocHTML;
});