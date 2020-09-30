`use strict`;

const PINS_COUNT = 8;
const ROOMS = 6;
const GUESTS = 5;

const mapPins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const mapPin = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const typeHousing = [`palace`, `flat`, `house`, `bungalow`];
const titleAds = [`Комната`, `Квартира`, `Аппартаменты`, `Номер`];
const checkTimes = [`12:00`, `13:00`, `14:00`];
const advantagesList = [`wifi`, `dishwasher`, `parking`, `washer`];
const pinSize = 62;
const Coordinates = {
  x: {
    min: -(pinSize / 2),
    max: map.offsetWidth - (pinSize / 2)
  },
  y: {
    min: -pinSize,
    max: map.offsetHeight - pinSize
  }
}
const getRandomNumber = (rand) => {
  return Math.floor(Math.random() * Math.floor(rand));
}

const getRandomLocation = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const createPhotosList = (photo) => {
  let photosList = [];

  for (let i = 1; i < photo; i++) {
    photosList[i] = `http://o0.github.io/assets/images/tokyo/hotel` + i + `.jpg`;
  }

  return photosList;
}

const createAds = (count) => {
  let ads = [];

  for (let i = 1; i <= count; i++) {
    ads.push ({
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: titleAds[getRandomNumber(titleAds.length)],
        adress: {
          x: getRandomLocation(Coordinates.x.min, Coordinates.x.max),
          y: getRandomLocation(Coordinates.y.min, Coordinates.y.max)
        },
        price: getRandomNumber(i * 500),
        type: typeHousing[getRandomNumber(typeHousing.length)],
        rooms: getRandomNumber(ROOMS),
        guests: getRandomNumber(GUESTS),
        checkin: checkTimes[getRandomNumber(checkTimes.length)],
        checkout: checkTimes[getRandomNumber(checkTimes.length)],
        features: advantagesList.slice(getRandomNumber(advantagesList.length)),
        description: `В помещении ` + getRandomNumber(ROOMS) + ` комнат(ы).`,
        photos: createPhotosList(getRandomNumber(5))
      },
      location: {
        x: getRandomLocation(Coordinates.x.min, Coordinates.x.max),
        y: getRandomLocation(Coordinates.y.min, Coordinates.y.max)
      }
    })
  }

  return ads;
}

const pinsCreate = (object) => {
  const pinTemplate = mapPin.cloneNode(true);
  const img = pinTemplate.querySelector('img');
  pinTemplate.style.left=`${object.location.x}px`;
  pinTemplate.style.top=`${object.location.y}px`;
  img.src = object.author.avatar;
  img.alt = object.offer.title;

  return pinTemplate;
}

const pinsFragment = (pinsData) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pinsData.length; i++) {
    fragment.appendChild(pinsCreate(pinsData[i]));
  }

  return fragment;
}

const pinsScreen = () => {
  const pinsDataArr = createAds(PINS_COUNT);
  const pinsFragmentNodes = pinsFragment(pinsDataArr);

  mapPins.appendChild(pinsFragmentNodes);
}

pinsScreen();