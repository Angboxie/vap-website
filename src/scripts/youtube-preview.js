(function () {
  var buttons = document.querySelectorAll('[data-yt-preview]');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var videoId = button.getAttribute('data-yt-preview');
      var title = button.getAttribute('aria-label') || 'YouTube video';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1';
      iframe.title = title;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'wd-pub-video__frame';
      button.replaceWith(iframe);
    });
  });
})();
