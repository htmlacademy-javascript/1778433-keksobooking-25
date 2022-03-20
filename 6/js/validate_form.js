const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const roomNumberField = form.querySelector('#room_number');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',              // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element',     // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span',               // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error',       // Класс для элемента с текстом ошибки
});

// Просто копия настроек для Pristine
const classObject =  {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
};

// Объект, в котором будут храниться Prisitine для каждого input в форме
// Нужно просто добавлять поля по аналогии
const ValidationObject = {
  roomNumber: new Pristine(roomNumberField, classObject),
};

// Title
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'), validateTitle, 'От 30 до 100 символов'
);

// ValidationObject.roomNumber.addValidator(roomNumberField, (value) => console.log(value) && true, 'Тестовая ошибка');

// Price
const validatePrice = (value) => parseInt(value) >= 0 && parseInt(value) <= 100000;
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

// Для каждого поля добавляет валидатор
// Соответственно, для capacityField выглядело бы вот так
// ValidationObject.capacityField.addValidator(capacityField, validateSettle, getSettleErrorMessage);
ValidationObject.roomNumber.addValidator(roomNumberField, validateSettle, getSettleErrorMessage);
pristine.addValidator(capacityField, validateSettle, getSettleErrorMessage);

// --------------------------------------------------------------------------------

// Тип жилья
const TypesOfHousing = form.querySelector('#type');
const housingMinPrices = {
  bungalow : 0,
  flat : 1000,
  hotel: 3000,
  house : 5000,
  palace : 10000,
};

function validateTypesOfHousing (value) {
  const unit = TypesOfHousing.value;
  return parseInt(value) >= housingMinPrices[unit];
}

pristine.addValidator(TypesOfHousing, validateTypesOfHousing, 'Цена не соответствует');
pristine.addValidator(price, validateTypesOfHousing, 'Цена не соответствует');


// Добавляем обработчик на изменения значения в input
roomNumberField.addEventListener('change', () => {
  ValidationObject.roomNumber.validate();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

});
