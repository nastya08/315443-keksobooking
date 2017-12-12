'use strict';

(function () {
  // Форма
  var form = document.querySelector('.notice__form');
  // Количество fieldset внутри формы
  var NUMBERS_FIELDSET = document.querySelector('.notice__form').getElementsByTagName('FIELDSET').length;

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

  var offerTypePrice = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000,
  };

  // Все поля формы при открытии страницы недоступны, disabled
  var disableFieldset = function () {
    for (var i = 0; i < NUMBERS_FIELDSET; i++) {
      form.querySelectorAll('fieldset')[i].disabled = true;
    }
  };
  disableFieldset();

  // Функция - изменение времени выезда при изменении времени въезда
  var onSincTimeIn = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };

  // Функция - изменение времени въезда при изменении времени выезда
  var onSincTimeOut = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  // Функция - изменение мин.стоимости при изменении типа жилья
  var onSincPrice = function () {
    priceHome.min = offerTypePrice[typeHome.value];
  };

  // Функция - изменение количества гостей при изменении количества комнат
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

  // Вставка адреса (временно)
  address.value = 'Адрес';

  // Валидация цены
  var onInvalidPrice = function () {
    addBorderColor(priceHome);
    if (priceHome.validity.rangeUnderflow) {
      priceHome.setCustomValidity('Стоимость жилья должна быть не менее ' + offerTypePrice[typeHome.value] + ' руб');
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

  window.form = {
    activateForm: function () {
      form.classList.remove('notice__form--disabled');
    },
    // Все поля формы становятся доступными
    ableFieldset: function () {
      for (var i = 0; i < NUMBERS_FIELDSET; i++) {
        form.querySelectorAll('fieldset')[i].disabled = false;
      }
    }
  };
})();
