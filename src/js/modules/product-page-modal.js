// модалки страницы карточки товара

// модалка формы запроса на покупку
const modalBuyOpen = document.querySelector('.js-product-buy-btn');

modalBuyOpen.addEventListener('click', () => {
  // new GraphModal().open('two');
  const modal2 = new GraphModal().open('two');

  const buyPhone = document.getElementById("buyPhone");

  const im = new Inputmask({"mask": "+7 (999) 999-9999"});
  im.mask(buyPhone);

  const validation = new JustValidate('#buyForm',
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
    .addField('#buyName', [
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

    .addField('#buyPhone', [
        {
          rule: 'required',
          errorMessage: 'Заполните это поле',

        },
        {
          rule: 'length',
          errorMessage: 'Недопустимый формат',
          validator: () => {
            const phone = buyPhone.inputmask.unmaskedvalue();
            // return Number(phone) && phone.length === 10
            const checkResult = (Number(phone) && phone.length === 10) ? true : false ;
            return checkResult
          },        
        }
      ])

    .addField('#buyCheck', [
      {
          rule: 'required',
          errorMessage: 'Заполните это поле',
      },
    ]);

    const buyFormEl = document.querySelector('.js-buy-form');
    // обработчик события submit на форме
    buyFormEl.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // если все поля заполнены отправляем запрос
      if (buyFormEl.checkValidity()) {
        // console.log('Форма валидна');
        
        const formData = new FormData(buyFormEl);
        // console.log(Array.from(formData.entries()));
/*
отправка fetch-запроса на нужный URL
если приходит ОК-ответ то закрываем окно с формой
очищаем форму и открываем окно с уведомлением

код fetch-запроса закоммментирован, демонстрация работает и так
*/
        // let response = fetch('/resources/mailer/mail.php', {
        //   method: 'POST',
        //   body: formData
        // })
        //   .then(response => {
        //     if (response.status === 200) {
              buyFormEl.parentElement.parentElement.classList.remove('modal-open');
              buyFormEl.reset();

              new GraphModal().open('three');
        //   }
        // });
      } else {
        console.log('Форма не валидна');
      }
    });
});

// модалка свайпера
const modalSwiperOpen = document.querySelector('.js-modal-swiper-open');

modalSwiperOpen.addEventListener('click', () => {
  new GraphModal().open('one');

  // делаем клоны слайдеров с основного контента страницы
  const swiperCardEl = document.querySelector('.js-product-swiper');
  const swiperCardClone = swiperCardEl.cloneNode(true);
  const swiperNavEl = document.querySelector('.js-nav-swiper');
  const swiperNavClone = swiperNavEl.cloneNode(true);

  swiperNavClone.firstElementChild.firstElementChild.classList.remove('visually-hidden');
  swiperNavClone.classList.remove('swiper-vertical');
  // в исходном слайдере не было кнопок
  swiperNavClone.insertAdjacentHTML('beforeend', 
    `<div class="nav-swiper-btn-prev swiper-button-prev"></div>
    <div class="nav-swiper-btn-next swiper-button-next"></div>`
  );

  // добавляем склонированные элементы в модальное окно
  const modalContent = document.querySelector('.js-modal-content');
  modalContent.append(swiperCardClone);
  modalContent.append(swiperNavClone);

  // ф-я будет убивать клоны при закрытии модального окна
  const killClones = () => {
    swiperCardClone.remove();
    swiperNavClone.remove();
  };

  // обработчики событий которые будут убирать склонированные эелементы
  const modalCloseBtn = document.querySelector('.js-modal-close');
  const modalEl = document.querySelector('.js-modal');
  modalCloseBtn.addEventListener('click', () => {
    killClones();
  });

  modalEl.addEventListener('click', (e) => {
    if (e.target == e.currentTarget) {
      killClones();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
      killClones();
    }
  });

  // формирование слайдеров
  const modalSwiper2 = new Swiper(modalContent.querySelector('.nav-swiper'), {    
    // loop: true,
    navigation: {
      nextEl: '.nav-swiper-btn-prev',
      prevEl: '.nav-swiper-btn-next',
    },
    breakpoints: {
      1290: {
        slidesPerView: 4,
        spaceBetween: 32,
        spaceBetween: 60,
      },
      1024: {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 60,
      },
      768: {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 60,
      },
      0: {
        direction: 'horizontal',
        slidesPerView: 1,
      }
    }
  });

  const modalSwiper1 = new Swiper(modalContent.querySelector('.product-swiper'), {
    slidesPerView: 1,
    noSwiping: true,
    noSwipingClass: 'product-img-wrapper',
    thumbs: { 
      swiper: modalSwiper2
    },
    navigation: {
      nextEl: '.nav-swiper-btn-prev',
      prevEl: '.nav-swiper-btn-next',
    },
  });
});