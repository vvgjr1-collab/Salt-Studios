/* ==========================================================================
   SALT STUDIOS — salt.js
   No dependencies. Everything degrades: without JS the page is fully
   readable, and prefers-reduced-motion switches the set-pieces off.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ------------------------------------------------------------------
     Entrance — fires once fonts/layout have settled
     ------------------------------------------------------------------ */
  var ready = function () { root.classList.add('is-ready'); };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready);
    setTimeout(ready, 900); // never wait on a slow font host
  } else {
    setTimeout(ready, 60);
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    reveals.forEach(function (el) {
      // Stagger siblings inside a shared parent
      if (!el.style.getPropertyValue('--d')) {
        var sibs = Array.prototype.filter.call(
          el.parentElement ? el.parentElement.children : [],
          function (n) { return n.classList && n.classList.contains('reveal'); }
        );
        var i = sibs.indexOf(el);
        if (i > 0 && sibs.length > 1 && sibs.length <= 8) {
          el.style.setProperty('--d', i * 90);
        }
      }
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ------------------------------------------------------------------
     Image slots — show the labelled placeholder until a real file exists
     ------------------------------------------------------------------ */
  document.querySelectorAll('.slot').forEach(function (slot) {
    var img = slot.querySelector('img');
    if (!img) { slot.classList.add('is-empty'); return; }

    if (!slot.hasAttribute('data-label')) {
      var file = (img.getAttribute('src') || '').split('/').pop();
      var ratio = getComputedStyle(slot).getPropertyValue('--ar').trim() || '4 / 3';
      slot.setAttribute('data-label', file + '\n' + ratio.replace(/\s/g, ''));
    }

    var fail = function () { slot.classList.add('is-empty'); };
    var pass = function () { slot.classList.remove('is-empty'); };

    img.addEventListener('error', fail);
    img.addEventListener('load', pass);
    if (img.complete) { (img.naturalWidth > 0 ? pass : fail)(); }
  });

  /* ------------------------------------------------------------------
     Header state + scroll progress + hero cue
     ------------------------------------------------------------------ */
  var head = document.querySelector('.site-head');
  var bar = document.querySelector('.progress');
  var cue = document.querySelector('.hero__cue');
  // Parallax runs on the inner slot so it never fights the entrance
  // transform applied to .hero__media itself.
  var heroMedia = document.querySelector('.hero__media .slot');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (head) head.classList.toggle('is-stuck', y > 24);
    if (bar) bar.style.setProperty('--sp', max > 0 ? clamp(y / max, 0, 1) : 0);
    if (cue) cue.style.setProperty('--cue', clamp(1 - y / 260, 0, 1));
    if (heroMedia && !reduced && y < window.innerHeight * 1.2) {
      heroMedia.style.transform = 'translate3d(0,' + (y * -0.12).toFixed(2) + 'px,0)';
    }

    pins.forEach(updatePin);
    ticking = false;
  }

  function requestScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }

  /* ------------------------------------------------------------------
     Pinned manifesto — words light up across the scroll
     ------------------------------------------------------------------ */
  var pins = [];

  document.querySelectorAll('[data-pin]').forEach(function (p) {
    // Wrap every word in a span, keeping <em> accents intact.
    var out = document.createDocumentFragment();
    var n = 0;

    Array.prototype.slice.call(p.childNodes).forEach(function (node) {
      var accent = node.nodeType === 1 && node.tagName === 'EM';
      var text = node.textContent;
      if (node.nodeType !== 3 && !accent) { out.appendChild(node.cloneNode(true)); return; }

      text.split(/(\s+)/).forEach(function (chunk) {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) { out.appendChild(document.createTextNode(' ')); return; }
        var s = document.createElement('span');
        s.className = accent ? 'w w--accent' : 'w';
        s.style.setProperty('--i', n++);
        s.textContent = chunk;
        out.appendChild(s);
      });
    });

    p.textContent = '';
    p.appendChild(out);
    p.style.setProperty('--n', n);

    var section = p.closest('.pin');
    if (section) pins.push({ section: section, targets: [p, section.querySelector('.pin__bar')] });
  });

  function updatePin(pin) {
    if (reduced) return;
    var r = pin.section.getBoundingClientRect();
    var total = pin.section.offsetHeight - window.innerHeight;
    var p = total > 0 ? clamp(-r.top / total, 0, 1) : 1;
    pin.targets.forEach(function (t) { if (t) t.style.setProperty('--p', p.toFixed(4)); });
  }

  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  onScroll();

  /* ------------------------------------------------------------------
     Marquee — duplicate the track so the loop is seamless
     ------------------------------------------------------------------ */
  document.querySelectorAll('.marquee__track').forEach(function (track) {
    if (reduced) return;
    var items = track.innerHTML;
    track.innerHTML = items + items;
    Array.prototype.slice.call(track.children).slice(track.children.length / 2)
      .forEach(function (el) { el.setAttribute('aria-hidden', 'true'); });

    // Constant speed regardless of how many partners are listed
    var pxPerSecond = 62;
    var duration = track.scrollWidth / 2 / pxPerSecond;
    track.style.setProperty('--speed', duration.toFixed(1) + 's');
  });

  /* ------------------------------------------------------------------
     Stat count-up
     ------------------------------------------------------------------ */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        cio.unobserve(el);

        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400;
        var t0 = performance.now();

        (function step(now) {
          var t = clamp((now - t0) / dur, 0, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
          if (t < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ------------------------------------------------------------------
     Catalogue filters (work page)
     ------------------------------------------------------------------ */
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var cards = document.querySelectorAll('[data-cat]');

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-filter');

        filters.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });

        cards.forEach(function (card) {
          var show = want === 'all' || card.getAttribute('data-cat') === want;
          card.hidden = !show;
          if (show) {
            card.classList.remove('in');
            requestAnimationFrame(function () { card.classList.add('in'); });
          }
        });

        var count = document.querySelector('[data-count-out]');
        if (count) {
          var shown = Array.prototype.filter.call(cards, function (c) { return !c.hidden; }).length;
          count.textContent = shown + (shown === 1 ? ' project' : ' projects');
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
