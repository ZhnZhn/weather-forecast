import fTooltip from './fTooltip';
import TooltipContent from './TooltipContent';
import TooltipRow2 from './TooltipRow2';
import TooltipRow1 from './TooltipRow1';
import STYLE from './Label.Style';

const TooltipForecast = fTooltip((payload, props) => (
  <TooltipContent caption={props.label}>
    <TooltipRow2 style1={STYLE.TEMP_DAY}
      t1="Morn" v1={payload.tempMorn}
      t2="Day" v2={payload.tempDay}
    />
    <TooltipRow2 style1={STYLE.TEMP_NIGHT}
      t1="Eve" v1={payload.tempEve}
      t2="Night" v2={payload.tempNight}
    />
    <TooltipRow2
      t1="Min" v1={payload.tempMin} style1={STYLE.TEMP_MIN}
      t2="Max" v2={payload.tempMax} style2={STYLE.TEMP_MAX}
    />
    <TooltipRow2
      t1="Rain" v1={payload.rain} style1={STYLE.RAIN}
      t2="Wind" v2={payload.speed} style2={STYLE.SPEED}
    />
    <TooltipRow1
      t="Pressure"
      v={payload.pressure}
      style={STYLE.PRESSURE}
    />
    <TooltipRow1
      t="Humidity"
      v={payload.humidity}
      style={STYLE.SPEED}
    />
  </TooltipContent>
));

export default TooltipForecast
