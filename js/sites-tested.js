(function() {
  'use strict';

  var END_DATE = new Date('2017-10-01');
  var today = new Date();
  var distance = END_DATE - today;
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ddte9oFxtIIp9AzWe9oGwBIscokjvKoFx6WvAiQmznY/pubhtml';

  // Only show sites tested while sprint is going on
  if (distance > 0) {
    return;
  }

  var sitesTestedElement = document.querySelector('.sites-tested');

  function initTabletop() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: processInfo,
      simpleSheet: true
    });
  }

  function processInfo(data, tabletop) {
    var testedSites = filterDuplicates(data);
    var uniqueTestedSites = getUnique(testedSites);
    var totalSitesTested = uniqueTestedSites.length;
    sitesTestedElement.textContent = totalSitesTested + ' sites tested already!';
    sitesTestedElement.classList.remove('hidden');
  }

  function filterDuplicates(entries) {
    return entries
      .map(mapDomainOnly)
      .filter(function(entry) { return entry; });
  }

  function mapDomainOnly(entry) {
    return entry.SiteTested
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '');
  }

  function getUnique(entries) {
    var result = [];

    entries.map(function(entry) {
      if (!result.includes(entry)) {
        result.push(entry);
      }
    });

    return result;
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();
