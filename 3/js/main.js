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

  // 1)
  const housingPrice =  getRandomInt(10, 100);

  // 2)
  const randomHousingType = () =>  {
    const housingTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
    return housingTypes[getRandomInt(0, housingTypes.length - 1)];
  };

  // 3)
  const rooms = getRandomInt(1, 10);

  // 4)
  const guests = getRandomInt(1, 20);

  // 5)
  const checkinTimes = ['12:00', '13:00', '14:00'];
  const getCheckinTime = (elem) => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];

  // 6)
  const getCheckoutTime = (elem) => checkinTimes[getRandomInt(0, checkinTimes.length - 1)];

  // 7)
  const featuresList = ['wifi', 'dishwashar', 'parking', 'washer', 'elevator', 'conditioner'];

  const getRandomFeature = () => {
    const fea = []; // генерируемый массив
    const feaLng = getRandomInt(1, featuresList.length); // задаем рандомную длину генерируемому массиву от 1 до 6

    while (fea.length < feaLng) {
      const elemRand = featuresList[getRandomInt(0, featuresList.length-1)]; // рандомный элемент массива с индексом от 0 до 5
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

  // 8)
  const photos = () => {
    const photosArr = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
    ];

    return photosArr.slice(0, getRandomInt(1, photosArr.length));
  };


  const offer = {
    title: 'Заголовок предложения', // заменить
    address: place, // Адрес предложения
    housingPrice,
    type: randomHousingType(),
    rooms,
    guests,
    checkin: getCheckinTime(checkinTimes),
    checkout: getCheckoutTime(checkinTimes),
    features: getRandomFeature(),
    description: 'Описание помещения',
    photos: photos(),
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

