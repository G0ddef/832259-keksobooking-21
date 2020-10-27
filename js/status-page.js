'use strict';

(() => {
  const mapNode = document.querySelector(`.map`);
  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    let hover = isPageDisabled ? `add` : `remove`;
    for (let i = 0; i < window.form.mapFiltersNode.elements.length; i++) {
      window.form.mapFiltersNode.elements[i].disabled = isPageDisabled;
      window.form.mapFiltersNode.elements[i].classList[hover](`blocked-form`);
    }

    for (let i = 0; i < window.form.adNode.elements.length; i++) {
      window.form.adNode.elements[i].disabled = isPageDisabled;
      window.form.adNode.elements[i].classList[hover](`blocked-form`);
    }
  };

  const activatePage = () => {
    toggleDisabledOnFormNodes();
    window.load.onSuccesLoad(window.data.ads);
    window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.activeHeight);
    window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
    window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    window.form.adNode.rooms.addEventListener(`input`, window.form.validateRoomsInput);
  };

  const onKeyClick = (evt) => {
    window.util.isKeyEvent(evt, activatePage);
  };

  const onButtonClick = (evt) => {
    window.util.isButtonEvent(evt, activatePage);
  };

  window.statusPage = {
    mapNode,
    toggleDisabledOnFormNodes,
    onKeyClick,
    onButtonClick
  };
})();
