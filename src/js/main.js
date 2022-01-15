const obj = {
    test: 'test, тест, 123'
};
const prop = obj.test;
console.log(prop);

const srchFormElem = document.querySelector('.js-search-area');
const srchFormBtnElem = document.querySelector('.js-srch-area-btn');

const menuElem = document.querySelector('.js-main-nav')
const mobMenuBtnElem = document.querySelector('.js-nav-btn');

const openSearchList = () => {
    srchFormElem.classList.toggle('search-area-open');
};

const openMobMenu = () => {
    menuElem.classList.toggle('main-nav-open');
    mobMenuBtnElem.classList.toggle('nav-btn-active');
};


srchFormBtnElem.addEventListener('click', openSearchList);
mobMenuBtnElem.addEventListener('click', openMobMenu);