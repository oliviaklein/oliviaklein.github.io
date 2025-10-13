// === NAV TOGGLE ===
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('open');
  });
}

// === CLEAR DATA BUTTON ===
const clearDataBtn = document.getElementById('clearDataBtn');
if (clearDataBtn) {
  clearDataBtn.addEventListener('click', () => {
    localStorage.clear();
    alert("Your saved data has been cleared!");
    document.body.className = 'light';
  });
}

// === CONTACT FORM VALIDATION ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const formStatus = document.getElementById('formStatus');

    if (!name.value.trim() || !email.value.trim()) {
      if (formStatus) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.style.color = 'red';
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = 'Message sent! (not really, but thanks for testing)';
      formStatus.style.color = 'green';
    }

    contactForm.reset();
  });
}

// === THEME SWITCH ===
// Save user's theme choice
function setTheme(theme) {
  localStorage.setItem('userTheme', theme);
  document.body.className = theme;
}

// Load saved theme on page load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  document.body.className = savedTheme;
});