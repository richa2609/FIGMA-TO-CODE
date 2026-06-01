// Liquid.js — All interactions & animations for Liquid Maestro

document.addEventListener('DOMContentLoaded', () => {

  // ---------- COCKTAIL MENU CAROUSEL (with auto-rotate & pause on hover) ----------
  const menuSection = document.querySelector('.menu-section');
  if (!menuSection) return;

  const menuDisplay = document.querySelector('.menu-display-area');
  if (!menuDisplay) return;

  const cards = Array.from(document.querySelectorAll('.menu-active-item'));
  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoRotateInterval = null;
  const autoRotateDelay = 4000; // 4 seconds

  function updateMenuDisplay() {
    cards.forEach((card, i) => {
      if (i === currentIndex) {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
        card.style.zIndex = '2';
      } else if (i === (currentIndex + 1) % cards.length) {
        card.style.opacity = '0.4';
        card.style.transform = 'translateX(80px)';
        card.style.zIndex = '1';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateX(80px)';
        card.style.zIndex = '0';
      }
    });
  }

  // Initialize
  updateMenuDisplay();

  // Create navigation arrows
  const navTrack = document.createElement('div');
  navTrack.className = 'menu-navigation-track';

  const leftArrow = document.createElement('div');
  leftArrow.className = 'menu-arrow';
  leftArrow.innerHTML = `
    <svg viewBox="0 0 24 24" width="44" height="44" fill="white">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `;

  const rightArrow = document.createElement('div');
  rightArrow.className = 'menu-arrow';
  rightArrow.innerHTML = `
    <svg viewBox="0 0 24 24" width="44" height="44" fill="white">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `;

  navTrack.appendChild(leftArrow);
  navTrack.appendChild(rightArrow);

  // Insert arrows after menu-display-area
  menuDisplay.insertAdjacentElement('afterend', navTrack);

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateMenuDisplay();
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateMenuDisplay();
  }

  leftArrow.addEventListener('click', () => {
    prevCard();
    resetAutoRotate();
  });

  rightArrow.addEventListener('click', () => {
    nextCard();
    resetAutoRotate();
  });

  // Auto-rotate
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextCard, autoRotateDelay);
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Pause on hover over menu section
  menuSection.addEventListener('mouseenter', stopAutoRotate);
  menuSection.addEventListener('mouseleave', startAutoRotate);

  // Start auto-rotate
  startAutoRotate();

  // ---------- SCROLL-TRIGGERED FADE-IN ANIMATIONS ----------
  const fadeElements = document.querySelectorAll(
    '.hero-content, .about, .hours, .menu-section, .bookings, .section-title, .hours-list, .menu-active-item'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });

  // ---------- SMOOTH SCROLL FOR EXPLORE BUTTON ----------
  const exploreBtn = document.querySelector('.btn-explore');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = exploreBtn.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});