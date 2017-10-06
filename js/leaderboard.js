(function() {
  'use strict';

  var API_KEY = 'AIzaSyDziLuMxVaWGuE4BVh-gxvuY9y7evusUx0';
  var RANGE = 'A2:E';
  var SPREADSHEET_ID = '1ddte9oFxtIIp9AzWe9oGwBIscokjvKoFx6WvAiQmznY';
  var publicEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID +
    '/values/' + RANGE + '?key=' + API_KEY;

  var leaderboardTableBody = document.querySelector('#leaderboard tbody');

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
    var groupedByNickname = groupByNickname(data);
    groupedByNickname.sort(sortByName);

    document.querySelector('#loading').classList.add('hidden');

    if (groupedByNickname.length === 0) {
      document.querySelector('#no-results').classList.remove('hidden');
    }

    console.log('groupedByNickname', groupedByNickname);

    groupedByNickname.forEach(function(entry) {
      var row = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.textContent = entry.name;
      row.appendChild(nameCell);

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
        // only count the same domain once
        const existingDomain = existingNicknameEntry.entries.find((existingEntry) => {
          return entry.SiteTested == existingEntry.SiteTested;
        });

        if (existingDomain) {
          return;
        }

        existingNicknameEntry.amount++;
        existingNicknameEntry.issues =
          entry.IssueFound === 'Yes' ?
          existingNicknameEntry.issues + 1 :
          existingNicknameEntry.issues;
        existingNicknameEntry.score = existingNicknameEntry.amount + 3 * existingNicknameEntry.issues;
        existingNicknameEntry.entries.push(entry);
        return;
      }

      const newNicknameEntry = {
        name: entry.Nickname,
        amount: 1,
        issues: entry.IssueFound === 'Yes' ? 1 : 0,
        score: 1 + (entry.IssueFound === 'Yes' ? 3 * 1 : 0),
        entries: [entry],
      };

      result.push(newNicknameEntry);
    });

    return result;
  }

  function sortByName(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }

    return 0;
  }

  window.addEventListener('DOMContentLoaded', getData);
})();
