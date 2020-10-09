'use strict';

const PINS_AMOUNT = 8;
const ROOMS_AMOUNT = 6;
const GUESTS_AMOUNT = 5;
const MIN_HEIGHT_COORD = 130;
const MAX_HEIGHT_COORD = 630;
const QUANTITY_PHOTO = 3;

const mapPins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const mapPin = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFiltersElem = document.querySelector(`.map__filters`).elements;
const adForm = document.querySelector(`.ad-form`);
const adFormElem = document.querySelector(`.ad-form`).elements;
const addressCoordinates = document.querySelector(`#address`);
const quantityRooms = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);

const housingTypes = [`palace`, `flat`, `house`, `bungalow`];
const adTitles = [`Комната`, `Квартира`, `Апартаменты`, `Номер`];
const checkInTimes = [`12:00`, `13:00`, `14:00`];
const checkOutTimes = [`12:00`, `13:00`, `14:00`];
const advantagesList = [`wifi`, `dishwasher`, `parking`, `washer`];

const PinSize = {
  width: 50,
  height: 70
};
const MainPinSize = {
  x: 65,
  y: 65,
  activeY: 87
};

const Coordinates = {
  x: {
    min: -(PinSize.width / 2),
    max: map.offsetWidth - (PinSize.width / 2)
  },
  y: {
    min: MIN_HEIGHT_COORD - (-PinSize.height),
    max: MAX_HEIGHT_COORD
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const createPhotosList = (photo) => {
  let photosList = [];

  for (let i = 0; i <= photo; i++) {
    photosList[i] = `http://o0.github.io/assets/images/tokyo/hotel` + (i + 1) + `.jpg`;
  }

  return photosList;
};

const createAds = (amount) => {
  let ads = [];

  for (let i = 1; i <= amount; i++) {
    ads.push({
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: adTitles[getRandomInt(0, adTitles.length)],
        adress: {
          x: getRandomInt(Coordinates.x.min, Coordinates.x.max),
          y: getRandomInt(Coordinates.y.min, Coordinates.y.max)
        },
        price: getRandomInt(0, i * 500),
        type: housingTypes[getRandomInt(0, housingTypes.length)],
        rooms: getRandomInt(1, ROOMS_AMOUNT),
        guests: getRandomInt(1, GUESTS_AMOUNT),
        checkin: checkInTimes[getRandomInt(0, checkInTimes.length)],
        checkout: checkOutTimes[getRandomInt(0, checkOutTimes.length)],
        features: advantagesList.slice(getRandomInt(0, advantagesList.length)),
        description: `В помещении ` + getRandomInt(0, ROOMS_AMOUNT) + ` комнат(ы).`,
        photos: createPhotosList(getRandomInt(0, QUANTITY_PHOTO))
      },
      location: {
        x: getRandomInt(Coordinates.x.min, Coordinates.x.max),
        y: getRandomInt(Coordinates.y.min, Coordinates.y.max)
      }
    });
  }

  return ads;
};

const pinCreate = (object) => {
  const pinTemplate = mapPin.cloneNode(true);
  const img = pinTemplate.querySelector(`img`);
  pinTemplate.style.left = `${object.location.x}px`;
  pinTemplate.style.top = `${object.location.y}px`;
  img.src = object.author.avatar;
  img.alt = object.offer.title;

  return pinTemplate;
};

const getPinsFragment = (pinsData) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pinsData.length; i++) {
    fragment.appendChild(pinCreate(pinsData[i]));
  }

  return fragment;
};

const renderPinsScreen = () => {
  const pinsDataArr = createAds(PINS_AMOUNT);
  const getPinsFragmentNodes = getPinsFragment(pinsDataArr);

  mapPins.appendChild(getPinsFragmentNodes);
};

const renderConditionForms = (formName, condition) => {
  for (let i = 0; i < formName.length; i++) {
    formName[i].disabled = condition;
  }
};

renderConditionForms(mapFiltersElem, true);
renderConditionForms(adFormElem, true);

const directionCallback = () => {
  renderConditionForms(mapFiltersElem, false);
  renderConditionForms(adFormElem, false);
  renderPinsScreen();
  renderConditionCoordinates(MainPinSize.x / 2, MainPinSize.activeY);
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapPinMain.removeEventListener(`mousedown`, onPinPressButton);
  mapPinMain.removeEventListener(`keydown`, onPinPressKey);

}

const onPinPressKey = (evt) => {
  if (evt.key === `Enter`) {
    directionCallback()
  }
}

const onPinPressButton = (evt) => {
  if (evt.button === 0) {
    directionCallback();
  }
}

mapPinMain.addEventListener(`keydown`, onPinPressKey);
mapPinMain.addEventListener(`mousedown`, onPinPressButton);

const getPinCoordinates = (pinCoord, pinSize) => {
  return Math.round(parseInt(pinCoord) + (pinSize));
}

const renderConditionCoordinates = (xPinSize, yPinSize) => {
  let pinCoordinatesX = getPinCoordinates(mapPinMain.style.left, xPinSize);
  let pinCoordinatesY = getPinCoordinates(mapPinMain.style.top, yPinSize);
  return addressCoordinates.value = pinCoordinatesX + `, ` + pinCoordinatesY;
}

renderConditionCoordinates(MainPinSize.x / 2, MainPinSize.y / 2);

const renderCompatibilityRooms = () => {
  for (let i = 0; i < capacity.options.length; i++) {
    capacity.options[i].disabled = true;
  }
  switch(quantityRooms.value) {
    case `1`:
      capacity.options[2].disabled = false;
      capacity[2].selected = true;
      break;
    case `2`:
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity[1].selected = true;
      break;
    case `3`:
    capacity.options[0].disabled = false;
    capacity.options[1].disabled = false;
    capacity.options[2].disabled = false;
    capacity[0].selected = true;
    break;
    case `100`:
    capacity.options[3].disabled = false;
    capacity[3].selected = true;
    break;
  }
}

quantityRooms.addEventListener(`input`, renderCompatibilityRooms);