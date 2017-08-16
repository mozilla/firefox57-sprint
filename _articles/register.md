---
layout: page
title: REGISTER
---

<link href="https://s3.amazonaws.com/mozillascience/mapglyphs/mapglyphs.css" rel="stylesheet">

<div class="row map-sites">
{% for country in site.data.events %}
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
{% endfor %}
</div>