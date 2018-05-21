//import React from 'react';
import React from '../_react'

const STYLE = {
  ROOT_DIV : {
    display: 'inline',
    width : '100%',
    color: '#795548',
    paddingLeft : '8px',
    fontSize : '24px',
    fontWeight : 'bold',
    borderBottom : '3px solid #795548',
    marginBottom : '8px'
  }
}

const Caption = (props) => {
  const { forecast={}, style } = props
  , { city={} } = forecast
  , { name='Forecast', country='' } = city;
  return (
    <div style={Object.assign({}, STYLE.ROOT_DIV, style)}>
      <span>{name}</span>
      <span>:</span>
      <span>{country}</span>
    </div>
  )
}

export default Caption
