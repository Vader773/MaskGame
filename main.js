/* ============================================================
   MASK — Marketing Website Scripts
   Particle system, scroll effects, cursor, forms
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Only init cursor on non-touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNavigation();
  initScrollReveal();
  initWaitlistForms();

  if (!prefersReducedMotion) {
    initParticles();
    initParallax();
    if (!isTouch) initCursorGlow();
  }
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta');

  // Scroll-based nav opacity
  let lastScroll = 0;
  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile menu
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = targetId === '#hero' ? 0 : 72;
        const pos = target.offsetTop - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   PARTICLE SYSTEM (Hero)
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;
  let isVisible = true;

  const PARTICLE_COUNT = 75;
  const COLORS = [
    'rgba(74, 125, 255, 0.4)',   // bright blue
    'rgba(74, 125, 255, 0.2)',   // dim blue
    'rgba(125, 164, 255, 0.3)',  // pale blue
    'rgba(249, 115, 22, 0.15)',  // very faint orange
  ];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.2),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function update() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      // Wrap around
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      const glow = Math.sin(p.pulse) * 0.4 + 0.6;
      ctx.globalAlpha = p.opacity * glow;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function animate() {
    if (!isVisible) return;
    update();
    draw();
    animFrame = requestAnimationFrame(animate);
  }

  // IntersectionObserver: only animate when hero is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          animate();
        } else {
          isVisible = false;
          cancelAnimationFrame(animFrame);
        }
      });
    },
    { threshold: 0.1 }
  );

  const hero = document.querySelector('.hero');
  if (hero) observer.observe(hero);

  window.addEventListener('resize', () => {
    resize();
  });

  init();
  animate();
}

/* ============================================================
   PARALLAX (Hero background)
   ============================================================ */
function initParallax() {
  const bgImage = document.querySelector('.hero-bg-image');
  if (!bgImage) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY < heroHeight * 1.5) {
      const translate = scrollY * 0.4;
      bgImage.style.transform = `translateY(${translate}px) scale(1.1)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   CUSTOM CURSOR GLOW (Desktop only)
   ============================================================ */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!glow.classList.contains('visible')) {
      glow.classList.add('visible');
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('visible');
  });

  function animateCursor() {
    // Smooth lerp
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ============================================================
   WAITLIST FORMS + MODAL
   ============================================================ */
function initWaitlistForms() {
  const heroForm = document.getElementById('hero-waitlist-form');
  const bottomForm = document.getElementById('bottom-waitlist-form');
  const modal = document.getElementById('waitlist-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBtn = document.getElementById('modal-confirm');

  function showModal() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value) {
      // TODO: Send to Supabase when backend is ready
      // For now, just show the modal
      showModal();
      e.target.reset();
    }
  }

  if (heroForm) heroForm.addEventListener('submit', handleSubmit);
  if (bottomForm) bottomForm.addEventListener('submit', handleSubmit);

  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (modalBtn) modalBtn.addEventListener('click', hideModal);

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        hideModal();
      }
    });
  }
}
