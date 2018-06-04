//import React from 'react';
import React from '../_react'
//import PropTypes from 'prop-types';

const CL_VANE = "icon__popup__vane";

const _crStyle = (deg) => {
  if (typeof deg !== 'number') {
    return undefined;
  }
  return {
    transform: `rotate(${deg}deg)`
  };
}

const IconVane = ({ deg }) => (
  <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 17 18" width="100%" height="100%"
     preserveAspectRatio="none" aria-labelledby="title"
     className={CL_VANE}
     style={_crStyle(deg)}
  >
   <title id="title">Icon Wind Vane</title>
   <path d="M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0"/>
</svg>
);

/*
IconVane.propTypes = {
  deg: PropTypes.number
}
*/

export default IconVane
