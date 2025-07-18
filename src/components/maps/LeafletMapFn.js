import Leaflet from 'leaflet';
import marker from '../../templates/marker';

const L = Leaflet || window.L;

const DF_LAT = 50
, DF_LNG = 0
, DF_ZOOM = 2;

export const createMap = (
  id,
  onLoad
) => {
   if (!L) { return; }
   const map = L
     .map(id, { zoomControl: !0 })
     .on('load', onLoad)
     .setView([DF_LAT, DF_LNG], DF_ZOOM);
   map.zoomControl.setPosition('bottomright');
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'addis',
      attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
   }).addTo(map);
   return map;
}

export const addMarker = (
  w,
  map
) => {
   if (!L) { return; }
   const icon = L.divIcon({ html: marker.fDivIcon(w)})
   , { coord } = w  || {}
   , { lat, lon } = coord || {};
   if (lat && lon) {
     L.marker([lat, lon], {
       icon: icon,
       title: w.name,
       alt: w.name,
     }).bindPopup(
       marker.fPopup(w),
     ).addTo(map)
   }
}
