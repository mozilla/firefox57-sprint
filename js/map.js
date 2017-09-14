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
      mapTypeId: 'roadmap'
    });

    this.events.forEach((event) => {
      this.getPosition(event[this.COUNTRY_KEY], event[this.CITY_KEY]).then((response) => {
        return response.json();
      }).then((result) => {
        const position = result.results[0].geometry.location;
        var marker = new google.maps.Marker({
          position: position,
          map: googleMapsMap
        });
      });
    });
  }
  
  getPosition(country, city) {
    return fetch(this.GEOCODE_API + `${city},${country}`);
  }
}
