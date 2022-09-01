// catalog-filter

//обработка данных из формы выбора товаров
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
// ф-я отсылает данные из формы
const sendFormData = () => {
  // заберем данные из формы
  const dataForSend = getDataFromForm();
  // и отправим их куда-нибудь...
  // filterFormEl.submit();
  console.log(dataForSend);
}
// т.к. кнопки submit в форме нет, отправлять данные будем при каждом изменении
filterFormEl.addEventListener('change', (ev) => {
  ev.preventDefault();

  sendFormData();
});

//обработка показа/скрытия листов с категориями для формы выбора товаров
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

//обработка листов с опциями выбора в фильтре выбора товаров
const formLists = filterFormEl.querySelectorAll('.filter-form__list');
//сколько пунктов в листе показывать
const numOfShowEls = 9;
// const numOfShowEls = 4;

//ф-я-обработчик прячет лишние пункты
function hideAdditionalElements (ev) {
  // вычисляем величину до которой должна уменьшиться высота блока при анимации
  const controlledHeight1 = parseFloat(getComputedStyle(this.lastElementChild).height);
  
  function getHeight (el) {
    let height = 0;

    for (let i=0; i<numOfShowEls; i++) {
      height = height + (parseFloat(getComputedStyle(el.children[i]).height) + parseFloat(getComputedStyle(el.children[i]).marginBottom));
    }

    return height
  };
  const controlledHeight2 = getHeight(this);
  const controlledHeight3 = parseFloat(getComputedStyle(this).paddingTop) + parseFloat(getComputedStyle(this).paddingBottom);

  const controlledHeightFull = controlledHeight3 + controlledHeight2 + controlledHeight1;
  // console.log(controlledHeight1);
  // console.log(controlledHeight2);
  // console.log(controlledHeight3);
  // console.log(controlledHeightFull);

  if (ev.target.classList.contains('filter-list-btn')) {
    const num1 = numOfShowEls;
    const num2 = this.children.length - 1; 

    for (let i = num1; i < num2; i++) {
      this.children[i].classList.add('visually-hidden');
    }

    this.removeEventListener('click', hideAdditionalElements);
    this.addEventListener('click', showAdditionalElements);

    ev.target.textContent = `Ещё ${num2 - num1}`;

    this.style.height = `${controlledHeightFull}px`;
  }
}
//ф-я-обработчик открывает спрятанные пункты
function showAdditionalElements (ev) {
  // величина от которой будет меняться высота блока при анимации
  const blockHeigh = getComputedStyle(this).height;
  // console.log('высота: ' + blockHeigh);

  if (ev.target.classList.contains('filter-list-btn')) {
    const num1 = numOfShowEls;
    const num2 = this.children.length - 1;
    // начальная высота для отработки анимации
    this.style.height = blockHeigh;

    for (let i = num1; i < num2; i++) {
      // console.log(i);
      this.children[i].classList.remove('visually-hidden');
    }

    this.removeEventListener('click', showAdditionalElements);
    this.addEventListener('click', hideAdditionalElements);

    ev.target.textContent = 'Свернуть';
    // конечная высота для отработки анимации
    this.style.height = `${this.scrollHeight}px`;
  }
}
//после загрузки проходим по листам формы, если в листе больше пунктов чем задано, то прячем лишние
//добавляем кнопку для открытия спрятанных пунктов и вешаем на неё ф-ю-обработчик открывающюю спрятанные пункты
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < formLists.length; i++) {
    const elemlOfList = formLists[i];
    // console.log(elemlOfList);

    if (elemlOfList.children.length > numOfShowEls) {
      for (let i = numOfShowEls; i < elemlOfList.children.length; i++) {
        elemlOfList.children[i].classList.add('visually-hidden');
      }

      const numOfHiddenEls = elemlOfList.children.length - numOfShowEls;

      elemlOfList.insertAdjacentHTML('beforeend', `<span class="filter-list-btn">Ещё ${numOfHiddenEls}</span>`);

      elemlOfList.addEventListener('click', showAdditionalElements);
      // стили для анимации
      elemlOfList.style.overflow = 'hidden';
      elemlOfList.style.transition = 'height 500ms ease';
    }
  }
});

