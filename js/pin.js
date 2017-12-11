'use strict';

(function () {
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 62;

  // Часть шаблока - метка
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Формирование метки
  var renderPin = function (ad, num) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x + PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.dataset.num = num;

    return mapPinElement;
  };

  var insertAd = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.pinNumber; i++) {
      fragment.appendChild(renderPin(window.ads[i], i));
    }
    window.mapPins.appendChild(fragment);
  };
  insertAd();
})();
