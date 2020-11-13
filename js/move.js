'use strict';

(() => {
  const PinSize = {
    height: 65,
    width: 65
  };

  const MapCoordinates = {
    minHeight: 75 - (PinSize.height / 2),
    maxHeight: 544,
    minWidth: 0 - (PinSize.width / 2),
    maxWidth: 1200 - (PinSize.width / 2)
  };

  const onMouseDown = (evt) => {
    let StartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    evt.preventDefault();

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: StartCoords.x - moveEvt.clientX,
        y: StartCoords.y - moveEvt.clientY
      };

      StartCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let coordY = window.pin.mapMainNode.offsetTop - shift.y;
      let coordX = window.pin.mapMainNode.offsetLeft - shift.x;

      if (coordY > MapCoordinates.minHeight && coordY < MapCoordinates.maxHeight) {
        window.pin.mapMainNode.style.top = `${coordY}px`;
      }

      if (coordX > MapCoordinates.minWidth && coordX < MapCoordinates.maxWidth) {
        window.pin.mapMainNode.style.left = `${coordX}px`;
      }

      const getAddressCoordinates = (pinCoord, pinSize) => {
        return Math.round(parseInt(pinCoord, 10) + (pinSize));
      };

      const pinCoordX = getAddressCoordinates(window.pin.mapMainNode.style.left, window.util.MainPinSize.width / 2);
      const pinCoordY = getAddressCoordinates(window.pin.mapMainNode.style.top, window.util.MainPinSize.activeHeight);

      window.form.addressCoordinatesNode.value = `${pinCoordX}, ${pinCoordY}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMouseDown
  };
})();
