const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'form__item',              // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item',     // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span',               // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error'       // Класс для элемента с текстом ошибки
});

// Title
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'), validateTitle, 'От 30 до 100 символов'
);

// Price
const validatePrice = (value) => parseInt(value) >= 0 && parseInt(value) <= 100000;

pristine.addValidator(
  form.querySelector('#price'), validatePrice, 'От 0 до 100 000'
);

// Rooms and guests
const roomNumberField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const settleOption = {
  '1 комната' : 'для 1 гостя',
  '2 комнаты' : ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты' : ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат' : 'не для гостей'
};

const validateSettle = () => settleOption[roomNumberField.value].includes(capacityField.value);

const getSettleErrorMessage = () => {
  return `
  ${roomNumberField.value}
  ${capacityField.value}
  ${roomNumberField === '' ? ''}`
}



pristine.addValidator(roomNumberField, validateSettle, );


//--------------------------------------------
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
