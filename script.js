/* ═══════════════════════════════════════════════════════════════
   SAHIL BHAVSAR PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── Navbar scroll effect & active link ─────────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky nav style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY + 100 >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Hamburger menu ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navLinksEl?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ─── Typing animation ────────────────────────────────────────────
const TYPED_STRINGS = [
  'Aspiring Data Analyst',
  'Python & Pandas Enthusiast',
  'Business Analyst Seeker',
  'Data Cleaning Specialist',
  'Report Generation Expert',
];

let tIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = TYPED_STRINGS[tIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      return setTimeout(typeEffect, 1800);
    }
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % TYPED_STRINGS.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 95);
}
typeEffect();

// ─── Stats counter ───────────────────────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ─── Scroll reveal + lazy-trigger animations ─────────────────────
const revealEls    = document.querySelectorAll('.reveal');
const skillFills   = document.querySelectorAll('.skill-fill');
const softBars     = document.querySelectorAll('.soft-skill-bar');
const statNums     = document.querySelectorAll('.stat-num');
let statsTriggered = false;
let skillsTriggered = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Skill bars observer
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsTriggered) {
      skillsTriggered = true;
      skillFills.forEach(bar => bar.classList.add('animated'));
      softBars.forEach(bar  => bar.classList.add('animated'));
      skillObs.disconnect();
    }
  }, { threshold: 0.2 });
  skillObs.observe(skillsSection);
}

// Stats counter observer
const heroSection = document.getElementById('home');
if (heroSection) {
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsTriggered) {
      statsTriggered = true;
      statNums.forEach(animateCounter);
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(heroSection);
}

// ─── Floating particles ──────────────────────────────────────────
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 22;

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 2;
  const x    = Math.random() * 100;
  const dur  = Math.random() * 15 + 10;
  const del  = Math.random() * 10;
  const hue  = Math.random() > 0.5 ? '196' : '210';

  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${x}%;
    background:hsl(${hue},100%,60%);
    animation-duration:${dur}s;
    animation-delay:${del}s;
    box-shadow: 0 0 ${size*2}px hsl(${hue},100%,60%);
  `;
  return p;
}

if (particleContainer) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particleContainer.appendChild(createParticle());
  }
}

// ─── GitHub-style contribution grid ─────────────────────────────
function buildContribGrid() {
  const grid = document.getElementById('contrib-grid');
  if (!grid) return;

  const WEEKS  = 52;
  const DAYS   = 7;
  const LEVELS = [0,1,2,3,4];

  // Generate pseudo-random activity (reproducible seed-ish pattern)
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';
      // Weight towards recent weeks being more active
      const recency   = w / WEEKS;
      const rand      = Math.random();
      const threshold = 0.35 + recency * 0.25;
      let level = 0;

      if (rand > threshold) {
        const r2 = Math.random();
        level = r2 > 0.7 ? 4 : r2 > 0.5 ? 3 : r2 > 0.3 ? 2 : 1;
      }
      cell.classList.add(`level-${level}`);
      cell.title = `${level > 0 ? level + ' contribution' + (level > 1 ? 's' : '') : 'No contributions'}`;
      grid.appendChild(cell);
    }
  }
}
buildContribGrid();

// ─── Contact form (front-end only validation + success state) ────
const contactForm    = document.getElementById('contact-form');
const formSubmitBtn  = document.getElementById('form-submit-btn');
const formSuccess    = document.getElementById('form-success');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();

  const name    = document.getElementById('cf-name');
  const email   = document.getElementById('cf-email');
  const subject = document.getElementById('cf-subject');
  const message = document.getElementById('cf-message');

  // Basic validation
  let valid = true;
  [name, email, subject, message].forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'rgba(239,68,68,0.6)';
      field.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.1)';
      valid = false;
    } else {
      field.style.borderColor = '';
      field.style.boxShadow   = '';
    }
  });

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRx.test(email.value)) {
    email.style.borderColor = 'rgba(239,68,68,0.6)';
    valid = false;
  }

  if (!valid) return;

  // Simulate submission
  formSubmitBtn.textContent = 'Sending…';
  formSubmitBtn.disabled    = true;

  setTimeout(() => {
    contactForm.reset();
    formSubmitBtn.textContent = 'Send Message';
    formSubmitBtn.disabled    = false;
    if (formSuccess) {
      formSuccess.hidden = false;
      setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }
  }, 1200);
});

// ─── Scroll to top ───────────────────────────────────────────────
document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Project card keyboard accessibility ─────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.querySelector('.project-link')?.click();
    }
  });
});

// ─── Smooth internal link scroll ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
