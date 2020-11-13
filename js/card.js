'use strict';

(() => {
  const HouseType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardNode = document.querySelector(`#card`).content.querySelector('.map__card');

  const create = (object) => {
    const cardTemplate = cardNode.cloneNode(true);
    const cardAvatar = cardTemplate.querySelector(`.popup__avatar`);
    const cardFeatures = cardTemplate.querySelector(`.popup__features`);
    const cardPhotos = cardTemplate.querySelector(`.popup__photos`);

    cardTemplate.querySelector(`.popup__title`).textContent = object.offer.title;
    cardTemplate.querySelector(`.popup__type`).textContent = HouseType[object.offer.type];
    cardTemplate.querySelector(`.popup__text--price`).textContent = object.offer.price ? `${object.offer.price}₽/ночь` : ``;
    cardTemplate.querySelector(`.popup__text--capacity`).textContent = object.offer.rooms && object.offer.guests ? `${object.offer.rooms} комнаты для ${object.offer.guests} гостей` : ``;
    cardTemplate.querySelector(`.popup__text--time`).textContent = object.offer.checkin ? `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}` : ``;
    cardTemplate.querySelector(`.popup__text--address`).textContent = object.offer.address;
    cardTemplate.querySelector(`.popup__description`).textContent = object.offer.description;

    if (!object.offer.features.length) {
      cardTemplate.removeChild(cardFeatures);
    } else {
      const cardFeaturesList = cardFeatures.querySelector(`.popup__feature`);
      cardFeaturesList.classList.add(`popup__feature--${object.offer.features[0]}`);

      for (let i = 1; i < object.offer.features.length; i++) {
        const newFeature = cardFeaturesList.cloneNode(true);
        newFeature.classList.add(`popup__feature--${object.offer.features[i]}`);
        cardFeatures.appendChild(newFeature);
      }
    }

    if (!object.offer.photos.length) {
      cardTemplate.removeChild(cardPhotos);
    } else {
      const imgList = cardPhotos.querySelector(`img`);
      imgList.src = object.offer.photos[0];

      for (let i = 1; i < object.offer.photos.length; i++) {
        const newPhoto = imgList.cloneNode(true);
        newPhoto.src = object.offer.photos[i];
        cardPhotos.appendChild(newPhoto);
      }
    }

    if (!object.author.avatar) {
      cardTemplate.removeChild(cardAvatar);
    } else {
      cardAvatar.src = object.author.avatar;
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
    create,
    render
  };
})();
