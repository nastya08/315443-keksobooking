'use strict';

(function () {
  // Часть шаблока - метка
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Формирование метки
  var renderPin = function (ad, num) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x - window.PIN_POINTER_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.PIN_HEIGHT / 2 - window.PIN_POINTER_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.dataset.num = num;

    return mapPinElement;
  };

  var insertAd = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.PIN_NUMBER; i++) {
      fragment.appendChild(renderPin(window.ads[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };
  insertAd();
})();
