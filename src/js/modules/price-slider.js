// noUiSlider
const priceSlider = document.getElementById('price-slider');

if (priceSlider) {
  noUiSlider.create(priceSlider, {
      start: [2000, 150000],
      connect: true,
      range: {
          'min': 0,
          'max': 250000
      }
  });

  const input0 = document.getElementById('price-input-0');
  const input1 = document.getElementById('price-input-1');
  const inputs = [input0, input1];
  // ! помещаем исходные данные в sessionStorage
  sessionStorage.setItem('priceSliderValue', priceSlider.noUiSlider.get());

  priceSlider.noUiSlider.on('update', function(values, handle){
    inputs[handle].value = Math.round(values[handle]);

    // помещаем в sessionStorage изменившиеся данные 
    sessionStorage.setItem('priceSliderValue', priceSlider.noUiSlider.get());
  });

  // обработчик отсылает данные формы после изменения их ползунками noUISlider`а
  priceSlider.noUiSlider.on('end', function(){
    // помещаем в sessionStorage изменившиеся данные 
    sessionStorage.setItem('priceSliderValue', priceSlider.noUiSlider.get());
    /* из формы данные забираем через функцию getDataFromForm
      (!) для корректной работы файл с настройками noUiSlider д.б. подключен
      после файла с описанием функции getDataFromForm */
    const dataForSend = getDataFromForm();
    // отсылаем данные из формы...
    // filterFormEl.submit(dataForSend);
    console.log(dataForSend);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    console.log(arr);
    priceSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      console.log(index);
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}