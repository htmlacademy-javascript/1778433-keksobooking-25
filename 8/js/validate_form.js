export {sendAdvert} from './api.js';
export {showAlert} from './utils.js';

const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const roomNumberField = form.querySelector('#room_number');
const submitButton = form.querySelector('.ad-form__submit');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',              // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element',     // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span',               // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error',       // Класс для элемента с текстом ошибки
});

// Title
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'), validateTitle, 'От 30 до 100 символов'
);

// Price
const validatePrice = (value) => parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100000;
pristine.addValidator(price, validatePrice, 'От 0 до 100 000');

// Rooms and guests
const capacityField = form.querySelector('#capacity');
const settleOption = {
  '1'   : ['1'],
  '2'   : ['1', '2'],
  '3'   : ['1', '2', '3'],
  '100' : ['0']
};

function validateSettle () {
  return settleOption[roomNumberField.value].includes(capacityField.value);
}
const getSettleErrorMessage = () => 'Недопустимый вариант заселения';

pristine.addValidator(roomNumberField, validateSettle, getSettleErrorMessage);
pristine.addValidator(capacityField, validateSettle, getSettleErrorMessage);

// Тип жилья
const typesOfHousing = form.querySelector('#type');
const housingMinPrices = {
  bungalow : 0,
  flat : 1000,
  hotel: 3000,
  house : 5000,
  palace : 10000,
};

function validateTypesOfHousing (value) {
  const unit = typesOfHousing.value;
  return parseInt(value, 10) >= housingMinPrices[unit];
}

function onUnitChangePrice (value) {
  price.placeholder = housingMinPrices[value];
  pristine.validate(price);
}
typesOfHousing.addEventListener('change', () => onUnitChangePrice(typesOfHousing.value));

const getTypesOfHousingErrorMessage = () => 'Цена не соответствует';

pristine.addValidator(typesOfHousing, validateTypesOfHousing, getTypesOfHousingErrorMessage);
pristine.addValidator(price, validateTypesOfHousing, getTypesOfHousingErrorMessage);


// Добавляем обработчик на изменения значения в input
roomNumberField.addEventListener('change', () => {
  pristine.validate();
});

// Block button
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Unblock button
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendAdvert(() => {
        onSuccess();
        unblockSubmitButton();
      },
      () => {
        showAlert('Не удалось отправить форму. Попробуйте еще раз');
        unblockSubmitButton();
      },
      new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
