const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');
const firstLink = navMenu.querySelector('a');

function openMenu() {
  navMenu.classList.add('show');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');

  if (firstLink) firstLink.focus();
}

function closeMenu() {
  navMenu.classList.remove('show');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.focus();
}

function toggleMenu() {
  const isOpen = navMenu.classList.contains('show');
  isOpen ? closeMenu() : openMenu();
}



navToggle.addEventListener('click', toggleMenu);



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



document.addEventListener('click', (e) => {
  const clickInsideNav = e.target.closest('.main-nav');
  if (!clickInsideNav && navMenu.classList.contains('show')) {
    closeMenu();
  }
});


/* ===== Feature A: Resources search (input event) ===== */
(function () {
  const search = document.getElementById('resourceSearch');
  if (!search) return; // only on resources page
  const container = document.getElementById('resourceContainer') || document.querySelector('main');
  const items = Array.from(container.querySelectorAll('li'));
  const status = document.getElementById('resourcesStatus');

  function applyResourceFilter() {
    const term = search.value.toLowerCase().trim();
    let shown = 0;
    items.forEach(li => {
      const ok = !term || li.textContent.toLowerCase().includes(term);
      li.classList.toggle('is-hidden', !ok);
      if (ok) shown++;
    });
    if (status) status.textContent = `${shown} item${shown === 1 ? '' : 's'} shown`;
  }

  search.addEventListener('input', applyResourceFilter);
  applyResourceFilter(); // initial
})();

/* ===== Feature B: Events search (input + click clear) ===== */
(function () {
  const search = document.getElementById('eventSearch');
  if (!search) return; // only on events page
  const list = document.getElementById('eventList');
  const items = list ? Array.from(list.querySelectorAll('li')) : [];
  const status = document.getElementById('eventsStatus');
  const clearBtn = document.getElementById('clearEventFilters');

  function applyEventFilter() {
    const term = search.value.toLowerCase().trim();
    let shown = 0;
    items.forEach(li => {
      const ok = !term || li.textContent.toLowerCase().includes(term);
      li.classList.toggle('is-hidden', !ok);
      if (ok) shown++;
    });
    if (status) status.textContent = `${shown} event${shown === 1 ? '' : 's'} shown`;
  }

  search.addEventListener('input', applyEventFilter);
  if (clearBtn) clearBtn.addEventListener('click', () => { search.value = ''; applyEventFilter(); });
  applyEventFilter(); // initial
})();

/* ===== Feature C: Contact form validation (submit + input/blur) ===== */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return; // only on contact page

  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const msg = form.querySelector('#message');
  const nameErr = form.querySelector('#nameErr');
  const emailErr = form.querySelector('#emailErr');
  const msgErr = form.querySelector('#msgErr');
  const formStatus = form.querySelector('#formStatus');

  function validateName() {
    if (!name.value.trim()) {
      name.setAttribute('aria-invalid', 'true');
      nameErr.textContent = 'Please enter your name.';
      return false;
    }
    name.removeAttribute('aria-invalid');
    nameErr.textContent = '';
    return true;
  }

  function validateEmail() {
    const ok = /.+@.+\..+/.test(email.value.trim());
    if (!ok) {
      email.setAttribute('aria-invalid', 'true');
      emailErr.textContent = 'Enter a valid email like name@example.com.';
      return false;
    }
    email.removeAttribute('aria-invalid');
    emailErr.textContent = '';
    return true;
  }

  function validateMsg() {
    if (msg.value.trim().length < 3) {
      msg.setAttribute('aria-invalid', 'true');
      msgErr.textContent = 'A short message helps us route your question.';
      return false;
    }
    msg.removeAttribute('aria-invalid');
    msgErr.textContent = '';
    return true;
  }

  ['input','blur'].forEach(ev => {
    name.addEventListener(ev, validateName);
    email.addEventListener(ev, validateEmail);
    msg.addEventListener(ev, validateMsg);
  });

  form.addEventListener('submit', (e) => {
    const ok = [validateName(), validateEmail(), validateMsg()].every(Boolean);
    if (!ok) {
      e.preventDefault();
      formStatus.textContent = 'Please fix the fields marked above.';
      return;
    }
    // demo only; prevent real submit
    e.preventDefault();
    formStatus.textContent = 'Thanks! Your message was recorded (demo).';
    form.reset();
  });
})();


/* ===== FEATURE D: LANGUAGE SWITCHER ===== */

