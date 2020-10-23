'use strict';

(() => {
  const ads = (createAds) => {
    const pinsDataArr = createAds;
    const getPinsFragmentNodes = window.pin.getFragment(pinsDataArr);

    window.pin.mapNode.appendChild(getPinsFragmentNodes);
  };

  const errorHandler = (errorMessage) => {
    const errorArea = document.createElement('div');
    errorArea.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorArea.style.position = 'absolute';
    errorArea.style.left = 0;
    errorArea.style.right = 0;
    errorArea.style.fontSize = '30px';

    errorArea.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorArea);
  };

  window.data = {
    ads,
    errorHandler
  };
})();
