const form = document.querySelector('.ad-form');
const fieldsetForm = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

const mapFiltersField = [fieldsetForm, mapFiltersSelect, mapFiltersFieldset];

const formDisactive = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersField.forEach((item) => {item.disabled = true;});
};

const formActive = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersField.forEach((item) => {item.disabled = false;});
};

formDisactive();
formActive();
