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

    if (valueLength < MIN_TITLE_SYMBOL_LENGTH) {
      adNode.title.setCustomValidity(`Еще ${MIN_TITLE_SYMBOL_LENGTH - valueLength} символов!`);
    } else {
      adNode.title.setCustomValidity(``);
    }

    adNode.title.reportValidity();
  };

  const validateTypeInput = (evt) => {
    switch (evt.target.value) {
      case `bungalow`:
        adNode.price.min = `0`;
        adNode.price.max = `999`;
        adNode.price.placeholder = `От 0 до 999`;
        break;
      case `flat`:
        adNode.price.min = 1000;
        adNode.price.max = 4999;
        adNode.price.placeholder = `От 1000 до 4999`;
        break;
      case `house`:
        adNode.price.min = 5000;
        adNode.price.max = 9999;
        adNode.price.placeholder = `От 5000 до 9999`;
        break;
      case `palace`:
        adNode.price.min = 10000;
        adNode.price.max = 1000000;
        adNode.price.placeholder = `От 10000 до 1000000`;
    }
  };

  const validateAddressInput = () => {
    adNode.address.classList.add(`blocked-form`);
  };

  const validateTimeInput = (evt) => {
    for (let i = 0; i < adNode.timeout.options.length; i++) {
      adNode.timeout.options[i].disabled = true;
    }

    switch (evt.target.value) {
      case `12:00`:
        adNode.timeout.options[0].disabled = false;
        adNode.timeout[0].selected = true;
        break;
      case `13:00`:
        adNode.timeout.options[1].disabled = false;
        adNode.timeout[1].selected = true;
        break;
      case `14:00`:
        adNode.timeout.options[2].disabled = false;
        adNode.timeout[2].selected = true;
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
