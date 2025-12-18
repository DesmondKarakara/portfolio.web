// script.js
// Smooth scrolling, mobile nav toggle, back-to-top, minimal accessibility enhancements

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // If mobile nav is open, close it
        const nav = document.getElementById('main-nav');
        if (nav && nav.classList.contains('show')) {
          nav.classList.remove('show');
          const toggle = document.getElementById('nav-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('show');
      this.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  function handleScroll() {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.blur();
    });
    // keyboard accessibility
    backToTop.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Simple focus outline for keyboard users
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('show-focus');
    }
  });
});
