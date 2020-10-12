'use strict';

const PINS_AMOUNT = 8;
const ROOMS_AMOUNT = 6;
const GUESTS_AMOUNT = 5;
const MIN_HEIGHT_COORD = 130;
const MAX_HEIGHT_COORD = 630;
const QUANTITY_PHOTO = 3;

const mapPinsNode = document.querySelector(`.map__pins`);
const mapNode = document.querySelector(`.map`);
const mapPinNode = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapPinMainNode = document.querySelector(`.map__pin--main`);
const mapFiltersNode = document.querySelector(`.map__filters`);
const adFormNode = document.querySelector(`.ad-form`);
const addressCoordinatesNode = document.querySelector(`#address`);


const housingTypesArr = [`palace`, `flat`, `house`, `bungalow`];
const adTitlesArr = [`Комната`, `Квартира`, `Апартаменты`, `Номер`];
const checkInTimesArr = [`12:00`, `13:00`, `14:00`];
const checkOutTimesArr = [`12:00`, `13:00`, `14:00`];
const advantagesListArr = [`wifi`, `dishwasher`, `parking`, `washer`];
let isPageDisabled = false;

const PinSize = {
  width: 50,
  height: 70
};
const MainPinSize = {
  width: 65,
  height: 65,
  activeHeight: 87
};

const Coordinates = {
  x: {
    min: -(PinSize.width / 2),
    max: mapNode.offsetWidth - (PinSize.width / 2)
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
        title: adTitlesArr[getRandomInt(0, adTitlesArr.length)],
        adress: {
          x: getRandomInt(Coordinates.x.min, Coordinates.x.max),
          y: getRandomInt(Coordinates.y.min, Coordinates.y.max)
        },
        price: getRandomInt(0, i * 500),
        type: housingTypesArr[getRandomInt(0, housingTypesArr.length)],
        rooms: getRandomInt(1, ROOMS_AMOUNT),
        guests: getRandomInt(1, GUESTS_AMOUNT),
        checkin: checkInTimesArr[getRandomInt(0, checkInTimesArr.length)],
        checkout: checkOutTimesArr[getRandomInt(0, checkOutTimesArr.length)],
        features: advantagesListArr.slice(getRandomInt(0, advantagesListArr.length)),
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
  const pinTemplate = mapPinNode.cloneNode(true);
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

  mapPinsNode.appendChild(getPinsFragmentNodes);
};

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;

  for (let i = 0; i < mapFiltersNode.elements.length; i++) {
    mapFiltersNode.elements[i].disabled = isPageDisabled;
    mapFiltersNode.elements[i].classList.add('blocked-form');
  }

  for (let i = 0; i < adFormNode.elements.length; i++) {
    adFormNode.elements[i].disabled = isPageDisabled;
    adFormNode.elements[i].classList.add('blocked-form');
  }
};

const toggleEnabledHover = () => {
  for (let i = 0; i < adFormNode.elements.length; i++) {
    adFormNode.elements[i].classList.remove('blocked-form');
  }

  for (let i = 0; i < mapFiltersNode.elements.length; i++) {
    mapFiltersNode.elements[i].classList.remove('blocked-form');
  }
};

const toggleEnabledOnFormNodes = () => {
  renderPinsScreen();
  toggleDisabledOnFormNodes();
  toggleEnabledHover();
  renderAddressCoordinates(MainPinSize.width / 2, MainPinSize.activeHeight);
  mapNode.classList.remove(`map--faded`);
  adFormNode.classList.remove(`ad-form--disabled`);
  mapPinMainNode.removeEventListener(`mousedown`, onButtonClick);
  mapPinMainNode.removeEventListener(`keydown`, onKeyClick);
};

const onKeyClick = (evt) => {
  if (evt.key === `Enter`) {
    toggleEnabledOnFormNodes();
  }
};

const onButtonClick = (evt) => {
  if (evt.button === 0) {
    toggleEnabledOnFormNodes();
  }
};

const getPinCoordinates = (pinCoord, pinSize) => {
  return Math.round(parseInt(pinCoord, 10) + (pinSize));
};

const renderAddressCoordinates = (xPinSize, yPinSize) => {
  let pinCoordinatesX = getPinCoordinates(mapPinMainNode.style.left, xPinSize);
  let pinCoordinatesY = getPinCoordinates(mapPinMainNode.style.top, yPinSize);
  addressCoordinatesNode.value = `${pinCoordinatesX}, ${pinCoordinatesY}`;
};

const renderCompatibilityRooms = () => {
  for (let i = 0; i < adFormNode.capacity.options.length; i++) {
    adFormNode.capacity.options[i].disabled = true;
  }
  switch (adFormNode.rooms.value) {
    case `1`:
      adFormNode.capacity.options[2].disabled = false;
      adFormNode.capacity[2].selected = true;
      break;
    case `2`:
      adFormNode.capacity.options[1].disabled = false;
      adFormNode.capacity.options[2].disabled = false;
      adFormNode.capacity[1].selected = true;
      break;
    case `3`:
      adFormNode.capacity.options[0].disabled = false;
      adFormNode.capacity.options[1].disabled = false;
      adFormNode.capacity.options[2].disabled = false;
      adFormNode.capacity[0].selected = true;
      break;
    case `100`:
      adFormNode.capacity.options[3].disabled = false;
      adFormNode.capacity[3].selected = true;
      break;
  }
};

toggleDisabledOnFormNodes();
mapPinMainNode.addEventListener(`keydown`, onKeyClick);
mapPinMainNode.addEventListener(`mousedown`, onButtonClick);
renderAddressCoordinates(MainPinSize.width / 2, MainPinSize.height / 2);
adFormNode.rooms.addEventListener(`input`, renderCompatibilityRooms);
