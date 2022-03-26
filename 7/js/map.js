import {generateArrAd} from './generate_arr_ad.js';
import {offers, createCustomPopup} from './popup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
  })
  .setView({
    lat: 35.68948,
    lng: 139.69170,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [62, 85],
  iconAnchor: [31, 85],
});

const mainPinMarker = L.marker({
  lat: 35.68948,
  lng: 139.69170,
},
{
  draggable: true,
  icon: mainPinIcon,
},
);

mainPinMarker.addTo(map);

const addressField = document.querySelector('#address');
addressField.value = `${(mainPinMarker.getLatLng().lat).toFixed(5)}, ${(mainPinMarker.getLatLng().lng).toFixed(5)}`;

mainPinMarker.on('moveend', (evt) => {
  addressField.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
});

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.68948,
    lng: 139.69170,
  });

  map.setView({
    lat: 35.68948,
    lng: 139.69170,
  }, 16);
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

offers.forEach((item) => {
  const {lat, lng} = item.address;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  });
  marker.addTo(map).bindPopup(createCustomPopup(item));
});
