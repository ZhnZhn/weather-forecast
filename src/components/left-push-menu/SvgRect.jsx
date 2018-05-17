//import React from 'react';
import React from '../_react'

const S = {
  SVG : {
    position: 'relative',
    top: '2px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
}

const SvgRest = ({ stroke='green', fill }) => {
  if (!fill) { fill = stroke }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 18 18" width="100%" height="100%"
       preserveAspectRatio="none" aria-labelledby="title"
       style={S.SVG}
    >
     <title id="title">Rest Marker</title>
     {/*
     <path
        d="M 3,0 L 14,0 14,18 3,18 3,0"
        strokeWidth="1"
        stroke={stroke} fill={fill}
     >
     </path>
    */}

     <rect
       x="3" y="0" width="11" height="18"
       stroke={stroke} fill={fill}
     >
     </rect>

  </svg>
  );
}

export default SvgRest
