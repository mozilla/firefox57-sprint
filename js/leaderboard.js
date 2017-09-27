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
    groupedByNickname.sort(sortByScore);

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
      totalCell.innerHTML = entry.amount + '<span class="sites">sites</span>';
      row.appendChild(totalCell);

      var issuesCell = document.createElement('td');
      issuesCell.innerHTML = entry.issues + '<span class="issues">issues</span>';
      row.appendChild(issuesCell);

      var scoreCell = document.createElement('td');
      scoreCell.innerHTML = entry.score + '<span class="score">score</span>';
      row.appendChild(scoreCell);

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
        existingNicknameEntry.amount++;
        existingNicknameEntry.issues = entry.IssueFound === 'Yes' ?
          existingNicknameEntry.issues + 1 :
          existingNicknameEntry.issues;
        existingNicknameEntry.score = existingNicknameEntry.amount + 3 * existingNicknameEntry.issues;
        return;
      }

      console.log(entry);
      const newNicknameEntry = {
        name: entry.Nickname,
        amount: 1,
        issues: entry.IssueFound === 'Yes' ? 1 : 0,
        score: 1 + (entry.IssueFound === 'Yes' ? 3 * 1 : 0)
      };

      result.push(newNicknameEntry);
    });

    return result;
  }

  function sortByScore(a, b) {
    if (a.score > b.score) { return -1; }
    if (a.score < b.score) { return 1; }

    return 0;
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();
