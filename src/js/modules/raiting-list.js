// обработка листа товаров с высоким рейтингом
const raitingBlockEl = document.querySelector('.js-raiting');
const raitingListEl = document.querySelector('.js-raiting-list');
const raitingBtnEl = document.querySelector('.js-raiting-btn');

// сколько карточек товара должно отображаться на странице
const raitingProdsOnPage = (document.documentElement.clientWidth < 1290) ? 6 : 8;
// прячем лишние карточки
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < raitingListEl.children.length; i++) {
  	if (i > raitingProdsOnPage-1) {
    	raitingListEl.children[i].classList.add('visually-hidden');
      raitingListEl.children[i].setAttribute('aria-hidden', true);

      raitingListEl.children[i].style.opacity="0";
  	}
  }
});

// открывает дополнительно 4 карточки в топ-списке главной страницы
raitingBtnEl.addEventListener('click', () => {
  for (let i = (raitingProdsOnPage); i < (raitingProdsOnPage+4); i++) {
    if (raitingListEl.children[i].classList.contains('visually-hidden')) {
      raitingListEl.children[i].classList.remove('visually-hidden');
      raitingListEl.children[i].removeAttribute('aria-hidden');

      let timerId = setTimeout(raitingListEl.children[i].style.opacity="1", 1000);

      raitingBtnEl.classList.add('visually-hidden');
    // } else {
    //   raitingListEl.children[i].classList.add('visually-hidden');

    //   raitingListEl.children[i].style.opacity="0";  
    }
  }
});