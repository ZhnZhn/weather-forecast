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

const LeafletMap = ({
  id, style,
  themeName
}) => {
  const _refMap = useRef()
  , _refThemeName = useRef(themeName)
  , [isLoaded, setIsLoaded] = useState(false)
  , forecast = useSelector(sPlace.forecast);

  _refThemeName.current = themeName

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    _refMap.current = fnLeaflet.createMap(id, () => setIsLoaded(true));
    _refMap.current.on('dblclick', throttle(
      e => requestPlace(e.latlng),
      PERIOD_MS, {trailing: false}
    ))
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
       !isLoaded &&
       <span>LeafletMap Loading...</span>
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
