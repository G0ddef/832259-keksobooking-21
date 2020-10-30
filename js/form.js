'use strict';

(() => {
  const ROOMS_FOR_GUESTS = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
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

  window.form = {
    adNode,
    addressCoordinatesNode,
    mapFiltersNode,
    validateRoomsInput
  };
})();
