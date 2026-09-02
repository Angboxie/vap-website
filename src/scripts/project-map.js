(function () {
  var map = document.querySelector('[data-project-map]');
  if (!map) return;

  var markers = Array.prototype.slice.call(map.querySelectorAll('.trusted__map-marker'));

  function setOpen(marker, open) {
    var pin = marker.querySelector('[data-map-pin]');
    var panel = marker.querySelector('[data-map-panel]');
    if (!pin || !panel) return;
    pin.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }

  function closeAll(except) {
    markers.forEach(function (marker) {
      if (marker === except) return;
      setOpen(marker, false);
    });
  }

  markers.forEach(function (marker) {
    marker.addEventListener('mouseenter', function () {
      closeAll(marker);
      setOpen(marker, true);
    });
    marker.addEventListener('mouseleave', function () {
      setOpen(marker, false);
    });
    marker.addEventListener('focusin', function () {
      closeAll(marker);
      setOpen(marker, true);
    });
    marker.addEventListener('focusout', function (event) {
      if (marker.contains(event.relatedTarget)) return;
      setOpen(marker, false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll(null);
  });
})();
