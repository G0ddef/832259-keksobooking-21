'use strict';
(() => {
  const DEBOUNCE_INTERVAL = 500;

  const MainPinSize = {
    width: 65,
    height: 65,
    activeHeight: 87
  };

  const getPinCoordinates = (pinCoord, pinSize) => {
    return Math.round(parseInt(pinCoord, 10) + (pinSize));
  };

  const renderAddressCoordinates = (xPinSize, yPinSize) => {
    let pinCoordinatesX = getPinCoordinates(window.pin.mapMainNode.style.left, xPinSize);
    let pinCoordinatesY = getPinCoordinates(window.pin.mapMainNode.style.top, yPinSize);
    window.form.addressCoordinatesNode.value = `${pinCoordinatesX}, ${pinCoordinatesY}`;
  };

  window.util = {
    MainPinSize,
    renderAddressCoordinates,
    onEnterKeyPress: (evt, action) => {
      if (evt.key === `Enter`) {
        action();
      }
    },
    onMainMouseButtonClick: (evt, action) => {
      if (evt.button === 0) {
        evt.preventDefault();
        action();
      }
    },
    onEscKeyPress: (evt, action) => {
      if (evt.key === `Escape`) {
        action();
      }
    },
    debounce: (callback) => {
      let lastTimeout = null;

      return (...parameters) => {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(() => {
          callback(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
