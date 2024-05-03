import { 
  useState,
  useImperativeHandle
} from '../uiApi';
import dt from '../../utils/dt';

import SvgClose from '../zhn-atoms/SvgClose'
import { POPUP } from '../styles/theme';

const CL_DATE = 'marker__caption__date'
, CL_DESCR = 'marker__description'
, CL_LABEL = 'marker__label'
, CL_V_RAIN = 'marker__v-rain'
, CL_V_WATER = 'marker__v-water'
, CL_V_PRESSURE = 'marker__v-pressure'
, CL_V_DAY = 'marker__v-day'
, CL_V_NIGHT = 'marker__v-night'

, S_ROOT_DIV = {
  position: 'absolute',
  top: 190,
  left: 200,
  padding: '8px 8px',
  lineHeight: 1.5,
  borderRadius: 4,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
  zIndex: 1,
  transition: 'left 0.5s ease-in 0s'
}
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' }
, S_BT_CLOSE = {
  position: 'absolute',
  top: 7,
  right: 4
},
S_DAY = {
  borderBottom: '2px solid #8bc34a'
};

const TitleValue = ({
  title,
  valueCn,
  value
}) => (
  <>
   <span className={CL_LABEL}>{title}&nbsp;</span>
   <span className={valueCn}>
     {value}&nbsp;
   </span>
  </>
);

const DayDetailPopup = ({
  refEl,
  onClose
}) => {
  const [
    state,
    setState
  ] = useState({})
  , {
    isOpen,
    item
  } = state;

  useImperativeHandle(refEl, () => ({
    setItem: item => setState(() => ({
       item, isOpen: true
    })),
    close: () => setState(prevState => {
      prevState.isOpen = false
      return {...prevState};
    })
  }))

  const { dt:timestamp, rain, snow, clouds=0, humidity='', pressure='', temp={}, weather=[] } = item || {}
  , { morn='', day='', max='', eve='', night='', min='' } = temp
  , _dateTitle = `${dt.toDayOfWeek(timestamp)} ${dt.toTime(timestamp)}`
  , description = (weather[0] && weather[0].description)
       || 'Without description'
  , _isRain = !!rain
  , _isSnow = snow > 0.02
  , _pressureTitle = _isRain && _isSnow
       ? 'Press.:' : 'Pressure:'
  , _style = isOpen
       ? S_BLOCK
       : S_NONE;

  return (
    <div style={{
        ...POPUP.CHART, ...S_ROOT_DIV,
        ..._style
     }}>
      <SvgClose
        style={S_BT_CLOSE}
        onClose={onClose}
      />
      <div className={CL_DATE}>
        <span style={S_DAY}>
          {_dateTitle}
        </span>
      </div>
      <div>
        <span className={CL_DESCR}>{description}</span>
      </div>
      <div>
        {_isRain && <TitleValue title="Rain:"
            valueCn={CL_V_RAIN}
            value={`${rain}mm`}
          />
        }
        {_isSnow && <TitleValue title="Snow:"
            valueCn={CL_V_WATER}
            value={`${snow}mm`}
          />
        }
        <TitleValue title={_pressureTitle}
          valueCn={CL_V_PRESSURE}
          value={`${pressure}hPa`}
        />
      </div>
      <div>
        <TitleValue title="Clouds:"
          valueCn={CL_V_WATER}
          value={`${clouds}%`}
        />
        <TitleValue title="Humidity:"
          valueCn={CL_V_WATER}
          value={`${humidity}%`}
        />
      </div>
      <div>
        <TitleValue title="Morn:"
          valueCn={CL_V_DAY}
          value={morn}
        />
        <TitleValue title="Day:"
          valueCn={CL_V_DAY}
          value={day}
        />
        <TitleValue title="Max:"
          valueCn={CL_V_DAY}
          value={max}
        />
      </div>
      <div>
        <TitleValue title="Eve:"
          valueCn={CL_V_NIGHT}
          value={eve}
        />
        <TitleValue title="Night:"
          valueCn={CL_V_NIGHT}
          value={night}
        />
        <TitleValue title="Min:"
          valueCn={CL_V_NIGHT}
          value={min}
        />
      </div>
    </div>
  );
};

export default DayDetailPopup
