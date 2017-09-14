(function() {
  'use strict';

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11W6MYoIIJDTJz0LL_P9WzHqT-EXpv9Bih6dlFLdAnfA/edit?usp=sharing';

  function initTabletop() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: drawMap,
      simpleSheet: true
    });
  }

  function drawMap(data) {
    console.log('look, your data is here', data);
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();
