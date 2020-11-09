'use strict';

(() => {
  const cardNode = document.querySelector(`#card`).content.querySelector('.map__card');

  const HouseType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardCreate = (object) => {
    const cardTemplate = cardNode.cloneNode(true);
    const cardAvatar = cardTemplate.querySelector(`.popup__avatar`);
    const cardTitle = cardTemplate.querySelector(`.popup__title`);
    const cardAddress = cardTemplate.querySelector(`.popup__text--address`);
    const cardPrice = cardTemplate.querySelector(`.popup__text--price`);
    const cardType = cardTemplate.querySelector(`.popup__type`);
    const cardCapacity = cardTemplate.querySelector(`.popup__text--capacity`);
    const cardTime = cardTemplate.querySelector(`.popup__text--time`);
    const cardDescription = cardTemplate.querySelector(`.popup__description`);
    const cardFeatures = cardTemplate.querySelector(`.popup__features`);
    const cardFeaturesList = cardFeatures.querySelector(`.popup__feature`);
    cardFeaturesList.classList.add(`popup__feature--${object.offer.features[0]}`);
    const cardPhotos = cardTemplate.querySelector(`.popup__photos`);
    const imgList = cardPhotos.querySelector(`img`);
    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAddress.textContent = object.offer.address;
    cardPrice.textContent = `${object.offer.price}₽/ночь`;
    cardCapacity.textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
    cardTime.textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
    cardDescription.textContent = object.offer.description;
    imgList.src = object.offer.photos[0];

    for (let i = 1; i < object.offer.features.length; i++) {
      const newFeature = cardFeaturesList.cloneNode(true);
      newFeature.classList.add(`popup__feature--${object.offer.features[i]}`);
      newFeature.classList.remove(`popup__feature--${object.offer.features[0]}`);
      cardFeatures.appendChild(newFeature);
    }

    for (let i = 1; i < object.offer.photos.length; i++) {
      const newPhoto = imgList.cloneNode(true);
      newPhoto.src = object.offer.photos[i];
      cardPhotos.appendChild(newPhoto);
    }

    const getHouseType = (objectType) => {
      cardType.textContent = {
        flat: HouseType.flat,
        bungalow: HouseType.bungalow,
        house: HouseType.house,
        palace: HouseType.palace
      }[objectType];
    };

    getHouseType(object.offer.type);

    if (object.author.avatar.length === 0) {
      cardAvatar.classList.add(`hidden`);
    }
    if (object.offer.rooms.length === 0) {
      cardCapacity.classList.add(`hidden`);
    }
    if (object.offer.checkin.length === 0) {
      cardTime.classList.add(`hidden`);
    }
    if (object.offer.checkin.length === 0) {
      cardTime.classList.add(`hidden`);
    }
    if (object.offer.price.length === 0) {
      cardPrice.classList.add(`hidden`);
    }
    if (object.offer.type.length === 0) {
      cardType.classList.add(`hidden`);
    }
    if (object.offer.photos.length === 0) {
      cardPhotos.classList.add(`hidden`);
    }

    return cardTemplate;
  };

  const createCards = (cardData) => {
    if (window.pin.mapNode.querySelector(`.map__card`)) {
      window.pin.mapNode.querySelector(`.map__card`).remove();
      const cardDataArr = cardData;
      const getCardFragment = window.card.cardCreate(cardDataArr);
      window.pin.mapNode.insertBefore(getCardFragment, window.pin.mapFilterContainer);
    } else {
      const cardDataArr = cardData;
      const getCardFragment = window.card.cardCreate(cardDataArr);
      window.pin.mapNode.insertBefore(getCardFragment, window.pin.mapFilterContainer);
    }
    const cardCloseButton = window.pin.mapNode.querySelector(`.popup__close`);
    cardCloseButton.addEventListener(`mousedown`, onButtonClick);
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
    window.pin.mapNode.querySelector(`.map__card`).remove();
    document.removeEventListener(`keydown`, onKeyClick);
  };


  window.card = {
    cardCreate,
    createCards
  };
})();
