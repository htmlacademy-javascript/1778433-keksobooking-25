import {sendAdvert} from './api.js';
import {displayModalSuccess, displayModalError} from './modal.js';
import { resetForm } from './map.js';

const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const submitButton = form.querySelector('.ad-form__submit');
const priceField = form.querySelector('#price');
const roomNumberField = form.querySelector('#room_number');
const typesOfHousing = form.querySelector('#type');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

// Title
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(titleField, validateTitle, 'От 30 до 100 символов');

// Price
const validatePrice = (value) => parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100000;
pristine.addValidator(priceField, validatePrice, 'От 0 до 100 000');

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
const housingMinPrices = {
  bungalow : 0,
  flat : 1000,
  hotel: 3000,
  house : 5000,
  palace : 10000,
};

const validateTypesOfHousing = (type) => Number(priceField.value) >= housingMinPrices[type];

function validateTypesOfHousingPrice (value) {
  const unit = typesOfHousing.value;
  return Number(value) >= housingMinPrices[unit];
}

function onUnitChangePrice (value) {
  priceField.placeholder = housingMinPrices[value];
  pristine.validate(priceField);
  pristine.validate(typesOfHousing);
}
typesOfHousing.addEventListener('change', () => onUnitChangePrice(typesOfHousing.value));

const getTypesOfHousingErrorMessage = () => 'Цена не соответствует';

pristine.addValidator(typesOfHousing, validateTypesOfHousing, getTypesOfHousingErrorMessage);
pristine.addValidator(priceField, validateTypesOfHousingPrice, getTypesOfHousingErrorMessage);

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendAdvert(
      () => {
        displayModalSuccess();
        unblockSubmitButton();
        resetForm(form);
      },
      () => {
        displayModalError();
        unblockSubmitButton();
        resetForm(form);
      },
      formData,
    );
  }
});
