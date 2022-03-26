const sliderElement = document.querySelector('.ad-form__slider'); // div
const valueElement = document.querySelector('#price');
const typesOfHousing = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

typesOfHousing.addEventListener('change', (evt) => {
  switch(evt.target.value) {
    case 'bungalow': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3000,
      },
      step: 200,
    });
      break;
    case 'flat': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1000,
        max: 10000
      },
      step: 1000,
    });
      break;
    case 'hotel': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 3000,
        max: 20000
      },
      step: 1000,
    });
      break;
    case 'house': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 5000,
        max: 50000
      },
      step: 2000,
    });
      break;
    case 'palace': sliderElement.noUiSlider.updateOptions({
      range: {
        min: 10000,
        max: 100000
      },
      step: 5000,
    });
      break;
  }
});
