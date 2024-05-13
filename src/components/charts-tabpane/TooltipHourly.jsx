import fTooltip from './fTooltip';
import TooltipContent from './TooltipContent';
import TooltipRow1 from './TooltipRow1';
import STYLE from './Label.Style';

const TooltipHourly = fTooltip(payload => (
  <TooltipContent caption={payload.dt_text}>
    <TooltipRow1 t="Temp" v={payload.temp}/>
    <TooltipRow1 t="Pressure" v={payload.pressure} style={STYLE.PRESSURE} />
    <TooltipRow1 t="Speed" v={payload.speed} style={STYLE.SPEED} />
    <TooltipRow1 t="Rain" v={payload.rain} s={STYLE.RAIN} />
    <TooltipRow1 t="Snow" v={payload.snow} s={STYLE.RAIN} />
  </TooltipContent>
));

export default TooltipHourly
