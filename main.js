// ── Nav scroll effect & burger ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(13,27,62,0.98)'
    : 'rgba(13,27,62,0.93)';
});

burger?.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close menu on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navbar.classList.remove('open'));
});

// ── Active nav link ───────────────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks?.querySelectorAll('a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Scroll reveal ─────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Article filter (articles page) ────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card-dark[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.filter;
    articleCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ── Contact form submission ────────────────────────────────────────────────
const contactForm = document.getElementById('joinForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.form-submit');
  submitBtn.textContent = 'Odosiela sa…';
  submitBtn.disabled = true;

  // Build form data as mailto (no backend) + show success
  const data = new FormData(contactForm);
  const name    = data.get('name')    || '';
  const email   = data.get('email')   || '';
  const year    = data.get('year')    || '';
  const faculty = data.get('faculty') || '';
  const message = data.get('message') || '';

  const subject = encodeURIComponent(`Prihláška ESIC – ${name}`);
  const body = encodeURIComponent(
    `Meno: ${name}\nEmail: ${email}\nRočník: ${year}\nOdbor: ${faculty}\n\nMotivačný list:\n${message}`
  );

  // Small delay for UX feel
  await new Promise(r => setTimeout(r, 800));

  // Open email client as fallback (works without backend)
  window.location.href = `mailto:androsenkovladyslav@gmail.com?subject=${subject}&body=${body}`;

  // Show success message
  contactForm.style.display = 'none';
  formSuccess.classList.add('show');
});
