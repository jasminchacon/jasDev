const header = document.querySelector('#site-header');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = [...mobileMenu.querySelectorAll('a')];
const navLinks = [...document.querySelectorAll('.nav__desktop a')];
const sections = [...document.querySelectorAll('main section[id]')];
const form = document.querySelector('#contact-form');

const closeMenu = () => {
  hamburger.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Abrir menu');
};

const openMenu = () => {
  hamburger.classList.add('is-open');
  mobileMenu.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Cerrar menu');
};

hamburger.addEventListener('click', (event) => {
  event.stopPropagation();
  hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
});

mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-42% 0px -50% 0px', threshold: 0 });

sections.forEach((section) => spyObserver.observe(section));

new Swiper('.project-swiper', {
  loop: true,
  speed: 600,
  spaceBetween: 28,
  slidesPerView: 1.04,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    640: { slidesPerView: 1.35, spaceBetween: 24 },
    768: { slidesPerView: 2.1, spaceBetween: 28 },
    1024: { slidesPerView: 3, spaceBetween: 34 }
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const message = form.querySelector('.form-message');
  let isValid = true;

  fields.forEach((field) => {
    const invalid = !field.checkValidity() || !field.value.trim();
    field.classList.toggle('is-invalid', invalid);
    if (invalid) isValid = false;
  });

  if (!isValid) {
    message.textContent = 'Completa todos los campos con informacion valida.';
    return;
  }

  message.textContent = 'Gracias por escribir. Tu mensaje quedo listo para enviar.';
  form.reset();
});
