/*===== MENU SHOW =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navIcon = navToggle?.querySelector('i');

const setIcon = (open) => {
    if (!navIcon) return;
    navIcon.classList.toggle('bx-x', open);
    navIcon.classList.toggle('bx-menu', !open);
};

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('show');
        setIcon(open);
    });
}

/*===== REMOVE MENU MOBILE =====*/
const closeMenuInstantly = () => {
    if (!navMenu) return;
    navMenu.classList.add('no-anim');
    navMenu.classList.remove('show');
    setIcon(false);

    setTimeout(() => navMenu.classList.remove('no-anim'), 100);
};

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenuInstantly);
});

/*===== RESET NA BACK (bfcache) =====*/
window.addEventListener('pageshow', () => {
    closeMenuInstantly();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            navMenu?.classList.remove('no-anim');
        });
    });
});


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
const sr = typeof ScrollReveal !== 'undefined'
    ? ScrollReveal({
        origin: 'top',
        distance: '50px',
        duration: 1200,
        delay: 150,
        reset: false
    })
    : null;

/* Helper funkcija */
function revealIfExists(selector, options = {}) {
    if (sr && document.querySelector(selector)) {
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
revealIfExists('.section-title', { interval: 120 });
revealIfExists('.masonry-item', { interval: 100, distance: '30px', origin: 'bottom' });
revealIfExists('.masonry-item h3', { delay: 100, distance: '20px', origin: 'bottom' });
revealIfExists('.masonry-item p', { delay: 150, distance: '20px', origin: 'bottom' });

/* ===== CONTACT ===== */
revealIfExists('.contact__input', { interval: 150 });

/* ===== CIJENIK ===== */
revealIfExists('#pricing .section-title');

revealIfExists('.cijene, .cijene-napomena, .grupacije__cijena, .pricing__header', {
    delay: 20
});

/* CSV BUTTON */
revealIfExists('.csv-btn', {
    scale: 0.1,
    duration: 800,
    delay: 10,
    opacity: 1
});

revealIfExists('.pricing__item', {
    interval: 50
});

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


/*===== CUSTOM SCROLL REVEAL (IntersectionObserver) =====*/
const SR_DEFAULTS = {
    origin: 'top',
    distance: '50px',
    duration: 1200,
    delay: 150,
    interval: 0,
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    reset: false,
    viewFactor: 0.15
};

const SR_VARS = [
    '--sr-x', '--sr-y', '--sr-scale', '--sr-opacity',
    '--sr-duration', '--sr-delay', '--sr-easing'
];

function reveal(selector, options = {}) {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const settings = { ...SR_DEFAULTS, ...options };

    // preskoči elemente koje je već obradio raniji poziv (prvi poziv ima prednost)
    const elements = [...document.querySelectorAll(selector)]
        .filter(el => !el.classList.contains('js-reveal'));

    if (!elements.length) return;

    let x = '0px';
    let y = '0px';

    switch (settings.origin) {
        case 'left': x = `-${settings.distance}`; break;
        case 'right': x = settings.distance; break;
        case 'top': y = `-${settings.distance}`; break;
        case 'bottom': y = settings.distance; break;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        // stagger po grupi elemenata koji se pojave istovremeno
        let batchIndex = 0;

        entries.forEach(entry => {
            const el = entry.target;

            if (entry.isIntersecting) {
                const delay = settings.delay + batchIndex * settings.interval;
                batchIndex++;

                el.style.setProperty('--sr-delay', `${delay}ms`);
                el.classList.add('is-revealed');

                if (!settings.reset) {
                    obs.unobserve(el);

                    // nakon animacije skini klase da hover/transition iz style2.css opet radi
                    setTimeout(() => {
                        el.classList.remove('js-reveal', 'is-revealed');
                        SR_VARS.forEach(v => el.style.removeProperty(v));
                    }, settings.duration + delay + 50);
                }
            } else if (settings.reset) {
                el.classList.remove('is-revealed');
            }
        });
    }, { threshold: settings.viewFactor });

    elements.forEach(el => {
        el.style.setProperty('--sr-x', x);
        el.style.setProperty('--sr-y', y);
        el.style.setProperty('--sr-scale', settings.scale);
        el.style.setProperty('--sr-opacity', settings.opacity);
        el.style.setProperty('--sr-duration', `${settings.duration}ms`);
        el.style.setProperty('--sr-delay', `${settings.delay}ms`);
        el.style.setProperty('--sr-easing', settings.easing);

        el.classList.add('js-reveal');
        observer.observe(el);
    });
}

/* ===== HOME ===== */
reveal('.home__data');
reveal('.home__img', { delay: 200 });
reveal('.home__social-icon', { interval: 100 });

/* ===== ABOUT ===== */
reveal('.about__img');
reveal('.about__subtitle', { delay: 150 });
reveal('.about__text', { delay: 200 });

/* ===== SKILLS ===== */
reveal('.skills__subtitle');
reveal('.skills__text', { delay: 150 });
reveal('.skills__img', { delay: 200 });
reveal('.skills__data', { interval: 150 });

/* ===== NASLOVI SEKCIJA (index, cijenik, galerija) ===== */
reveal('.section-title', { interval: 120 });

/* ===== GALERIJA ===== */
reveal('.masonry-item', { interval: 100, distance: '30px', origin: 'bottom' });
reveal('.masonry-item h3', { delay: 100, distance: '20px', origin: 'bottom' });
reveal('.masonry-item p', { delay: 150, distance: '20px', origin: 'bottom' });

/* ===== CIJENIK ===== */
reveal('.cijene, .cijene-napomena, .grupacije__cijena, .pricing__header', { delay: 20 });
reveal('.csv-btn', { scale: 0.1, duration: 800, delay: 10, opacity: 1 });
reveal('.pricing__item', { interval: 50 });