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

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const navLinks = document.querySelectorAll('.nav__menu a');
const sections = document.querySelectorAll('section[id]');
const footer = document.getElementById('contact');

const scrollActive = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    navLinks.forEach(link => link.classList.remove('active-link'));

    let maxVisible = {section: null, height: 0};

    // provjeri sve sekcije
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        if (visibleHeight > maxVisible.height) {
            maxVisible = {section, height: visibleHeight};
        }
    });

    // provjeri footer
    if (footer) {
        const rect = footer.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        if (visibleHeight > maxVisible.height) {
            maxVisible = {section: footer, height: visibleHeight};
        }
    }

    // poseban slučaj: ako si pri dnu dokumenta, aktiviraj footer
    if (scrollY + windowHeight >= docHeight - 2) { // -2px tolerance
        maxVisible.section = footer;
    }

    if (maxVisible.section) {
        let selector;
        if (maxVisible.section.id === 'pricing') {
            selector = '.nav__menu a[href*="cijenik.html"]';
        } else if (maxVisible.section.id === 'contact') {
            selector = '.nav__menu a[href*="#contact"]';
        } else {
            selector = `.nav__menu a[href*="${maxVisible.section.id}"]`;
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
