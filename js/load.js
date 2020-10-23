'use strict';

(() => {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT_IN_MS = 2000;
  const StatusCode = {
    OK: 200
  };

  window.load = (onSucces, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSucces(xhr.response);
      } else {
        onError(`Response status: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Error connection`);
    });
    xhr.addEventListener('timeout', () => {
      onError(`Error of connection after ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
