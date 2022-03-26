import {generateArrAd} from './generate_arr_ad.js';

const offers = generateArrAd;

// Шаблон для клонирования
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const photoListElement = document.querySelector('.popup__photos');
const photoListElementFragment = document.createDocumentFragment();
//const popupListElement = document.createDocumentFragment();

const createCustomPopup = (array) => {

  const popupItem = cardTemplate.cloneNode(true);
  const featureListElement = popupItem.querySelector('.popup__features');
  const descriptionElement = popupItem.querySelector('.popup__description');

  popupItem.querySelector('.popup__title').textContent = array.title;
  popupItem.querySelector('.popup__text--address').textContent = `${array.address.lat} - ${array.address.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${array.price} ₽/ночь`;
  popupItem.querySelector('.popup__type').textContent = array.type;
  popupItem.querySelector('.popup__text--capacity').textContent = `${array.rooms} комнаты для ${array.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${array.checkin}, выезд до ${array.checkout}`;
  descriptionElement.textContent = array.description;
  popupItem.querySelector('.popup__avatar').src = array.avatar;
  mapCanvas.appendChild(popupItem);

  featureListElement.textContent = ''; // <-- не пойму как влияет на список
  array.features.forEach((item) => {
    const featureElement = document.createElement('li');
    const featureClass = `popup__feature--${item}`;
    featureElement.classList.add('popup__feature', featureClass);
    featureListElement.appendChild(featureElement);
  });

  // Добавление дополнительных тегов img для фото
  array.photos.forEach((photo) => {
    const photoItem = document.querySelector('.popup__photo').cloneNode(true);
    photoItem.src = photo;
    photoListElementFragment.appendChild(photoItem);
  });

  popupItem.appendChild(photoListElementFragment);


  //document.querySelector('.popup__photo:first-child').classList.add('hidden');

  // Скрытие блока, если нет данных
  const checkDataAvailable = (content, element) => {
    if (!content.length) {
      element.classList.add('hidden');
    }
  };

  checkDataAvailable(array.features, featureListElement);
  checkDataAvailable(array.photos, photoListElement);
  checkDataAvailable(array.description, descriptionElement);

  //popupListElement.appendChild(popupItem);

  return popupItem;
};

export {createCustomPopup, offers};
