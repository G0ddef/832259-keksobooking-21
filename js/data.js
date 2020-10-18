'use strict';

(() => {
  const PINS_AMOUNT = 8;
  const ROOMS_AMOUNT = 6;
  const GUESTS_AMOUNT = 5;
  const MIN_HEIGHT_COORD = 130;
  const MAX_HEIGHT_COORD = 630;
  const QUANTITY_PHOTO = 3;
  const mapNode = document.querySelector(`.map`);

  const housingTypesArr = [`palace`, `flat`, `house`, `bungalow`];
  const adTitlesArr = [`Комната`, `Квартира`, `Апартаменты`, `Номер`];
  const checkInTimesArr = [`12:00`, `13:00`, `14:00`];
  const checkOutTimesArr = [`12:00`, `13:00`, `14:00`];
  const advantagesListArr = [`wifi`, `dishwasher`, `parking`, `washer`];

  const PinSize = {
    width: 50,
    height: 70
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

  const createAds = (amount) => {
    let ads = [];

    for (let i = 1; i <= amount; i++) {
      ads.push({
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: adTitlesArr[window.util.getRandomInt(0, adTitlesArr.length)],
          adress: {
            x: window.util.getRandomInt(Coordinates.x.min, Coordinates.x.max),
            y: window.util.getRandomInt(Coordinates.y.min, Coordinates.y.max)
          },
          price: window.util.getRandomInt(0, i * 500),
          type: housingTypesArr[window.util.getRandomInt(0, housingTypesArr.length)],
          rooms: window.util.getRandomInt(1, ROOMS_AMOUNT),
          guests: window.util.getRandomInt(1, GUESTS_AMOUNT),
          checkin: checkInTimesArr[window.util.getRandomInt(0, checkInTimesArr.length)],
          checkout: checkOutTimesArr[window.util.getRandomInt(0, checkOutTimesArr.length)],
          features: advantagesListArr.slice(window.util.getRandomInt(0, advantagesListArr.length)),
          description: `В помещении ${window.util.getRandomInt(0, ROOMS_AMOUNT)} комнат(ы).`,
          photos: window.util.createPhotosList(window.util.getRandomInt(0, QUANTITY_PHOTO))
        },
        location: {
          x: window.util.getRandomInt(Coordinates.x.min, Coordinates.x.max),
          y: window.util.getRandomInt(Coordinates.y.min, Coordinates.y.max)
        }
      });
    }

    return ads;
  };

  window.data = {
    mapNode,
    createAds,
    PINS_AMOUNT
  };
})();
