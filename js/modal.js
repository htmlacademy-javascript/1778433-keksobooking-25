const displaySuccessTemplate = document.querySelector('#success').content.cloneNode(true); // копия шаблона при успешной отправке
const displayErrorTemplate = document.querySelector('#error').content.cloneNode(true); // копия шаблона при ошибке отправки

const isHidden = (elem) => {
  document.addEventListener('click', (e) => {
    const click = e.composedPath();
    if (click) {
      elem.classList.add('hidden');
    }
  });
};

const isEscape = (elem) => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      elem.classList.add('hidden');
    }
  });
};


const displayModalSuccess = () => {
  const elementFragment = document.createDocumentFragment(); // фрагмент DOM-дерева
  elementFragment.appendChild(displaySuccessTemplate);
  document.body.appendChild(elementFragment);
  const displaySuccess =  document.querySelector('.success');
  displaySuccess.classList.remove('hidden');
  isHidden(displaySuccess);
  isEscape(displaySuccess);
};

const displayModalError = () => {
  const elementFragment = document.createDocumentFragment(); // фрагмент DOM-дерева
  const buttonModalError = document.querySelector('.error__button'); // "Попробовать снова"
  elementFragment.appendChild(displayErrorTemplate);
  document.body.appendChild(elementFragment);
  const displayError =  document.querySelector('.error');
  displayError.classList.remove('hidden');
  isHidden(displayError);
  isEscape(displayError);
  buttonModalError.addEventListener('click', () => {
    displayError.classList.add('hidden');
  });
};

export {displayModalSuccess, displayModalError};
