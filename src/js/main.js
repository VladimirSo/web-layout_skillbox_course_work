// const obj = {
//     test: 'test, тест, 123'
// };
// const prop = obj.test;
// console.log(prop);

const bodyElem = document.querySelector('body');

const srchFormElem = document.querySelector('.js-search-area');
const srchFormBtnElem = document.querySelector('.js-srch-area-btn');

const menuElem = document.querySelector('.js-main-nav')
const mobMenuBtnElem = document.querySelector('.js-nav-btn');

//
bodyElem.classList.remove('no-js');

//
const openSearchList = () => {
  srchFormElem.classList.toggle('search-area-open');
};

srchFormBtnElem.addEventListener('click', openSearchList);

//
const openMobMenu = () => {
  menuElem.classList.toggle('main-nav-open');
  mobMenuBtnElem.classList.toggle('nav-btn-active');

  setTimeout( () => {
    if (menuElem.classList.contains('main-nav-open')) {
      bodyElem.style.overflow = 'hidden';
    } else {
      bodyElem.style.overflow = '';
    }
  }, 500);
};

mobMenuBtnElem.addEventListener('click', openMobMenu);

//
const selectRegElem = document.querySelector('.region-list');

const choices = new Choices(selectRegElem, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});

//
const swiperHeroElem = document.querySelector('.hero-swiper');

const swiper1 = new Swiper(swiperHeroElem, {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // autoplay: true, // <- автопрокрутка

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

const swiperOffersElem = document.querySelector('.offers-swiper');

const swiper2 = new Swiper(swiperOffersElem, {
  direction: 'horizontal',
  // loop: true,
  // autoplay: true, // <- автопрокрутка

  navigation: {
    nextEl: '.offers-btn-prev',
    prevEl: '.offers-btn-next',
  },

  breakpoints: {
    1290: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 3
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2
    }
  }
});

const swiperAdviсesElem = document.querySelector('.adviсes-swiper');

const swiper3 = new Swiper(swiperAdviсesElem, {
  direction: 'horizontal',
  // loop: true,
  // autoplay: true, // <- автопрокрутка

  navigation: {
    nextEl: '.adviсes-btn-prev',
    prevEl: '.adviсes-btn-next',
  },

  breakpoints: {
    1290: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 3
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2
    }
  }
});

//
const contactPhone = document.getElementById("contactPhone");

const im = new Inputmask({"mask": "+7 (999) 999-9999"});
im.mask(contactPhone);

//
const validation = new JustValidate('#contactForm',
  {
    errorFieldCssClass: 'is-invalid',
    successFieldCssClass: 'is-success',
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#ff6972',
      fontSize: '12px',
    },
    focusInvalidField: true,
    lockForm: true,
  }
);

validation
  .addField('#contactName', [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Недопустимый формат',
      },
    ])

  .addField('#contactEmail', [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      },
    ])

  .addField('#contactPhone', [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле',

      },
      {
        rule: 'length',
        errorMessage: 'Недопустимый формат',
        validator: () => {
          const phone = contactPhone.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10
        },        
      }
    ])

  .addField('#contactCheck', [
    {
        rule: 'required',
        errorMessage: 'Заполните это поле',
    },
  ]);


