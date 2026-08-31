(function () {
  var root = document.querySelector('[data-wwd-selector]');
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll('[data-wwd-item]'));
  var images = Array.prototype.slice.call(root.querySelectorAll('[data-wwd-image]'));
  if (items.length < 2) return;

  function open(index) {
    items.forEach(function (item, i) {
      var active = i === index;
      var toggle = item.querySelector('[data-wwd-toggle]');
      item.classList.toggle('is-open', active);
      toggle.setAttribute('aria-expanded', active ? 'true' : 'false');
    });

    images.forEach(function (img, i) {
      img.classList.toggle('is-active', i === index);
    });
  }

  items.forEach(function (item, i) {
    var toggle = item.querySelector('[data-wwd-toggle]');
    toggle.addEventListener('click', function () {
      open(i);
    });
  });
})();
