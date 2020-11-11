'use strict';

(() => {
  const createAds = (ads) => {
    const pinsDataArr = ads;
    const getPinsFragmentNodes = window.pin.getFragment(pinsDataArr);
    window.pin.mapNode.appendChild(getPinsFragmentNodes);
  };

  const errorHandler = (errorMessage) => {
    const errorNode = document.querySelector('.error-handler');
    errorNode.textContent = errorMessage;
    errorNode.classList.remove('visually-hidden');
  };

  window.data = {
    createAds,
    errorHandler
  };
})();
