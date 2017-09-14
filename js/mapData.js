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
    const container = document.querySelector('.map-sites');

    /**{% for country in site.data.events %}
    <div class="col-lg-3 col-sm-4 col-xs-6">
    <i class="mg mg-5x map-{{ country[1][0].locationCountryCode | downcase }}"></i>
    <hr >
    <h4>{{ country[0] }}</h4>
    {% for event in country[1] %}
      {% if event.signupLink %}
        <div><a target="_blank" href="{{ event.signupLink }}">{{ event.locationName }}, {{ event.locationCity }}</a></div>
      {% endif %}
    {% endfor %}
    </div>
  {% endfor %}*/
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();

function mapCallback() {
  map.initMap();
}  
