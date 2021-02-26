import React from '../_react'

const S = {
  color: '#080101',
  fontWeight: 'bold',
  fontSize: '18px'
};

const ErrMsg = ({ style, msg }) => (
  <div style={{...S, ...style}}>
    {msg}
  </div>
);

export default ErrMsg
