import Leaflet from 'leaflet';
import marker from '../../templates/marker';

const L = Leaflet || window.L;

const POPUP_CL = {
  DF: '',
  WHITE: 'popup--white',
  SAND: 'popup--sand'
};

const _crPopupOptions = themeName => ({
  className: POPUP_CL[themeName] || POPUP_CL.DF
});

const DF = {
  LAT: 50,
  LNG: 0,
  ZOOM: 2,
};

const fnLeaflet = {
  createMap : (id, onLoad) => {
    if (!L) { return; }
    const map = L
      //.map(id, { zoomControl: true, ...options })
      .map(id, { zoomControl: true })
      .on('load', onLoad)
      .setView([DF.LAT, DF.LNG], DF.ZOOM);
    map.zoomControl.setPosition('bottomright');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       id: 'addis',
       attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
       maxZoom: 18
    }).addTo(map);
    return map;
  },

  addMarker : (w, themeName, map) => {
    if (!L) { return; }
    const icon = L.divIcon({ html: marker.fDivIcon(w)})
    , { coord } = w  || {}
    , { lat, lon } = coord || {};
    if (lat && lon){
      L.marker([lat, lon], {
        icon: icon,
        title : w.name,
        alt : w.name,
      }).bindPopup(
        marker.fPopup(w),
        _crPopupOptions(themeName)
      ).addTo(map)
    }
  }
}

export default fnLeaflet
