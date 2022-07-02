// слайдеры страницы товара

const swiperSimilarElem = document.querySelector('.similar-swiper');

const swiper1 = new Swiper(swiperSimilarElem, {
  direction: 'horizontal',
  // loop: true,
  // autoplay: true, // <- автопрокрутка

  navigation: {
    nextEl: '.similar-btn-prev',
    prevEl: '.similar-btn-next',
  },

  breakpoints: {
    1290: {
      slidesPerView: 4,
      spaceBetween: 32,
      slidesPerGroup: 1
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 2
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2
    },
    328: {
      slidesPerView: 2,
      spaceBetween: 16,
      slidesPerGroup: 2
    },
  }
});