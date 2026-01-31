/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');
navLink.forEach(n => n.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}));


/*===== SCROLL SECTIONS ACTIVE LINK - GORNJA SEKCIJA =====*/
const navLinks = document.querySelectorAll('.nav__menu a');
const sections = document.querySelectorAll('section[id]');
const footer = document.getElementById('contact');

const scrollActive = () => {
    const scrollY = window.scrollY;

    let currentSection = null;

    // provjeri sve sekcije
sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // visina headera
    const sectionHeight = section.offsetHeight;

    if (
        scrollY >= sectionTop &&
        scrollY < sectionTop + sectionHeight
    ) {
        currentSection = section;
    }
});

    // provjeri footer posebno
    if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentSection = footer;
    }

    // ukloni sve active-link
    navLinks.forEach(link => link.classList.remove('active-link'));

    // dodaj active-link na trenutnu sekciju
    if (currentSection) {
        let selector;
        if (currentSection.id === 'pricing') {
            selector = '.nav__menu a[href*="cijenik.html"]';
        } else if (currentSection.id === 'contact') {
            selector = '.nav__menu a[href*="#contact"]';
        } else {
            selector = `.nav__menu a[href*="${currentSection.id}"]`;
        }
        document.querySelector(selector)?.classList.add('active-link');
    }
};

window.addEventListener('scroll', scrollActive);
window.addEventListener('load', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '50px',
    duration: 1200,   // brže animacije
    delay: 150,       // manji delay po defaultu
    reset: false      // animacija se ne ponavlja
});

/* Helper funkcija */
function revealIfExists(selector, options = {}) {
    if (document.querySelector(selector)) {
        sr.reveal(selector, options);
    }
}

/* ===== HOME ===== */
revealIfExists('.home__data');
revealIfExists('.home__img', { delay: 200 });
revealIfExists('.home__social-icon', { interval: 100 });

/* ===== ABOUT ===== */
revealIfExists('.about__img');
revealIfExists('.about__subtitle', { delay: 150 });
revealIfExists('.about__text', { delay: 200 });

/* ===== SKILLS ===== */
revealIfExists('.skills__subtitle');
revealIfExists('.skills__text', { delay: 150 });
revealIfExists('.skills__img', { delay: 200 });
revealIfExists('.skills__data', { interval: 150 });

/* ===== WORK / GALERIJA ===== */
revealIfExists('.work__img', { interval: 120 });

/* ===== CONTACT ===== */
revealIfExists('.contact__input', { interval: 150 });

/* ===== CIJENIK ===== */
revealIfExists('#pricing .section-title');
revealIfExists('.cijene', { delay: 150 });
revealIfExists('.pricing__item', { interval: 120 });

/*===== SCROLL TOP =====*/
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
});
scrollTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//----------------------- LIGHTBOX FUNCTIONALITY -----------------------
function initLightbox() {
  const masonryItems = document.querySelectorAll('.masonry-item');
  const images = [];

  // Prikuplja sve slike
  masonryItems.forEach(item => {
    const link = item.querySelector('a');
    const img = item.querySelector('img');
    const title = item.querySelector('h3');
    const size = item.querySelector('p');

    // Preskoči ako link ima klasu no-lightbox
    if (link && link.classList.contains('no-lightbox')) {
      return;
    }

    if (link && img) {
      images.push({
        src: link.href,
        alt: img.alt || '',
        title: title ? title.textContent : '',
        size: size ? size.textContent : ''
      });

      // Dodan click na event
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const index = images.findIndex(img => img.src === link.href);
        openLightbox(index);
      });
    }
  });

  let currentIndex = 0;
  let lightbox = document.getElementById('lightbox');

  // Ne kreira lightbox ako ne postoji
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-img" src="" alt="">
                <div class="lightbox-caption"></div>
                <div class="lightbox-counter"></div>
            </div>
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');

  function openLightbox(index) {
    if (images.length === 0) return;

    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function updateLightbox() {
    const image = images[currentIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = `${image.title} - ${image.size}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  // Event listeneri
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Swipe za mobilne uređaje
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  }

  return {
    open: openLightbox,
    close: closeLightbox,
    next: showNext,
    prev: showPrev
  };
}

document.addEventListener('DOMContentLoaded', initLightbox);
