//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React;
import dt from '../../utils/dt';

import SvgClose from '../zhn-atoms/SvgClose'
import { POPUP } from '../styles/theme';


const CL = {
  DATE: 'marker__caption__date',
  DESCR: 'marker__description',
  LABEL: 'marker__label',
  VALUE: 'marker__value'
}

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
    top: '4px',
    right : '4px'
  },
  DAY : {
    borderBottom : '2px solid #8bc34a'
  }
}

class DayDetailPopup extends Component {

  constructor(props){
    super(props)
    const {
            isOpen, style, item
           } = props;
    this.state = {
      isOpen, style, item
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
         : STYLE.NONE;
    return (
      <div style={{
          ...POPUP.CHART, ...STYLE.ROOT_DIV,
          ...style, ..._style
       }}>
        <SvgClose
          style={STYLE.BT_CLOSE}
          onClose={onClose}
        />
        <div className={CL.DATE}>
          <span style={STYLE.DAY}>
            {dt.toDayOfWeek(timestamp)}
          </span>
        </div>
        <div>
          <span className={CL.DESCR}>{description}</span>
        </div>
        <div>
          <span className={CL.LABEL}>Rain:&nbsp;</span>
          <span className={CL.VALUE}>{rain}mm&nbsp;</span>
          { snow > 0.02 &&
            <span>
              <span className={CL.LABEL}>Snow:&nbsp;</span>
              <span className={CL.VALUE}>{snow}mm&nbsp;</span>
            </span>
          }
          <span className={CL.LABEL}>Clouds:&nbsp;</span>
          <span className={CL.VALUE}>{clouds}%&nbsp;</span>
        </div>
        <div>
          <span className={CL.LABEL}>Humidity:&nbsp;</span>
          <span className={CL.VALUE}>{humidity}%&nbsp;</span>
          <span className={CL.LABEL}>Pressure:&nbsp;</span>
          <span className={CL.VALUE}>{pressure}hPa&nbsp;</span>
        </div>
        <div>
          <span className={CL.LABEL}>Morn:&nbsp;</span>
          <span className={CL.VALUE}>{morn}&nbsp;</span>
          <span className={CL.LABEL}>Day:&nbsp;</span>
          <span className={CL.VALUE}>{day}&nbsp;</span>
          <span className={CL.LABEL}>Max:&nbsp;</span>
          <span className={CL.VALUE}>{max}&nbsp;</span>
        </div>
        <div>
          <span className={CL.LABEL}>Eve:&nbsp;</span>
          <span className={CL.VALUE}>{eve}&nbsp;</span>
          <span className={CL.LABEL}>Night:&nbsp;</span>
          <span className={CL.VALUE}>{night}&nbsp;</span>
          <span className={CL.LABEL}>Min:&nbsp;</span>
          <span className={CL.VALUE}>{min}&nbsp;</span>
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
