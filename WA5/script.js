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
    title: "Boulder County Beekeepers Association",
    mission: "Our mission: “To foster responsible beekeeping in Boulder County, Colorado, through education, public service and conscientious beekeeping.”",
    startHere: "Start Here",
    startText: "New or returning to beekeeping? Visit Resources for basics, checklists, and hive health info.",
    whatsNext: "What’s Next",
    nextText: "See upcoming meetings and classes on Events. If nothing’s posted yet, check back soon.",
    questions: "Questions",
    questionsText: "Need help or have a general question? Head to Contact.",
    contactTitle: "Contact",
    contactIntro: "Questions, membership, or general info — send us a note below.",
    contactHeader: "Send a Message",
    labelName: "Name",
    labelEmail: "Email",
    labelTopic: "Topic",
    labelMessage: "Message",
    btnSend: "Send",
    eventsTitle: "Events",
    upcomingHeader: "Upcoming",
    howToRSVP: "How to RSVP",
    searchEvents: "Search Events",
    btnClear: "Clear Search",
    pastHeader: "Past Highlights",
    resourcesTitle: "Resources",
    findResource: "Find a Resource",
    searchLabel: "Search Keywords",
    privacyTitle: "Privacy Statement",
    privacyText: "This site stores your language preference locally to improve your experience. No personal or external data is collected. You can clear your saved preferences anytime. Stored preferences automatically expire after 7 days."
  },
  es: {
    title: "Asociación de Apicultores del Condado de Boulder",
    mission: "Nuestra misión: “Fomentar la apicultura responsable en el Condado de Boulder, Colorado, mediante la educación, el servicio público y la apicultura consciente.”",
    startHere: "Empieza Aquí",
    startText: "¿Nuevo o regresando a la apicultura? Visita Recursos para lo básico, listas de verificación y salud de la colmena.",
    whatsNext: "Qué Sigue",
    nextText: "Consulta las próximas reuniones y clases en Eventos. Si aún no hay nada publicado, vuelve pronto.",
    questions: "Preguntas",
    questionsText: "¿Necesitas ayuda o tienes una pregunta general? Ve a Contacto.",
    contactTitle: "Contacto",
    contactIntro: "Preguntas, membresía o información general — envíanos un mensaje abajo.",
    contactHeader: "Enviar Mensaje",
    labelName: "Nombre",
    labelEmail: "Correo Electrónico",
    labelTopic: "Tema",
    labelMessage: "Mensaje",
    btnSend: "Enviar",
    eventsTitle: "Eventos",
    upcomingHeader: "Próximos",
    howToRSVP: "Cómo Confirmar Asistencia",
    searchEvents: "Buscar Eventos",
    btnClear: "Borrar Búsqueda",
    pastHeader: "Eventos Pasados",
    resourcesTitle: "Recursos",
    findResource: "Buscar un Recurso",
    searchLabel: "Buscar Palabras Clave",
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