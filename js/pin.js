'use strict';

(function () {
  var PIN_HEIGHT = 44;
  var PIN_POINTER_WIDTH = 10;
  var PIN_POINTER_HEIGHT = 18;

  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (ad, num) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - PIN_POINTER_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - PIN_HEIGHT / 2 - PIN_POINTER_HEIGHT + 'px';
    mapPinElement.innerHTML = '<img width="40" height="40" draggable="false">';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.dataset.num = num;

    return mapPinElement;
  };

  var onLoadSuccess = function (ads) {
    window.ads = ads;
    window.mapFilters.cutData(ads);
    window.backend.removeError();
  };

  window.backend.createErrorMessage();
  window.backend.load(onLoadSuccess, window.backend.onErrorLoad);

  window.pin = {
    renderPin: renderPin,

    showPins: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i], i));
      }
      document.querySelector('.map__pins').appendChild(fragment);
    }
  };
})();
