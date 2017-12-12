'use strict';

(function () {
  // Карта
  var map = document.querySelector('.map');
  // Список меток
  var mapPins = document.querySelector('.map__pins');

  // Центральная метка
  var mainPin = map.querySelector('.map__pin--main');

  var fragment = document.createDocumentFragment();

  var hidePins = function () {
    for (var i = 0; i < window.PIN_NUMBER; i++) {
      mapPins.querySelectorAll('.map__pin')[i + 1].classList.add('hidden');
    }
  };
  hidePins();

  var showPins = function () {
    for (var i = 0; i < window.PIN_NUMBER; i++) {
      mapPins.querySelectorAll('.map__pin')[i + 1].classList.remove('hidden');
    }
  };

  // Закрытие окна на ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
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
        fragment.appendChild(window.card.renderAd(window.ads[index]));
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
    if (evt.keyCode === window.ENTER_KEYCODE) {
      openPopup(evt);
    }
  });

  window.map = {
    // Функция активации карты
    activateMap: function () {
      map.classList.remove('map--faded');
      window.form.activateForm();
      window.form.ableFieldset();
      mainPin.classList.remove('map__pin--active');
      showPins();
    }
  };
})();
