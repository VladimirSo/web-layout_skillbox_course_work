// catalog-filter
const filterFormEl = document.querySelector('.js-filter-form');

// ф-я сбора данных для передачи из формы с фильтрами товара
const getDataFromForm = () => {
  /* создаем объект содержащий все элементы формы,
  превращаем его в массив data, из которого поcредством map отбираем только объекты с нужными ключами,
  и посредстовм filter отбираем из него только отмеченные пользователем.
  Т.к. noUiSlider при изменении параметров ползунками не передает данные в форму, 
  то вытаскиваем из sessionStoarge данные, ктр-е noUiSlider туда скинул,
  преобразуем их в массив и дабавляем к массиву data
  */
  const { elements } = filterFormEl;

  const data = Array.from(elements)
    .map((element) => {
      const { name, value, checked } = element;

      return { name, value, checked };
    })
    .filter((item) => item.checked === true);
  // console.log(data);

  const priceLimits = sessionStorage.getItem('priceSliderValue').split(',');
  const priceData = [
    { name: "price-min", value: Math.round(priceLimits[0]) },
    { name: "price-max", value: Math.round(priceLimits[1]) }
  ];

  data.push(...priceData);
  // console.log(data);
  return data;
};

// т.к. кнопки submit в форме нет, отправлять данные будем при каждом изменении
filterFormEl.addEventListener('change', (ev) => {
  ev.preventDefault();
  // заберем данные из формы
  const dataForSend = getDataFromForm();
  // и отправим их куда-нибудь...
  // filterFormEl.submit(dataForSend);
  console.log(dataForSend);
});


// после загрузки если окно < 1290 на все children формы вешаем обработчик
document.addEventListener('DOMContentLoaded', () => {

  if (document.documentElement.clientWidth < 1290 ) {
    for (let i = 0; i < filterFormEl.children.length; i++) {

      filterFormEl.children[i].addEventListener('click', openFilterList);
    }
  }
});

// ф-я открытия листов категорий фильтров выбора товаров
const openFilterList = (ev) => {
  // console.log(ev.target.className);
  // console.log(ev.currentTarget);

  /* если лист на котором сработал обработчик еще не открыт,
   то проходим циклом по всем листам и если есть уже открытый лист,
   то такой лист закрываем, а тот на которм сработал обработчикк - открываем.
   если лист на котором сработал обработчик уже открыт, то закрываем его
  */
  if (ev.target.className.includes('filter-form-btn')) { // <- чтобы отсечь только клики по кнопке
    if (!ev.currentTarget.lastElementChild.classList.contains('filter-form__list--opened')) {
      for (let i = 0; i < filterFormEl.children.length; i++) {

        if (filterFormEl.children[i].lastElementChild.classList.contains('filter-form__list--opened')) {  
          filterFormEl.children[i].firstElementChild.classList.remove('filter-form-btn--opened');
          filterFormEl.children[i].lastElementChild.classList.remove('filter-form__list--opened');
        }
      }
      ev.currentTarget.firstElementChild.classList.add('filter-form-btn--opened');
      ev.currentTarget.lastElementChild.classList.add('filter-form__list--opened');
    } else {
      ev.currentTarget.firstElementChild.classList.toggle('filter-form-btn--opened');
      ev.currentTarget.lastElementChild.classList.toggle('filter-form__list--opened');
    }
  }
};