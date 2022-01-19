// const obj = {
//     test: 'test, тест, 123'
// };
// const prop = obj.test;
// console.log(prop);

const bodyElem = document.querySelector('body');

const srchFormElem = document.querySelector('.js-search-area');
const srchFormBtnElem = document.querySelector('.js-srch-area-btn');

const menuElem = document.querySelector('.js-main-nav')
const mobMenuBtnElem = document.querySelector('.js-nav-btn');

//
const openSearchList = () => {
  srchFormElem.classList.toggle('search-area-open');
};

srchFormBtnElem.addEventListener('click', openSearchList);

//
const openMobMenu = () => {
  menuElem.classList.toggle('main-nav-open');
  mobMenuBtnElem.classList.toggle('nav-btn-active');

  setTimeout( () => {
    if (menuElem.classList.contains('main-nav-open')) {
      bodyElem.style.overflow = 'hidden';
    } else {
      bodyElem.style.overflow = '';
    }
  }, 500);
};

mobMenuBtnElem.addEventListener('click', openMobMenu);

//
const element = document.querySelector('.region-list');

const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});