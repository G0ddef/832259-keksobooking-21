'use strict';

(() => {
  const PINS_COUNT = 5;
  const Price = {
    middle: 10000,
    high: 50000
  };

  const adTypeFilterNode = document.querySelector(`#housing-type`);
  const adPriceFilterNode = document.querySelector(`#housing-price`);
  const adRoomsFilterNode = document.querySelector(`#housing-rooms`);
  const adGuestsFilterNode = document.querySelector(`#housing-guests`);

  const filterByType = (object) => {
    return adTypeFilterNode.value === `any` || adTypeFilterNode.value === object.offer.type;
  };

  const filterByPrice = (object) => {
    let price = true;

    if (adPriceFilterNode.value === `any`) {
      price = price;
    } else if (adPriceFilterNode.value === `middle`) {
      price = object.offer.price > Price.middle && object.offer.price < Price.high;
    } else if (adPriceFilterNode.value === `low`) {
      price = object.offer.price <= Price.middle;
    } else if (adPriceFilterNode.value === `high`) {
      price = object.offer.price >= 50000;
    }

    return price;
  };

  const filterByFeatures = (object) => {
    const filterActiveCheckboxes = document.querySelectorAll(`.map__checkbox:checked`);

    for (let i = 0; i < filterActiveCheckboxes.length; i++) {
      if (!object.offer.features.includes(filterActiveCheckboxes[i].value)) {
        return false;
      }
    }

    return true;
  };

  const filterByRooms = (object) => {
    return adRoomsFilterNode.value === `any` || parseInt(adRoomsFilterNode.value, 10) === object.offer.rooms;
  };

  const filterByGuests = (object) => {
    return adGuestsFilterNode.value === `any` || parseInt(adGuestsFilterNode.value, 10) === object.offer.guests;
  };

  const updatePins = () => {
    const pinsNodes = window.pin.mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pinsNodes.length; i++) {
      pinsNodes[i].remove();
    }

    const adsArr = window.pinsDataArr
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByFeatures)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .slice(0, PINS_COUNT);

    window.card.removeCard();
    window.pin.getFragment(adsArr);
  };


  const onFilterChange = window.util.debounce(() => {
    updatePins();
  });

  window.form.mapFiltersNode.addEventListener(`change`, onFilterChange);

  window.filters = {
    updatePins
  };
})();
