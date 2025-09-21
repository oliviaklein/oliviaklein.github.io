const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');
const firstLink = navMenu.querySelector('a');

function openMenu() {
  navMenu.classList.add('show');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  // move focus to first menu link for keyboard users
  if (firstLink) firstLink.focus();
}

function closeMenu() {
  navMenu.classList.remove('show');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  // return focus to the toggle button
  navToggle.focus();
}

function toggleMenu() {
  const isOpen = navMenu.classList.contains('show');
  isOpen ? closeMenu() : openMenu();
}

/* Click toggles */
navToggle.addEventListener('click', toggleMenu);

/* Keyboard: Space/Enter on the button toggles; Esc closes when open */
navToggle.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    closeMenu();
  }
});

/* Click outside to close */
document.addEventListener('click', (e) => {
  const clickInsideNav = e.target.closest('.main-nav');
  if (!clickInsideNav && navMenu.classList.contains('show')) {
    closeMenu();
  }
});