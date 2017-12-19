'use strict';

(function () {
  // Часть шаблона - карточка
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var offerTypeTranslate = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  // Получение удобств
  var getFeatureElements = function (features) {
    var featureElements = '';
    for (var i = 0; i <= features.length - 1; i++) {
      featureElements += '<li class="feature feature--' + features[i] + '"></li>';
    }
    return featureElements;
  };

  var getPhotoElements = function (elem) {
    return '<li><img src="' + elem + '" width="40" height="40"></li>';
  };

  // Формирование карточки
  window.card = {
    renderAd: function (ad) {
      var mapCardElement = mapCardTemplate.cloneNode(true);
      var mapCardGallery = mapCardElement.querySelector('.popup__pictures');

      mapCardElement.querySelector('h3').textContent = ad.offer.title;
      mapCardElement.querySelector('small').textContent = ad.offer.address;
      mapCardElement.querySelector('.popup__price').innerHTML = ad.offer.price + ' &#x20bd;/ночь';
      mapCardElement.querySelectorAll('p')[2].textContent = ad.offer.rooms + ' комнаты' + ' для ' + ad.offer.guests + ' гостей';
      mapCardElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      mapCardElement.querySelectorAll('p')[4].textContent = ad.offer.description;
      mapCardElement.querySelector('h4').textContent = offerTypeTranslate[ad.offer.type];
      mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;
      mapCardElement.querySelector('.popup__features').innerHTML = getFeatureElements(ad.offer.features);
      mapCardGallery.innerHTML = '';
      mapCardGallery.insertAdjacentHTML('afterBegin', ad.offer.photos.map(getPhotoElements).join(' '));
      mapCardElement.appendChild(mapCardGallery);

      return mapCardElement;
    }
  };
})();
