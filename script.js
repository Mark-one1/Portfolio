'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// Background parallax and subtle 3D tilt based on pointer movement.
if (window.matchMedia('(pointer: fine)').matches) {
    const root = document.documentElement;
    const mainEl = document.querySelector('main');
    let lastX = 50;
    let lastY = 50;
    let rafId;

    document.addEventListener('pointermove', function (event) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            lastX += (x - lastX) * 0.12;
            lastY += (y - lastY) * 0.12;

            root.style.setProperty('--bg-x', `${lastX}%`);
            root.style.setProperty('--bg-y', `${lastY}%`);
            root.style.setProperty('--tilt-x', `${((lastY - 50) / 50) * -3}deg`);
            root.style.setProperty('--tilt-y', `${((lastX - 50) / 50) * 3}deg`);
            if (mainEl) mainEl.style.setProperty('--tilt-x', `${((lastY - 50) / 50) * -3}deg`);
            if (mainEl) mainEl.style.setProperty('--tilt-y', `${((lastX - 50) / 50) * 3}deg`);
        });
    }, { passive: true });
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// FormSubmit requires an http(s) page. When this portfolio is opened directly
// from a file, use the visitor's mail app instead of showing a submission error.
if (form && window.location.protocol === 'file:') {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const subject = 'New portfolio contact message';
        const body = [
            `Name: ${formData.get('fullname') || ''}`,
            `Email: ${formData.get('email') || ''}`,
            '',
            `Message:`,
            formData.get('message') || ''
        ].join('\n');

        window.location.href = `mailto:narasimhanaidu2728@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}

// Intro screen controls and its cursor-reactive depth effect.
const introScreen = document.querySelector('#portfolio-intro');
const enterPortfolioButton = document.querySelector('[data-enter-portfolio]');
const introCursor = document.querySelector('.portfolio-intro__cursor');
const introCursorRing = document.querySelector('.portfolio-intro__cursor-ring');

if (introScreen && enterPortfolioButton) {
    document.body.classList.add('intro-active');

    enterPortfolioButton.addEventListener('click', function () {
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-leaving');

        window.setTimeout(function () {
            introScreen.remove();
        }, 750);
    }, { once: true });
}

if (introScreen && introCursor && introCursorRing && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;
    let cursorFrame;

    const animateIntroCursor = function () {
        ringX += (cursorX - ringX) * 0.16;
        ringY += (cursorY - ringY) * 0.16;
        introCursor.style.left = `${cursorX}px`;
        introCursor.style.top = `${cursorY}px`;
        introCursorRing.style.left = `${ringX}px`;
        introCursorRing.style.top = `${ringY}px`;
        cursorFrame = window.requestAnimationFrame(animateIntroCursor);
    };

    introScreen.classList.add('cursor-active');
    animateIntroCursor();

    introScreen.addEventListener('pointermove', function (event) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        const pointerX = (event.clientX / window.innerWidth) * 100;
        const pointerY = (event.clientY / window.innerHeight) * 100;
        const rotateX = ((pointerY - 50) / 50) * -2.5;
        const rotateY = ((pointerX - 50) / 50) * 2.5;

        introScreen.style.setProperty('--pointer-x', `${pointerX}%`);
        introScreen.style.setProperty('--pointer-y', `${pointerY}%`);
        introScreen.style.setProperty('--stage-rotate-x', `${rotateX}deg`);
        introScreen.style.setProperty('--stage-rotate-y', `${rotateY}deg`);
    });

    introScreen.addEventListener('pointerleave', function () {
        introScreen.style.setProperty('--stage-rotate-x', '0deg');
        introScreen.style.setProperty('--stage-rotate-y', '0deg');
    });

    enterPortfolioButton.addEventListener('pointerenter', function () {
        introScreen.classList.add('cursor-on-button');
    });
    enterPortfolioButton.addEventListener('pointerleave', function () {
        introScreen.classList.remove('cursor-on-button');
    });
    enterPortfolioButton.addEventListener('click', function () {
        window.cancelAnimationFrame(cursorFrame);
    }, { once: true });
}
