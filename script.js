var parallax = {
  scroll: window.scrollY,
  height: document.body.scrollHeight,
  logos: []
};

document.querySelectorAll('.parallax-logo').forEach(function(logo) {
  var temp = {
    obj: logo,
    pos: logo.style.top,
    parent: {
      scroll: logo.parentNode.getClientRects()[0].top,
      height: logo.parentNode.offsetHeight
    },
    triggerUp: logo.parentNode.getClientRects()[0].top - window.innerHeight,
    triggerDown: logo.parentNode.getClientRects()[0].top + logo.parentNode.offsetHeight,
    triggerZone: logo.parentNode.offsetHeight + window.innerHeight,
    hasChanged: false,
    newValue: logo.style.top
  };
  parallax.logos.push(temp);
});

if (updateParallax(parallax)) {
  updateScreen(parallax);
}

window.addEventListener('scroll', function(event) {
  parallax.scroll = window.scrollY;
  if (updateParallax(parallax)) {
    updateScreen(parallax);
  }
});

function updateParallax(parallax) {
  var changed = false;
  parallax.logos.forEach(function(logo) {
    if (parallax.scroll > logo.triggerUp && parallax.scroll < logo.triggerDown) {
      logo.hasChanged = true;
      logo.newValue = Math.floor((parallax.scroll - logo.triggerUp) / logo.triggerZone * 0.8 * logo.parent.height)+'px';
      changed = true;
    }
  });
  return changed;
}

function updateScreen(parallax) {
  window.requestAnimationFrame(function() {
    parallax.logos.forEach(function(logo) {
      if (logo.hasChanged) {
        logo.obj.style.top = logo.newValue;
        logo.hasChanged = false;
      }
    });
  });
}

/*window.addEventListener('scroll', function() {
  var scrollRatio = .2 + .6 * window.scrollY / (window.innerHeight + window.scrollY);
  document.querySelectorAll('.parallax-logo').forEach(function(logo) {
  var offsetTop = Math.floor(
      scrollRatio * logo.parentNode.offsetHeight
    ) + 'px';

    window.requestAnimationFrame(function() {
      logo.style.top = offsetTop;
    })
  });
});*/