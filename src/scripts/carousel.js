(function () {
  var roots = document.querySelectorAll('[data-carousel]');

  roots.forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    if (slides.length < 2) return;

    var segments = Array.prototype.slice.call(root.querySelectorAll('.carousel__segment'));
    var announcer = root.querySelector('[data-carousel-announcer]');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var AUTO_MS = 7000;

    var current = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
    if (current < 0) current = 0;

    var timer = null;

    function setFill(el, width, withTransition) {
      el.style.transition = withTransition ? 'width ' + AUTO_MS + 'ms linear' : 'none';
      el.style.width = width;
    }

    function updateSegments(activeIndex, animateActive) {
      segments.forEach(function (seg, i) {
        var fill = seg.querySelector('.carousel__segment-fill');
        seg.classList.toggle('is-active', i === activeIndex);
        seg.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
        if (!fill) return;
        if (i < activeIndex) {
          setFill(fill, '100%', false);
        } else if (i === activeIndex) {
          setFill(fill, '0%', false);
          if (animateActive && !reduceMotion) {
            // eslint-disable-next-line no-unused-expressions
            void fill.offsetWidth;
            setFill(fill, '100%', true);
          } else {
            setFill(fill, '100%', false);
          }
        } else {
          setFill(fill, '0%', false);
        }
      });
    }

    function go(index) {
      var next = (index + slides.length) % slides.length;
      if (next === current) return;

      var outgoing = slides[current];
      var incoming = slides[next];

      outgoing.classList.add('is-leaving');
      outgoing.classList.remove('is-active');
      outgoing.setAttribute('aria-hidden', 'true');

      incoming.classList.add('is-active');
      incoming.removeAttribute('aria-hidden');

      window.setTimeout(function () {
        outgoing.classList.remove('is-leaving');
      }, 550);

      updateSegments(next, true);

      if (announcer) {
        var quote = incoming.querySelector('.carousel__quote');
        announcer.textContent = quote ? quote.textContent.trim() : '';
      }

      current = next;
    }

    function goNext() { go(current + 1); }
    function goPrev() { go(current - 1); }

    var autoplay = !reduceMotion && !root.hasAttribute('data-carousel-manual');

    function startAuto() {
      if (!autoplay) return;
      stopAuto();
      timer = window.setInterval(goNext, AUTO_MS);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    segments.forEach(function (seg, i) {
      seg.addEventListener('click', function () {
        go(i);
        startAuto();
      });
    });

    var prevBtn = root.querySelector('[data-carousel-prev]');
    var nextBtn = root.querySelector('[data-carousel-next]');
    if (prevBtn) prevBtn.addEventListener('click', function () { goPrev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goNext(); startAuto(); });

    function freezeFills() {
      segments.forEach(function (seg) {
        var fill = seg.querySelector('.carousel__segment-fill');
        if (!fill) return;
        var computed = getComputedStyle(fill).width;
        setFill(fill, computed, false);
      });
    }

    root.addEventListener('mouseenter', function () { freezeFills(); stopAuto(); });
    root.addEventListener('mouseleave', function () { updateSegments(current, true); startAuto(); });
    root.addEventListener('focusin', function () { freezeFills(); stopAuto(); });
    root.addEventListener('focusout', function () { updateSegments(current, true); startAuto(); });

    var viewport = root.querySelector('.carousel__viewport');
    if (viewport) {
      var touchStartX = null;
      viewport.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        stopAuto();
      }, { passive: true });
      viewport.addEventListener('touchend', function (e) {
        if (touchStartX === null) return;
        var deltaX = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) { goNext(); } else { goPrev(); }
        }
        startAuto();
      });
    }

    updateSegments(current, true);
    startAuto();
  });
})();
