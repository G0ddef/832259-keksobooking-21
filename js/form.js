'use strict';

(() => {
  const MIN_TITLE_SYMBOL_LENGTH = 30;
  const ROOMS_FOR_GUESTS = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const MinBuildingPrices = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };


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
    adNode.title = valueLength < MIN_TITLE_SYMBOL_LENGTH ? adNode.title.setCustomValidity(`Еще ${MIN_TITLE_SYMBOL_LENGTH - valueLength} символов!`) : adNode.title.setCustomValidity(``);

    adNode.title.reportValidity();
  };

  const validateTypeInput = (evt) => {
    const minPrice = MinBuildingPrices[evt.target.value];
    adNode.price.min = minPrice;
    adNode.price.placeholder = minPrice;
  };

  const validateTimeInput = (evt) => {
    if (evt.target === adNode.timein) {
      adNode.timeout.value = adNode.timein.value;
    } else {
      adNode.timein.value = adNode.timeout.value;
    }
  };

  window.form = {
    adNode,
    addressCoordinatesNode,
    mapFiltersNode,
    validateRoomsInput,
    validateTitleInput,
    validateTypeInput,
    validateTimeInput
  };
})();
