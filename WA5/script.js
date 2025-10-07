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





// language buttons
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateLanguage(lang);
}





// change text based on chosen language (just basic example)
function updateLanguage(lang) {
  const stuff = document.querySelectorAll('[data-key]');
  stuff.forEach((item) => {
    // i didn’t make a full translation system, but you could add one here
    if (lang === 'es') {
      if (item.dataset.key === 'title') item.textContent = 'Asociación de Apicultores del Condado de Boulder';
    } else {
      if (item.dataset.key === 'title') item.textContent = 'Boulder County Beekeepers Association';
    }
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