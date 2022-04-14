const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const imagesChooser = document.querySelector('#images');
const previewImages = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Avatar
avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

// Images
imagesChooser.addEventListener('change', () => {
  const file = imagesChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const itemFormImage = document.createElement('img');
    previewImages.appendChild(itemFormImage);
    itemFormImage.src = URL.createObjectURL(file);
  }
});
