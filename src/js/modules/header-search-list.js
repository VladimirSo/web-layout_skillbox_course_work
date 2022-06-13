//
const srchFormElem = document.querySelector('.js-search-area');
const srchFormBtnElem = document.querySelector('.js-srch-area-btn');

const openSearchList = () => {
  srchFormElem.classList.toggle('search-area-open');
};

srchFormBtnElem.addEventListener('click', openSearchList);
