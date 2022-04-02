// Шаблон для клонирования
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const photoListElement = document.querySelector('.popup__photos');
const photoListElementFragment = document.createDocumentFragment();
//const popupListElement = document.createDocumentFragment();

const createCustomPopup = (item) => {
  const popupItem = cardTemplate.cloneNode(true);
  const featureListElement = popupItem.querySelector('.popup__features');
  const descriptionElement = popupItem.querySelector('.popup__description');

  popupItem.querySelector('.popup__title').textContent = item.offer.title;
  popupItem.querySelector('.popup__text--address').textContent = `${item.location.lat} - ${item.location.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  popupItem.querySelector('.popup__type').textContent = item.offer.type;
  popupItem.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  descriptionElement.textContent = item.offer.description;
  popupItem.querySelector('.popup__avatar').src = item.author.avatar;
  mapCanvas.appendChild(popupItem);

  if (item.offer.features) {
  //featureListElement.textContent = '';
    item.offer.features.forEach((item) => {
      const featureElement = document.createElement('li');
      const featureClass = `popup__feature--${item}`;
      featureElement.classList.add('popup__feature', featureClass);
      featureListElement.appendChild(featureElement);
    });
  }

  // Добавление дополнительных тегов img для фото
  if (item.offer.photos) {
    item.offer.photos.forEach((photo) => {
      const photoItem = document.querySelector('.popup__photo').cloneNode(true);
      photoItem.src = photo;
      if (!photoItem.src) {
        photo.remove();
      } else {
        photoListElementFragment.appendChild(photoItem);
      }
    });
  }
popupItem.querySelector('.popup__photo').remove();

  popupItem.appendChild(photoListElementFragment);

  // Скрытие блока, если нет данных
  const checkDataAvailable = (content, element) => {
    if (content && !content.length) {
      element.classList.add('hidden');
    }
  };

  checkDataAvailable(item.offer.features, featureListElement);
  checkDataAvailable(item.offer.photos, photoListElement);
  checkDataAvailable(item.offer.description, descriptionElement);

  return popupItem;
};

export {createCustomPopup};
