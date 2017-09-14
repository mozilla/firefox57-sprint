
const API_KEY = 'AIzaSyCtHdTVnmaA1ZQ-1wdaKoVEBtlTT020yXQ';
const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=mapCallback`;

class Map {
  constructor(apiUrl) {
    console.log('here');
    this.loadJS(apiUrl);
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
    
    const map = new google.maps.Map(document.querySelector('.map'), {
      zoom,
      center: new google.maps.LatLng(position.lat, position.lng),
      mapTypeId: 'roadmap'
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
      parking: {
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        icon: iconBase + 'library_maps.png'
      },
      info: {
        icon: iconBase + 'info-i_maps.png'
      }
    };

    var features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.22630),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91539, 151.22820),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91910, 151.22907),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91790, 151.23463),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.916988, 151.233640),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: 'library'
      }
    ];

    // Create markers.
    features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });
  }
}

const map = new Map(API_URL);
function mapCallback() {
  map.initMap();
}  
