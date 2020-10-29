'use strict';

(() => {
  const ads = (createAds) => {
    const pinsDataArr = createAds;
    const getPinsFragmentNodes = window.pin.getFragment(pinsDataArr);

    window.pin.mapNode.appendChild(getPinsFragmentNodes);
  };

  const errorHandler = (errorMessage) => {
    const errorArea = document.createElement('div');
    window.data.errorArea = errorArea;
    window.data.errorArea.classList.add('error-handler');

    window.data.errorArea.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorArea);
  };

  window.data = {
    ads,
    errorHandler
  };
})();
