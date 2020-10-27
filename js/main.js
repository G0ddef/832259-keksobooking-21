'use strict';
(() => {
  window.statusPage.toggleDisabledOnFormNodes();
  window.load.onErrorLoad(window.data.errorHandler);
  window.pin.mapMainNode.addEventListener(`keydown`, window.statusPage.onKeyClick);
  window.pin.mapMainNode.addEventListener(`mousedown`, window.statusPage.onButtonClick);
  window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.height / 2);
})();
