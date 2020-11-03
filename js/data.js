'use strict';

(() => {
  const createAds = (ads) => {
    const pinsDataArr = ads;
    const getPinsFragmentNodes = window.pin.getFragment(pinsDataArr);
    const getCardFragment = window.pin.cardCreate(pinsDataArr[0]);
    window.pin.mapNode.insertBefore(getCardFragment, window.pin.mapFilterContainer);
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
