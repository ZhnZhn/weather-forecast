"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createMap = exports.addMarker = void 0;

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

var DF_LAT = 50,
    DF_LNG = 0,
    DF_ZOOM = 2;

var createMap = function createMap(id, onLoad) {
  if (!L) {
    return;
  }

  var map = L.map(id, {
    zoomControl: true
  }).on('load', onLoad).setView([DF_LAT, DF_LNG], DF_ZOOM);
  map.zoomControl.setPosition('bottomright');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    id: 'addis',
    attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);
  return map;
};

exports.createMap = createMap;

var addMarker = function addMarker(w, themeName, map) {
  if (!L) {
    return;
  }

  var icon = L.divIcon({
    html: _marker["default"].fDivIcon(w)
  }),
      _ref = w || {},
      coord = _ref.coord,
      _ref2 = coord || {},
      lat = _ref2.lat,
      lon = _ref2.lon;

  if (lat && lon) {
    L.marker([lat, lon], {
      icon: icon,
      title: w.name,
      alt: w.name
    }).bindPopup(_marker["default"].fPopup(w), _crPopupOptions(themeName)).addTo(map);
  }
};

exports.addMarker = addMarker;
//# sourceMappingURL=fnLeaflet.js.map