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
     Entrance — fires once fonts/layout have settled, or once the intro
     clears, whichever applies.
     ------------------------------------------------------------------ */
  var readyCalled = false;
  function ready() {
    if (readyCalled) return;
    readyCalled = true;
    root.classList.add('is-ready');
  }

  function readyWhenFontsSettle() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(ready);
      setTimeout(ready, 900); // never wait on a slow font host
    } else {
      setTimeout(ready, 60);
    }
  }

  /* ------------------------------------------------------------------
     Intro — salt falls and fills the screen, then clears onto the site.

     A small script in each <head> adds .intro-on before first paint, and
     only when this session hasn't seen it, so the overlay is painted with
     the page rather than flashing in after it. Everything below assumes
     that class is already there.

     It runs once per session, not per page: an intro between every nav
     click would be unbearable on a four-page site.
     ------------------------------------------------------------------ */
  var introEl = document.querySelector('.intro');

  /* Landing on a #fragment: the browser makes its jump while images are
     still being laid out, and with scroll-behavior: smooth that animation
     is dropped the moment the layout shifts under it - so a link like
     work.html#craft-edit was leaving you at the top of the page. Re-assert
     the target once things have settled. */
  // Set by a real gesture, so a correction never fights someone who has
  // already started reading. Position alone is no good as a guard: the
  // browser may restore a scroll position from a previous visit to the
  // page, which looks identical to a deliberate scroll.
  // When the URL carries a fragment, the browser's own scroll restoration is
  // the wrong answer and it can land late - on a page with a dozen images it
  // arrived after the retries below and put a deep link back where the last
  // visit left off. Restoration stays on for ordinary back/forward.
  if ('scrollRestoration' in history && location.hash.length > 1) {
    history.scrollRestoration = 'manual';
  }

  var userScrolled = false;
  ['wheel', 'touchmove', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, function () { userScrolled = true; }, { passive: true, once: true });
  });

  function settleHash() {
    if (location.hash.length < 2 || userScrolled) return;
    var target;
    try { target = document.querySelector(location.hash); } catch (e) { return; }
    if (!target) return;
    if (Math.abs(target.getBoundingClientRect().top) < 4) return; // already there
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    target.scrollIntoView();
    html.style.scrollBehavior = prev;
  }
  // Retried: the browser's own scroll restoration can land after load and
  // put us back at the top. The already-there check above makes every later
  // attempt a no-op once one of them has stuck.
  // A hash change inside the page never fires load, and it is an explicit
  // request to go somewhere - so the interaction flag resets with it.
  window.addEventListener('hashchange', function () {
    userScrolled = false;
    requestAnimationFrame(settleHash);
    setTimeout(settleHash, 200);
  });
  window.addEventListener('load', function () {
    requestAnimationFrame(settleHash);
    setTimeout(settleHash, 200);
    setTimeout(settleHash, 700);
  });

  function endIntro() {
    root.classList.add('intro-done'); // releases the scroll lock
    if (introEl) {
      introEl.classList.add('is-done');
      setTimeout(function () {
        if (introEl && introEl.parentNode) introEl.parentNode.removeChild(introEl);
      }, 700);
    }
    ready(); // hero entrance plays as the salt clears
    requestAnimationFrame(settleHash); // the scroll lock ate any #fragment
  }

  function runIntro() {
    var canvas = introEl.querySelector('canvas');
    var ctx = canvas && canvas.getContext && canvas.getContext('2d');
    if (!ctx) { endIntro(); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;

    function size() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    var FALL = 1400;  // grains falling, drift rising
    var HOLD = 1550;  // screen fully white, briefly
    var grains = [];
    var done = false;

    function spawn(n) {
      for (var i = 0; i < n; i++) {
        grains.push({
          x: Math.random() * W,
          y: -Math.random() * H * 0.5,
          r: 0.7 + Math.random() * 1.6,
          vy: 90 + Math.random() * 280,
          sway: Math.random() * 6.283,
          amp: 4 + Math.random() * 14,
          a: 0.5 + Math.random() * 0.5
        });
      }
    }
    spawn(300);

    // Surface of the settled salt. Lumpy early, flat once it has filled —
    // summed sines rather than a real heightmap, which would need far more
    // grains than 1.2s allows.
    function pileY(x, p) {
      var amp = 30 * (1 - p);
      return (H - H * 1.08 * p) +
        Math.sin(x * 0.011 + 1.3) * amp +
        Math.sin(x * 0.029 + 2.7) * amp * 0.5;
    }

    function finish() {
      if (done) return;
      done = true;
      window.removeEventListener('resize', size);
      window.removeEventListener('keydown', finish);
      introEl.removeEventListener('click', finish);
      endIntro();
    }

    // Let anyone out early.
    window.addEventListener('keydown', finish);
    introEl.addEventListener('click', finish);

    var start = performance.now();
    var last = start;

    function frame(now) {
      if (done) return;
      var t = now - start;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      var p = Math.min(t / FALL, 1);
      // Front-loaded, not back-loaded. An ease-out buried the middle of the
      // screen within 300ms and the snow never got a moment; squaring keeps
      // the drift low while the grains fall, then fills quickly at the end.
      var ease = p * p;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#FFFFFF';

      for (var i = grains.length - 1; i >= 0; i--) {
        var g = grains[i];
        g.y += g.vy * dt;
        g.sway += dt * 2.2;
        var gx = g.x + Math.sin(g.sway) * g.amp;
        if (g.y >= pileY(gx, ease)) { grains.splice(i, 1); continue; }
        ctx.globalAlpha = g.a;
        ctx.beginPath();
        ctx.arc(gx, g.y, g.r, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Steady snowfall rather than scaling with the drift, which now stays
      // low for most of the run.
      if (t < FALL) spawn(Math.round(16 + 10 * p));

      ctx.beginPath();
      ctx.moveTo(0, H + 2);
      for (var x = 0; x <= W; x += 8) ctx.lineTo(x, pileY(x, ease));
      ctx.lineTo(W, H + 2);
      ctx.closePath();
      ctx.fill();

      if (t >= HOLD) { finish(); return; }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (root.classList.contains('intro-on') && introEl && !reduced) {
    // Mark it seen at the start, so navigating mid-intro doesn't replay it.
    try { sessionStorage.setItem('salt-intro-seen', '1'); } catch (e) {}
    runIntro();
  } else {
    if (introEl && introEl.parentNode) introEl.parentNode.removeChild(introEl);
    root.classList.add('intro-done');
    readyWhenFontsSettle();
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
  // Constant speed regardless of how many partners are listed
  function setMarqueeSpeed(track) {
    var duration = track.scrollWidth / 2 / 62;
    if (duration > 0) track.style.setProperty('--speed', duration.toFixed(1) + 's');
  }

  var tracks = document.querySelectorAll('.marquee__track');

  tracks.forEach(function (track) {
    if (reduced) return;
    var items = track.innerHTML;
    track.innerHTML = items + items;
    Array.prototype.slice.call(track.children).slice(track.children.length / 2)
      .forEach(function (el) {
        el.setAttribute('aria-hidden', 'true');
        // The duplicate half is decoration. Keep it out of the tab order,
        // itself and anything focusable inside it.
        if (el.tagName === 'A' || el.tabIndex >= 0) el.tabIndex = -1;
        el.querySelectorAll && el.querySelectorAll('a, button, input, [tabindex]')
          .forEach(function (n) { n.tabIndex = -1; });
      });
    setMarqueeSpeed(track);
  });

  // Partner marks are type, so their widths depend on webfonts. Retime the
  // loop once those have settled or the seam drifts.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { tracks.forEach(setMarqueeSpeed); });
  }

  /* ------------------------------------------------------------------
     Studio logomark — same idea: the header and footer marks swap to
     assets/img/logomark.svg once it exists, and keep the inline SVG
     stand-in until then.
     ------------------------------------------------------------------ */
  document.querySelectorAll('.brand__mark img').forEach(function (img) {
    var brand = img.closest('.brand');
    var ok = function () { brand.classList.add('has-logo'); };

    if (img.complete) { if (img.naturalWidth > 0) ok(); return; }
    img.addEventListener('load', ok);
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
     Enquiry form (contact page)

     There is no backend — this is a static site — so the form composes a
     message and hands it to the visitor's email client. That works with no
     account and nothing to maintain, and it never silently swallows an
     enquiry the way a dead form does.

     >>> STUDIO_EMAIL must be a real address you can receive mail at. <<<
     To take real submissions instead, sign up for a form service, give the
     <form> an action and method="POST", and delete this whole block — the
     browser will then submit it natively.
     ------------------------------------------------------------------ */
  var STUDIO_EMAIL = 'studio@saltstudios.in';

  var enquiry = document.getElementById('enquiry-form');
  if (enquiry) {
    var note = document.getElementById('form-note');
    var noteDefault = note ? note.textContent : '';

    enquiry.addEventListener('submit', function (e) {
      e.preventDefault();
      enquiry.classList.add('is-checked');

      if (!enquiry.checkValidity()) {
        var firstBad = enquiry.querySelector(':invalid');
        if (firstBad) firstBad.focus();
        if (note) {
          note.textContent = 'Please fill in the fields marked with an asterisk.';
          note.className = 'form__note is-error';
        }
        return;
      }

      var get = function (name) {
        var el = enquiry.elements[name];
        return el && el.value ? el.value.trim() : '';
      };

      var lines = [
        'Name: ' + get('name'),
        'Email: ' + get('email'),
        'Company or brand: ' + (get('organisation') || '—'),
        'Looking for: ' + get('kind'),
        '',
        'What they want to collaborate on:',
        get('brief'),
        '',
        '— sent from saltstudios.in'
      ];

      var subject = 'Project enquiry — ' + get('name');
      var href = 'mailto:' + STUDIO_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      if (note) {
        note.textContent = 'Opening your email app. If nothing happens, write to ' +
          STUDIO_EMAIL + ' directly.';
        note.className = 'form__note is-sent';
      }
    });

    // Clear the error state once they start fixing it.
    enquiry.addEventListener('input', function () {
      if (note && note.className !== 'form__note') {
        note.textContent = noteDefault;
        note.className = 'form__note';
      }
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
