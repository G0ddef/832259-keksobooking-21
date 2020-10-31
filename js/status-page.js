'use strict';

(() => {
  const mapNode = document.querySelector(`.map`);
  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    let disabledInput = isPageDisabled ? `add` : `remove`;
    for (let i = 0; i < window.form.mapFiltersNode.elements.length; i++) {
      window.form.mapFiltersNode.elements[i].disabled = isPageDisabled;
      window.form.mapFiltersNode.elements[i].classList[disabledInput](`blocked-form`);
    }

    for (let i = 0; i < window.form.adNode.elements.length; i++) {
      window.form.adNode.elements[i].disabled = isPageDisabled;
      window.form.adNode.elements[i].classList[disabledInput](`blocked-form`);
    }
  };

  const activatePage = (data) => {
    toggleDisabledOnFormNodes();
    window.data.createAds(data);
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.adNode.classList.remove(`ad-form--disabled`);
    window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.activeHeight);
    window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
    window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    window.form.adNode.rooms.addEventListener(`input`, window.form.validateRoomsInput);
  };

  const onKeyClick = (evt) => {
    window.util.onEnterKeyPress(evt, () => {
      window.load(activatePage, window.data.errorHandler);
      window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
      window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    });
  };

  const onButtonClick = (evt) => {
    window.util.onMainMouseButtonClick(evt, () => {
      window.load(activatePage, window.data.errorHandler);
      window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
      window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    });
  };

  window.statusPage = {
    mapNode,
    toggleDisabledOnFormNodes,
    onKeyClick,
    onButtonClick
  };
})();
