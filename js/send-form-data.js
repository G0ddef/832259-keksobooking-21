'use strict';

(() => {
  const mainNode = document.querySelector(`main`);
  const successNode = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorNode = document.querySelector(`#error`).content.querySelector(`.error`);

  const renderSuccessMessage = () => {
    const successMessage = successNode.cloneNode(true);
    mainNode.appendChild(successMessage);
    document.addEventListener(`mousedown`, onButtonClick);
    document.addEventListener(`keydown`, onEscKeyClick);
  };

  const renderErrorMessage = () => {
    const errorMessage = errorNode.cloneNode(true);
    mainNode.appendChild(errorMessage);
    const errorButton = errorMessage.querySelector(`.error__button`);

    document.addEventListener(`mousedown`, onButtonClick);
    document.addEventListener(`keydown`, onEscKeyClick);

    errorButton.addEventListener(`mousedown`, onButtonClick);
  };

  const removeMessage = (statusCode) => {
    statusCode.remove();
    document.removeEventListener(`keydown`, onEscKeyClick);
  };

  const removeStatusMessage = () => {
    removeMessage(mainNode.querySelector(`.success, .error`));
  };

  const onButtonClick = (evt) => {
    window.util.onMainMouseButtonClick(evt, () => {
      evt.preventDefault();

      removeStatusMessage();

      document.removeEventListener(`mousedown`, onButtonClick);
      document.removeEventListener(`keydown`, onEscKeyClick);
    });
  };

  const onEscKeyClick = (evt) => {
    window.util.onEscKeyPress(evt, () => {
      evt.preventDefault();

      removeStatusMessage();

      document.removeEventListener(`mousedown`, onButtonClick);
      document.removeEventListener(`keydown`, onEscKeyClick);
    });
  };

  const onSubmitClick = (evt) => {
    window.upload(new FormData(window.form.adNode), () => {
      window.statusPage.reset();
      window.statusPage.toggleDisabledOnFormNodes();
      window.pin.mapMainNode.addEventListener(`keydown`, window.statusPage.onKeyClick);
      window.pin.mapMainNode.addEventListener(`mousedown`, window.statusPage.onButtonClick);
      window.util.renderAddressCoordinates(window.util.MainPinSize.width / 2, window.util.MainPinSize.height / 2);
    });
    evt.preventDefault();
  };

  window.sendFormData = {
    onSubmitClick,
    renderErrorMessage,
    renderSuccessMessage
  };
})();
