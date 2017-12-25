'use strict';

(function () {
  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, window.DEBOUNCE_INTERVAL);
  };
})();
