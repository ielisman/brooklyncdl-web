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
})();
