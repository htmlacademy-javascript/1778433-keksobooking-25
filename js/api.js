import {showAlert} from './utils.js';
import {filterAdverts} from './filter.js';

const API_URL = 'https://25.javascript.pages.academy/keksobooking';
const ADVERT_COUNT = 10;
const elemFormMap = document.querySelectorAll('.map__filter, .map__features');

const getAdverts = () => fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((offers) => offers.filter(filterAdverts).slice(0, ADVERT_COUNT))
  .catch(() => {
    showAlert('Ошибка при загрузке данных с сервера!');
    elemFormMap.forEach((elem) => elem.setAttribute('disabled', 'disabled'));
  });

const sendAdvert = (onSuccess, onError, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error();
    }
  }).catch((err) => onError(err));
};


export {getAdverts, sendAdvert, API_URL};
