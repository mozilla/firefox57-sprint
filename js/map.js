'use strict';

var _createClass = function () { 
    function defineProperties(target, props) { 
        for (var i = 0; i < props.length; i++) { 
            var descriptor = props[i]; 
                descriptor.enumerable = descriptor.enumerable || false; 
                descriptor.configurable = true; 
            if ("value" in descriptor) 
                descriptor.writable = true; 
            Object.defineProperty(target, descriptor.key, descriptor); 
        } 
    } 
    return function (Constructor, protoProps, staticProps) { 
        if (protoProps) 
            defineProperties(Constructor.prototype, protoProps); 
        if (staticProps) defineProperties(Constructor, staticProps); 
            return Constructor; 
    }; 
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var GooleMapsMap = function () {
    function GooleMapsMap(apiUrl, events, getCountryCode, options) {
        _classCallCheck(this, GooleMapsMap);

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
        this.getCountryCode = getCountryCode;
        this.linkCountry = options.hasContainerEventList;
        this.hasEventDetail = options.hasContainerEventDetail;
        this.markers = [];
    }

    _createClass(GooleMapsMap, [{
        key: 'loadJS',
        value: function loadJS(file) {
            var jsElement = document.createElement("script");
            jsElement.type = "application/javascript";
            jsElement.src = file;
            document.body.appendChild(jsElement);
        }
    }, {
        key: 'initMap',
        value: function initMap() {
            var _this = this;

            var zoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var defaultPosition = { lat: 18.4856271, lng: 0 };
            Object.assign(position, defaultPosition);

            var googleMapsMap = new google.maps.Map(document.querySelector('.map-canvas'), {
                zoom: zoom,
                center: new google.maps.LatLng(position.lat, position.lng),
                mapTypeId: 'roadmap'
                //styles: this.getStyles(),
            });

            this.events.forEach(function (event) {
                var eventPosition = {
                    lat: parseFloat(event[_this.LAT_KEY]),
                    lng: parseFloat(event[_this.LNG_KEY])
                };

                if (eventPosition == { lat: 0, lng: 0 }) {
                    console.error('Position not found ' + event);
                    return;
                }

                var marker = new google.maps.Marker({
                    position: eventPosition,
                    date: event[_this.DATE_KEY],
                    country: event[_this.COUNTRY_KEY],
                    city: event[_this.CITY_KEY],
                    host: event[_this.HOST_KEY],
                    link: event[_this.REGISTRATION_KEY],
                    icon: _this.MARKER_ICON
                });
                marker.setMap(googleMapsMap);
                if (_this.linkCountry) {
                    google.maps.event.addListener(marker, 'click', function () {
                        var coutryId = _this.getCountryCode(marker.country);
                        window.location.hash = coutryId;
                    });
                }

                _this.markers.push(marker);

                if (_this.hasEventDetail) {
                    google.maps.event.addListener(marker, 'click', function () {
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
            var markerCluster = new MarkerClusterer(googleMapsMap, this.markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        }
    }, {
        key: 'getStyles',
        value: ffQSprint.getStyles ()
    }]);

    return GooleMapsMap;
}();