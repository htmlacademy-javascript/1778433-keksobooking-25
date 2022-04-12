import {createCustomPopup} from './popup.js';
import {getAdverts} from './api.js';
import {setFilterChange, debounce} from './utils.js';


const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};

const MAP_MARKER_MAIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const MAP_MARKER_DEFAULT = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const RENDER_DELAY = 500;

//******************************************************************** */

// Create map
const map = L.map('map-canvas')
  .on('load', () => {
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

const setCoordinate = ({lat, lng}) => {
  const latItem = parseFloat(lat).toFixed(5);
  const lngItem = parseFloat(lng).toFixed(5);

  addressField.value = `${latItem}, ${lngItem}`;
};

mainPinMarker.on('moveend', (evt) => {
  setCoordinate(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const renderPinList = () => {
  getAdverts().then((array) => {
    markerGroup.clearLayers();
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
      marker.addTo(markerGroup).bindPopup(createCustomPopup(item));
    });
  }, );
};

renderPinList();

setFilterChange(debounce(() => renderPinList(), RENDER_DELAY));

// Reset map
addressField.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;

// Reset button
const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, 11);
  setTimeout(() => {
    addressField.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
  }, 1);
});
