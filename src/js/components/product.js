// страница карточки товара

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

// слайдеры страницы карточки товара
@@include('../modules/product-page-swiper.js')

// модальные окна страницы карточки товара
@@include('../modules/product-page-modal.js')
