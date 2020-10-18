'use strict';

(() => {
  const mapPinsNode = document.querySelector(`.map__pins`);
  const mapNode = document.querySelector(`.map`);
  const mapPinNode = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const mapMainNode = document.querySelector(`.map__pin--main`);

  const pinCreate = (object) => {
    const pinTemplate = mapPinNode.cloneNode(true);
    const img = pinTemplate.querySelector(`img`);
    pinTemplate.style.left = `${object.location.x}px`;
    pinTemplate.style.top = `${object.location.y}px`;
    img.src = object.author.avatar;
    img.alt = object.offer.title;

    return pinTemplate;
  };

  const getPinsFragment = (pinsData) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pinsData.length; i++) {
      fragment.appendChild(pinCreate(pinsData[i]));
    }

    return fragment;
  };

  const renderScreen = () => {
    const pinsDataArr = window.data.createAds(window.data.PINS_AMOUNT);
    const getPinsFragmentNodes = getPinsFragment(pinsDataArr);

    mapPinsNode.appendChild(getPinsFragmentNodes);
  };

  window.pin = {
    mapNode,
    mapMainNode,
    renderScreen
  };
})();
