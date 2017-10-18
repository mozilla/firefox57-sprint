class GooleMapsMap {
  constructor(apiUrl, events, getCountryCode, options) {
    this.events = events;
    this.GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    // add google vendor scripts
    this.loadJS(apiUrl);
    // spread sheet keys
    this.CITY_KEY = 'City';
    this.COUNTRY_KEY = 'Country';
    this.LAT_KEY = 'Lat';
    this.LNG_KEY = 'Lng';
    this.REGISTRATION_KEY = 'RegistrationLink';
    this.HOST_KEY = 'FullName';
    this.DATE_KEY = 'Date';
    this.MARKER_ICON = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C6FB8D8';
    this.getCountryCode = ffQSprint.getCountryCode;
    this.linkCountry = options.hasContainerEventList;
    this.hasEventDetail = options.hasContainerEventDetail;
    this.markers = [];
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
      //styles: this.getStyles(),
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
        date: event[this.DATE_KEY],
        country: event[this.COUNTRY_KEY],
        city: event[this.CITY_KEY],
        host: event[this.HOST_KEY],
        link: event[this.REGISTRATION_KEY],
        icon: this.MARKER_ICON,
      });
      marker.setMap(googleMapsMap);
      if (this.linkCountry) {
        google.maps.event.addListener(marker, 'click', () => {
          const coutryId = this.getCountryCode(marker.country);
          window.location.hash = coutryId;
        });
      }
      
      this.markers.push(marker);

      if (this.hasEventDetail) {
        google.maps.event.addListener(marker, 'click', () => {
          document.querySelector('.event-detail').classList.remove('hidden');
          document.querySelector('.event-details-no-selected').classList.add('hidden');
          document.querySelector('#event-date').textContent = marker.date;
          document.querySelector('#event-city').textContent = marker.city;
          document.querySelector('#event-country').textContent = marker.country;
          document.querySelector('#event-host').textContent = marker.host;
          document.querySelector('#event-link').href = marker.link;
        });
      }
    });
    
    // Add a marker clusterer to manage the markers.
    const markerCluster = new MarkerClusterer(googleMapsMap, this.markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  }

  //ffQSprint.getStyles () //call to map.getStyles.js
}
