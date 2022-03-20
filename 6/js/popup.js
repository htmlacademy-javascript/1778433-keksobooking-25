import {generateArrAd} from './generate_arr_ad.js';

// Шаблон для клонирования
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupItem = cardTemplate.cloneNode(true);
const mapCanvas = document.querySelector('#map-canvas');
const featureListElement = popupItem.querySelector('.popup__features');
const photoListElement = document.querySelector('.popup__photos');
const photoListFragment = document.createDocumentFragment();
const descriptionElement = popupItem.querySelector('.popup__description');

const generatePopup = generateArrAd;

generatePopup.forEach((offer) => {
  popupItem.querySelector('.popup__title').textContent = offer.title;
  popupItem.querySelector('.popup__text--address').textContent = `${offer.address.lat} - ${offer.address.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupItem.querySelector('.popup__type').textContent = offer.type;
  popupItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupItem.querySelector('.popup__features').textContent = offer.features;
  descriptionElement.textContent = offer.description;
  popupItem.querySelector('.popup__avatar').src = offer.avatar;
  mapCanvas.appendChild(popupItem);

  // Добавление дополнительных тегов img для фото
  offer.photos.forEach((photo) => {
    const photoItem = document.querySelector('.popup__photo').cloneNode(true);
    photoItem.src = photo;
    photoListFragment.appendChild(photoItem);
  });
  popupItem.appendChild(photoListFragment);

  document.querySelector('.popup__photo:first-child').classList.add('hidden');

  // Скрытие блока, если нет данных
  const checkDataAvailable = (content, element) => {
    if (!content.length) {
      element.classList.add('hidden');
    }
  };

  checkDataAvailable(offer.features, featureListElement);
  checkDataAvailable(offer.photos, photoListElement);
  checkDataAvailable(offer.description, descriptionElement);

});


