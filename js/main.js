'use strict';
(() => {
  window.toggleDisabledPage.toggleDisabledOnFormNodes();
  window.pin.mapMainNode.addEventListener(`keydown`, window.toggleDisabledPage.onKeyClick);
  window.pin.mapMainNode.addEventListener(`mousedown`, window.toggleDisabledPage.onButtonClick);
  window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.height / 2);
})();
