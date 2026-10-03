(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var themeIcon = themeBtn.querySelector('i');

  function syncButtons() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    themeIcon.className = isDark ? 'bi bi-sun' : 'bi bi-moon-stars';
    themeBtn.classList.toggle('is-active', isDark);
    themeBtn.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  themeBtn.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('bcdl-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('bcdl-theme', 'dark');
    }
    syncButtons();
  });

  syncButtons();

  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navmenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('nav-open');
      navToggle.querySelector('i').className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('nav-open');
        navToggle.querySelector('i').className = 'bi bi-list';
      });
    });
  }

  window.addEventListener('load', function () {
    if (window.AOS) { AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false }); }
  });

  // Quick-nav strip: on the home page only, links slide in from the left, one at a time,
  // over ~2.5s on page load. Other pages show the strip fully visible immediately.
  var quickNav = document.getElementById('quickNav');
  if (quickNav) {
    var quickNavLinks = quickNav.querySelectorAll('.quick-nav-row a');
    var path = window.location.pathname;
    var isHome = path === '/' || /\/index\.html$/.test(path) || path === '';

    if (isHome) {
      var staggerMs = 700;
      quickNavLinks.forEach(function (link, i) {
        setTimeout(function () {
          link.classList.add('is-visible');
        }, i * staggerMs);
      });
    } else {
      quickNavLinks.forEach(function (link) {
        link.classList.add('is-visible-static');
      });
    }
  }

  // Collapsible Q&A cards (how-to page) — collapsed by default, header click toggles the answer.
  // If the page is loaded with a hash pointing at one of these cards, expand it automatically.
  var collapsibleCards = document.querySelectorAll('.qa-card.qa-collapsible');
  if (collapsibleCards.length) {
    collapsibleCards.forEach(function (card) {
      var head = card.querySelector('.pricing-card-head');
      head.setAttribute('role', 'button');
      head.setAttribute('tabindex', '0');
      head.addEventListener('click', function () {
        card.classList.toggle('is-expanded');
      });
      head.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('is-expanded');
        }
      });
    });

    function expandFromHash() {
      var hash = window.location.hash;
      if (!hash) return;
      var target = document.querySelector(hash);
      if (!target) return;
      var card = target.classList && target.classList.contains('qa-collapsible')
        ? target
        : target.querySelector('.qa-card.qa-collapsible');
      if (card) card.classList.add('is-expanded');
    }

    expandFromHash();
    window.addEventListener('hashchange', expandFromHash);
  }
})();
