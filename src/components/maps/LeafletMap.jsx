//import PropTypes from 'prop-types';
import React from '../_react'
import { useSelector } from 'react-redux'

import fnLeaflet from './fnLeaflet';
import throttle from '../../utils/throttle'

import handlers  from '../../flux/handlers';
import { sPlace } from '../../flux/selectors';

const { useState, useRef, useEffect } = React
, { requestPlace } = handlers;

const PERIOD_MS = 5000;

const S = {
  DIV: {
    width:'100%',
    height: 650,
    transition: 'transform .3s, width .6s'
  }
};

const MAP_STATUS = {
  LOADING: 'a',
  LOADED: 'b',
  FAILED: 'c'
};

const LeafletMap = ({
  id, style,
  themeName
}) => {
  const _refMap = useRef()
  , _refThemeName = useRef(themeName)
  , [mapStatus, setMapStatus] = useState(MAP_STATUS.LOADING)
  , forecast = useSelector(sPlace.forecast);

  _refThemeName.current = themeName

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _map = fnLeaflet.createMap(id, () => setMapStatus(MAP_STATUS.LOADED));
    if (_map) {
      _refMap.current = _map
      _refMap.current.on('dblclick', throttle(
        e => requestPlace(e.latlng),
        PERIOD_MS, {trailing: false}
      ))
    } else {
      setMapStatus(MAP_STATUS.FAILED)
    }
  }, [])
  // id
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (forecast){
      fnLeaflet.addMarker(
        forecast,
        _refThemeName.current,
        _refMap.current
      );
    }
  }, [forecast])

  return (
    <div
      style={{...S.DIV, ...style}}
      id={id}
    >
     {
        mapStatus === MAP_STATUS.LOADING &&
        <span>LeafletMap Loading...</span>
     }
     {
         mapStatus === MAP_STATUS.FAILED &&
        <span>LeafletMap Loading Has Failed</span>
     }
    </div>
  );
}

/*
LeafletMap.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string,
  themeName: PropTypes.string
}
*/

export default LeafletMap
