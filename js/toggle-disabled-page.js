'use strict';

(() => {
  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    let toggleHover = isPageDisabled ? `add` : `remove`;
    for (let i = 0; i < window.form.mapFiltersNode.elements.length; i++) {
      window.form.mapFiltersNode.elements[i].disabled = isPageDisabled;
      window.form.mapFiltersNode.elements[i].classList[toggleHover](`blocked-form`);
    }

    for (let i = 0; i < window.form.adFormNode.elements.length; i++) {
      window.form.adFormNode.elements[i].disabled = isPageDisabled;
      window.form.adFormNode.elements[i].classList[toggleHover](`blocked-form`);
    }
  };

  const activatePage = () => {
    window.pin.renderScreen();
    toggleDisabledOnFormNodes();
    window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.activeHeight);
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.adFormNode.classList.remove(`ad-form--disabled`);
    window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
    window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    window.form.adFormNode.rooms.addEventListener(`input`, window.form.validateRoomsInput);
  };

  const onKeyClick = (evt) => {
    window.util.isKeyEvent(evt, activatePage);
  };

  const onButtonClick = (evt) => {
    window.util.isButtonEvent(evt, activatePage);
  };

  window.toggleDisabledPage = {
    toggleDisabledOnFormNodes,
    onKeyClick,
    onButtonClick
  };
})();
