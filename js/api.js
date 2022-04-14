import {showAlert} from './utils.js';

const API_URL = 'https://25.javascript.pages.academy/keksobooking';

const elemFormMap = document.querySelectorAll('.map__filter, .map__features');

const getAdverts = () => fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((offers) => offers)
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
    if (response.status < 300) {
      onSuccess();
    }
    else {
      throw new Error();
    }
  }).catch(() => onError());
};


export {getAdverts, sendAdvert};
