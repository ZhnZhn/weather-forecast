//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React;
import dt from '../../utils/dt';

import { POPUP } from '../styles/theme';


const STYLE = {
  ROOT_DIV : {
    position : 'absolute',
    top: '190px',
    left : '200px',
    padding: '8px 8px',
    lineHeight: 1.5,
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex : 1,
    transition: 'left 0.5s ease-in 0s'
  },
  BLOCK : {
    display : 'block'
  },
  NONE : {
    display : 'none'
  },
  BT_CLOSE : {
    position : 'absolute',
    top: '0px',
    right : '4px',
    color: 'black',
    fontSize : '0.9rem',
    fontWeight : 'bold',
    cursor: 'pointer'
  },
  DAY : {
    borderBottom : '2px solid #8bc34a'
  }
  /*
  LABEL : {
    font
    color : C.LABEL.color
  }
  */
}

class DayDetailPopup extends Component {

  constructor(props){
    super()
    this.state = {
      isOpen : props.isOpen,
      style : props.style,
      item : props.item
    }
  }


  render(){
    const { onClose } = this.props
    , { isOpen, style, item={} } = this.state
    , { dt:timestamp, rain=0, snow=0, clouds=0, humidity='', pressure='', temp={}, weather=[] } = item
    , { morn='', day='', max='', eve='', night='', min='' } = temp
    , description = (weather[0] && weather[0].description)
        ? weather[0].description
        : 'Without description'
    , _style = (isOpen)
         ? STYLE.BLOCK
         : STYLE.NONE
    return (
      <div style={Object.assign({}, POPUP.CHART, STYLE.ROOT_DIV, style, _style)}>
        <div style={STYLE.BT_CLOSE} onClick={onClose}>
           close
        </div>
        <div className="marker__caption__date">
          <span style={STYLE.DAY}>{dt.toDayOfWeek(timestamp)}</span>
        </div>
        <div>
          <span className="marker__description">{description}</span>
        </div>
        <div>
          <span className="marker__label">Rain:&nbsp;</span>
          <span>{rain}mm&nbsp;</span>
          { snow > 0.02 &&
            <span>
              <span className="marker__label">Snow:&nbsp;</span>
              <span>{snow}mm&nbsp;</span>
            </span>
          }
          <span className="marker__label">Clouds:&nbsp;</span>
          <span>{clouds}%&nbsp;</span>
        </div>
        <div>
          <span className="marker__label">Humidity:&nbsp;</span>
          <span>{humidity}%&nbsp;</span>
          <span className="marker__label">Pressure:&nbsp;</span>
          <span>{pressure}hPa&nbsp;</span>
        </div>
        <div>
          <span className="marker__label">Morn:&nbsp;</span>
          <span>{morn}&nbsp;</span>
          <span className="marker__label">Day:&nbsp;</span>
          <span>{day}&nbsp;</span>
          <span className="marker__label">Max:&nbsp;</span>
          <span>{max}&nbsp;</span>
        </div>
        <div>
          <span className="marker__label">Eve:&nbsp;</span>
          <span>{eve}&nbsp;</span>
          <span className="marker__label">Night:&nbsp;</span>
          <span>{night}&nbsp;</span>
          <span className="marker__label">Min:&nbsp;</span>
          <span>{min}&nbsp;</span>
        </div>
      </div>
    );
  }

  setItem = (item) => {
     this.setState({ item, isOpen : true })
  }
  close = () => {
    this.setState({ isOpen : false })
  }
}

export default DayDetailPopup
