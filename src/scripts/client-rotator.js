(function () {
  var rotators = document.querySelectorAll('[data-client-rotator]');
  if (!rotators.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  rotators.forEach(function (rotator) {
    var items = Array.prototype.slice.call(rotator.querySelectorAll('.trusted__area-client'));
    if (items.length < 2) return;
    var index = 0;

    setInterval(function () {
      items[index].classList.remove('is-active');
      index = (index + 1) % items.length;
      items[index].classList.add('is-active');
    }, 2600);
  });
})();
