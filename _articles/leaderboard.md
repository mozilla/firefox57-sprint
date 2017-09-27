---
layout: simple
title: "Leaderboard"
---

# Be proud of your progress

<div class="content-box">
  <h3 class="content-title content-title--uppercase">
    <span class="title-frame"></span>
    Leaderboard
    <span class="title-frame title-frame--rotate-180"></span>
  </h3> 

  <table id="leaderboard" class="hidden">
    <thead>
      <tr>
        <th>Nickname</th>
        <th>Number of tested sites</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <p id="loading">Loading...</p>
  <p id="no-results" class="hidden">There are currently no reports.</p>
</div>

<script src='https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js'></script>
<script src="{{ site.baseurl }}/js/leaderboard.js"></script>