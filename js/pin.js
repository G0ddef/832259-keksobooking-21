'use strict';

(() => {
  const mapNode = document.querySelector(`.map`);
  const mapPinNode = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
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

  const getFragment = (pinsData) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pinsData.length; i++) {
      fragment.appendChild(pinCreate(pinsData[i]));
    }

    return fragment;
  };

  window.pin = {
    mapMainNode,
    mapNode,
    getFragment
  };
})();
