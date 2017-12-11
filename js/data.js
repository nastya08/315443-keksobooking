'use strict';

(function () {
  // Константы
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 12;
  var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_COORDINATES = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };

  // Формирование массива удобств
  var generateFeatures = function () {
    var newOfferFeatures = [];
    var offerFeatures = OFFER_FEATURES.slice();
    var lengthArray = window.util.getRandomNumber(1, offerFeatures.length - 1);

    for (var i = 0; i <= lengthArray; i++) {
      var index = window.util.getRandomNumber(0, offerFeatures.length - 1);
      newOfferFeatures[i] = offerFeatures.splice(index, 1);
    }
    return newOfferFeatures;
  };

  window.data = {
  // Формирование массива объектов недвижимости
    getRandomAds: function () {
      var ads = [];
      for (var i = 0; i < window.pinNumber; i++) {
        ads.push({
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            title: window.util.generatePartArray(OFFER_TITLES),
            adress: window.util.getRandomNumber(OFFER_COORDINATES.x.min, OFFER_COORDINATES.x.max) + ', ' + window.util.getRandomNumber(OFFER_COORDINATES.y.min, OFFER_COORDINATES.y.max),
            price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
            type: OFFER_TYPES[window.util.getRandomNumber(0, OFFER_TYPES.length - 1)],
            rooms: window.util.getRandomNumber(1, MAX_ROOMS),
            guests: window.util.getRandomNumber(1, MAX_GUESTS),
            checkin: OFFER_CHECKS[window.util.getRandomNumber(0, OFFER_CHECKS.length - 1)],
            checkout: OFFER_CHECKS[window.util.getRandomNumber(0, OFFER_CHECKS.length - 1)],
            features: generateFeatures(),
            description: '',
            photos: []
          },
          location: {
            x: window.util.getRandomNumber(OFFER_COORDINATES.x.min, OFFER_COORDINATES.x.max),
            y: window.util.getRandomNumber(OFFER_COORDINATES.y.min, OFFER_COORDINATES.y.max)
          }
        });
      }
      return ads;
    }
  };
  window.ads = window.data.getRandomAds();
})();
