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
    groupedByNickname.sort(sortByAmount);

    document.querySelector('#loading').classList.add('hidden');

    if (groupedByNickname.length === 0) {
      document.querySelector('#no-results').classList.remove('hidden');
    }

    groupedByNickname.forEach(function(entry) {
      var row = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.textContent = entry.name;
      row.appendChild(nameCell);

      var totalCell = document.createElement('td');
      totalCell.textContent = entry.amount;
      row.appendChild(totalCell);

      leaderboardTableBody.appendChild(row);
      document.querySelector('#leaderboard').classList.remove('hidden');
    });
  }

  function groupByNickname(entries) {
    var result = [];

    entries.forEach(function(entry) {
      const existingNicknameEntry = result.find(function(existingEntry) {
        return existingEntry.name === entry.Nickname;
      });

      if (existingNicknameEntry) {
        return existingNicknameEntry.amount++;
      }

      const newNicknameEntry = {
        name: entry.Nickname,
        amount: 1
      };

      result.push(newNicknameEntry);
    });

    return result;
  }

  function sortByAmount(a, b) {
    if (a.amount > b.amount) { return -1; }
    if (a.amount < b.amount) { return 1; }

    return 0;
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();
