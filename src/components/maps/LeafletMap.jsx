//import PropTypes from 'prop-types';
import {
  useSelector,
  useState,
  useRef,
  useEffect
} from '../uiApi';

import {
  createMap,
  addMarker
} from './fnLeaflet';
import throttle from '../../utils/throttle';

import handlers  from '../../flux/handlers';
import { sPlace } from '../../flux/selectors';

import ErrMsg from '../zhn-atoms/ErrMsg';

const { requestPlace } = handlers;

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
  , _refThemeName = useRef(themeName)
  , [mapStatus, setMapStatus] = useState(MAP_STATUS_LOADING)
  , forecast = useSelector(sPlace.forecast);

  _refThemeName.current = themeName

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _map = createMap(id, () => setMapStatus(MAP_STATUS_LOADED));
    if (_map) {
      _refMap.current = _map
      _refMap.current.on('dblclick', throttle(
        e => requestPlace(e.latlng),
        PERIOD_MS, {trailing: false}
      ))
    } else {
      setMapStatus(MAP_STATUS_FAILED)
    }
  }, [])
  // id
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (forecast){
      addMarker(
        forecast,
        _refThemeName.current,
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
         msg="LeafletMap Loading Has Failed."
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
