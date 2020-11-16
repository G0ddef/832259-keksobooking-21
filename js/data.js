'use strict';

(() => {
  const createAds = (ads) => {
    const pinsDataArr = ads;
    window.pinsDataArr = pinsDataArr;

    window.filters.updatePins();
  };

  const errorHandler = (errorMessage) => {
    const errorNode = document.querySelector(`.error-handler`);
    errorNode.textContent = errorMessage;
    errorNode.classList.remove(`visually-hidden`);
  };

  window.data = {
    createAds,
    errorHandler
  };
})();
