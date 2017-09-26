class GooleMapsMap {
  constructor(apiUrl, events, getCountryCode, linkCountry) {
    this.loadJS(apiUrl);
    this.events = events;
    this.GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    // spread sheet keys
    this.CITY_KEY = 'City';
    this.COUNTRY_KEY = 'Country';
    this.LAT_KEY = 'Lat';
    this.LNG_KEY = 'Lng';
    this.REGISTRATION_KEY = 'RegistrationLink';
    this.MARKER_ICON = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C6FB8D8';
    this.getCountryCode = getCountryCode;
    this.linkCountry = linkCountry;
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
      const eventPosition = { 
        lat: parseFloat(event[this.LAT_KEY]), 
        lng: parseFloat(event[this.LNG_KEY]),
      };
      
      if (eventPosition == { lat: 0, lng:0 }) {
        console.error(`Position not found ${event}`);
        return;
      }

      const marker = new google.maps.Marker({
        position: eventPosition,
        country: event[this.COUNTRY_KEY],
        icon: this.MARKER_ICON,
      });
      marker.setMap(googleMapsMap);
      if (this.linkCountry) {
        google.maps.event.addListener(marker, 'click', () => {
          const coutryId = this.getCountryCode(marker.country);
          window.location.hash = coutryId;
        });
      }
    });
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
