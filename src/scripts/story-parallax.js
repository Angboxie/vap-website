(function () {
  var section = document.querySelector('.story');
  var media = document.querySelector('.story__media--parallax');
  var text = document.querySelector('.story__text--parallax');
  if (!section || !media || !text) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var RANGE = 160;
  var ticking = false;
  var inView = false;

  function update() {
    ticking = false;
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var total = rect.height + vh;
    var progress = (vh - rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));
    var shift = (progress - 0.5) * RANGE;
    media.style.transform = 'translateY(' + shift.toFixed(1) + 'px)';
    text.style.transform = 'translateY(' + (-shift).toFixed(1) + 'px)';
  }

  function onScroll() {
    if (!inView || ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) onScroll();
    }, { rootMargin: '20% 0px' });
    observer.observe(section);
  } else {
    inView = true;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
