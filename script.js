const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const progress = document.querySelector('.scroll-progress');

window.addEventListener('load', () => {
  window.setTimeout(() => document.body.classList.add('boot-complete'), 1650);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 80}ms`);
  observer.observe(element);
});

const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionAllowed) {
  const heroVisual = document.querySelector('.hero-visual');
  const monogram = document.querySelector('.monogram');
  document.querySelector('.hero').addEventListener('pointermove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 14;
    const y = (event.clientY / window.innerHeight - 0.5) * 14;
    heroVisual.style.setProperty('--parallax-x', `${x}px`);
    heroVisual.style.setProperty('--parallax-y', `${y}px`);
    monogram.style.setProperty('--tilt-x', `${-y * .45}deg`);
    monogram.style.setProperty('--tilt-y', `${x * .45}deg`);
  });

  document.querySelectorAll('.project-card, .archive-grid a').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    });
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
