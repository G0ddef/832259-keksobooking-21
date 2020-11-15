'use strict';

(() => {
  const PINS_COUNT = 5;
  const PRICE = {
    middle: 10000,
    high: 50000
  };

  const adTypeFilterNode = document.querySelector(`#housing-type`);
  const adPriceFilterNode = document.querySelector(`#housing-price`);
  const adRoomsFilterNode = document.querySelector(`#housing-rooms`);
  const adGuestsFilterNode = document.querySelector(`#housing-guests`);

  const updatePins = () => {
    const pinsNode = window.pin.mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pinsNode.length; i++) {
      pinsNode[i].remove();
    }

    const filteredByType = (object) => {
      return adTypeFilterNode.value === `any` || adTypeFilterNode.value === object.offer.type;
    };

    const filteredByPrice = (object) => {
      if (adPriceFilterNode.value !== `any`) {
        if (adPriceFilterNode.value === `low` && object.offer.price >= PRICE.middle) {
          return false;
        }

        if (adPriceFilterNode.value === `middle` && object.offer.price < PRICE.middle && object.offer.price > PRICE.high) {
          return false;
        }

        if (adPriceFilterNode.value === `high` && object.offer.price < PRICE.high) {
          return false;
        }
      }

      return true;
    };

    const filteredByFeatures = (object) => {
      const filterActiveCheckboxes = document.querySelectorAll(`.map__checkbox:checked`);

      for (let i = 0; i < filterActiveCheckboxes.length; i++) {
        if (!object.offer.features.includes(filterActiveCheckboxes[i].value)) {
          return false;
        }
      }

      return true;
    };

    const filteredByRooms = (object) => {
      return adRoomsFilterNode.value === `any` || parseInt(adRoomsFilterNode.value, 10) === object.offer.rooms;
    };

    const filteredByGuests = (object) => {
      return adGuestsFilterNode.value === `any` || parseInt(adGuestsFilterNode.value, 10) === object.offer.guests;
    };

    const filteredAds = (object) => {
      return filteredByType(object) && filteredByRooms(object) && filteredByGuests(object) && filteredByPrice(object) && filteredByFeatures(object);
    };

    const filteredAdsArr = window.pinsDataArr.filter((filteredAds));

    const adsArr = filteredAdsArr.slice(0, PINS_COUNT);

    window.card.removeCard();
    window.pin.getFragment(adsArr);
  };


  const onFilterChange = window.debounce(() => {
    updatePins();
  });

  window.form.mapFiltersNode.addEventListener(`change`, onFilterChange);

  window.filters = {
    updatePins
  };
})();
