import {
  isFn,
  isNumber
} from '../../utils/isTypeFn';
import {
  crIconImgSrc
} from '../../utils/domFn';
import dt from '../../utils/dt';

import {
  roundSafeOrEmpty,
  roundSafeByOneDigitsOrEmpty,
} from '../../math/mathFn';

import IconVane from './IconVane';

const CL_DAY_ITEM = 'day-item'
, S_ROOT_DIV = {
  display: 'inline-block',
  padding: '0 12px',
  borderRadius: 10,
  transition: 'background-color 0.3s'
}
, S_DAY = {
  color: '#8bc34a',
  marginBottom: 4,
  borderBottom: '2px solid #8bc34a',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
}
, S_PRESSURE = {
  display: 'block',
  marginBottom: -15,
  color: '#0d2339',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
}
, S_ICON = {
  display: 'block',
  width: 60,
  height: 60,
  margin: '0 auto'
}
, S_CELL_WIND = {
  marginTop: -10,
  textAlign: 'center'
}
, S_WIND_SPEED = {
  color: '#3f51b5',
  fontSize: '20px',
  fontWeight: 'bold'
}
, S_CELL_TEMP = {
  padding: '4px 0',
  textAlign: 'center'
}
, S_TEMP_DAY = {
  color: '#ff9800',
  paddingLeft: 4,
  fontSize: '20px',
  fontWeight: 'bold'
}
, S_TEMP_NIGHT = {
  color: '#434348',
  paddingLeft: 8,
  fontSize: '20px',
  fontWeight: 'bold'
};

const _roundPropOr = (
  obj,
  prop
) => roundSafeOrEmpty(obj?.[prop]);

const DayItem = ({
  style,
  item,
  onClick
}) => {
  const {
    weather,
    deg,
    speed,
    temp,
    dt:timestamp
  } = item || {}
  , _focusableAttr = isFn(onClick)
     ? {
         tabIndex: "-1",
         className: CL_DAY_ITEM,
         onClick: () => onClick(item)
       }
     : void 0;

  return (
    <div
       {..._focusableAttr}
       style={{...S_ROOT_DIV, ...style}}
    >
      <div style={S_DAY}>{dt.toShortDayOfWeek(timestamp)}</div>
      <span style={S_PRESSURE}>{_roundPropOr(item, 'pressure')}</span>
      <img src={crIconImgSrc(weather?.[0]?.icon)} style={S_ICON} alt="" />
      <div style={S_CELL_WIND}>
        <IconVane deg={deg} />
        <span style={S_WIND_SPEED}>
          {roundSafeByOneDigitsOrEmpty(speed)}
        </span>
      </div>
      <div style={S_CELL_TEMP}>
        <span style={S_TEMP_DAY}>{_roundPropOr(temp, 'day')}</span>
        <span style={S_TEMP_NIGHT}>{_roundPropOr(temp, 'night')}</span>
      </div>
    </div>
  );
};

export default DayItem
