var map;

(function() {
  'use strict';

  var API_KEY = 'AIzaSyDziLuMxVaWGuE4BVh-gxvuY9y7evusUx0',
      RANGE = 'A2:I',
      SPREADSHEET_ID = '11W6MYoIIJDTJz0LL_P9WzHqT-EXpv9Bih6dlFLdAnfA',
      publicEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/' + RANGE + '?key=' + API_KEY;
  const API_KEY_MAPS = 'AIzaSyCtHdTVnmaA1ZQ-1wdaKoVEBtlTT020yXQ',
        API_URL = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY_MAPS + '&callback=mapCallback';

  function getData() {
    fetch(publicEndpoint).then(function (result) {
		return result.json();
		}).then(function (result) {
			var data = result.values.map(function (entry) {
				return {
            Country: entry[1],
            City: entry[2],
            Date: entry[3],
            RegistrationLink: entry[4],
            FullName: entry[5],
            Lat: entry[7],
            Lng: entry[8]
          };
        }).filter(function (entry) {
          return entry.Country;
        });

        processData(data);
      });
  }

  function processData(events) {
    addEventList(events);
    drawMap(events);
  }

  function drawMap(events) {
    const hasContainerEventList = !!document.querySelector('.map-sites'),
	      hasContainerEventDetail = !!document.querySelector('.event-details');
    map = new GooleMapsMap(API_URL, events, getCountryCode, {
      hasContainerEventList: hasContainerEventList,
      hasContainerEventDetail: hasContainerEventDetail
    });
  }

  function addEventList(events) {
    const container = document.querySelector('.map-sites');
    if (!container) {
      return;
    }

    var groupedByCountry = groupByCountry(events);
    groupedByCountry.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

    const loading = document.querySelector('.loading');

    if (loading) {
      loading.parentNode.removeChild(loading);
    }

    for (var country of groupedByCountry) {
      var countryContainer = document.createElement('div'),
     	  countryCode = getCountryCode(country.name);

      countryContainer.classList.add('col-country', 'col-lg-3', 'col-sm-4', 'col-xs-6');
      countryContainer.id = countryCode;

      var icon = document.createElement('i');
      icon.classList.add('mg', 'mg-5x');
      icon.classList.add('map-' + countryCode);
      countryContainer.appendChild(icon);

      var divider = document.createElement('hr');
      countryContainer.appendChild(divider);

      var countryName = document.createElement('h4');
      countryName.textContent = country.name;
      countryContainer.appendChild(countryName);

      country.events.sort(function(a, b) {
        if (a.City < b.City) {
          return -1;
        }

        if (a.City > b.City) {
          return 1;
        }

        return 0;
      });

      for (var event of country.events) {
        var eventLinkContainer = document.createElement('div');

        var eventLink = document.createElement('a');
        eventLink.target = '_blank';
        eventLink.href = event.RegistrationLink;
        eventLink.textContent = event.City;

        eventLinkContainer.appendChild(eventLink);
        countryContainer.appendChild(eventLinkContainer);
      }

      container.appendChild(countryContainer);
    }
  }

  function groupByCountry(events) {
    return events.reduce(function (countries, event) {
      var country = countries.find(function(country) {
        return country.name === event.Country;
      });

      if (country) {
        country.events.push(event);
      } else {
        country = {
          name: event.Country,
          events: [event]
        };

        countries.push(country);
      }

      return countries;
    }, []);
  }

  //getCountryCode was here

  window.addEventListener('DOMContentLoaded', getData);
})();

function mapCallback() {
  map.initMap();
}
