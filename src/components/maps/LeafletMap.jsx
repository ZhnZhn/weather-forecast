//import PropTypes from 'prop-types';
import throttleFn from '../../utils/throttleFn';

import { requestPlace }  from '../../flux/handlers';
import { sPlace } from '../../flux/selectors';

import {
  useSelector,
  useState,
  useRef,
  useEffect
} from '../uiApi';

import {
  MSH_LEAFLET_MAP_LOADING_FAILED
} from '../styles/Tokens';

import ErrMsg from '../zhn/ErrMsg';

import {
  createMap,
  addMarker
} from './LeafletMapFn';

const PERIOD_MS = 5000;

const S_DIV = {
  width:'100%',
  height: 650,
  transition: 'transform .3s, width .6s'
}
, S_ERR_MSG = {
  marginTop: 8,
  marginLeft: 8
};

const MAP_STATUS_LOADING = 'a'
, MAP_STATUS_LOADED = 'b'
, MAP_STATUS_FAILED = 'c';

const LeafletMap = ({
  id,
  style,
  themeName
}) => {
  const _refMap = useRef()
  , [
    mapStatus,
    setMapStatus
  ] = useState(MAP_STATUS_LOADING)
  , forecast = useSelector(sPlace.forecast);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _map = createMap(id, () => setMapStatus(MAP_STATUS_LOADED));
    if (_map) {
      _refMap.current = _map
      _refMap.current.on('dblclick', throttleFn(
        e => requestPlace(e.latlng),
        PERIOD_MS
      ))
    } else {
      setMapStatus(MAP_STATUS_FAILED)
    }
  }, [])
  // id
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (forecast) {
      addMarker(
        forecast,
        _refMap.current
      );
    }
  }, [forecast])

  return (
    <div
      style={{...S_DIV, ...style}}
      id={id}
    >
     {mapStatus === MAP_STATUS_FAILED && (
       <ErrMsg
         style={S_ERR_MSG}
         msg={MSH_LEAFLET_MAP_LOADING_FAILED}
       />
     )}
    </div>
  );
}

/*
LeafletMap.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  themeName: PropTypes.string
}
*/

export default LeafletMap
