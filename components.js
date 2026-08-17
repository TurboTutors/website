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
      <div class="footer-col">
        <h4>Socials</h4>
        <div class="social-links">
          <a href="https://www.linkedin.com/company/turbotutors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.instagram.com/realturbotutors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@turbotutors" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          <a href="https://github.com/TurboTutors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
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
