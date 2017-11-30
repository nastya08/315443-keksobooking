'use strict';

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
var PIN_WIDTH = 46;
var PIN_HEIGHT = 62;
var PIN_NUMBER = 8;

var offerTypeTranslate = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var ads = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePartArray = function (array) {
  var index = getRandomNumber(0, array.length - 1);
  return array.splice(index, 1);
};

var generateFeatures = function () {
  var newOfferFeatures = [];
  var offerFeatures = OFFER_FEATURES.slice();
  var lengthArray = getRandomNumber(1, offerFeatures.length - 1);

  for (var i = 0; i <= lengthArray; i++) {
    var index = getRandomNumber(0, offerFeatures.length - 1);
    newOfferFeatures[i] = offerFeatures.splice(index, 1);
  }
  return newOfferFeatures;
};

var getRandomAds = function () {
  for (var i = 0; i < PIN_NUMBER; i++) {
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: generatePartArray(OFFER_TITLES),
        adress: getRandomNumber(OFFER_COORDINATES.x.min, OFFER_COORDINATES.x.max) + ', ' + getRandomNumber(OFFER_COORDINATES.y.min, OFFER_COORDINATES.y.max),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length - 1)],
        rooms: getRandomNumber(1, MAX_ROOMS),
        guests: getRandomNumber(1, MAX_GUESTS),
        checkin: OFFER_CHECKS[getRandomNumber(0, OFFER_CHECKS.length - 1)],
        checkout: OFFER_CHECKS[getRandomNumber(0, OFFER_CHECKS.length - 1)],
        features: generateFeatures(),
        description: '',
        photos: []
      },

      location: {
        x: getRandomNumber(OFFER_COORDINATES.x.min, OFFER_COORDINATES.x.max),
        y: getRandomNumber(OFFER_COORDINATES.y.min, OFFER_COORDINATES.y.max)
      }
    });
  }
  return ads;
};

var getFeatureElements = function (features) {
  var featureElements = '';
  for (var i = 0; i <= features.length - 1; i++) {
    featureElements += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureElements;
};

var renderPin = function (ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = ad.location.x + PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
  mapPinElement.querySelector('img').src = ad.author.avatar;

  return mapPinElement;
};

var renderAd = function (ad) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapCardElement.querySelector('small').textContent = ad.offer.adress;
  mapCardElement.querySelector('.popup__price').innerHTML = ad.offer.price + ' &#x20bd;/ночь';
  mapCardElement.querySelectorAll('p')[2].textContent = ad.offer.rooms + ' комнаты' + ' для ' + ad.offer.guests + ' гостей';
  mapCardElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardElement.querySelectorAll('p')[4].textContent = ad.offer.description;
  mapCardElement.querySelector('h4').textContent = offerTypeTranslate[ad.offer.type];
  mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  mapCardElement.querySelector('.popup__features').innerHTML = getFeatureElements(ad.offer.features);

  return mapCardElement;
};

var insertAd = function () {
  var fragment = document.createDocumentFragment();

  getRandomAds();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
    fragment.appendChild(renderAd(ads[i]));
  }
  mapPins.appendChild(fragment);
};

insertAd();
