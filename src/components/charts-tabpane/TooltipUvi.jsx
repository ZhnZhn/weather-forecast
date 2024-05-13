import fTooltip from './fTooltip';
import TooltipContent from './TooltipContent';
import TooltipRow1 from './TooltipRow1';

const TooltipUvi = fTooltip(payload => (
  <TooltipContent caption={`${payload.day}:00`}>
    <TooltipRow1 t="UV index" v={payload.uvi}/>
  </TooltipContent>
)); 

export default TooltipUvi
