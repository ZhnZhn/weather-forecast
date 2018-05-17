//import React from 'react';
import React from '../_react'

const STYLE = {
  SVG : {
    position: 'relative',
    top: '4px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
}

const SvgCircle = ({ stroke, fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 18 18" width="100%" height="100%"
       preserveAspectRatio="none" aria-labelledby="title"
       style={STYLE.SVG}
    >
     <title id="title">Circle Marker</title>
     <circle r="6" stroke={stroke} strokeWidth="2" fill={fill} cx="9" cy="9"></circle>
  </svg>
  );
}

export default SvgCircle
