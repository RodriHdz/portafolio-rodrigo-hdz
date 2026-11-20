/* ============================================================
   CONFIGURACIÓN PERSONAL
   Completa estos datos para activar tus enlaces de contacto.
   ============================================================ */

const CONTACT_EMAIL = 'rodrigoqhdz11@outlook.com';
const GITHUB_URL = 'https://github.com/RodriHdz';
const LINKEDIN_URL = 'https://www.linkedin.com/in/rodrigo-quiroz-hernandez/';

/* ============================================================
   ELEMENTOS DEL DOCUMENTO
   ============================================================ */

const header = document.querySelector('#siteHeader');
const navigation = document.querySelector('#mainNavigation');
const navLinks = document.querySelectorAll('.nav-links .nav-link');
const progressBar = document.querySelector('#scrollProgress');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const projectDialog = document.querySelector('#projectDialog');
const closeDialogButton = document.querySelector('.dialog-close');

/* ============================================================
   MENÚ RESPONSIVE
   Bootstrap controla la apertura y el cierre del menú.
   Este código lo cierra después de seleccionar una sección.
   ============================================================ */

const navigationLinks = navigation.querySelectorAll('a[href^="#"]');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navigation.classList.contains('show')) {
      const navigationCollapse = window.bootstrap.Collapse.getOrCreateInstance(
        navigation,
        { toggle: false },
      );

      navigationCollapse.hide();
    }
  });
});

/* ============================================================
   ANIMACIONES DE ENTRADA
   Los elementos aparecen cuando entran en la pantalla.
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -36px 0px',
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

/* ============================================================
   PROGRESO DE SCROLL Y HEADER
   ============================================================ */

let scrollFrameRequested = false;

const updateScrollState = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  progressBar.style.width = `${Math.min(progress, 100)}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  scrollFrameRequested = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!scrollFrameRequested) {
      window.requestAnimationFrame(updateScrollState);
      scrollFrameRequested = true;
    }
  },
  { passive: true },
);

updateScrollState();

/* ============================================================
   NAVEGACIÓN ACTIVA
   Resalta en el menú la sección que se está visualizando.
   ============================================================ */

const pageSections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    {
      rootMargin: '-28% 0px -62% 0px',
      threshold: 0,
    },
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}

/* ============================================================
   DETALLES DE PROYECTOS
   La información se encuentra en los atributos data-* del HTML.
   JavaScript únicamente actualiza el texto del cuadro de diálogo.
   ============================================================ */

const dialogEyebrow = document.querySelector('#dialogEyebrow');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogStack = document.querySelector('#dialogStack');
const dialogStatus = document.querySelector('#dialogStatus');
const projectButtons = document.querySelectorAll('.project-details-button');

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dialogEyebrow.textContent = button.dataset.projectCategory;
    dialogTitle.textContent = button.dataset.projectTitle;
    dialogDescription.textContent = button.dataset.projectDescription;
    dialogStack.textContent = button.dataset.projectStack.split(',').join(' · ');
    dialogStatus.textContent = button.dataset.projectStatus;

    projectDialog.showModal();
  });
});

closeDialogButton.addEventListener('click', () => {
  projectDialog.close();
});

projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});

/* ============================================================
   ENLACES DE CONTACTO
   Los enlaces se activan al completar la configuración inicial.
   ============================================================ */

const configureSocialLink = (element, url) => {
  if (!url) {
    element.addEventListener('click', (event) => event.preventDefault());
    return;
  }

  element.href = url;
  element.target = '_blank';
  element.rel = 'noopener noreferrer';
  element.classList.remove('is-disabled');
  element.removeAttribute('aria-disabled');
};

configureSocialLink(document.querySelector('#githubLink'), GITHUB_URL);
configureSocialLink(document.querySelector('#linkedinLink'), LINKEDIN_URL);

const emailLink = document.querySelector('#emailLink');

if (CONTACT_EMAIL) {
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
  emailLink.classList.remove('is-disabled');
  emailLink.removeAttribute('aria-disabled');
} else {
  emailLink.addEventListener('click', (event) => event.preventDefault());
}

/* ============================================================
   FORMULARIO DE CONTACTO
   Prepara un correo usando la aplicación de correo del visitante.
   ============================================================ */

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  if (!CONTACT_EMAIL) {
    formStatus.textContent = 'Agrega tu correo en la sección CONFIGURACIÓN PERSONAL de main.js.';
    formStatus.classList.add('is-warning');
    return;
  }

  const formData = new FormData(contactForm);
  const senderName = formData.get('name').trim();
  const senderEmail = formData.get('email').trim();
  const message = formData.get('message').trim();
  const subject = encodeURIComponent(`Contacto desde tu portafolio — ${senderName}`);
  const body = encodeURIComponent(
    `Hola Rodrigo,\n\n${message}\n\nMi correo: ${senderEmail}`,
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Tu aplicación de correo está lista para enviar el mensaje.';
  formStatus.classList.remove('is-warning');
});

document.querySelector('#currentYear').textContent = new Date().getFullYear();
