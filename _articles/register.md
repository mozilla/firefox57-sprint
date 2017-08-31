---
layout: page
title: REGISTER
---

<link href="https://s3.amazonaws.com/mozillascience/mapglyphs/mapglyphs.css" rel="stylesheet">

<a class="btn btn-lg btn-default btn-next btn-xs-full" href="https://docs.google.com/forms/d/e/1FAIpQLSdcae57eJpqnFEPHwe4HjIzuvpe1RoRzsibH3vY4gmSikFxaA/viewform" target="_blank">Register your own event &nbsp;&nbsp;<i class="fa fa-play" aria-hidden="true"></i></a>

<h3>Find events near you!</h3>
<p>The events currently listed are all test data, we are working on changing this. Until then, you can still register your own event!</p>

<iframe width="100%" height="520" frameborder="0" src="https://www.google.com/maps/d/u/0/embed?mid=1AaL9Hv0VroENQOEjIY2aYPhCKic&zoom=14" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

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