'use strict';

(function () {
  window.util = {
    // Получение случайного целого значения
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generatePartArray: function (array) {
      var index = window.util.getRandomNumber(0, array.length - 1);
      return array.splice(index, 1);
    }
  };
})();
