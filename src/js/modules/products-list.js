// products-list
const prodListEl = document.querySelector('.js-products-list');
const pagesBlockEl = document.querySelector('.js-products-pagination');

// кол-во карточек товара ктр-е должны отображаться на станице
const prodItemsOnPage = (document.documentElement.clientWidth < 1024) ? 6 : 9;
// кол-во страниц в списке товаров
const pagesOfProdItems = Math.ceil(prodListEl.children.length) / prodItemsOnPage;

// после загрузки прячем лишние карточки товаров
document.addEventListener("DOMContentLoaded", () => {
  for (let i=prodItemsOnPage; i < prodListEl.children.length; i++) {
    prodListEl.children[i].classList.add('visually-hidden');
  }

  pagesBlockEl.children[0].classList.add('products-pagination__btn--select');
});

// ф-я обработки клика на кнопке страницы списка товаров
const showProducts = (ev) => {
  // console.log(ev.target);
  // console.log(Number(ev.target.textContent));

  // индекс выбранной страницы
  let indexPage = Number(ev.target.textContent);
  // console.log(indexPage);

  // макс-й и мин-й индекс карточки которые должны отображаться
  // let maxIndexProduct = Number(ev.target.textContent) * prodItemsOnPage;
  let maxIndexProduct = indexPage * prodItemsOnPage;
  let minIndexProduct = maxIndexProduct - (prodItemsOnPage - 1);
  // console.log(minIndexProduct);
  // console.log(maxIndexProduct);

  for (let i=0; i < pagesOfProdItems; i++) {
    if (i == indexPage - 1) {
      pagesBlockEl.children[i].classList.add('products-pagination__btn--select');
    } else {
      pagesBlockEl.children[i].classList.remove('products-pagination__btn--select');
    }
  }
  /*
  проходим циклом по элементам списка товаров,
  те которые попадают в промежуток подлежащий отображению - показываем,
  а остальные - прячем
  */
  for (let i=0; i < prodListEl.children.length; i++) {
    if (i < minIndexProduct - 1 || i > maxIndexProduct - 1) {
      prodListEl.children[i].classList.add('visually-hidden');
    } else {
      prodListEl.children[i].classList.remove('visually-hidden');
    }
  }
}

// отрисовка кнопок страниц списка товаров и навешивание на них функции-обработчика
for (let i=0; i < pagesOfProdItems; i++) {
  pagesBlockEl.insertAdjacentHTML('beforeend', `<span class="products-pagination__btn transp-btn animated-btn">${i+1}</span>`);

  pagesBlockEl.children[i].addEventListener('click', showProducts);
}


