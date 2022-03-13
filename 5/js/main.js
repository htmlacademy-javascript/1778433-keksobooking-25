import {getRandomInt, getRandomFloat} from './get_random_value.js';

const generateAvatar = () => {
  const numUser = String(getRandomInt(1, 10)).padStart(2, 0);
  const avatar = `img/avatars/user${numUser}.png`;
  const author = {avatar};
  return author;
};


const generateInfoHouse = () => {

  const place = {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5),
  };


  const housingPrice =  getRandomInt(10, 100);

  const randomHousingType = () =>  {
    const housingTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
    return housingTypes[getRandomInt(0, housingTypes.length - 1)];
  };


  const rooms = getRandomInt(1, 10);

  const guests = getRandomInt(1, 20);

  const checkinTimes = ['12:00', '13:00', '14:00'];
  const getCheckinTime = () => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];

  const getCheckoutTime = () => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];

  const getRandomFeatures = () => {

    const featuresList = ['wifi', 'dishwashar', 'parking', 'washer', 'elevator', 'conditioner'];

    const features = new Set();
    const featuresLength = getRandomInt(1, featuresList.length);

    while (features.size < featuresLength) {
      const randomFeature = featuresList[getRandomInt(0, featuresList.length-1)];
      features.add(randomFeature);
    }
    return [...features];
  };

  const getRandomPhotos = () => {
    const photosArr = [
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
    ];

    return photosArr.slice(0, getRandomInt(1, photosArr.length));
  };

  const offer = {
    title: 'Заголовок предложения', // заменить
    address: place,
    housingPrice,
    type: randomHousingType(),
    rooms,
    guests,
    checkin: getCheckinTime(checkinTimes),
    checkout: getCheckoutTime(checkinTimes),
    features: getRandomFeatures(),
    description: 'Описание помещения', // заменить
    photos: getRandomPhotos(),
  };

  switch(offer.type) {
    case 'palace': offer.description = 'Дворец для настоящего королевского отдыха';
      break;
    case 'flat': offer.description = 'Светлая и просторная квартира с видом на море';
      break;
    case 'house': offer.description = 'Большой двухэтажный дом в экологически чистом месте';
      break;
    case 'bungalow': offer.description = 'Калифорнийское бунгало с колоннами и покатой крышей';
      break;
    case 'hotel': offer.description = 'Лучший отель в городе';
      break;
  }

  return offer;
};

const descriptionAdd = () => ({
  generateAvatar: generateAvatar(),
  generateInfoHouse: generateInfoHouse(),
});

const generateArrAd = Array.from({length: 10}, descriptionAdd);


// eslint-disable-next-line no-console
//console.log(generateArrAd);




//----------------------------------------------------------------


const mapCanvas = document.querySelector('#map-canvas');

// Шаблон для клонирования
const cardTemplate = document.querySelector('#card > .popup');

// Делаем клонирование
const popupItem = cardTemplate.cloneNode(true);
// Клонированный шаблон добавляем в блок #map-canvas
mapCanvas.appendChild(popupItem);

console.log(mapCanvas);
