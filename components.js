document.addEventListener('DOMContentLoaded', function () {

  const BANNER_KEY = 'tt-banner-dismissed';
  if (!sessionStorage.getItem(BANNER_KEY)) {
    const banner = document.createElement('div');
    banner.className = 'announce-banner';
    banner.id = 'announceBanner';
    banner.innerHTML = `<span>Free tutoring appointments are now available for Fall 2026.</span><a href="get-tutoring.html">Book a Session &rarr;</a><button class="announce-banner-close" aria-label="Dismiss" id="bannerClose">&times;</button>`;
    document.body.insertBefore(banner, document.body.firstChild);
    document.getElementById('bannerClose').addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem(BANNER_KEY, '1');
    });
  }

  const NAV_LINKS = [
    { href: 'get-tutoring.html', label: 'Get Tutoring' },
    { href: 'subjects.html',     label: 'Subjects' },
    { href: 'impact.html',       label: 'Impact' },
    { href: 'team.html',         label: 'Our Team' },
    { href: 'about.html',        label: 'About' },
    { href: 'support.html',      label: 'Support Us' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navLinksHTML = NAV_LINKS.map(({ href, label }) => {
    const active = href === currentPage ? ' class="active"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  const mobileNavHTML = NAV_LINKS.map(({ href, label }) =>
    `<a href="${href}">${label}</a>`
  ).join('');

  const header = document.createElement('header');
  header.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo" aria-label="TurboTutors Home">
        <img src="logo-rounded.png" alt="TurboTutors" />
        TurboTutors
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        ${navLinksHTML}
      </nav>
      <div class="nav-actions">
        <a href="get-tutoring.html" class="btn-nav" id="nav-book-btn">Book a Free Session</a>
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;

  document.body.insertBefore(header, document.body.firstChild);

  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobileNav';
  mobileNav.setAttribute('aria-label', 'Mobile navigation');
  mobileNav.innerHTML = mobileNavHTML;
  header.insertAdjacentElement('afterend', mobileNav);

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const footer = document.createElement('footer');
  footer.setAttribute('role', 'contentinfo');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="index.html" class="logo" aria-label="TurboTutors Home">
          <img src="logo-rounded.png" alt="TurboTutors" />
          TurboTutors
        </a>
        <p>Free, personalized virtual tutoring. Student-led since January 2024.</p>
        <p class="footer-sponsor">Fiscally sponsored by the Institute for Education, Research, and Scholarships (IFERS), a 501(c)(3) nonprofit organization.</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <a href="index.html">Home</a>
        <a href="get-tutoring.html">Get Tutoring</a>
        <a href="subjects.html">Subjects</a>
        <a href="impact.html">Impact</a>
        <a href="team.html">Our Team</a>
        <a href="about.html">About</a>
        <a href="support.html">Support Us</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="mailto:turbotutors1@gmail.com">turbotutors1@gmail.com</a>
        <a href="get-tutoring.html">Book a Session</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="copy-year"></span> TurboTutors. Established in January 2024 &bull; New Jersey.</span>
      <a href="mailto:turbotutors1@gmail.com">turbotutors1@gmail.com</a>
    </div>`;
  document.body.appendChild(footer);

  document.querySelectorAll('#copy-year').forEach(el => { el.textContent = new Date().getFullYear(); });

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

});
