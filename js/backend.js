'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  var node = document.createElement('div');

  var createResultat = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return xhr.status === 200 ? onLoad(xhr.response) : onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createResultat(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = createResultat(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },

    createErrorMessage: function () {
      node.style.position = 'fixed';
      node.style.top = '40%';
      node.style.left = 0;
      node.style.right = 0;
      node.style.zIndex = '100';
      node.style.margin = '0 auto';
      node.style.paddingTop = '15px';
      node.style.height = '50px';
      node.style.backgroundColor = 'white';
      node.style.border = '5px solid red';
      node.style.textAlign = 'center';
      node.style.fontSize = '30px';
      node.textContent = '';
      node.classList.add('hidden');
      document.body.insertAdjacentElement('afterbegin', node);
    },

    onErrorLoad: function (errorMessage) {
      node.textContent = errorMessage;
      node.classList.remove('hidden');
    },

    onErrorSave: function (errorMessage) {
      node.textContent = errorMessage;
      node.classList.remove('hidden');
    },

    removeError: function () {
      node.textContent = '';
      node.classList.add('hidden');
    }
  };
})();
