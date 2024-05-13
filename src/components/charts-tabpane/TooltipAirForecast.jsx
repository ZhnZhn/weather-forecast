import fTooltip from './fTooltip';
import TooltipContent from './TooltipContent';
import TooltipRow2 from './TooltipRow2';
import STYLE from './Label.Style';

const TooltipAirForecast = fTooltip(payload => (
  <TooltipContent caption={payload.dt_text}>
    <TooltipRow2
      t1="AQI" v1={payload.aqi} style1={STYLE.SPEED}
      t2="CO" v2={payload.co} style2={STYLE.PRESSURE}
    />
    <TooltipRow2
      t1="NO2" v1={payload.no2}
      t2="O3" v2={payload.o3}
    />
    <TooltipRow2
      t1="PM10" v1={payload.pm10}
      t2="PM2.5" v2={payload.pm2_5}
    />
  </TooltipContent>
));

export default TooltipAirForecast
