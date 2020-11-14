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

  const onFormElementClick = (evt) => {
    switch (evt.target) {
      case window.form.adNode.rooms:
        window.form.validateRoomsInput(evt);
        break;
      case window.form.adNode.title:
        window.form.validateTitleInput(evt);
        break;
      case window.form.adNode.type:
        window.form.validateTypeInput(evt);
        break;
      case window.form.adNode.timein:
      case window.form.adNode.timeout:
        window.form.validateTimeInput(evt);
        break;
    }
  };

  const activatePage = (data) => {
    toggleDisabledOnFormNodes();
    window.data.createAds(data);
    window.pin.mapMainNode.addEventListener(`mousedown`, window.move.onMouseDown);
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.adNode.classList.remove(`ad-form--disabled`);
    window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.activeHeight);
    window.form.adNode.address.classList.add(`blocked-form`);
    window.form.adNode.addEventListener(`change`, onFormElementClick);
  };

  const resetPage = () => {
    const pinsNode = window.pin.mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    window.pin.mapMainNode.style.left = window.main.DEFAULT_COORDINATES_X;
    window.pin.mapMainNode.style.top = window.main.DEFAULT_COORDINATES_Y;
    window.pin.mapNode.classList.add(`map--faded`);
    window.form.adNode.classList.add(`ad-form--disabled`);
    window.form.adNode.reset();
    window.form.mapFiltersNode.reset();
    window.form.adNode.removeEventListener(`change`, window.statusPage.onFormElementClick);
    window.statusPage.toggleDisabledOnFormNodes();

    window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.activeHeight);

    if (window.pin.mapNode.querySelector(`.map__card`)) {
      window.pin.mapNode.querySelector(`.map__card`).remove();
    }

    for (let i = 0; i < pinsNode.length; i++) {
      pinsNode[i].remove();
    }
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
      evt.preventDefault();
      window.move.onMouseDown(evt);
      window.load(activatePage, window.data.errorHandler);
      window.pin.mapMainNode.removeEventListener(`mousedown`, onButtonClick);
      window.pin.mapMainNode.removeEventListener(`keydown`, onKeyClick);
    });
  };

  window.statusPage = {
    mapNode,
    toggleDisabledOnFormNodes,
    onKeyClick,
    onButtonClick,
    activatePage,
    onFormElementClick,
    resetPage
  };
})();
