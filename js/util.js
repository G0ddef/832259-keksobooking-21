'use strict';
(() => {
  const MainPinSize = {
    width: 65,
    height: 65,
    activeHeight: 87
  };

  const getRandomInt = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const createPhotosList = (photo) => {
    let photosList = [];

    for (let i = 0; i <= photo; i++) {
      photosList[i] = `http://o0.github.io/assets/images/tokyo/hotel${i + 1}.jpg`;
    }

    return photosList;
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
    getRandomInt,
    createPhotosList,
    renderAddressCoordinates,
    isKeyEvent: (evt, action) => {
      if (evt.key === `Enter`) {
        action();
      }
    },
    isButtonEvent: (evt, action) => {
      if (evt.button === 0) {
        action();
      }
    }
  };
})();
