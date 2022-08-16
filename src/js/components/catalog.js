// страница каталога

//
@@include('../modules/check-js.js')

//
@@include('../modules/header-search-list.js')

//
@@include('../modules/mobile-menu.js')

//
@@include('../modules/select-region.js')

console.log(breadcrumb.build());

const brCrumbEl = document.querySelector('.breadcrumbs');
const crumbs = breadcrumb.build();

brCrumbEl.insertAdjacentHTML('beforeend', crumbs);

// лист фильтра товаров по категориям
@@include('../modules/catalog-filter.js')

// выор ценового диапазона на странице каталога
@@include('../modules/price-slider.js')

// список товаров
@@include('../modules/products-list.js')