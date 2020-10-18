'use strict';

(() => {
  const adFormNode = document.querySelector(`.ad-form`);
  const addressCoordinatesNode = document.querySelector(`#address`);
  const mapFiltersNode = document.querySelector(`.map__filters`);

  const validateRoomsInput = (evt) => {
    const ROOMS_FOR_GUESTS = {
      1: [`1`],
      2: [`1`, `2`],
      3: [`1`, `2`, `3`],
      100: [`0`]
    };

    const possibleOptionsArr = ROOMS_FOR_GUESTS[evt.target.value];

    for (let i of adFormNode.capacity.options) {
      if (possibleOptionsArr.includes(i.value)) {
        i.disabled = false;
        i.selected = true;
      } else {
        i.disabled = true;
      }
    }
  };

  window.form = {
    adFormNode,
    addressCoordinatesNode,
    mapFiltersNode,
    validateRoomsInput
  };
})();
