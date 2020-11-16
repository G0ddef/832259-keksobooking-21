'use strict';

(() => {
  const PinSize = {
    height: 70,
    width: 50
  };

  const mapNode = document.querySelector(`.map`);
  const mapFilterContainer = mapNode.querySelector(`.map__filters-container`);
  const mapPinNode = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapMainNode = document.querySelector(`.map__pin--main`);
  const mapPinsNode = mapNode.querySelector(`.map__overlay`);

  const pinCreate = (object) => {
    const pinTemplate = mapPinNode.cloneNode(true);
    const img = pinTemplate.querySelector(`img`);
    pinTemplate.style.left = `${object.location.x - (PinSize.width / 2)}px`;
    pinTemplate.style.top = `${object.location.y - PinSize.height}px`;
    img.src = object.author.avatar;
    img.alt = object.offer.title;

    const onButtonClick = (evt) => {
      window.util.onMainMouseButtonClick(evt, () => {
        if (mapNode.querySelector(`.map__pin--active`)) {
          mapNode.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
        }
        evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);

        window.card.render(object);
      });
    };

    const onKeyClick = (evt) => {
      window.util.onEnterKeyPress(evt, () => {
        if (mapNode.querySelector(`.map__pin--active`)) {
          mapNode.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
        }
        evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);

        window.card.render(object);
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
    window.pin.mapNode.appendChild(fragment);
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
