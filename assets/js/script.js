/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');
const footer = document.getElementById('contact');
const navLinks = document.querySelectorAll('.nav__menu a');

const scrollActive = () => {
  const scrollDown = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // ukloni sve active-link
  navLinks.forEach(link => link.classList.remove('active-link'));

  // provjeri footer kao posebnu stavku
  if (scrollDown + windowHeight >= docHeight - 5) {
    const footerLink = document.querySelector('.nav__menu a[href*="contact"]');
    footerLink?.classList.add('active-link');
    return; // footer je na vrhu → prekini daljnju provjeru
  }

  // za sve ostale sekcije
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
    if (!link) return;

    if (scrollDown >= sectionTop && scrollDown < sectionTop + sectionHeight) {
      link.classList.add('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 }); 

// ===== DODAJEMO CIJENIK =====
sr.reveal('#pricing .section-title', { origin: 'top' }); // naslov Cijenik
sr.reveal('.cijene', { delay: 200 });                    // H3 "Cijene radova do 3m²"
sr.reveal('.pricing__item', { interval: 150 });         // svaki item
sr.reveal('.pricing__note', { delay: 300 });            // napomena





const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if(window.scrollY >= 300){
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
});

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});