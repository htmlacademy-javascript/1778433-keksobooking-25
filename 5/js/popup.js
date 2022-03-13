import {generateArrAd} from './main.js';

const page = document.querySelector('main');

const mapCanvas = document.querySelector('#map-canvas');

// Шаблон для клонирования
const cardTemplate = document.querySelector('#card').сontent.querySelector('.popup');


const popupItem = cardTemplate.cloneNode(true);
mapCanvas.appendChild(popupItem);

