'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 2000;
  const StatusCode = {
    OK: 200
  };

  window.upload = (data, onSucces) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        window.statusPage.reset();
        window.sendFormData.renderSuccessMessage();
        onSucces(xhr.response);
      } else {
        window.sendFormData.renderErrorMessage();
      }
    });

    xhr.addEventListener(`error`, () => {
      window.sendFormData.renderErrorMessage();
    });

    xhr.addEventListener(`timeout`, () => {
      window.sendFormData.renderErrorMessage();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
