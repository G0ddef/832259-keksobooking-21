'use strict';

(() => {
  const mapNode = document.querySelector(`.map`);
  const mapFilterContainer = mapNode.querySelector(`.map__filters-container`);
  const mapPinNode = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapMainNode = document.querySelector(`.map__pin--main`);
  const mapPinsNode = mapNode.querySelector(`.map__overlay`);

  const pinCreate = (object) => {
    const pinTemplate = mapPinNode.cloneNode(true);
    const img = pinTemplate.querySelector(`img`);
    pinTemplate.style.left = `${object.location.x}px`;
    pinTemplate.style.top = `${object.location.y}px`;
    img.src = object.author.avatar;
    img.alt = object.offer.title;

    const onButtonClick = (evt) => {
      window.util.onMainMouseButtonClick(evt, () => {
        window.card.createCards(object);
      });
    };

    const onKeyClick = (evt) => {
      window.util.onEnterKeyPress(evt, () => {
        window.card.createCards(object);
      });
    };

    pinTemplate.addEventListener(`mousedown`, onButtonClick);
    pinTemplate.addEventListener(`keydown`, onKeyClick);

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
    mapFilterContainer,
    mapPinsNode,
    getFragment
  };
})();
