---
layout: page
title: REGISTER
---

Find a site near you!

<div class="row map-sites">
{% for country in site.data.sites %}
  <div class="col-lg-3 col-sm-4 col-xs-6">
  <i class="mg mg-5x map-{{ country[1][0].countryCode | downcase }}"></i>
  <hr >
  <h4>{{ country[0] }}</h4>
  {% for host in country[1] %}
    {% if host.linkToTito %}
      <div><a target="_blank" href="{{ host.linkToTito }}">{{ host.siteLocationCity }}, {{ host.siteLocationStateProvince}}</a></div>
    {% endif %}
  {% endfor %}
  </div>
{% endfor %}

</div>