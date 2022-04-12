const displaySuccessTemplate = document.querySelector('#success').content.cloneNode(true); // копия шаблона при успешной отправке
const displayErrorTemplate = document.querySelector('#error').content.cloneNode(true); // копия шаблона при ошибке отправки


const displayModalSuccess = () => {
  const ElementFragment = document.createDocumentFragment(); // фрагмент DOM-дерева
  ElementFragment.appendChild(displaySuccessTemplate);
  document.body.appendChild(ElementFragment);
  const displaySuccess =  document.querySelector('.success');
  displaySuccess.classList.remove('hidden');
  document.addEventListener('click', (e) => {
    const click = e.composedPath();
    if (click) {
      displaySuccess.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      displaySuccess.classList.add('hidden');
    }
  });
};

const displayModalError = () => {
  const ElementFragment = document.createDocumentFragment(); // фрагмент DOM-дерева
  const buttonModalError = document.querySelector('.error__button'); // "Попробовать снова"
  ElementFragment.appendChild(displayErrorTemplate);
  document.body.appendChild(ElementFragment);
  const displayError =  document.querySelector('.error');
  displayError.classList.remove('hidden');
  document.addEventListener('click', (e) => {
    const click = e.composedPath();
    if (click) {
      displayError.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      displayError.classList.add('hidden');
    }
  });
  buttonModalError.addEventListener('click', () => {
    displayError.classList.add('hidden');
  });
};


export {displayModalSuccess, displayModalError};
