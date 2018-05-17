'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _marker = require('../../templates/marker');

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import L from 'leaflet';
var L = _leaflet2.default || window.L;

var POPUP_CL = {
  DF: '',
  WHITE: 'popup--white',
  SAND: 'popup--sand'
};

var _crPopupOptions = function _crPopupOptions(themeName) {
  return {
    className: POPUP_CL[themeName] || POPUP_CL.DF
  };
};

var DF = {
  //LAT: 48,
  LAT: 50,
  //LAT: 10,
  LNG: 0
};

var fnLeaflet = {
  createMap: function createMap(id) {
    var map = L.map(id, { zoomControl: true }).setView([DF.LAT, DF.LNG], 5);
    map.zoomControl.setPosition('bottomright');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'addis',
      attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);
    return map;
  },

  addMarker: function addMarker() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var themeName = arguments[1];
    var map = arguments[2];

    var icon = L.divIcon({ html: _marker2.default.fDivIcon(w) });
    var _w$coord = w.coord,
        coord = _w$coord === undefined ? {} : _w$coord;
    var lat = coord.lat,
        lon = coord.lon;

    if (lat && lon) {
      L.marker([lat, lon], {
        icon: icon,
        title: w.name,
        alt: w.name
      }).bindPopup(_marker2.default.fPopup(w), _crPopupOptions(themeName)).addTo(map);
    }
  }
};

exports.default = fnLeaflet;
//# sourceMappingURL=fnLeaflet.js.map