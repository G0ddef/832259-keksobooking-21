'use strict';

(() => {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.load = (onSucces, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSucces(xhr.response);
        window.pin.mapNode.classList.remove(`map--faded`);
        window.form.adNode.classList.remove(`ad-form--disabled`);
        window.data.errorArea.classList.remove(`error-handler`);
        window.data.errorArea.textContent = ``;
        window.statusPage.toggleDisabledOnFormNodes();
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка загрузки! Перезагрузите страницу!`);
    });
    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} сек. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу!`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
