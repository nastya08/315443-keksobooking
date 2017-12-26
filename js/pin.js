'use strict';

(function () {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (ad, num) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - window.PIN_POINTER_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.PIN_HEIGHT / 2 - window.PIN_POINTER_HEIGHT + 'px';
    mapPinElement.innerHTML = '<img width="40" height="40" draggable="false">';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.dataset.num = num;

    return mapPinElement;
  };

  var onLoadSuccess = function (ads) {
    window.ads = ads;
    window.mapFilters.cutData(ads);
  };

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.position = 'fixed';
    node.style.top = '40%';
    node.style.left = 0;
    node.style.right = 0;
    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.paddingTop = '100px';
    node.style.height = '150px';
    node.style.backgroundColor = 'white';
    node.style.border = '5px solid red';
    node.style.textAlign = 'center';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoadSuccess, onLoadError);

  window.pin = {
    renderPin: function (ad, num) {
      var mapPinElement = mapPinTemplate.cloneNode(true);
      mapPinElement.style.left = ad.location.x - window.PIN_POINTER_WIDTH / 2 + 'px';
      mapPinElement.style.top = ad.location.y - window.PIN_HEIGHT / 2 - window.PIN_POINTER_HEIGHT + 'px';
      mapPinElement.innerHTML = '<img width="40" height="40" draggable="false">';
      mapPinElement.querySelector('img').src = ad.author.avatar;
      mapPinElement.dataset.num = num;

      return mapPinElement;
    },

    showPins: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i], i));
      }
      document.querySelector('.map__pins').appendChild(fragment);
    }
  };
})();
