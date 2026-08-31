(function () {
  var roots = document.querySelectorAll('[data-case-panels]');

  roots.forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-case-tab]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-case-panel]'));
    if (tabs.length < 2) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var index = tab.getAttribute('data-case-tab');

        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function (p) {
          var active = p.getAttribute('data-case-panel') === index;
          p.classList.toggle('is-active', active);
          if (active) {
            p.removeAttribute('hidden');
          } else {
            p.setAttribute('hidden', '');
          }
        });
      });
    });
  });
})();
