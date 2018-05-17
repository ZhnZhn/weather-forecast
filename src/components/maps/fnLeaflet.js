//import L from 'leaflet';
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
  //LAT: 48,
  LAT: 50,
  //LAT: 10,
  LNG: 0
};

const fnLeaflet = {
  createMap : (id) => {
    const map = L
      .map(id, { zoomControl: true })
      .setView([DF.LAT, DF.LNG], 5);
    map.zoomControl.setPosition('bottomright');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                  id: 'addis',
                  attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                  maxZoom: 18
                 }
               ).addTo(map);
    return map;
  },

  addMarker : (w={}, themeName, map) => {
    const icon = L.divIcon({ html: marker.fDivIcon(w)});
    const { coord={} } = w;
    const { lat, lon } = coord;
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
