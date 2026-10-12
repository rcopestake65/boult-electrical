// Reusable scroll animations.
// Add one of these classes to any element and it will animate in when it
// scrolls into view (or straight away if it is already visible on page load):
//
//   fade-in          fades in on the spot
//   float-in-up      fades in while rising up from slightly below
//   float-in-down    fades in while dropping down from slightly above
//   float-in-left    fades in while sliding in from the left
//   float-in-right   fades in while sliding in from the right
//   zoom-in          fades in while scaling up slightly
//
// Elements that enter the screen together (e.g. a row of cards) are
// automatically staggered one after another.

(function () {
  var root = document.documentElement;

  // If GSAP failed to load, or the visitor prefers reduced motion,
  // just show everything without animating.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || reduceMotion) {
    root.classList.remove('js-anim');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Starting position for each class. Keep the distances small for subtlety.
  var animations = {
    'fade-in':        {},
    'float-in-up':    { y: 30 },
    'float-in-down':  { y: -30 },
    'float-in-left':  { x: -40 },
    'float-in-right': { x: 40 },
    'zoom-in':        { scale: 0.95 }
  };

  Object.keys(animations).forEach(function (name) {
    var selector = '.' + name;
    if (!document.querySelector(selector)) return;

    gsap.set(selector, Object.assign({ autoAlpha: 0 }, animations[name]));

    ScrollTrigger.batch(selector, {
      start: 'top 90%',
      once: true,
      onEnter: function (elements) {
        gsap.to(elements, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          overwrite: true,
          // Remove the leftover transform so CSS hover effects still work
          clearProps: 'transform'
        });
      }
    });
  });
})();
