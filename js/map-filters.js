'use strict';

(function () {
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var arrayCopy = [];
  var filterOption = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any'
  };
  var checkedFeatures = [];
  // Фильтры
  var filter = document.querySelector('.map__filters');
  var filterType = filter.querySelector('#housing-type');
  var filterPrice = filter.querySelector('#housing-price');
  var filterRooms = filter.querySelector('#housing-rooms');
  var filterGuests = filter.querySelector('#housing-guests');
  var filterFeatures = filter.querySelector('#housing-features');

  var filterFunctions = [
    // по типу жилья
    function (arr) {
      if (filterOption.type !== 'any') {
        arr = arr.filter(function (elem) {
          return elem.offer.type === filterOption.type;
        });
      }
      return arr;
    },
    // по стоимости
    function (arr) {
      switch (filterOption.price) {
        case 'any':
          break;
        case 'low':
          arr = arr.filter(function (elem) {
            return elem.offer.price <= PRICE_MIN;
          });
          break;
        case 'high':
          arr = arr.filter(function (elem) {
            return elem.offer.price >= PRICE_MAX;
          });
          break;
        case 'middle':
          arr = arr.filter(function (elem) {
            return (elem.offer.price > PRICE_MIN) && (elem.offer.price < PRICE_MAX);
          });
      }
      return arr;
    },
    // по числу комнат
    function (arr) {
      if (filterOption.rooms !== 'any') {
        arr = arr.filter(function (elem) {
          return elem.offer.rooms === filterOption.rooms;
        });
      }
      return arr;
    },
    // по числу гостей
    function (arr) {
      if (filterOption.guests !== 'any') {
        arr = arr.filter(function (elem) {
          return elem.offer.guests === filterOption.guests;
        });
      }
      return arr;
    },
    // по удобcтвам
    function (arr) {
      return arr.filter(function (elem) {
        return checkedFeatures.every(function (currentFeature) {
          return elem.offer.features.includes(currentFeature);
        });
      });
    }
  ];

  // фильтрация
  var onFiltersChange = function (evt) {
    var filterName = evt.target.name.substring(8);
    filterOption[filterName] = evt.target.value;
    window.ads = arrayCopy.slice();

    var checkedElements = filterFeatures.querySelectorAll('input[type="checkbox"]:checked');
    checkedFeatures = [].map.call(checkedElements, function (elem) {
      return elem.value;
    });

    filterFunctions.forEach(function (elem) {
      window.ads = elem(window.ads);
    });
    if (window.ads.length > window.PIN_NUMBER) {
      window.ads = window.ads.slice(0, window.PIN_NUMBER);
    }

    window.debounce(window.map.appendPins);
  };

  filterType.addEventListener('change', onFiltersChange);
  filterPrice.addEventListener('change', onFiltersChange);
  filterRooms.addEventListener('change', onFiltersChange);
  filterGuests.addEventListener('change', onFiltersChange);
  filterFeatures.addEventListener('change', onFiltersChange);

  window.mapFilters = {
    cutData: function (data) {
      arrayCopy = data.slice();
      window.ads = data.slice(0, window.PIN_NUMBER);
    }
  };
})();
