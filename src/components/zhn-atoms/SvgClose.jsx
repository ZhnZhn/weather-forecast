//import React from 'react';
import React from '../_react'

const S = {
  SVG: {
    padding: 3
  }
};

const SvgClose = ({ style, onClose }) => (
   <div
      className="svg-close"
      style={style}
      onClick={onClose}
   >
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          style={S.SVG}
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
          <path d="M 0,0 L 12,12"
                strokeWidth="2"
                stroke="#ED5813"
                strokeLinecap="round"
          />
          <path d="M 12,0 L 0,12"
                strokeWidth="2"
                stroke="#ED5813"
                strokeLinecap="round"
          />
     </svg>
   </div>
);



export default SvgClose;
