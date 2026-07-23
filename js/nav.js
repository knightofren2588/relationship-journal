/* ============================================================
   nav.js — Tabs + hamburger menu

   HOW THE TABS WORK (hash routing):
   The address bar's "#" part is called the hash. Clicking a nav
   link like <a href="#journal"> changes the hash WITHOUT
   reloading the page, and the browser fires a "hashchange"
   event. We listen for it and show only the <section class="page">
   whose id matches. Because the hash is part of the URL, the
   back button works and every tab has its own link you can share.
   ============================================================ */

function showPage() {
  const pages = document.querySelectorAll('.page');
  let hash = window.location.hash || '#home';

  // If the hash doesn't match any page (e.g. a typo), go home
  if (!document.getElementById(hash.slice(1))) {
    hash = '#home';
  }

  // Show the matching page, hide the rest
  pages.forEach(page => {
    page.classList.toggle('active', '#' + page.id === hash);
  });

  // Highlight the active nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });

  // Start each page from the top
  window.scrollTo(0, 0);

  // On mobile, close the menu after choosing a page
  closeMenu();
}

/* ============================================================
   HAMBURGER
   On phones the links hide and the three-bar button appears.
   Clicking it toggles an "open" class; CSS does the rest
   (shows the menu, folds the bars into an X).
   ============================================================ */

function closeMenu() {
  const menu = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (burger) {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showPage(); // show the right page on first load

  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
  }
});

// React whenever the hash changes (nav clicks, back/forward buttons)
window.addEventListener('hashchange', showPage);
