import React from '../_react'

const { forwardRef, useState, useImperativeHandle } = React;
import dt from '../../utils/dt';

import SvgClose from '../zhn-atoms/SvgClose'
import { POPUP } from '../styles/theme';

const CL = {
  DATE: 'marker__caption__date',
  DESCR: 'marker__description',
  LABEL: 'marker__label',
  V_RAIN: 'marker__v-rain',
  V_WATER: 'marker__v-water',
  V_PRESSURE: 'marker__v-pressure',
  V_DAY: 'marker__v-day',
  V_NIGHT: 'marker__v-night'
};

const STYLE = {
  ROOT_DIV: {
    position: 'absolute',
    top: 190,
    left : 200,
    padding: '8px 8px',
    lineHeight: 1.5,
    borderRadius: 4,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 1,
    transition: 'left 0.5s ease-in 0s'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  BT_CLOSE: {
    position: 'absolute',
    top: 7,
    right: 4
  },
  DAY: {
    borderBottom: '2px solid #8bc34a'
  }
};

const TitleValue = ({ title, valueCn, value }) => (
  <>
   <span className={CL.LABEL}>{title}&nbsp;</span>
   <span className={valueCn}>
     {value}&nbsp;
   </span>
  </>
);

const DayDetailPopup = forwardRef(({ onClose }, ref) => {
  const [state, setState] = useState({})
  , {isOpen, item} = state;

  useImperativeHandle(ref, () => ({
    setItem: item => setState(() => ({
       item, isOpen: true
    })),
    close: () => setState(prevState => {
      prevState.isOpen = false
      return {...prevState};
    })
  }))

  const { dt:timestamp, rain=0, snow=0, clouds=0, humidity='', pressure='', temp={}, weather=[] } = item || {}
  , { morn='', day='', max='', eve='', night='', min='' } = temp
  , _dateTitle = `${dt.toDayOfWeek(timestamp)} ${dt.toTime(timestamp)}`
  , description = (weather[0] && weather[0].description)
       || 'Without description'
  , _pressureTitle = snow > 0.2 ? 'Press.:' : 'Pressure:'
  , _style = isOpen
       ? STYLE.BLOCK
       : STYLE.NONE;

  return (
    <div style={{
        ...POPUP.CHART, ...STYLE.ROOT_DIV,
        ..._style
     }}>
      <SvgClose
        style={STYLE.BT_CLOSE}
        onClose={onClose}
      />
      <div className={CL.DATE}>
        <span style={STYLE.DAY}>
          {_dateTitle}
        </span>
      </div>
      <div>
        <span className={CL.DESCR}>{description}</span>
      </div>
      <div>
        <TitleValue title="Rain:"
          valueCn={CL.V_RAIN}
          value={`${rain}mm`}
        />
        { snow > 0.02 && <TitleValue title="Snow:"
            valueCn={CL.V_WATER}
            value={`${snow}mm`}
          />
        }
        <TitleValue title={_pressureTitle}
          valueCn={CL.V_PRESSURE}
          value={`${pressure}hPa`}
        />
      </div>
      <div>
        <TitleValue title="Clouds:"
          valueCn={CL.V_WATER}
          value={`${clouds}%`}
        />
        <TitleValue title="Humidity:"
          valueCn={CL.V_WATER}
          value={`${humidity}%`}
        />
      </div>
      <div>
        <TitleValue title="Morn:"
          valueCn={CL.V_DAY}
          value={morn}
        />
        <TitleValue title="Day:"
          valueCn={CL.V_DAY}
          value={day}
        />
        <TitleValue title="Max:"
          valueCn={CL.V_DAY}
          value={max}
        />
      </div>
      <div>
        <TitleValue title="Eve:"
          valueCn={CL.V_NIGHT}
          value={eve}
        />
        <TitleValue title="Night:"
          valueCn={CL.V_NIGHT}
          value={night}
        />
        <TitleValue title="Min:"
          valueCn={CL.V_NIGHT}
          value={min}
        />
      </div>
    </div>
  );
})

export default DayDetailPopup
