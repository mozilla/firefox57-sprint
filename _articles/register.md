---
layout: page
title: REGISTER
---

<link href="https://s3.amazonaws.com/mozillascience/mapglyphs/mapglyphs.css" rel="stylesheet">

<a class="btn btn-lg btn-default btn-next btn-xs-full" href="https://docs.google.com/forms/d/e/1FAIpQLSdcae57eJpqnFEPHwe4HjIzuvpe1RoRzsibH3vY4gmSikFxaA/viewform" target="_blank">Register your own event &nbsp;&nbsp;<i class="fa fa-play" aria-hidden="true"></i></a>

<h3>Find events near you!</h3>
<p>The events currently listed are all test data, we are working on changing this. Until then, you can still register your own event!</p>

<div class="map">
  <!--  map -->
</div>

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

<script src="{{ site.baseurl }}/js/map.js"></script>