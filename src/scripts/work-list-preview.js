(function () {
  var rowsEl = document.querySelector('[data-work-rows]');
  var preview = document.querySelector('[data-work-preview]');
  var previewImage = document.querySelector('[data-work-preview-image]');
  if (!rowsEl || !preview || !previewImage) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var rows = Array.prototype.slice.call(rowsEl.querySelectorAll('[data-work-row]'));
  var current = null;
  var offsetX = 28;
  var offsetY = -90;

  function place(x, y) {
    var rect = preview.getBoundingClientRect();
    var w = rect.width || 352;
    var h = rect.height || 264;
    var left = x + offsetX;
    var top = y + offsetY;

    if (left + w > window.innerWidth - 16) left = x - offsetX - w;
    if (top < 16) top = 16;
    if (top + h > window.innerHeight - 16) top = window.innerHeight - h - 16;

    preview.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
  }

  function show(row) {
    if (current !== row) {
      current = row;
      var image = row.getAttribute('data-image');
      if (image) {
        previewImage.style.backgroundImage = "url('" + image + "')";
        previewImage.removeAttribute('data-placeholder');
      } else {
        previewImage.style.backgroundImage = 'none';
        previewImage.setAttribute('data-placeholder', 'Image to come');
      }
    }
    preview.classList.add('is-visible');
  }

  function hide() {
    current = null;
    preview.classList.remove('is-visible');
  }

  rows.forEach(function (row) {
    row.addEventListener('mouseenter', function () { show(row); });
    row.addEventListener('mouseleave', hide);
    row.addEventListener('focus', function () {
      show(row);
      var rect = row.getBoundingClientRect();
      place(rect.right, rect.top);
    });
    row.addEventListener('blur', hide);
  });

  rowsEl.addEventListener('mousemove', function (e) {
    place(e.clientX, e.clientY);
  });
})();
