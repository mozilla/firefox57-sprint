let map;

(function() {
  'use strict';
  const API_KEY = 'AIzaSyCtHdTVnmaA1ZQ-1wdaKoVEBtlTT020yXQ';
  const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=mapCallback`;

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11W6MYoIIJDTJz0LL_P9WzHqT-EXpv9Bih6dlFLdAnfA/edit?usp=sharing';

  function initTabletop() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: processData,
      simpleSheet: true
    });
  }

  function processData(events) {
    addEventList(events);
    drawMap(events);
  }

  function drawMap(events) {
    map = new GooleMapsMap(API_URL, events);
  }

  function addEventList(events) {
    var groupedByCountry = groupByCountry(events);
    const container = document.querySelector('.map-sites');

    for (var country in groupedByCountry) {
      var countryContainer = document.createElement('div');
      countryContainer.classList.add('col-lg-3', 'col-sm-4', 'col-xs-6');

      var countryCode = 'de'; // FIXME: needs to be dynamic
      var icon = document.createElement('i');
      icon.classList.add('mg', 'mg-5x');
      icon.classList.add('map-' + countryCode);
      countryContainer.appendChild(icon);

      var divider = document.createElement('hr');
      countryContainer.appendChild(divider);

      var countryName = document.createElement('h4');
      countryName.textContent = country;
      countryContainer.appendChild(countryName);

      for (var event of groupedByCountry[country]) {
        var eventLinkContainer = document.createElement('div');

        var eventLink = document.createElement('a');
        eventLink.target = '_blank';
        eventLink.href = event.RegistrationLink;
        eventLink.textContent = event.City;

        eventLinkContainer.appendChild(eventLink);
        countryContainer.appendChild(eventLinkContainer);
      }

      container.appendChild(countryContainer);
    }
  }

  function groupByCountry(events) {
    return events.reduce(function (countries, event) {
      var country = event.Country;

      if (countries[country]) {
        countries[country].push(event);
      } else {
        countries[country] = [event];
      }

      return countries;
    }, {});
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();

function mapCallback() {
  map.initMap();
}  
