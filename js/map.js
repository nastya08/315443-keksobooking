'use strict';

(function () {
  // Карта
  var map = document.querySelector('.map');
  // Список меток
  var mapPins = document.querySelector('.map__pins');

  window.map = {
    activateMap: function () {
      map.classList.remove('map--faded');
      window.form.activateForm();
      window.form.ableFieldset();
      window.pin.showPins(window.ads);
    },

    appendPins: function () {
      if (mapPins.querySelector('.map__pin--active')) {
        window.showCard.closePopup();
      }

      var pins = mapPins.querySelectorAll('.map__pin');
      [].forEach.call(pins, function (elem) {
        if (!elem.classList.contains('map__pin--main')) {
          mapPins.removeChild(elem);
        }
      });

      window.pin.showPins(window.ads);
    }
  };
})();
