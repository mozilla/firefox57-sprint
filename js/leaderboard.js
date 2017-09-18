(function() {
  'use strict';

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ddte9oFxtIIp9AzWe9oGwBIscokjvKoFx6WvAiQmznY/pubhtml';

  var leaderboardTableBody = document.querySelector('#leaderboard tbody');

  function initTabletop() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: processInfo,
      simpleSheet: true
    });
  }

  function processInfo(data, tabletop) {
    var groupedByNickname = groupByNickname(data);

    document.querySelector('#loading').classList.add('hidden');
    document.querySelector('#no-results').classList.remove('hidden');

    Object.keys(groupedByNickname).forEach(function(name) {
      var row = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.textContent = name;
      row.appendChild(nameCell);

      var totalCell = document.createElement('td');
      totalCell.textContent = groupedByNickname[name];
      row.appendChild(totalCell);

      leaderboardTableBody.appendChild(row);
      document.querySelector('#leaderboard').classList.remove('hidden');
    });
  }

  function groupByNickname(entries) {
    var result = {};

    entries.map(function(entry) {
      if (result[entry.Nickname]) {
        result[entry.Nickname]++;
      } else {
        result[entry.Nickname] = 1;
      }
    });

    return result;
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();
