'use strict';

(function () {
  window.synchronizeFields = function (elemMain, elemChange, arrayMain, arrayChange, syncValues) {
    var elemMainValue = arrayMain.indexOf(elemMain.value);
    var elemChangeValue = arrayChange[elemMainValue];
    syncValues(elemChange, elemChangeValue);
  };
})();
