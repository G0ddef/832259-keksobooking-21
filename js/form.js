'use strict';

(() => {
  const ROOMS_FOR_GUESTS = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };
  const MIN_TITLE_SYMBOL_LENGTH = 30;

  const adNode = document.querySelector(`.ad-form`);
  const addressCoordinatesNode = document.querySelector(`#address`);
  const mapFiltersNode = document.querySelector(`.map__filters`);

  const validateRoomsInput = (evt) => {
    const possibleOptionsArr = ROOMS_FOR_GUESTS[evt.target.value];

    for (let option of adNode.capacity.options) {
      option.disabled = !possibleOptionsArr.includes(option.value);
    }

    adNode.capacity.value = possibleOptionsArr[0];
  };

  const validateTitleInput = () => {
    const valueLength = adNode.title.value.length;
    adNode.title = (valueLength < MIN_TITLE_SYMBOL_LENGTH) ? adNode.title.setCustomValidity(`Еще ${MIN_TITLE_SYMBOL_LENGTH - valueLength} символов!`) : adNode.title.setCustomValidity(``);

    adNode.title.reportValidity();
  };

  const validateTypeInput = (evt) => {
    const BUNGALOW_MIN_PRICE = 0;
    const FLAT_MIN_PRICE = 1000;
    const HOUSE_MIN_PRICE = 5000;
    const PALACE_MIN_PRICE = 10000;

    const BuildingPrice = {
      bungalow: BUNGALOW_MIN_PRICE,
      flat: FLAT_MIN_PRICE,
      house: HOUSE_MIN_PRICE,
      palace: PALACE_MIN_PRICE
    };

    switch (evt.target.value) {
      case `bungalow`:
        adNode.price.min = BuildingPrice.bungalow;
        adNode.price.placeholder = `От 0 до 1000`;
        break;
      case `flat`:
        adNode.price.min = BuildingPrice.flat;
        adNode.price.placeholder = `От 1000 до 5000`;
        break;
      case `house`:
        adNode.price.min = BuildingPrice.house;
        adNode.price.placeholder = `От 5000 до 10000`;
        break;
      case `palace`:
        adNode.price.min = BuildingPrice.palace;
        adNode.price.placeholder = `От 10000 до 1000000`;
    }
  };

  const validateAddressInput = () => {
    adNode.address.classList.add(`blocked-form`);
  };

  const validateTimeInput = (evt) => {
    switch (evt.target.value) {
      case `12:00`:
        adNode.timeout[0].selected = true;
        adNode.timein[0].selected = true;
        break;
      case `13:00`:
        adNode.timeout[1].selected = true;
        adNode.timein[1].selected = true;
        break;
      case `14:00`:
        adNode.timeout[2].selected = true;
        adNode.timein[2].selected = true;
        break;
    }
  };

  window.form = {
    adNode,
    addressCoordinatesNode,
    mapFiltersNode,
    validateRoomsInput,
    validateTitleInput,
    validateTypeInput,
    validateAddressInput,
    validateTimeInput
  };
})();
