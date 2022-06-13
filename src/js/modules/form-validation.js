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