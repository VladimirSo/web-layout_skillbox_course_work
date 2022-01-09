// const obj = {
//     test: 'test, тест, 123'
// };
// const prop = obj.test;
// console.log(prop);

const bodyElem = document.querySelector('body');
const burgerBtnElem= document.querySelector('.js-btn-hamburger');
const closeMenuBtnElem= document.querySelector('.js-close-popup');
const headMenuElem= document.querySelector('.js-main-nav');
const popupWrapperElem= document.querySelector('.js-main-nav-wrapper');
const closeContBtnElem= document.querySelector('.js-contacts-close-btn');
const contElem = document.querySelector('.js-contacts');

const headerElem = document.querySelector('.js-header');
const logoElem = document.querySelector('.header__logo');
const srchFormElem = document.querySelector('.js-search-form');
const srchBtnElem = document.querySelector('.js-search-form__btn');
const closeSrchBtnElem = document.querySelector('.js-search-form__close');

const openMobMenu = () => {
    headMenuElem.classList.add('popup-open');
    burgerBtnElem.classList.add('hamburger-active');
    bodyElem.style.overflow = 'hidden';
    
    setTimeout( () => {
        window.addEventListener('click', closeMobMenu);
    }, 500);
};

const closeMobMenu = (event) => {
    // console.log(event.target);
    if (event.target === closeMenuBtnElem|| event.target === popupWrapperElem) {
        headMenuElem.classList.remove('popup-open');
        burgerBtnElem.classList.remove('hamburger-active');
        bodyElem.style.overflow = 'auto';
        window.removeEventListener('click', closeMobMenu);
    }
};

const closeContacts = () => {
    contElem.classList.add('contacts-hidden');
    window.addEventListener('scroll', checkContactsPosition);
};

const checkContactsPosition = () => {
    const checkElemPos1 = contElem.parentElement.getBoundingClientRect().top
    const checkElemPos2 = contElem.parentElement.getBoundingClientRect().bottom

    if (contElem.classList.contains('contacts-hidden')) {
        if ( window.innerHeight < checkElemPos1 || checkElemPos2 < 0 ) {
            contElem.classList.remove('contacts-hidden');
            window.removeEventListener('scroll', checkContactsPosition);
        }
    }
};

const openSearch = (event) => {
    event.preventDefault();

    if (event.target === srchBtnElem) {
        const contrlHeight = Math.round(parseFloat(getComputedStyle(srchFormElem.parentElement).height));
        // console.log(contrlHeight);
        logoElem.style.minHeight = contrlHeight + 'px';
        srchFormElem.parentElement.style.minHeight = contrlHeight + 'px';
        
        headerElem.classList.add('open-search');
        document.querySelector('.search-form__field').focus();
    };
    
    srchFormElem.removeEventListener('click', openSearch);
    setTimeout ( () => {
        srchFormElem.addEventListener('click', closeSearch);
    }, 500);
};

const closeSearch = (event) => {
    console.log(event.currentTarget);
    if (event.target === closeSrchBtnElem) {
        event.preventDefault();
        headerElem.classList.remove('open-search');

        logoElem.style.minHeight = '';
        srchFormElem.parentElement.style.minHeight = '';
    };
    srchFormElem.removeEventListener('click', closeSearch);
    setTimeout ( () => {
        srchFormElem.addEventListener('click', openSearch);
    }, 100);
};

burgerBtnElem.addEventListener('click', openMobMenu);
closeContBtnElem.addEventListener('click', closeContacts);

srchFormElem.addEventListener('click', openSearch);
