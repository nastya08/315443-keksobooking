'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_POINTER_HEIGHT = 22;
  // Ограничения по высоте
  var COORDS_Y = {
    min: 100,
    max: 500
  };
  var ENTER_KEYCODE = 13;

  // Центральная метка
  var mainPin = document.querySelector('.map__pin--main');

  var dragPinMain = function () {
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        if ((mainPin.offsetTop - shift.y) >= (COORDS_Y.min - (MAIN_PIN_HEIGHT / 2 + MAIN_PIN_POINTER_HEIGHT)) && (mainPin.offsetTop - shift.y) <= (COORDS_Y.max - (MAIN_PIN_HEIGHT / 2 + MAIN_PIN_POINTER_HEIGHT))) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        // Получение координат
        var finalCoords = {
          finalX: mainPin.offsetLeft,
          finalY: Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_POINTER_HEIGHT)
        };
        document.querySelector('#address').value = 'x: ' + finalCoords.finalX + ', y: ' + finalCoords.finalY;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  dragPinMain();

  // Акцивация формы и карты при событии mouseup и ENTER
  mainPin.addEventListener('mouseup', function () {
    window.map.activateMap();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.activateMap();
    }
  });
})();
