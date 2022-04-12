const formFilter = document.querySelector('.map__filters');
const selectHousingType = formFilter.querySelector('#housing-type'); // тип жилья
const selectPrice  = formFilter.querySelector('#housing-price'); // цена
const selectRooms  = formFilter.querySelector('#housing-rooms'); // кол-во комнат
const selectGuests  = formFilter.querySelector('#housing-guests'); // кол-во гостей

const priceMap = {
  low: {min: 0, max: 10000},
  middle: {min: 10000, max: 50000},
  high: {min: 50000, max: Infinity},
};

const filterAdverts = (advert) => {
  const selectedFeatures = formFilter.querySelectorAll('.map__checkbox:checked'); // выбранные преимущества (checkbox)

  // тип жилья
  const checkType = () =>  advert.offer.type === selectHousingType.value || selectHousingType.value === 'any';
  // цена
  const checkPrice = () => selectPrice.value === 'any' ? true :
    advert.offer.price >= priceMap[selectPrice.value].min && advert.offer.price < priceMap[selectPrice.value].max;
  // число комнат
  const checkRooms = () => selectRooms.value === 'any' || advert.offer.rooms === +selectRooms.value;
  // число гостей
  const checkGuests = () => selectGuests.value === 'any' || advert.offer.guests === +selectGuests.value;
  // преимущества
  const checkFeatures = () => {
    if (advert.offer.features) {
      return [...selectedFeatures].every((feature) => (advert.offer.features.includes(feature.value)));
    }
  };

  if (
    checkType()
    &&
    checkPrice()
    &&
    checkRooms()
    &&
    checkGuests()
    &&
    checkFeatures()
  ) {
    return true;
  }
};

export {filterAdverts};
