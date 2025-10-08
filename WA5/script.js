// nav toggle button
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');





// when you click the nav button it opens and closes the menu
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.classList.toggle('open');
});





// clear data button
const clearDataBtn = document.getElementById('clearDataBtn');
const popupMessage = document.getElementById('popupMessage');





// this just clears local storage and shows a small message
clearDataBtn.addEventListener('click', () => {
  localStorage.clear();
  showPopup();
});





// show popup for a few seconds
function showPopup() {
  popupMessage.classList.add('show');
  setTimeout(() => {
    popupMessage.classList.remove('show');
  }, 2500);
}



// a lot of translations from english to spanish for website translation
const translations = {
  en: {
    // home
    title: "Boulder County Beekeepers Association",
    mission: "Our mission: “To foster responsible beekeeping in Boulder County, Colorado, through education, public service and conscientious beekeeping.”",
    startHere: "Start Here",
    startText: "New or returning to beekeeping? Visit Resources for basics, checklists, and hive health info.",
    whatsNext: "What’s Next",
    nextText: "See upcoming meetings and classes on Events. If nothing’s posted yet, check back soon.",
    questions: "Questions",
    questionsText: "Need help or have a general question? Head to Contact.",

    // contact
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

    // events
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

    // resources
    resourcesTitle: "Resources",
    findResource: "Find a Resource",
    searchLabel: "Search Keywords",
    basicsTitle: "Beekeeping Basics",
    basicsTitle: "Beekeeping Basics",
    basics1: "Seasonal Checklist (Spring / Summer / Fall / Winter)",
    basics2: "Starter Equipment List",
    basics3: "Safety Tips and Protective Gear",
    healthTitle: "Hive Health",
    health1: "Varroa Mites — Monitoring & Treatment Overview",
    health2: "Common Diseases (AFB, EFB, Nosema) Quick Notes",
    health3: "Feeding and Nutrition Basics",
    gardenTitle: "Pollinator-Friendly Gardening",
    garden1: "Native Plants & Bloom Timing",
    garden2: "Pesticide Safety and Alternatives",
    garden3: "Creating Habitat: Water, Shelter, Forage",
    localTitle: "Local Info",
    local1: "Local Regulations & HOA Considerations",
    local2: "Where to Find Supplies in Boulder County",
    local3: "Who to Contact for General Questions (See the Contact Page)",

    // privacy
    privacyTitle: "Privacy Statement",
    privacyText: "This site stores your language preference locally to improve your experience. No personal or external data is collected. You can clear your saved preferences anytime. Stored preferences automatically expire after 7 days."
  },








  
  es: {
    // home translated
    title: "Asociación de Apicultores del Condado de Boulder",
    mission: "Nuestra misión: “Fomentar la apicultura responsable en el Condado de Boulder, Colorado, mediante la educación, el servicio público y la apicultura consciente.”",
    startHere: "Empieza Aquí",
    startText: "¿Nuevo o regresando a la apicultura? Visita Recursos para lo básico, listas de verificación y salud de la colmena.",
    whatsNext: "Qué Sigue",
    nextText: "Consulta las próximas reuniones y clases en Eventos. Si aún no hay nada publicado, vuelve pronto.",
    questions: "Preguntas",
    questionsText: "¿Necesitas ayuda o tienes una pregunta general? Ve a Contacto.",

    // contact translations
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

    // events translations
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

    // resources translated
    resourcesTitle: "Recursos",
    findResource: "Buscar un Recurso",
    searchLabel: "Buscar Palabras Clave",
    basicsTitle: "Conceptos Básicos de la Apicultura",
    basicsTitle: "Conceptos Básicos de la Apicultura",
    basics1: "Lista de Verificación Estacional (Primavera / Verano / Otoño / Invierno)",
    basics2: "Lista de Equipos para Principiantes",
    basics3: "Consejos de Seguridad y Equipo de Protección",
    healthTitle: "Salud de la Colmena",
    health1: "Ácaros Varroa — Resumen de Monitoreo y Tratamiento",
    health2: "Enfermedades Comunes (AFB, EFB, Nosema) — Notas Rápidas",
    health3: "Conceptos Básicos de Alimentación y Nutrición",
    gardenTitle: "Jardinería Amigable con los Polinizadores",
    garden1: "Plantas Nativas y Épocas de Floración",
    garden2: "Seguridad con Pesticidas y Alternativas",
    garden3: "Creación de Hábitat: Agua, Refugio y Alimento",
    localTitle: "Información Local",
    local1: "Reglamentos Locales y Consideraciones de HOA",
    local2: "Dónde Encontrar Suministros en el Condado de Boulder",
    local3: "A Quién Contactar para Preguntas Generales (Ver la Página de Contacto)",
    

    // privacy
    privacyTitle: "Declaración de Privacidad",
    privacyText: "Este sitio guarda tu preferencia de idioma localmente para mejorar tu experiencia. No se recopilan datos personales ni externos. Puedes borrar tus preferencias guardadas en cualquier momento. Las preferencias almacenadas caducan automáticamente después de 7 días."
  }
};




// language buttons
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateLanguage(lang);
}





// change text based on chosen language
function updateLanguage(lang) {
  const text = translations[lang];
  const stuff = document.querySelectorAll('[data-key]');
  
  stuff.forEach((item) => {
    const key = item.getAttribute('data-key');
    if (text[key]) item.textContent = text[key];
  });
}



// keep saved language between visits
const savedLang = localStorage.getItem('language');
if (savedLang) updateLanguage(savedLang);





// resources search filter
const resourceSearch = document.getElementById('resourceSearch');
const resourceContainer = document.getElementById('resourceContainer');
const resourcesStatus = document.getElementById('resourcesStatus');




if (resourceSearch) {
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





    // tell the user what’s happening
    if (term === '') {
      resourcesStatus.textContent = '';
    } else if (found > 0) {
      resourcesStatus.textContent = `Found ${found} result(s).`;
    } else {
      resourcesStatus.textContent = 'No matches found.';
    }
  });
}






// event search filter
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







  // clear search
  clearEventFilters.addEventListener('click', () => {
    eventSearch.value = '';
    const items = eventList.querySelectorAll('li');
    items.forEach((item) => item.style.display = 'block');
  });
}







// form validation (contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();






    // grab input values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');






    // simple check (nothing fancy)
    if (!name.value.trim() || !email.value.trim()) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = 'red';
      return;
    }

    


    // pretend it sends (for now)
    formStatus.textContent = 'Message sent! (not really, but thanks for testing)';
    formStatus.style.color = 'green';




    // clear the form
    contactForm.reset();
  });
}