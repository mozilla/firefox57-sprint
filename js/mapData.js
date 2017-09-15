let map;

(function() {
  'use strict';
  const API_KEY = 'AIzaSyCtHdTVnmaA1ZQ-1wdaKoVEBtlTT020yXQ';
  const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=mapCallback`;

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11W6MYoIIJDTJz0LL_P9WzHqT-EXpv9Bih6dlFLdAnfA/edit?usp=sharing';

  function initTabletop() {
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: processData,
      simpleSheet: true
    });
  }

  function processData(events) {
    addEventList(events);
    drawMap(events);
  }

  function drawMap(events) {
    const hasContainer = !!document.querySelector('.map-sites');
    map = new GooleMapsMap(API_URL, events, getCountryCode, hasContainer);
  }

  function addEventList(events) {
    const container = document.querySelector('.map-sites');
    if (!container) {
      return;
    }

    var groupedByCountry = groupByCountry(events);
    groupedByCountry.sort(function(a, b) {
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
      var countryContainer = document.createElement('div');
      var countryCode = getCountryCode(country.name);

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

  function getCountryCode(countryName) {
    var isoCountries = {
      'Afghanistan': 'AF',
      'Aland Islands': 'AX',
      'Albania': 'AL',
      'Algeria': 'DZ',
      'American Samoa': 'AS',
      'Andorra': 'AD',
      'Angola': 'AO',
      'Anguilla': 'AI',
      'Antarctica': 'AQ',
      'Antigua And Barbuda': 'AG',
      'Argentina': 'AR',
      'Armenia': 'AM',
      'Aruba': 'AW',
      'Australia': 'AU',
      'Austria': 'AT',
      'Azerbaijan': 'AZ',
      'Bahamas': 'BS',
      'Bahrain': 'BH',
      'Bangladesh': 'BD',
      'Barbados': 'BB',
      'Belarus': 'BY',
      'Belgium': 'BE',
      'Belize': 'BZ',
      'Benin': 'BJ',
      'Bermuda': 'BM',
      'Bhutan': 'BT',
      'Bolivia': 'BO',
      'Bosnia And Herzegovina': 'BA',
      'Botswana': 'BW',
      'Bouvet Island': 'BV',
      'Brazil': 'BR',
      'British Indian Ocean Territory': 'IO',
      'Brunei Darussalam': 'BN',
      'Bulgaria': 'BG',
      'Burkina Faso': 'BF',
      'Burundi': 'BI',
      'Cambodia': 'KH',
      'Cameroon': 'CM',
      'Canada': 'CA',
      'Cape Verde': 'CV',
      'Cayman Islands': 'KY',
      'Central African Republic': 'CF',
      'Chad': 'TD',
      'Chile': 'CL',
      'China': 'CN',
      'Christmas Island': 'CX',
      'Cocos (Keeling) Islands': 'CC',
      'Colombia': 'CO',
      'Comoros': 'KM',
      'Congo': 'CG',
      'Congo, Democratic Republic': 'CD',
      'Cook Islands': 'CK',
      'Costa Rica': 'CR',
      'Cote D\'Ivoire': 'CI',
      'Croatia': 'HR',
      'Cuba': 'CU',
      'Cyprus': 'CY',
      'Czech Republic': 'CZ',
      'Denmark': 'DK',
      'Djibouti': 'DJ',
      'Dominica': 'DM',
      'Dominican Republic': 'DO',
      'Ecuador': 'EC',
      'Egypt': 'EG',
      'El Salvador': 'SV',
      'Equatorial Guinea': 'GQ',
      'Eritrea': 'ER',
      'Estonia': 'EE',
      'Ethiopia': 'ET',
      'Falkland Islands': 'FK',
      'Faroe Islands': 'FO',
      'Fiji': 'FJ',
      'Finland': 'FI',
      'France': 'FR',
      'French Guiana': 'GF',
      'French Polynesia': 'PF',
      'French Southern Territories': 'TF',
      'Gabon': 'GA',
      'Gambia': 'GM',
      'Georgia': 'GE',
      'Germany': 'DE',
      'Ghana': 'GH',
      'Gibraltar': 'GI',
      'Greece': 'GR',
      'Greenland': 'GL',
      'Grenada': 'GD',
      'Guadeloupe': 'GP',
      'Guam': 'GU',
      'Guatemala': 'GT',
      'Guernsey': 'GG',
      'Guinea': 'GN',
      'Guinea-Bissau': 'GW',
      'Guyana': 'GY',
      'Haiti': 'HT',
      'Heard Island & Mcdonald Islands': 'HM',
      'Holy See (Vatican City State)': 'VA',
      'Honduras': 'HN',
      'Hong Kong': 'HK',
      'Hungary': 'HU',
      'Iceland': 'IS',
      'India': 'IN',
      'Indonesia': 'ID',
      'Iran, Islamic Republic Of': 'IR',
      'Iraq': 'IQ',
      'Ireland': 'IE',
      'Isle Of Man': 'IM',
      'Israel': 'IL',
      'Italy': 'IT',
      'Jamaica': 'JM',
      'Japan': 'JP',
      'Jersey': 'JE',
      'Jordan': 'JO',
      'Kazakhstan': 'KZ',
      'Kenya': 'KE',
      'Kiribati': 'KI',
      'Korea': 'KR',
      'Kuwait': 'KW',
      'Kyrgyzstan': 'KG',
      'Lao People\'s Democratic Republic': 'LA',
      'Latvia': 'LV',
      'Lebanon': 'LB',
      'Lesotho': 'LS',
      'Liberia': 'LR',
      'Libyan Arab Jamahiriya': 'LY',
      'Liechtenstein': 'LI',
      'Lithuania': 'LT',
      'Luxembourg': 'LU',
      'Macao': 'MO',
      'Macedonia': 'MK',
      'Madagascar': 'MG',
      'Malawi': 'MW',
      'Malaysia': 'MY',
      'Maldives': 'MV',
      'Mali': 'ML',
      'Malta': 'MT',
      'Marshall Islands': 'MH',
      'Martinique': 'MQ',
      'Mauritania': 'MR',
      'Mauritius': 'MU',
      'Mayotte': 'YT',
      'Mexico': 'MX',
      'Micronesia, Federated States Of': 'FM',
      'Moldova': 'MD',
      'Monaco': 'MC',
      'Mongolia': 'MN',
      'Montenegro': 'ME',
      'Montserrat': 'MS',
      'Morocco': 'MA',
      'Mozambique': 'MZ',
      'Myanmar': 'MM',
      'Namibia': 'NA',
      'Nauru': 'NR',
      'Nepal': 'NP',
      'Netherlands': 'NL',
      'Netherlands Antilles': 'AN',
      'New Caledonia': 'NC',
      'New Zealand': 'NZ',
      'Nicaragua': 'NI',
      'Niger': 'NE',
      'Nigeria': 'NG',
      'Niue': 'NU',
      'Norfolk Island': 'NF',
      'Northern Mariana Islands': 'MP',
      'Norway': 'NO',
      'Oman': 'OM',
      'Pakistan': 'PK',
      'Palau': 'PW',
      'Palestinian Territory, Occupied': 'PS',
      'Panama': 'PA',
      'Papua New Guinea': 'PG',
      'Paraguay': 'PY',
      'Peru': 'PE',
      'Philippines': 'PH',
      'Pitcairn': 'PN',
      'Poland': 'PL',
      'Portugal': 'PT',
      'Puerto Rico': 'PR',
      'Qatar': 'QA',
      'Reunion': 'RE',
      'Romania': 'RO',
      'Russian Federation': 'RU',
      'Rwanda': 'RW',
      'Saint Barthelemy': 'BL',
      'Saint Helena': 'SH',
      'Saint Kitts And Nevis': 'KN',
      'Saint Lucia': 'LC',
      'Saint Martin': 'MF',
      'Saint Pierre And Miquelon': 'PM',
      'Saint Vincent And Grenadines': 'VC',
      'Samoa': 'WS',
      'San Marino': 'SM',
      'Sao Tome And Principe': 'ST',
      'Saudi Arabia': 'SA',
      'Senegal': 'SN',
      'Serbia': 'RS',
      'Seychelles': 'SC',
      'Sierra Leone': 'SL',
      'Singapore': 'SG',
      'Slovakia': 'SK',
      'Slovenia': 'SI',
      'Solomon Islands': 'SB',
      'Somalia': 'SO',
      'South Africa': 'ZA',
      'South Georgia And Sandwich Isl.': 'GS',
      'Spain': 'ES',
      'Sri Lanka': 'LK',
      'Sudan': 'SD',
      'Suriname': 'SR',
      'Svalbard And Jan Mayen': 'SJ',
      'Swaziland': 'SZ',
      'Sweden': 'SE',
      'Switzerland': 'CH',
      'Syrian Arab Republic': 'SY',
      'Taiwan': 'TW',
      'Tajikistan': 'TJ',
      'Tanzania': 'TZ',
      'Thailand': 'TH',
      'Timor-Leste': 'TL',
      'Togo': 'TG',
      'Tokelau': 'TK',
      'Tonga': 'TO',
      'Trinidad And Tobago': 'TT',
      'Tunisia': 'TN',
      'Turkey': 'TR',
      'Turkmenistan': 'TM',
      'Turks And Caicos Islands': 'TC',
      'Tuvalu': 'TV',
      'Uganda': 'UG',
      'Ukraine': 'UA',
      'United Arab Emirates': 'AE',
      'United Kingdom': 'GB',
      'United States': 'US',
      'United States Outlying Islands': 'UM',
      'Uruguay': 'UY',
      'Uzbekistan': 'UZ',
      'Vanuatu': 'VU',
      'Venezuela': 'VE',
      'Vietnam': 'VN',
      'Virgin Islands, British': 'VG',
      'Virgin Islands, U.S.': 'VI',
      'Wallis And Futuna': 'WF',
      'Western Sahara': 'EH',
      'Yemen': 'YE',
      'Zambia': 'ZM',
      'Zimbabwe': 'ZW'
    };

    return isoCountries[countryName].toLowerCase() || '';
  }

  window.addEventListener('DOMContentLoaded', initTabletop);
})();

function mapCallback() {
  map.initMap();
}
