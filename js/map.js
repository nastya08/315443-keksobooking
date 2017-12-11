'use strict';

(function () {
  // Клавиши
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Карта
  var map = document.querySelector('.map');
  // Список меток

  // Центральная метка
  var mainPin = map.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  var hidePins = function () {
    for (var i = 0; i < window.pinNumber; i++) {
      window.mapPins.querySelectorAll('.map__pin')[i + 1].classList.add('hidden');
    }
  };
  hidePins();

  var showPins = function () {
    for (var i = 0; i < window.pinNumber; i++) {
      window.mapPins.querySelectorAll('.map__pin')[i + 1].classList.remove('hidden');
    }
  };

  // Функция активации карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.activateForm();
    window.form.ableFieldset();
    mainPin.classList.remove('map__pin--active');
    mainPin.classList.add('hidden');
    showPins();
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
    var card = window.mapPins.querySelector('.popup');
    window.mapPins.removeChild(card);
    window.mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Функция - открытие попапа
  var openPopup = function (evt) {
    var target = evt.target.closest('.map__pin');
    if (target && !target.classList.contains('map__pin--main')) {
      // Был ли до этого pin--active? Если да, удалить map__pin--active
      if (window.mapPins.querySelector('.map__pin--active')) {
        window.mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      // Добавление класса map__pin--active
      target.classList.add('map__pin--active');
      // Была ли открытая карточка? Если да, удаляем
      if (window.mapPins.querySelector('.popup')) {
        var card = window.mapPins.querySelector('.popup');
        window.mapPins.removeChild(card);
      }
      // Вставить объявление .popup
      var insertCard = function () {
        var index = target.dataset.num;
        fragment.appendChild(window.card.renderAd(window.ads[index]));
        window.mapPins.appendChild(fragment);
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
  window.mapPins.addEventListener('click', function (evt) {
    openPopup(evt);
  });

  window.mapPins.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(evt);
    }
  });
})();
