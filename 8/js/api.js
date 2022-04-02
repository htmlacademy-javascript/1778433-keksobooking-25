const API_URL = 'https://25.javascript.pages.academy/keksobooking';

const getAdverts = () => fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((offers) => offers)
  .catch(() => console.error('Ошибка при загрузке данных с сервера!'));


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


export {getAdverts, sendAdvert};
