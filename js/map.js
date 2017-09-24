class GooleMapsMap {
  constructor(apiUrl, events, getCountryCode, options) {
    this.loadJS(apiUrl);
    this.events = events;
    this.GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    // spread sheet keys
    this.CITY_KEY = 'City';
    this.COUNTRY_KEY = 'Country';
    this.REGISTRATION_KEY = 'RegistrationLink';
    this.HOST_KEY = 'FullName';
    this.DATE_KEY = 'Date';
    this.getCountryCode = getCountryCode;
    this.linkCountry = options.hasContainerEventList;
    this.hasEventDetail = options.hasContainerEventDetail;
  }

  loadJS(file) {
    const jsElement = document.createElement("script");
    jsElement.type = "application/javascript";
    jsElement.src = file;
    document.body.appendChild(jsElement);
  }

  initMap(zoom = 2, position = {}) {
    const defaultPosition = {lat: 18.4856271, lng:0};
    Object.assign(position, defaultPosition);

    const googleMapsMap = new google.maps.Map(document.querySelector('.map-canvas'), {
      zoom,
      center: new google.maps.LatLng(position.lat, position.lng),
      mapTypeId: 'roadmap',
    });

    this.events.forEach((event) => {
      this.getPosition(event[this.COUNTRY_KEY], event[this.CITY_KEY]).then((response) => {
        return response.json();
      }).then((result) => {
        if (result.results.length === 0) {
          return;
        }

        const position = result.results[0].geometry.location;
        const marker = new google.maps.Marker({
          position: position,
          date: event[this.DATE_KEY],
          country: event[this.COUNTRY_KEY],
          city: event[this.CITY_KEY],
          host: event[this.HOST_KEY],
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C6FB8D8'
        });
        marker.setMap(googleMapsMap);
        if (this.linkCountry) {
          google.maps.event.addListener(marker, 'click', () => {
            const coutryId = this.getCountryCode(marker.country);
            window.location.hash = coutryId;
          });
        }

        if (this.hasEventDetail) {
          google.maps.event.addListener(marker, 'click', () => {
            document.querySelector('.event-detail').classList.remove('hidden');
            document.querySelector('.event-details-no-selected').classList.add('hidden');
            document.querySelector('#event-date').textContent = marker.date;
            document.querySelector('#event-city').textContent = marker.city;
            document.querySelector('#event-country').textContent = marker.country;
            document.querySelector('#event-host').textContent = marker.host;
          });
        }
      });
    });
  }

  getPosition(country, city) {
    return fetch(this.GEOCODE_API + `${city},${country}`);
  }

  getStyles() {
    return [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
              }
          ]
      }
    ];
  }
}
