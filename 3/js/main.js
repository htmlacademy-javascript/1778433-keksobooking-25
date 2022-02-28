// Функции

// Случайное целое число
const getRandomInt = (min, max) => {
  if (min >= 0 & max >= 0 & max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor (Math.random() * (max - min + 1) + min);
  } return 'Неверный диапазон!';
};


// Случайное десятичное число
const getRandomFloat = (min, max, numsign = 1) => {
  if (min >= 0 & max >= 0 & max > min) {
    const result = Math.random() * (max-min) + min;
    return +result.toFixed(numsign);
  } return 'Неверный диапазон!';
};


// **************************************************************************

// Object 1 - Описание автора (аватарка)

const numUser = String(getRandomInt(1, 10)).padStart(2, 0);
const avatar = `img/avatars/user${numUser}.png`;

const author = {avatar};


//  Object 2 - Информация об объявлении

// 1)
const price =  getRandomInt(10, 100);

// 2)
const typeMas = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const type = (elem) => typeMas[getRandomInt(0, typeMas.length - 1)];

// 3)
const rooms = getRandomInt(1, 10);

// 4)
const guests = getRandomInt(1, 20);

// 5)
const checkinMas = ['12:00', '13:00', '14:00'];
const checkin = (elem) => checkinMas[getRandomInt(0, checkinMas.length - 1)];

// 6)
const checkout = (elem) => checkinMas[getRandomInt(0, checkinMas.length - 1)];

// 7)
const featuresMas = ['wifi', 'dishwashar', 'parking', 'washer', 'elevator', 'conditioner'];

const getRandomFeature = () => {
  const fea = []; // генерируемый массив
  const feaLng = getRandomInt(1, featuresMas.length); // задаем рендомную длину генерируемому массиву от 1 до 6

  while (fea.length < feaLng) {
    const elemRand = featuresMas[getRandomInt(0, featuresMas.length-1)]; // рендомный элемент массива с индексом от 0 до 5
    let found = false;
    for (let i = 0; i < fea.length; i++) {
      if (fea[i] === elemRand){
        found = true;
        break;
      }
    }
    if (!found) {
      fea[fea.length]=elemRand;
    }
  }
  return fea;
};

const offer = {
  title: 'Заголовок предложения', // заменить
  //address: {{location.lat}}, {{location.lng}}, // Адрес предложения
  price,
  type: type(typeMas),
  rooms,
  guests,
  checkin: checkin(checkinMas),
  checkout: checkin(checkinMas),
  features: getRandomFeature(),
  description: 'Описание помещения',
  photos: 'Фото',
};


//  Object 3 - Местоположение

const locationn = {
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5),
};

// console.log(author);
// console.log(offer);
// console.log(locationn);
