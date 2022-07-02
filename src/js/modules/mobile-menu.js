// моб.меню в хэдере
const menuElem = document.querySelector('.js-main-nav')
const mobMenuBtnElem = document.querySelector('.js-nav-btn');

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
