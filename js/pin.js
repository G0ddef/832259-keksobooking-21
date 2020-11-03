'use strict';

(() => {
  const mapNode = document.querySelector(`.map`);
  const mapFilterContainer = mapNode.querySelector(`.map__filters-container`);
  const mapPinNode = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapMainNode = document.querySelector(`.map__pin--main`);
  const cardNode = document.querySelector(`#card`).content.querySelector('.map__card');
  const mapPinsNode = mapNode.querySelector(`.map__overlay`);
  const HouseType = {
    'flat': `Квартира`,
    'bungalow': `Бунгало`,
    'house': `Дом`,
    'palace': `Дворец`
  };

  const pinCreate = (object) => {
    const pinTemplate = mapPinNode.cloneNode(true);
    const img = pinTemplate.querySelector(`img`);
    pinTemplate.style.left = `${object.location.x}px`;
    pinTemplate.style.top = `${object.location.y}px`;
    img.src = object.author.avatar;
    img.alt = object.offer.title;

    return pinTemplate;
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
      cardFeatures.appendChild(newFeature);
    }

    for (let i = 1; i < object.offer.photos.length; i++) {
      const newPhoto = imgList.cloneNode(true);
      newPhoto.src = object.offer.photos[i];
      cardPhotos.appendChild(newPhoto);
    }

    if (object.offer.type === `flat`) {
      cardType.textContent = HouseType.flat;
    } else if (object.offer.type === `bungalow`) {
      cardType.textContent = HouseType.bungalow;
    } else if (object.offer.type === `house`) {
      cardType.textContent = HouseType.house;
    } else if (object.offer.type === `palace`) {
      cardType.textContent = HouseType.palace;
    }

    const clearContent = (data, field) => {
      if (data === 0) {
        cardTemplate.removeChild(field);
      }
    };

    clearContent(object.author.avatar.length, cardAvatar);
    clearContent(object.offer.title.length, cardTitle);
    clearContent(object.offer.address.length, cardAddress);
    clearContent(object.offer.price.length, cardPrice);
    clearContent(object.offer.type.length, cardType);
    clearContent(object.offer.rooms.length, cardCapacity);
    clearContent(object.offer.checkin.length, cardTime);
    clearContent(object.offer.description.length, cardDescription);
    clearContent(object.offer.features.length, cardFeatures);
    clearContent(object.offer.photos.length, cardPhotos);

    return cardTemplate;
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
    getFragment,
    cardCreate
  };
})();
