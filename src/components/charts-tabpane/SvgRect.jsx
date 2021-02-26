import React from '../_react'

const S = {
  SVG : {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    width: 18,
    height: 18
  }
};

const SvgRest = ({ stroke='green', fill=stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 18 18" width="100%" height="100%"
     preserveAspectRatio="none" aria-labelledby="title"
     style={S.SVG}
  >
   <title id="title">Rest Marker</title>
   <rect
     x="3" y="0" width="11" height="18"
     stroke={stroke} fill={fill}
   />
  </svg>
);


export default SvgRest
