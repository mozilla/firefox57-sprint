(function() {
  'use strict';

  var END_DATE = new Date('2017-10-01');
  var today = new Date();
  var distance = END_DATE - today;
  var API_KEY = 'AIzaSyDziLuMxVaWGuE4BVh-gxvuY9y7evusUx0';
  var RANGE = 'A2:E';
  var SPREADSHEET_ID = '1ddte9oFxtIIp9AzWe9oGwBIscokjvKoFx6WvAiQmznY';
  var publicEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID +
    '/values/' + RANGE + '?key=' + API_KEY;

  // Only show sites tested while sprint is going on
  if (distance > 0) {
    return;
  }

  var sitesTestedElement = document.querySelector('.sites-tested');

  function getData() {
    fetch(publicEndpoint)
    .then(function(result) {
      return result.json();
    }).then(function(result) {
      var data = result.values.map(function(entry) {
        return {
          Nickname: entry[1],
          SiteTested: entry[2],
          IssueFound: entry[3],
          IssueLink: entry[4]
        };
      }).filter(function(entry) {
        return entry.Nickname;
      });

      processInfo(data);
    });
  }

  function processInfo(data) {
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

  window.addEventListener('DOMContentLoaded', getData);
})();
