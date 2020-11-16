'use strict';

(() => {
  const HouseType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardNode = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const create = (object) => {
    const cardTemplate = cardNode.cloneNode(true);
    const cardAvatarNode = cardTemplate.querySelector(`.popup__avatar`);
    const cardFeaturesNode = cardTemplate.querySelector(`.popup__features`);
    const cardPhotoNode = cardTemplate.querySelector(`.popup__photos`);

    cardTemplate.querySelector(`.popup__title`).textContent = object.offer.title;
    cardTemplate.querySelector(`.popup__type`).textContent = HouseType[object.offer.type];
    cardTemplate.querySelector(`.popup__text--price`).textContent = object.offer.price ? `${object.offer.price}₽/ночь` : ``;
    cardTemplate.querySelector(`.popup__text--time`).textContent = object.offer.checkin ? `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}` : ``;
    cardTemplate.querySelector(`.popup__text--address`).textContent = object.offer.address;
    cardTemplate.querySelector(`.popup__description`).textContent = object.offer.description;

    let roomDeclensionValue;
    let guestDeclensionValue;

    if (object.offer.rooms > 1 && object.offer.rooms < 5) {
      roomDeclensionValue = `комнаты`;
    } else if (object.offer.rooms === 1) {
      roomDeclensionValue = `комната`;
      if (object.offer.guests === 1) {
        guestDeclensionValue = `гостя`;
      }
    } else if (object.offer.rooms === 35) {
      roomDeclensionValue = `комнат`;
    }

    if (object.offer.guests >= 2) {
      guestDeclensionValue = `гостей`;
    }

    if (String(object.offer.rooms) === `0`) {
      cardTemplate.querySelector(`.popup__text--capacity`).textContent = `0 комнат не для гостей`;
    } else {
      cardTemplate.querySelector(`.popup__text--capacity`).textContent = object.offer.rooms && object.offer.guests ? `${object.offer.rooms} ${roomDeclensionValue} для ${object.offer.guests} ${guestDeclensionValue}` : ``;
    }

    if (!object.offer.features.length) {
      cardTemplate.removeChild(cardFeaturesNode);
    } else {
      const cardFeaturesNodeList = cardFeaturesNode.querySelector(`.popup__feature`);
      cardFeaturesNodeList.classList.add(`popup__feature--${object.offer.features[0]}`);

      for (let i = 1; i < object.offer.features.length; i++) {
        const newFeature = cardFeaturesNodeList.cloneNode(true);
        newFeature.classList.add(`popup__feature--${object.offer.features[i]}`);
        cardFeaturesNode.appendChild(newFeature);
      }
    }

    if (!object.offer.photos.length) {
      cardTemplate.removeChild(cardPhotoNode);
    } else {
      const imgList = cardPhotoNode.querySelector(`img`);
      imgList.src = object.offer.photos[0];

      for (let i = 1; i < object.offer.photos.length; i++) {
        const newPhoto = imgList.cloneNode(true);
        newPhoto.src = object.offer.photos[i];
        cardPhotoNode.appendChild(newPhoto);
      }
    }

    if (!object.author.avatar) {
      cardTemplate.removeChild(cardAvatarNode);
    } else {
      cardAvatarNode.src = object.author.avatar;
    }

    return cardTemplate;
  };

  const render = (cardData) => {
    if (window.pin.mapNode.querySelector(`.map__card`)) {
      window.pin.mapNode.querySelector(`.map__card`).remove();
    }

    const cardDataArr = cardData;
    const getCardFragment = window.card.create(cardDataArr);
    window.pin.mapNode.insertBefore(getCardFragment, window.pin.mapFilterContainer);

    const cardCloseButtonNode = window.pin.mapNode.querySelector(`.popup__close`);
    cardCloseButtonNode.addEventListener(`mousedown`, onButtonClick);
    document.addEventListener(`keydown`, onKeyClick);
  };

  const onButtonClick = (evt) => {
    window.util.onMainMouseButtonClick(evt, () => {
      evt.preventDefault();
      removeCard();
    });
  };

  const onKeyClick = (evt) => {
    window.util.onEscKeyPress(evt, () => {
      evt.preventDefault();
      removeCard();
    });
  };

  const removeCard = () => {
    if (window.pin.mapNode.querySelector(`.map__card`)) {
      window.pin.mapNode.querySelector(`.map__card`).remove();
      document.removeEventListener(`keydown`, onKeyClick);
    }

    if (window.pin.mapNode.querySelector(`.map__pin--active`)) {
      window.pin.mapNode.classList.remove(`map__pin--active`);
    }
  };


  window.card = {
    create,
    render,
    removeCard
  };
})();
