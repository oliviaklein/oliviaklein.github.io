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

// === TRANSLATIONS ===
const translations = {
  en: {
    // HOME
    title: "Boulder County Beekeepers Association",
    mission: "Our mission: “To foster responsible beekeeping in Boulder County, Colorado, through education, public service and conscientious beekeeping.”",
    startHere: "Start Here",
    startText: "New or returning to beekeeping? Visit Resources for basics, checklists, and hive health info.",
    whatsNext: "What’s Next",
    nextText: "See upcoming meetings and classes on Events. If nothing’s posted yet, check back soon.",
    questions: "Questions",
    questionsText: "Need help or have a general question? Head to Contact.",

    // CONTACT
    contactTitle: "Contact",
    contactIntro: "Questions, membership, or general info — send us a note below.",
    contactHeader: "Send a Message",
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
    event1: "Monthly Meeting",
    event2: "Beginner Basics (Class)",
    event3: "Field Day",
    checkBack: "If you don’t see new items yet, please check back soon.",
    howToRSVP: "How to RSVP",
    searchEvents: "Search Events",
    btnClear: "Clear Search",
    rsvpNote: "RSVP details will be posted with each event here. For questions, use the Contact page.",
    pastHeader: "Past Highlights",
    past1: "Workshop: Varroa Monitoring & Treatment Basics",
    past2: "Talk: Pollinator-Friendly Gardening in Boulder County",

    // RESOURCES
    resourcesTitle: "Resources",
    findResource: "Find a Resource",
    searchLabel: "Search Keywords",
    basicsTitle: "Beekeeping Basics",
    healthTitle: "Hive Health",
    gardenTitle: "Pollinator-Friendly Gardening",
    localTitle: "Local Info",

    // PRIVACY
    privacyTitle: "Privacy Statement",
    privacyText: "This site stores your language preference locally to improve your experience. No personal or external data is collected. You can clear your saved preferences anytime. Stored preferences automatically expire after 7 days."
  },

  es: {
    // HOME
    title: "Asociación de Apicultores del Condado de Boulder",
    mission: "Nuestra misión: “Fomentar la apicultura responsable en el Condado de Boulder, Colorado, mediante la educación, el servicio público y la apicultura consciente.”",
    startHere: "Empieza Aquí",
    startText: "¿Nuevo o regresando a la apicultura? Visita Recursos para lo básico, listas de verificación y salud de la colmena.",
    whatsNext: "Qué Sigue",
    nextText: "Consulta las próximas reuniones y clases en Eventos. Si aún no hay nada publicado, vuelve pronto.",
    questions: "Preguntas",
    questionsText: "¿Necesitas ayuda o tienes una pregunta general? Ve a Contacto.",

    // CONTACT
    contactTitle: "Contacto",
    contactIntro: "Preguntas, membresía o información general — envíanos un mensaje abajo.",
    contactHeader: "Enviar Mensaje",
    labelName: "Nombre",
    labelEmail: "Correo Electrónico",
    labelTopic: "Tema",
    topicMembership: "Membresía",
    topicEvents: "Eventos",
    topicResources: "Recursos",
    topicGeneral: "Pregunta General",
    labelMessage: "Mensaje",
    btnSend: "Enviar",

    // EVENTS
    eventsTitle: "Eventos",
    upcomingHeader: "Próximos",
    event1: "Reunión Mensual",
    event2: "Conceptos Básicos para Principiantes (Clase)",
    event3: "Día de Campo",
    checkBack: "Si aún no ves nuevos eventos, vuelve pronto.",
    howToRSVP: "Cómo Confirmar Asistencia",
    searchEvents: "Buscar Eventos",
    btnClear: "Borrar Búsqueda",
    rsvpNote: "Los detalles para confirmar asistencia se publicarán con cada evento aquí. Para preguntas, usa la página de Contacto.",
    pastHeader: "Eventos Pasados",
    past1: "Taller: Monitoreo y Tratamiento de Varroa",
    past2: "Charla: Jardinería Amigable con los Polinizadores en el Condado de Boulder",

    // RESOURCES
    resourcesTitle: "Recursos",
    findResource: "Buscar un Recurso",
    searchLabel: "Buscar Palabras Clave",
    basicsTitle: "Conceptos Básicos de la Apicultura",
    healthTitle: "Salud de la Colmena",
    gardenTitle: "Jardinería Amigable con los Polinizadores",
    localTitle: "Información Local",

    // PRIVACY
    privacyTitle: "Declaración de Privacidad",
    privacyText: "Este sitio guarda tu preferencia de idioma localmente para mejorar tu experiencia. No se recopilan datos personales ni externos. Puedes borrar tus preferencias guardadas en cualquier momento. Las preferencias almacenadas caducan automáticamente después de 7 días."
  }
};

// === LANGUAGE FUNCTIONS ===
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateLanguage(lang);
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