'use strict';

(() => {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT_IN_MS = 2000;
  const StatusCode = {
    OK: 200
  };

  window.load = {
    onSuccesLoad: (onSucces) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', () => {
        if (xhr.status === StatusCode.OK) {
          onSucces(xhr.response);
          window.pin.mapNode.classList.remove(`map--faded`);
          window.form.adNode.classList.remove(`ad-form--disabled`);
          window.data.errorArea.classList.remove(`error-handler`);
          window.data.errorArea.textContent = ``;
        } else {
          window.data.onError(`Response status: ${xhr.status} ${xhr.statusText}`);
        }
      });

      xhr.open('GET', URL);
      xhr.send();
    },

    onErrorLoad: (onError) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener(`error`, () => {
        onError(`Error connection`);
      });
      xhr.addEventListener('timeout', () => {
        onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} сек. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу!`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
