class GooleMapsMap {
  constructor(apiUrl, events) {
    this.loadJS(apiUrl);
    this.events = events;
    this.GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    // spread sheet keys
    this.CITY_KEY = 'City';
    this.COUNTRY_KEY = 'Country';
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
    
    const googleMapsMap = new google.maps.Map(document.querySelector('.map'), {
      zoom,
      center: new google.maps.LatLng(position.lat, position.lng),
      mapTypeId: 'roadmap',
      styles: this.getStyles()
    });

    this.events.forEach((event) => {
      this.getPosition(event[this.COUNTRY_KEY], event[this.CITY_KEY]).then((response) => {
        return response.json();
      }).then((result) => {
        const position = result.results[0].geometry.location;
        console.log(this.getStyles());
        let marker = new google.maps.Marker({
          position: position,
          map: googleMapsMap
        });
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
                  "color": "#6FB8D8"
              },
              {
                  "visibility": "on"
              }
          ]
      }
    ];
  }
}
