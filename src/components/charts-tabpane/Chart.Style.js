
import { COLOR as C } from '../styles/theme';
import SC from './SeriesColor';

const DF_DASH_FILL = '#808080';

const _crLineStyle = ({
  stroke,
  fill=stroke,
  dash=null
}) => ({
  type: "monotone",
  stroke: stroke,
  strokeWidth: 2,
  strokeDasharray: dash,
  dot: {
    r: 6,
    strokeWidth: 2,
    strokeDasharray: null,
    stroke: stroke,
    fill: fill,
  },
  activeDot: {
    r: 10,
    strokeWidth: 2,
    strokeDasharray: null,
    stroke: stroke,
    fill: fill
  }
})


const _crLineDashStyle = (stroke, fill) => _crLineStyle({
  stroke,
  fill,
  dash: "5 5"
});

const _crBarStyle = fill => ({
  barSize: 20,
  fill
});

const _crYAxisStyle = (color) => ({
  axisLine: { stroke: color },
  tickLine: { stroke: color },
  tick: { stroke: color, fill: color }
});

const STYLE = {
  ComposedChart: {
    margin: {
      top: 20,
      right: 10,
      bottom: 30,
      left: -20
    }
  },
  HourlyChart: {
    margin: {
      top: 24,
      right: 10,
      bottom: 30,
      left: 20
    }
  },
  XAxis: {
    tickSize: 16,
    tick: {
      stroke: C.DAY.color,
      fill: C.DAY.color
    }
  },
  YAxisSpeed: _crYAxisStyle(SC.SPEED),
  YAxisRain: _crYAxisStyle(SC.RAIN),
  YAxisSnow: _crYAxisStyle(SC.SNOW),
  YAxisPressure: _crYAxisStyle(SC.PRESSURE),
  CartesianGrid: {
    stroke: "#555",
    vertical: false
  },
  LinePressure: _crLineDashStyle(SC.PRESSURE),
  LineRain: _crLineDashStyle(SC.RAIN),
  LineSpeed: _crLineDashStyle(SC.SPEED, DF_DASH_FILL),
  LineHumidity: _crLineStyle({ stroke: SC.SPEED }),
  LineTempMax: _crLineDashStyle(SC.TEMP_MAX, DF_DASH_FILL),
  LineTempMin: _crLineDashStyle(SC.TEMP_MIN, DF_DASH_FILL),
  LineTempMorn: _crLineDashStyle(C.TEMP_DAY.color, DF_DASH_FILL),
  LineTempDay: _crLineStyle({ stroke: C.TEMP_DAY.color }),
  LineTempEve: _crLineDashStyle(C.TEMP_NIGHT.color, DF_DASH_FILL),
  LineTempNight: _crLineStyle({ stroke: C.TEMP_NIGHT.color }),

  BarRain: _crBarStyle(SC.RAIN),
  BarSnow: _crBarStyle(SC.SNOW)
};

export default STYLE
