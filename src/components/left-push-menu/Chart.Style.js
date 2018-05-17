
import { COLOR as C } from '../styles/theme';

const _fnLine = ({ stroke, fill, dash=null }) => {
  if (!fill) { fill = stroke }
  return {
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
  };
}

const _fnYAxis = (color) => {
  return {
    axisLine : { stroke: color },
    tickLine : { stroke: color },
    tick : { stroke: color, fill: color }
  }
}

const STYLE = {
  ComposedChart : {
    //width: 645,
    //height: 300,
    margin: { top: 20, right: -10, bottom: 30, left: -20 }
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
  YAxisSpeed : _fnYAxis('#3F51B5'),
  YAxisRain : _fnYAxis('#0922A5'),
  YAxisPressure : _fnYAxis('#0D2339'),
  CartesianGrid : {
    stroke : "#555",
    vertical : false
  },
  LinePressure : _fnLine({
    stroke : '#0D2339', fill : '#0D2339', dash : "5 5"
  }),
  LineRain : _fnLine({
    stroke : '#0922a5', fill : '#0922a5', dash : "5 5"
  }),
  LineSpeed : _fnLine({
    stroke : '#3f51b5', fill : '#808080', dash : "5 5"
  }),
  LineTempMax : _fnLine({
    stroke : '#F44336', fill : "#808080", dash : "5 5"
  }),
  LineTempMin : _fnLine({
    stroke : '#03a9f4', fill : "#808080", dash : "5 5"
  }),
  LineTempMorn : _fnLine({
    stroke : C.TEMP_DAY.color, fill : "#808080", dash : "5 5"
  }),
  LineTempDay : _fnLine({ stroke : C.TEMP_DAY.color }),
  LineTempEve : _fnLine({
    stroke : C.TEMP_NIGHT.color, fill : "#808080", dash : "5 5"
  }),
  LineTempNight : _fnLine({ stroke : C.TEMP_NIGHT.color })
}

export default STYLE