// Translation data
const translations = {
  en: {
    title: "Boulder County Beekeepers Association",
    mission: "Our mission: “To foster responsible beekeeping in Boulder County, Colorado, through education, public service and conscientious beekeeping.”",
    startHere: "Start here",
    startText: "New or returning to beekeeping? Visit Resources for basics, checklists, and hive health info.",
    whatsNext: "What’s next",
    nextText: "See upcoming meetings and classes on Events. If nothing’s posted yet, check back soon.",
    questions: "Questions",
    questionsText: "Need help or have a general question? Head to Contact.",
 // CONTACT
    contactTitle: "Contact",
    contactIntro: "Questions, membership, or general info — send us a note below.",
    contactHeader: "Send a message",
    labelName: "Name",
    labelEmail: "Email",
    labelTopic: "Topic",
    topicMembership: "Membership",
    topicEvents: "Events",
    topicResources: "Resources",
    topicGeneral: "General Question",
    labelMessage: "Message",
    btnSend: "Send",
    // EVENTS
    eventsTitle: "Events",
    upcomingHeader: "Upcoming",
    checkBack: "If you don’t see new items yet, please check back soon.",
    howToRSVP: "How to RSVP",
    searchEvents: "Search events",
    btnClear: "Clear search",
    rsvpNote: "RSVP details will be posted here. For questions, use the Contact page.",
    pastHeader: "Past Highlights",
    // RESOURCES
    resourcesTitle: "Resources",
    findResource: "Find a resource",
    searchLabel: "Search keywords",
    basicsTitle: "Beekeeping Basics",
    healthTitle: "Hive Health",
    gardenTitle: "Pollinator-Friendly Gardening",
    localTitle: "Local Info",
    privacyTitle: "Privacy Statement",
    privacyText: "This site stores your language preference locally to improve your experience. No personal or external data is collected. You can clear your saved preferences anytime. Stored preferences automatically expire after 7 days."
  },
  es: {
    title: "Asociación de Apicultores del Condado de Boulder",
    mission: "Nuestra misión: “Fomentar la apicultura responsable en el Condado de Boulder, Colorado, a través de la educación, el servicio público y la apicultura consciente.”",
    startHere: "Empieza aquí",
    startText: "¿Nuevo o regresando a la apicultura? Visita Recursos para lo básico, listas de verificación e información de salud de la colmena.",
    whatsNext: "Qué sigue",
    nextText: "Consulta las próximas reuniones y clases en Eventos. Si aún no hay nada publicado, vuelve pronto.",
    questions: "Preguntas",
    questionsText: "¿Necesitas ayuda o tienes una pregunta general? Ve a Contacto.",
    contactTitle: "Contacto",
    contactIntro: "Preguntas, membresía o información general — envíanos un mensaje abajo.",
    contactHeader: "Enviar un mensaje",
    labelName: "Nombre",
    labelEmail: "Correo electrónico",
    labelTopic: "Tema",
    topicMembership: "Membresía",
    topicEvents: "Eventos",
    topicResources: "Recursos",
    topicGeneral: "Pregunta general",
    labelMessage: "Mensaje",
    btnSend: "Enviar",
    // EVENTS
    eventsTitle: "Eventos",
    upcomingHeader: "Próximos",
    checkBack: "Si aún no ves nuevos elementos, vuelve pronto.",
    howToRSVP: "Cómo confirmar asistencia",
    searchEvents: "Buscar eventos",
    btnClear: "Borrar búsqueda",
    rsvpNote: "Los detalles para confirmar asistencia se publicarán aquí. Para preguntas, usa la página de Contacto.",
    pastHeader: "Eventos anteriores",
    // RESOURCES
    resourcesTitle: "Recursos",
    findResource: "Encuentra un recurso",
    searchLabel: "Palabras clave",
    basicsTitle: "Conceptos básicos de apicultura",
    healthTitle: "Salud de la colmena",
    gardenTitle: "Jardinería amigable con polinizadores",
    localTitle: "Información local",
    privacyTitle: "Declaración de privacidad",
    privacyText: "Este sitio guarda tu preferencia de idioma localmente para mejorar tu experiencia. No se recopilan datos personales ni externos. Puedes borrar tus preferencias guardadas en cualquier momento. Las preferencias se eliminan automáticamente después de 7 días."
  }
};

// Apply translations to the page
function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Save language choice
function setLanguage(lang) {
  localStorage.setItem('userLanguage', lang);
  applyLanguage(lang);
}

// Load on page visit (AFTER translations exist)
const userLang = localStorage.getItem('userLanguage') || 'en';
applyLanguage(userLang);


/* ===== FEATURE E: CLEAR USER DATA (Popup Version) ===== */
const clearBtn = document.getElementById('clearDataBtn');
const popup = document.getElementById('popupMessage');

if (clearBtn && popup) {
  clearBtn.addEventListener('click', () => {
    localStorage.clear();
    applyLanguage('en'); // reset to English
    popup.classList.add('show');

    // Hide popup after 3 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  });
}

/* ===== FEATURE F: LANGUAGE DATA EXPIRATION ===== */
const now = Date.now();
const expiryDays = 7;
const savedTime = localStorage.getItem('savedTime');

if (!savedTime || now - savedTime > expiryDays * 24 * 60 * 60 * 1000) {
  localStorage.clear();
  localStorage.setItem('savedTime', now);
} else {
  localStorage.setItem('savedTime', now);
}