import getPayload from './getPayload';
import TooltipContent from './TooltipContent';
import TooltipRow2 from './TooltipRow2';
import STYLE from './Label.Style';

const TooltipAirForecast = (props) => {
  const payload = getPayload(props);
  if (!payload){ return null; }

  const {
    dt_text,
    aqi,
    no2,
    pm10,
    o3,
    pm2_5,
    co
  } = payload;

  return (
   <TooltipContent caption={dt_text}>
     <TooltipRow2
       t1="AQI" v1={aqi} style1={STYLE.SPEED}
       t2="CO" v2={co} style2={STYLE.PRESSURE}
     />
     <TooltipRow2
       t1="NO2" v1={no2}
       t2="O3" v2={o3}
     />
     <TooltipRow2
       t1="PM10" v1={pm10}
       t2="PM2.5" v2={pm2_5}
     />
   </TooltipContent>
  );
};

export default TooltipAirForecast
