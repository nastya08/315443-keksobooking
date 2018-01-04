'use strict';

(function () {
  var OFFER_TYPE_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000,
  };
  var ARR_OFFER_CHECKS = ['12:00', '13:00', '14:00'];
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Форма
  var form = document.querySelector('.notice__form');
  // Переменные
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var typeHome = form.querySelector('#type');
  var priceHome = form.querySelector('#price');
  var formTitle = form.querySelector('#title');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var roomOptionsNumber = roomNumber.options.length;
  var address = form.querySelector('#address');
  var description = form.querySelector('#description');
  var features = form.querySelectorAll('input[name="features"]');
  var formFieldset = form.querySelectorAll('fieldset');
  var avatarChooser = form.querySelector('.upload input[type=file]');
  var photoChooser = form.querySelector('.form__photo-container input[type=file]');
  var avatarUser = form.querySelector('.notice__preview img');
  var uploadPhoto = form.querySelector('.form__photo-container');

  // Все поля формы при открытии страницы недоступны
  var disableFieldset = function () {
    [].forEach.call(formFieldset, function (element) {
      element.disabled = true;
    });
  };
  disableFieldset();

  var syncValues = function (element, value) {
    element.value = value;
  };

  // изменение времени выезда при изменении времени въезда
  var onSincTimeIn = function () {
    window.synchronizeFields(timeIn, timeOut, ARR_OFFER_CHECKS, ARR_OFFER_CHECKS, syncValues);
  };

  // изменение времени въезда при изменении времени выезда
  var onSincTimeOut = function () {
    window.synchronizeFields(timeOut, timeIn, ARR_OFFER_CHECKS, ARR_OFFER_CHECKS, syncValues);
  };

  var syncMinValues = function (element, value) {
    element.min = value;
  };

  // изменение мин.стоимости при изменении типа жилья
  var onSincPrice = function () {
    var offerTypes = ['flat', 'bungalo', 'house', 'palace'];
    var offerPrices = [1000, 0, 5000, 10000];
    window.synchronizeFields(typeHome, priceHome, offerTypes, offerPrices, syncMinValues);
  };

  // изменение количества гостей при изменении количества комнат
  var onSincCapacity = function () {
    for (var i = 0; i < roomOptionsNumber; i++) {
      capacity.options[i].classList.remove('hidden');
      capacity.options[i].selected = false;
    }
    switch (roomNumber.value) {
      case '1':
        capacity.options[0].classList.add('hidden');
        capacity.options[1].classList.add('hidden');
        capacity.options[2].selected = true;
        capacity.options[3].classList.add('hidden');
        break;
      case '2':
        capacity.options[1].selected = true;
        capacity.options[0].classList.add('hidden');
        capacity.options[3].classList.add('hidden');
        break;
      case '3':
        capacity.options[1].selected = true;
        capacity.options[3].classList.add('hidden');
        break;
      case '100':
        capacity.options[0].classList.add('hidden');
        capacity.options[1].classList.add('hidden');
        capacity.options[2].classList.add('hidden');
        capacity.options[3].selected = true;
        break;
    }
  };

  // Добаление рамки
  var addBorderColor = function (elem) {
    elem.style.borderWidth = '2px';
    elem.style.borderColor = 'red';
  };

  // Удаление рамки
  var removeBorderColor = function (elem) {
    elem.style.borderWidth = '';
    elem.style.borderColor = '';
  };

  // Валидация заголовка
  var onInvalidTitle = function () {
    addBorderColor(formTitle);
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Обязательное поле');
    } else {
      formTitle.setCustomValidity('');
      removeBorderColor(formTitle);
    }
  };

  var onBlurTitle = function (evt) {
    evt.target.checkValidity();
  };

  var onFocusTitle = function (evt) {
    removeBorderColor(evt.target);
  };

  // Вставка адреса центр
  address.value = 'x: 600, y: 430';

  // Валидация цены
  var onInvalidPrice = function () {
    addBorderColor(priceHome);
    if (priceHome.validity.rangeUnderflow) {
      priceHome.setCustomValidity('Стоимость жилья должна быть не менее ' + OFFER_TYPE_PRICE[typeHome.value] + ' руб');
    } else if (priceHome.validity.rangeOverflow) {
      priceHome.setCustomValidity('Стоимость жилья должна быть меньше или равна 1 000 000');
    } else if (priceHome.validity.valueMissing) {
      priceHome.setCustomValidity('Обязательное поле');
    } else {
      priceHome.setCustomValidity('');
      removeBorderColor(priceHome);
    }
  };

  var onChangePrice = function () {
    removeBorderColor(priceHome);
    priceHome.setCustomValidity('');
  };

  var resetForm = function () {
    var childs = uploadPhoto.querySelectorAll('img');
    [].forEach.call(childs, function (element) {
      uploadPhoto.removeChild(element);
    });
    window.backend.removeError();
    formTitle.value = '';
    avatarUser.src = 'img/muffin.png';
    formTitle.placeholder = 'Милая, уютная квартирка в центре Токио';
    typeHome.value = 'flat';
    priceHome.value = '1000';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    roomNumber.value = '1';
    capacity.value = '1';
    [].forEach.call(capacity.options, function (element) {
      element.classList.add('hidden');
    });
    description.value = '';
    description.placeholder = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';
    [].forEach.call(features, function (element) {
      element.checked = false;
    });
    capacity.options[2].classList.remove('hidden');
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), resetForm, window.backend.onErrorSave);
    evt.preventDefault();
  };

  var onChooserChange = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarChooser:
            avatarUser.src = result;
            break;
          case photoChooser:
            var img = document.createElement('IMG');
            img.width = '50';
            img.height = '50';
            uploadPhoto.appendChild(img);
            img.src = result;
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  // Синхронизация времени
  timeIn.addEventListener('change', onSincTimeIn);
  timeOut.addEventListener('change', onSincTimeOut);
  // Синхронизация типа жилья - цены
  typeHome.addEventListener('change', onSincPrice);
  // Синхронизация комнат - гостей
  roomNumber.addEventListener('change', onSincCapacity);
  // Валидация
  formTitle.addEventListener('invalid', onInvalidTitle);
  formTitle.addEventListener('blur', onBlurTitle);
  formTitle.addEventListener('focus', onFocusTitle);
  priceHome.addEventListener('invalid', onInvalidPrice);
  priceHome.addEventListener('change', onChangePrice);
  // Загрузка изображений
  avatarChooser.addEventListener('change', onChooserChange);
  photoChooser.addEventListener('change', onChooserChange);
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    activateForm: function () {
      form.classList.remove('notice__form--disabled');
    },
    // Все поля формы становятся доступными
    ableFieldset: function () {
      [].forEach.call(formFieldset, function (element) {
        element.disabled = false;
      });
    }
  };
})();
