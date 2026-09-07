(function () {
  var map = document.querySelector('[data-project-map]');
  if (!map) return;

  var markers = Array.prototype.slice.call(map.querySelectorAll('.trusted__map-marker'));

  var GAP = 8;

  function positionPanel(marker, panel) {
    marker.classList.remove('trusted__map-marker--flip-y');
    panel.style.maxHeight = '';
    panel.style.left = '';
    panel.style.transform = '';

    var mapRect = map.getBoundingClientRect();
    var pin = marker.querySelector('[data-map-pin]');
    var pinRect = pin.getBoundingClientRect();

    var spaceBelow = mapRect.bottom - pinRect.bottom - GAP;
    var spaceAbove = pinRect.top - mapRect.top - GAP;
    var defaultMax = 224;

    if (spaceBelow < spaceAbove) {
      marker.classList.add('trusted__map-marker--flip-y');
      panel.style.maxHeight = Math.max(96, Math.min(defaultMax, spaceAbove)) + 'px';
    } else {
      panel.style.maxHeight = Math.max(96, Math.min(defaultMax, spaceBelow)) + 'px';
    }

    var markerRect = marker.getBoundingClientRect();
    var panelWidth = panel.offsetWidth;
    var idealLeft = pinRect.left + pinRect.width / 2 - panelWidth / 2;
    var minLeft = mapRect.left;
    var maxLeft = mapRect.right - panelWidth;
    var clampedLeft = Math.min(Math.max(idealLeft, minLeft), maxLeft);

    panel.style.transform = 'none';
    panel.style.left = (clampedLeft - markerRect.left) + 'px';
  }

  function setOpen(marker, open) {
    var pin = marker.querySelector('[data-map-pin]');
    var panel = marker.querySelector('[data-map-panel]');
    if (!pin || !panel) return;
    pin.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
    if (open) positionPanel(marker, panel);
  }

  function closeAll(except) {
    markers.forEach(function (marker) {
      if (marker === except) return;
      setOpen(marker, false);
    });
  }

  markers.forEach(function (marker) {
    var pin = marker.querySelector('[data-map-pin]');
    if (!pin) return;
    pin.addEventListener('click', function () {
      var isOpen = pin.getAttribute('aria-expanded') === 'true';
      closeAll(marker);
      setOpen(marker, !isOpen);
    });
  });

  document.addEventListener('click', function (event) {
    var openMarker = markers.find(function (marker) {
      var pin = marker.querySelector('[data-map-pin]');
      return pin && pin.getAttribute('aria-expanded') === 'true';
    });
    if (openMarker && !openMarker.contains(event.target)) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll(null);
  });
})();
