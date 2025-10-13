// === NAV TOGGLE ===
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
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
  });
}


function updateLanguage(lang) {
  const text = translations[lang];
  if (!text) return;

  document.querySelectorAll('[data-key]').forEach((item) => {
    const key = item.getAttribute('data-key');
    if (text[key]) item.textContent = text[key];
  });
}

// === KEEP SAVED LANGUAGE ===
const savedLang = localStorage.getItem('language');
if (savedLang) {
  updateLanguage(savedLang);
}

// === RESOURCES SEARCH FILTER ===
const resourceSearch = document.getElementById('resourceSearch');
const resourceContainer = document.getElementById('resourceContainer');
const resourcesStatus = document.getElementById('resourcesStatus');

if (resourceSearch && resourceContainer) {
  resourceSearch.addEventListener('input', () => {
    const term = resourceSearch.value.toLowerCase();
    const panels = resourceContainer.querySelectorAll('.panel');
    let found = 0;

    panels.forEach((panel) => {
      const text = panel.textContent.toLowerCase();
      if (text.includes(term)) {
        panel.style.display = 'block';
        found++;
      } else {
        panel.style.display = 'none';
      }
    });

    if (term === '') {
      resourcesStatus.textContent = '';
    } else if (found > 0) {
      resourcesStatus.textContent = `Found ${found} result(s).`;
    } else {
      resourcesStatus.textContent = 'No matches found.';
    }
  });
}

// === EVENT SEARCH FILTER ===
const eventSearch = document.getElementById('eventSearch');
const eventList = document.getElementById('eventList');
const clearEventFilters = document.getElementById('clearEventFilters');

if (eventSearch && eventList) {
  eventSearch.addEventListener('input', () => {
    const term = eventSearch.value.toLowerCase();
    const items = eventList.querySelectorAll('li');
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  });

  if (clearEventFilters) {
    clearEventFilters.addEventListener('click', () => {
      eventSearch.value = '';
      const items = eventList.querySelectorAll('li');
      items.forEach((item) => item.style.display = 'block');
    });
  }
}

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const formStatus = document.getElementById('formStatus');

    if (!name.value.trim() || !email.value.trim()) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = 'red';
      return;
    }

    formStatus.textContent = 'Message sent! (not really, but thanks for testing)';
    formStatus.style.color = 'green';
    contactForm.reset();
  });
}




// === THEME SWITCHER (localStorage Implementation) ===

// Save user's theme choice
function setTheme(theme) {
  localStorage.setItem('userTheme', theme);
  document.body.className = theme;
}

// Load saved theme on page load
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  document.body.className = savedTheme;
});

// Button event listeners
const lightBtn = document.getElementById('lightBtn');
const darkBtn = document.getElementById('darkBtn');

if (lightBtn) {
  lightBtn.addEventListener('click', () => setTheme('light'));
}

if (darkBtn) {
  darkBtn.addEventListener('click', () => setTheme('dark'));
}

if (clearDataBtn) {
  clearDataBtn.addEventListener('click', () => {
    localStorage.clear();
    alert("Your saved data has been cleared!");
    document.body.className = 'light';
  });
}
