import {createCustomPopup} from './popup.js';
import { offers } from './generate_arr_ad.js';
import {getAdverts} from './api.js';

const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};

const MAP_MARKER_MAIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [62, 85],
  iconAnchor: [31, 85],
};

const MAP_MARKER_DEFAULT = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//******************************************************************** */

// Creat map
const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
  })
  .setView(START_COORDINATE, 11);

L.tileLayer(
  MAP_TILE,
  {
    attribution: MAP_COPYRIGHT
  },)
  .addTo(map);

const mainPinIcon = L.icon(MAP_MARKER_MAIN);

const mainPinMarker = L.marker(START_COORDINATE,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const addressField = document.querySelector('#address');
// Function for setting coordinate
const setCoordinate = ({lat, lng}) => {
  const latItem = parseFloat(lat).toFixed(5);
  const lngItem = parseFloat(lng).toFixed(5);

  addressField.value = `${latItem}, ${lngItem}`;
};

mainPinMarker.on('moveend', (evt) => {
  setCoordinate(evt.target.getLatLng());
});

// Setup offers from data
// loadAdverts().then(array => {
//   array.forEach((item) => {
//     const {lat, lng} = item.location;
//     const icon = L.icon(MAP_MARKER_DEFAULT);
//     const marker = L.marker({
//       lat,
//       lng,
//     },
//     {
//       icon,
//     });
//     marker.addTo(map).bindPopup(createCustomPopup(item));
//   });
// }, );

getAdverts().then(array => {
  array.forEach((item) => {
    const {lat, lng} = item.location;
    const icon = L.icon(MAP_MARKER_DEFAULT);
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    });
    marker.addTo(map).bindPopup(createCustomPopup(item));
  });
}, );




// Reset map
addressField.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;

// Reset button
const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, 16);
});

