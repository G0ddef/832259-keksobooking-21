'use strict';
(() => {
  let DEFAULT_COORDINATES_X = window.pin.mapMainNode.style.left;
  let DEFAULT_COORDINATES_Y = window.pin.mapMainNode.style.top;

  window.statusPage.toggleDisabledOnFormNodes();
  window.pin.mapMainNode.addEventListener(`keydown`, window.statusPage.onKeyClick);
  window.pin.mapMainNode.addEventListener(`mousedown`, window.statusPage.onButtonClick);
  window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.height / 2);

  window.main = {
    DEFAULT_COORDINATES_X,
    DEFAULT_COORDINATES_Y
  };
})();
