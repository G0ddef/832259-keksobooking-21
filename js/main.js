'use strict';

const PINS = 8;
const ROOMS = 6;
const GUESTS = 5;
const MIN_HEIGHT_COORD = 130;
const MAX_HEIGHT_COORD = 630;
const QUANTITY_PHOTO = 3;
const mapPins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const mapPin = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const HousingTypes = [`palace`, `flat`, `house`, `bungalow`];
const adTitles = [`Комната`, `Квартира`, `Апартаменты`, `Номер`];
const checkInTimes = [`12:00`, `13:00`, `14:00`];
const checkOutTimes = [`12:00`, `13:00`, `14:00`];
const advantagesList = [`wifi`, `dishwasher`, `parking`, `washer`];
const PinSize = {
  width: 50,
  height: 70
};
const Coordinates = {
  x: {
    min: -(PinSize.width / 2),
    max: map.offsetWidth - (PinSize.width / 2)
  },
  y: {
    min: MIN_HEIGHT_COORD - (-PinSize.height),
    max: MAX_HEIGHT_COORD - PinSize.height
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
        type: HousingTypes[getRandomInt(0, HousingTypes.length)],
        rooms: getRandomInt(1, ROOMS),
        guests: getRandomInt(1, GUESTS),
        checkin: checkInTimes[getRandomInt(0, checkInTimes.length)],
        checkout: checkOutTimes[getRandomInt(0, checkOutTimes.length)],
        features: advantagesList.slice(getRandomInt(0, advantagesList.length)),
        description: `В помещении ` + getRandomInt(0, ROOMS) + ` комнат(ы).`,
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

console.log(createAds(PINS));

const pinCreate = (object) => {
  const pinTemplate = mapPin.cloneNode(true);
  const img = pinTemplate.querySelector('img');
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

const getPinsScreen = () => {
  const pinsDataArr = createAds(PINS);
  const getPinsFragmentNodes = getPinsFragment(pinsDataArr);

  mapPins.appendChild(getPinsFragmentNodes);
};

getPinsScreen();
