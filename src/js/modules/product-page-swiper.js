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


const swiperProdCardElem = document.querySelector('.product-swiper');
const swiperProdNavElem = document.querySelector('.nav-swiper');

const swiper3 = new Swiper(swiperProdNavElem, {
  direction: 'horizontal',
  slidesPerView: 2.3 ,
  spaceBetween: 24,
  breakpoints: {
    0: {
      direction: 'horizontal',
    },
    768: {
      direction: 'vertical',
    },
    1024: {
      direction: 'horizontal',
    }
  }
});

const swiper2 = new Swiper(swiperProdCardElem, {
  slidesPerView: 1,
  noSwiping: true,
  noSwipingClass: 'product-img-wrapper',
  thumbs: { 
    swiper: swiper3
  },
});

const sliderNavItems = document.querySelectorAll('.nav-swiper__item');

sliderNavItems.forEach((el, index) => {
  el.setAttribute('data-index', index);

  el.addEventListener('click', (e) => {
    // const index = parseInt(e.currentTarget.dataset.index);
    // // console.log(index)
    // swiper2.slideTo(index);

    for (let i = 0; i < sliderNavItems.length; i++) {
      if (sliderNavItems[i].getAttribute('data-index') != index) {
        // console.log('NO');
        sliderNavItems[i].classList.remove('visually-hidden');
      } else {
        // console.log('YES');
        sliderNavItems[i].classList.add('visually-hidden');
      }
    }
  });
});