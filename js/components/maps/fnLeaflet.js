"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _leaflet = _interopRequireDefault(require("leaflet"));

var _marker = _interopRequireDefault(require("../../templates/marker"));

var L = _leaflet["default"] || window.L;
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
  LAT: 50,
  LNG: 0,
  ZOOM: 2
};
var fnLeaflet = {
  createMap: function createMap(id, onLoad) {
    var map = L //.map(id, { zoomControl: true, ...options })
    .map(id, {
      zoomControl: true
    }).on('load', onLoad).setView([DF.LAT, DF.LNG], DF.ZOOM);
    map.zoomControl.setPosition('bottomright');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'addis',
      attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);
    return map;
  },
  addMarker: function addMarker(w, themeName, map) {
    if (w === void 0) {
      w = {};
    }

    var icon = L.divIcon({
      html: _marker["default"].fDivIcon(w)
    });
    var _w = w,
        _w$coord = _w.coord,
        coord = _w$coord === void 0 ? {} : _w$coord;
    var lat = coord.lat,
        lon = coord.lon;

    if (lat && lon) {
      L.marker([lat, lon], {
        icon: icon,
        title: w.name,
        alt: w.name
      }).bindPopup(_marker["default"].fPopup(w), _crPopupOptions(themeName)).addTo(map);
    }
  }
};
var _default = fnLeaflet;
exports["default"] = _default;
//# sourceMappingURL=fnLeaflet.js.map