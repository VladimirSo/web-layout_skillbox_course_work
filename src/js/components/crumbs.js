// эмуляция работы breadcrumbs

// блок контейнер для крошек
const crumbsBlockEl = document.querySelector('.breadcrumbs');
// список для страниц с соответствующими для них названиями 
const crumbsTmpl = [
  {
    link: 'catalog.html',
    name: 'Прямые диваны'
  },
  {
    link: 'product.html',
    name: 'D-31'
  },
  {
    link: '',
    name: 'Главная'
  }
];
// создаем начальный список для крошек
let crumbsList = document.createElement('ul');
crumbsList.className = "breadcrumb breadcrumb-list";
// вставляем в список элементы которые будут на всех страницах
crumbsList.innerHTML = '<li class="breadcrumb-item"><a class="breadcrumb-item__link" href="/">Главная</a></li><li class="breadcrumb-item"><a class="breadcrumb-item__link" href="#">Каталог</a></li><li class="breadcrumb-item"><a class="breadcrumb-item__link" href="#">Диваны</a></li>';
// console.log(crumbsList);

// ф-я будет получать лист со списком крошек и записывать в sessionStorage массив с ссылками из крошек
const moveListInSS = (list) => {
  // получаем из листа массив его li-элементов
  const arrayLiElems = Array.from(list.children);
  // задаем массив для ссылок крошек
  const hrefsArray = [];
  // для каждой крошки (li-элемента) получаем значение href и помещаем его в массив
  for (let i=0; i<arrayLiElems.length; i++) {
    // console.log(arrayLiElems[i].getElementsByTagName('a')[0].href);
    hrefsArray[i] = arrayLiElems[i].getElementsByTagName('a')[0].href;
  }
  // массив с ссылками записываем в sessionStorage
  sessionStorage.setItem('bread_crumbs', JSON.stringify(hrefsArray));  
}
// ф-я будет возвращать человекочитабельное имя соответствующее URL
const getCrumbName = (url) => {
  // убираем из url занчение протокола и разбиваем строку url на части
  const urlParts = url.replace(/https?:\/\//g, '').split('/');
  // берем последнюю часть url и по ней ищем в ранее созданном  списке страница/название соответствующее название для крошки
  const urlLastEl = urlParts[urlParts.length-1];
  // console.log('последняя часть текущего url: ' + urlLastEl);
  const crumbName = (crumbsTmpl.find(item => item.link == urlLastEl)).name;
  // console.log('имя для крошки: ' + crumbName);

  return crumbName
}
// ф-я получает url посещенной страницы и в зависимости от него создает список крошек
const makeCrumbsList = (url, name) => {
 /* если в sessionStorage уже есть список с ссылками посещенных страниц,
  то извлекаем его и работать будем с ним;
  в противном случае просто добавляем крошку для текущего url в список крошек */
  if (sessionStorage.getItem('bread_crumbs') != null) {
    // создаем массив из прежнего списка 
    const arrayLiElems = JSON.parse(sessionStorage.bread_crumbs);
    // первые три элемента убираем, они были вставлены вручную
    arrayLiElems.splice(0, 3);
    // после извлечения списка из sessionStorage удаляем его
    sessionStorage.removeItem('bread_crumbs');
    // console.log(arrayLiElems);
    /* если текущий url в прежнем списке ссылок не найден, 
      то новая крошка просто добавляется к новому списку крошек сформированному из прежнего списка;
      в противном случае массив полученный из прежнего списка обрезается до элемента с ссылкой соответствующей текущему url,
      и из получившегося массива формируетя новый список крошек */
    if (arrayLiElems.find(item => item == url) === undefined) {
      // console.log('такого еще не было');
      for (let i=0; i<arrayLiElems.length; i++) {
        let currentCrumbName = getCrumbName(arrayLiElems[i]);

        crumbsList.insertAdjacentHTML('beforeend', `<li class="breadcrumb-item"><a class="breadcrumb-item__link" href="${arrayLiElems[i]}">${currentCrumbName}</a></li>`);
      }
          
      crumbsList.insertAdjacentHTML('beforeend', `<li class="breadcrumb-item"><a class="breadcrumb-item__link" href="${url}">${name}</a></li>`);
    } else {
      arrayLiElems.forEach(function(item, index) {
        if (item == url) {
          // console.log('такой уже был: ' + index);
          /* удаляем все элементы начиная со следующего за элементом соответствующим url и до конца */
          arrayLiElems.splice(index + 1, (arrayLiElems.length - 1 - index));
          // console.log('новый список:' + arrayLiElems);

          for (let i=0; i<arrayLiElems.length; i++) {
            crumbsList.insertAdjacentHTML('beforeend', `<li class="breadcrumb-item"><a class="breadcrumb-item__link" href="${arrayLiElems[i]}">${name}</a></li>`);
          }
        }
      });
    }
  } else {
    crumbsList.insertAdjacentHTML('beforeend', `<li class="breadcrumb-item"><a class="breadcrumb-item__link" href="${url}">${name}</a></li>`);
  }
}

// ф-я получает текущий URL и формирует крошки на странице
const getCrumbs = (url) => {
  const urlParts = url.replace(/https?:\/\//g, '').split('/');
  const crumbName = getCrumbName(url);
  /* если текущая страница не начальная то 
  формируем список крошек и вставляем его на страницу,
  в противном случае очищаем запись с ссылками крошек из sessionStorage
  */
  if (urlParts[urlParts.length - 1] !== "") {
    // console.log('не начальная страницa');
    makeCrumbsList(url, crumbName);

    crumbsBlockEl.append(crumbsList);
    // заносим ссылки из крошек в sessionStorage
    moveListInSS(crumbsList);
  } else {
    sessionStorage.removeItem('bread_crumbs');
  }
}
