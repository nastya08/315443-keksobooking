'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
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
  var showCard = function (evt) {
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
        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.card.renderAd(window.ads[index]));
        mapPins.appendChild(fragment);
      };
      insertCard();

      // Скрыть .popup и удалить map__pin--active у этого элемента
      var buttonClose = document.querySelector('.popup__close');
      buttonClose.addEventListener('click', function () {
        closePopup();
      });
      document.addEventListener('keydown', onPopupEscPress);
    }
  };

  // Событие - открытие карточки
  mapPins.addEventListener('click', function (evt) {
    showCard(evt);
  });

  mapPins.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      showCard(evt);
    }
  });

  window.showCard = {
    showCard: showCard,
    closePopup: closePopup
  };
})();
