'use strict';

(() => {
  const adTypeFilterNode = document.querySelector(`#housing-type`);

  const updatePins = () => {
    const getAdTypeFilter = window.pinsDataArr.filter((object) => {
      const pinsNode = window.pin.mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (let i = 0; i < pinsNode.length; i++) {
        if (object.offer.type !== adTypeFilterNode.value) {
          pinsNode[i].remove();
        }
      }

      window.card.removeCard();

      return adTypeFilterNode.value === `any` || adTypeFilterNode.value === object.offer.type;
    });

    window.pin.getFragment(getAdTypeFilter);
  };


  const onFilterChange = window.debounce(() => {
    updatePins();
  });

  adTypeFilterNode.addEventListener(`change`, onFilterChange);

  window.filters = {
    updatePins
  };
})();
