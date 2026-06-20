/* =============================================
   GROWTH HIVE MARKETING — PREMIUM JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // PRELOADER
  // =============================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger initial animations
      revealOnScroll();
    }, 1800);
  });
  document.body.style.overflow = 'hidden';

  // =============================================
  // CUSTOM CURSOR
  // =============================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursorFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursorFollower);
  }
  animateCursorFollower();

  // Cursor expand on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .service-card, .portfolio-card, .why-card, .stat-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.opacity = '0.6';
      cursorFollower.style.width = '56px';
      cursorFollower.style.height = '56px';
      cursorFollower.style.borderColor = 'rgba(255,193,7,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.opacity = '1';
      cursorFollower.style.width = '36px';
      cursorFollower.style.height = '36px';
      cursorFollower.style.borderColor = 'rgba(255,193,7,0.5)';
    });
  });

  // =============================================
  // NAVBAR — SCROLL BEHAVIOR
  // =============================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // =============================================
  // HAMBURGER MENU
  // =============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // =============================================
  // SMOOTH SCROLL
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // SCROLL REVEAL ANIMATIONS
  // =============================================
  function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 80) {
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, parseInt(delay));
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // =============================================
  // COUNTER ANIMATION (Stats)
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', startCounters);
  startCounters();

  // =============================================
  // PORTFOLIO TABS
  // =============================================
  const tabs = document.querySelectorAll('.portfolio-tab');
  const graphicCards = document.querySelectorAll('.portfolio-card.graphic');
  const videoCards = document.querySelectorAll('.portfolio-card.video');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const activeTab = tab.dataset.tab;

      if (activeTab === 'graphic') {
        graphicCards.forEach(c => { c.classList.remove('hidden'); c.style.animation = 'fadeInUp 0.4s ease forwards'; });
        videoCards.forEach(c => c.classList.add('hidden'));
      } else {
        videoCards.forEach(c => { c.classList.remove('hidden'); c.style.animation = 'fadeInUp 0.4s ease forwards'; });
        graphicCards.forEach(c => c.classList.add('hidden'));
      }
    });
  });

  // =============================================
  // TESTIMONIAL SLIDER
  // =============================================
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const cards = document.querySelectorAll('.testimonial-card');

  let currentSlide = 0;
  let autoSlideTimer;
  let itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = cards.length;
  const maxSlide = totalSlides - itemsPerView;

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const numDots = maxSlide + 1;
    for (let i = 0; i <= maxSlide; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    document.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 4500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  createDots();
  startAutoSlide();

  nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAutoSlide(); });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    startAutoSlide();
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    goToSlide(0);
    createDots();
  });

  // =============================================
  // NEWSLETTER FORM
  // =============================================
  window.handleNewsletter = function(e) {
    e.preventDefault();
    const success = document.getElementById('newsletterSuccess');
    const form = document.getElementById('newsletterForm');
    form.style.opacity = '0.5';
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 500);
  };

  // =============================================
  // PARALLAX HERO ORBS (subtle)
  // =============================================
  const orbs = document.querySelectorAll('.hero-orb');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 15;
      orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  // =============================================
  // FADE IN UP KEYFRAME (CSS via JS)
  // =============================================
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  // =============================================
  // SCROLL PROGRESS INDICATOR
  // =============================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 1001;
    background: linear-gradient(90deg, #FFC107, #FFD54F);
    width: 0%; transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(255,193,7,0.6);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // =============================================
  // LAZY LOAD IMAGES
  // =============================================
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // =============================================
  // SERVICE CARDS — TILT EFFECT
  // =============================================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =============================================
  // WHY CARDS — TILT EFFECT
  // =============================================
  const whyCards = document.querySelectorAll('.why-card');
  whyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =============================================
  // ACTIVE NAV ON CLICK
  // =============================================
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  console.log('%c🚀 Growth Hive Marketing', 'color:#FFC107;font-size:1.5rem;font-weight:900;');
  console.log('%cBuilt with ❤️ by Jintu Kalita', 'color:#fff;font-size:0.9rem;');
});
