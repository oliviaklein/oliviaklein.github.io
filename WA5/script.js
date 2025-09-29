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