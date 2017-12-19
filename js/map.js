'use strict';

(function () {
  // Карта
  var map = document.querySelector('.map');
  // Список меток
  var mapPins = document.querySelector('.map__pins');
  // Центральная метка
  var mainPin = map.querySelector('.map__pin--main');

  var showPins = function () {
    for (var i = 0; i < window.PIN_NUMBER; i++) {
      mapPins.querySelectorAll('.map__pin')[i + 1].classList.remove('hidden');
    }
  };

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
