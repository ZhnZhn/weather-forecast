import fTooltip from './fTooltip';
import TooltipContent from './TooltipContent';
import TooltipRow1 from './TooltipRow1';
import {
  S_PRESSURE,
  S_SPEED,
  S_RAIN
} from './Label.Style';

const TooltipHourly = fTooltip(payload => (
  <TooltipContent caption={payload.dt_text}>
    <TooltipRow1 t="Temp" v={payload.temp}/>
    <TooltipRow1 t="Pressure" v={payload.pressure} style={S_PRESSURE} />
    <TooltipRow1 t="Speed" v={payload.speed} style={S_SPEED} />
    <TooltipRow1 t="Rain" v={payload.rain} s={S_RAIN} />
    <TooltipRow1 t="Snow" v={payload.snow} s={S_RAIN} />
  </TooltipContent>
));

export default TooltipHourly
