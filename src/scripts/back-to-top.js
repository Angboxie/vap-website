(function () {
  var button = document.querySelector('[data-back-to-top]');
  if (!button) return;

  var threshold = window.innerHeight * 1.2;

  function update() {
    button.classList.toggle('is-visible', window.scrollY > threshold);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  button.addEventListener('click', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    button.blur();
  });
})();
