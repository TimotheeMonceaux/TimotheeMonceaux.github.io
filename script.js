window.addEventListener('scroll', function() {
  var scrollRatio = .2 + .6 * window.scrollY / (window.innerHeight + window.scrollY);
  document.querySelectorAll('.parallax-logo').forEach(function(logo) {
    var offsetTop = Math.floor(
      scrollRatio * logo.parentNode.offsetHeight
    ) + 'px';

    window.requestAnimationFrame(function() {
      logo.style.top = offsetTop;
    })
  });
});