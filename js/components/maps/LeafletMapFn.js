"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createMap = exports.addMarker = void 0;
var _leaflet = _interopRequireDefault(require("leaflet"));
var _marker = _interopRequireDefault(require("../../templates/marker"));
const L = _leaflet.default || window.L;
const DF_LAT = 50,
  DF_LNG = 0,
  DF_ZOOM = 2;
const createMap = (id, onLoad) => {
  if (!L) {
    return;
  }
  const map = L.map(id, {
    zoomControl: !0
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
const addMarker = (w, map) => {
  if (!L) {
    return;
  }
  const icon = L.divIcon({
      html: _marker.default.fDivIcon(w)
    }),
    {
      coord
    } = w || {},
    {
      lat,
      lon
    } = coord || {};
  if (lat && lon) {
    L.marker([lat, lon], {
      icon: icon,
      title: w.name,
      alt: w.name
    }).bindPopup(_marker.default.fPopup(w)).addTo(map);
  }
};
exports.addMarker = addMarker;
//# sourceMappingURL=LeafletMapFn.js.map