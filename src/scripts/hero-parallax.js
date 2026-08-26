(function () {
  var hero = document.querySelector('.hero');
  var media = document.querySelector('.hero__media');
  if (!hero || !media) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var max = 18;

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    media.style.setProperty('--px', (-x * max).toFixed(1) + 'px');
    media.style.setProperty('--py', (-y * max).toFixed(1) + 'px');
  });

  hero.addEventListener('mouseleave', function () {
    media.style.setProperty('--px', '0px');
    media.style.setProperty('--py', '0px');
  });
})();
