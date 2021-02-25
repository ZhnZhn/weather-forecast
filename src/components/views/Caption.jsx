//import React from 'react';
import React from '../_react'

const STYLE = {
  ROOT_DIV : {
    display : 'inline',
    color : '#795548',
    width : '100%',
    paddingLeft : 8,
    marginBottom : 8,
    borderBottom : '3px solid #795548',
    fontSize : '24px',
    fontWeight : 'bold',
  }
}

const Caption = ({ forecast, style}) => {
  const { city } = forecast || {}
  , { name='Forecast', country='' } = city || {};
  return (
    <div style={{...STYLE.ROOT_DIV, ...style}}>
      <span>{name}</span>
      <span>:</span>
      <span>{country}</span>
    </div>
  )
}

export default Caption
