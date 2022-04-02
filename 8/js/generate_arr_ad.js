import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArrayLength} from './get_random_value.js';


const generateAvatar = () => {
  const numUser = String(getRandomInt(1, 10)).padStart(2, 0);
  const avatar = `img/avatars/user${numUser}.png`;
  return avatar;
};

const generateInfoHouse = () => {

  const location = {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5),
  };

  const price =  getRandomInt(0, 100000);

  const TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };

  const type = getRandomArrayElement(Object.values(TYPES));

  const rooms = getRandomInt(1, 10);

  const guests = getRandomInt(1, 20);

  const checkinTimes = ['12:00', '13:00', '14:00'];
  const getCheckinTime = () => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];
  const getCheckoutTime = () => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];

  const features = ['wifi', 'dishwashar', 'parking', 'washer', 'elevator', 'conditioner'];

  const photosArr = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];

  const offer = {
    title: 'Заголовок предложения',
    location,
    price,
    type,
    rooms,
    guests,
    checkin: getCheckinTime(checkinTimes),
    checkout: getCheckoutTime(checkinTimes),
    features: getRandomArrayLength(features),
    photos: getRandomArrayLength(photosArr),
  };

  switch(offer.type) {
    case 'Дворец': offer.description = 'Дворец для настоящего королевского отдыха';
      break;
    case 'Квартира': offer.description = 'Светлая и просторная квартира с видом на море';
      break;
    case 'Дом': offer.description = 'Большой двухэтажный дом в экологически чистом месте';
      break;
    case 'Бунгало': offer.description = 'Калифорнийское бунгало с колоннами и покатой крышей';
      break;
    case 'Отель': offer.description = 'Лучший отель в городе';
      break;
  }

  return offer;
};

const generateArrAd = new Array(5).fill(null).map(() => ({
  avatar: generateAvatar(),
  ...generateInfoHouse(),
}));

const offers = generateArrAd;


export {offers};
