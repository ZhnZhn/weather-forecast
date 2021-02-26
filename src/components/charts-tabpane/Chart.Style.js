
import { COLOR as C } from '../styles/theme';
import SC from './SeriesColor';

const _crLineStyle = ({ stroke, fill=stroke, dash=null }) => ({
  type : "monotone",
  stroke : stroke,
  strokeWidth : 2,
  strokeDasharray : dash,
  dot : {
    r: 6,
    strokeWidth: 2,
    strokeDasharray : null,
    stroke: stroke,
    fill: fill,
  },
  activeDot : {
    r: 10,
    strokeWidth: 2,
    strokeDasharray : null,
    stroke: stroke,
    fill: fill
  }
})


const _crYAxisStyle = (color) => ({
  axisLine : { stroke: color },
  tickLine : { stroke: color },
  tick : { stroke: color, fill: color }
});

const STYLE = {
  ComposedChart : {
    //width: 645,
    //height: 300,
    margin: { top: 20, right: 10, bottom: 30, left: -20 }
  },
  HourlyChart : {
    //width: 645,
    //height: 300,
    margin: { top: 20, right: 10, bottom: 30, left: 20 }
  },
  XAxis : {
    tickSize : 16,
    tick : {
      stroke: C.DAY.color,
      fill : C.DAY.color
    }
  },
  YAxisSpeed : _crYAxisStyle(SC.SPEED),
  YAxisRain : _crYAxisStyle(SC.RAIN),
  YAxisPressure : _crYAxisStyle(SC.PRESSURE),
  CartesianGrid : {
    stroke : "#555",
    vertical : false
  },
  LinePressure : _crLineStyle({
    stroke : SC.PRESSURE, dash : "5 5"
  }),
  LineRain : _crLineStyle({
    stroke : SC.RAIN, dash : "5 5"
  }),
  LineSpeed : _crLineStyle({
    stroke : SC.SPEED, fill : '#808080', dash : "5 5"
  }),
  LineHumidity : _crLineStyle({ stroke : SC.SPEED }),
  LineTempMax : _crLineStyle({
    stroke : SC.TEMP_MAX, fill : "#808080", dash : "5 5"
  }),
  LineTempMin : _crLineStyle({
    stroke : SC.TEMP_MIN, fill : "#808080", dash : "5 5"
  }),
  LineTempMorn : _crLineStyle({
    stroke : C.TEMP_DAY.color, fill : "#808080", dash : "5 5"
  }),
  LineTempDay : _crLineStyle({ stroke : C.TEMP_DAY.color }),
  LineTempEve : _crLineStyle({
    stroke : C.TEMP_NIGHT.color, fill : "#808080", dash : "5 5"
  }),
  LineTempNight : _crLineStyle({ stroke : C.TEMP_NIGHT.color })
}

export default STYLE
