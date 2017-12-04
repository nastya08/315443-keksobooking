'use strict';

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
var PIN_WIDTH = 46;
var PIN_HEIGHT = 62;
var PIN_NUMBER = 8;
// Количество fieldset внутри формы
var NUMBERS_FIELDSET = document.querySelector('.notice__form').getElementsByTagName('FIELDSET').length;
// Клавиши
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные
// Объект для перевода типов жилья
var offerTypeTranslate = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
// Карта
var map = document.querySelector('.map');
// Список меток
var mapPins = document.querySelector('.map__pins');
// Часть шаблока - метка
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
// Часть шаблона - карточка
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
// Массив объектов недвижимости
var ads = [];
// Фрагмент
var fragment = document.createDocumentFragment();
// Форма
var form = document.querySelector('.notice__form');
// Центральная метка
var mainPin = map.querySelector('.map__pin--main');

// Функции
// Получение случайного целого значения
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePartArray = function (array) {
  var index = getRandomNumber(0, array.length - 1);
  return array.splice(index, 1);
};

// Формирование массива удобств
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

// Формирование массива объектов недвижимости
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

// Получение удобств
var getFeatureElements = function (features) {
  var featureElements = '';
  for (var i = 0; i <= features.length - 1; i++) {
    featureElements += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureElements;
};

// Формирование метки
var renderPin = function (ad, num) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = ad.location.x + PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
  mapPinElement.querySelector('img').src = ad.author.avatar;
  mapPinElement.dataset.num = num;

  return mapPinElement;
};

// Формирование карточки
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

// Добавление меток на страницу
var insertAd = function () {
  getRandomAds();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i], i));
  }
};
insertAd();

// Все поля формы при открытии страницы недоступны, disabled
var disableFieldset = function () {
  for (var i = 0; i < NUMBERS_FIELDSET; i++) {
    form.querySelectorAll('fieldset')[i].disabled = true;
  }
};
disableFieldset();

// Все поля формы становятся доступными
var ableFieldset = function () {
  for (var i = 0; i < NUMBERS_FIELDSET; i++) {
    form.querySelectorAll('fieldset')[i].disabled = false;
  }
};

// Функция активации карты
var activateMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  mapPins.appendChild(fragment);
  ableFieldset();
  mainPin.classList.remove('map__pin--active');
  mainPin.classList.add('hidden');
};

// Акцивация формы и карты при событии mouseup и ENTER
mainPin.addEventListener('mouseup', function () {
  activateMap();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});

// Закрытие окна на ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция - закрытие попапа
var closePopup = function () {
  var card = mapPins.querySelector('.popup');
  mapPins.removeChild(card);
  mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция - открытие попапа
var openPopup = function (evt) {
  var target = evt.target.closest('.map__pin');
  if (target && !target.classList.contains('map__pin--main')) {
    // Был ли до этого pin--active? Если да, удалить map__pin--active
    if (mapPins.querySelector('.map__pin--active')) {
      mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    // Добавление класса map__pin--active
    target.classList.add('map__pin--active');
    // Была ли открытая карточка? Если да, удаляем
    if (mapPins.querySelector('.popup')) {
      var card = mapPins.querySelector('.popup');
      mapPins.removeChild(card);
    }
    // Вставить объявление .popup
    var insertCard = function () {
      var index = target.dataset.num;
      fragment.appendChild(renderAd(ads[index]));
      mapPins.appendChild(fragment);
    };
    insertCard();
    // Скрыть .popup и удалить map__pin--active у этого элемента
    var buttonClose = map.querySelector('.popup__close');
    buttonClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  }
};

// Событие - открытие карточки
mapPins.addEventListener('click', function (evt) {
  openPopup(evt);
});

mapPins.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup(evt);
  }
});
