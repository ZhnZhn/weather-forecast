import { COLOR as C } from '../styles/theme';
import SC from './SeriesColor';

const DF_DASH_FILL = '#808080';

const _crDotStyle = (
  r,
  fill,
  stroke,
  strokeWidth=2
) => ({
  r,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray: null
});

const _crLineStyle = ({
  stroke,
  fill=stroke,
  dash=null
}) => ({
  type: "monotone",
  stroke: stroke,
  strokeWidth: 2,
  strokeDasharray: dash,
  dot: _crDotStyle(6, fill, stroke),
  activeDot: _crDotStyle(10, fill, stroke)
});

const _crLineDashStyle = (
  stroke,
  fill
) => _crLineStyle({
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

const _CHART_MARGIN = {
  top: 24,
  right: 10,
  bottom: 30
};


export const S_COMPOSED_CHART = {
  margin: {
    ..._CHART_MARGIN,
    left: -20
  }
}
export const S_HOURLY_CHART = {
  margin: {
    ..._CHART_MARGIN,
    left: 20
  }
}

export const S_XAXIS = {
  tickSize: 16,
  tick: {
    style: { fontWeight: 100 },
    stroke: C.DAY.color,
    fill: C.DAY.color
  }
}
export const S_YAXIS_SPEED = _crYAxisStyle(SC.SPEED)
export const S_YAXIS_RAIN = _crYAxisStyle(SC.RAIN)
export const S_YAXIS_SNOW = _crYAxisStyle(SC.SNOW)
export const S_YAXIS_PRESSURE = _crYAxisStyle(SC.PRESSURE)

export const S_CARTESIAN_GRID = {
  stroke: "#555",
  vertical: false
}

export const S_LINE_PRESSURE = _crLineDashStyle(SC.PRESSURE)
export const S_LINE_RAIN = _crLineDashStyle(SC.RAIN)
export const S_LINE_SPEED = _crLineDashStyle(SC.SPEED, DF_DASH_FILL)
export const S_LINE_HUMIDITY = _crLineStyle({ stroke: SC.SPEED })
export const S_LINE_TEMP_MAX = _crLineDashStyle(SC.TEMP_MAX, DF_DASH_FILL)
export const S_LINE_TEMP_MIN = _crLineDashStyle(SC.TEMP_MIN, DF_DASH_FILL)
export const S_LINE_TEMP_MORNING = _crLineDashStyle(C.TEMP_DAY.color, DF_DASH_FILL)
export const S_LINE_TEMP_DAY = _crLineStyle({ stroke: C.TEMP_DAY.color })
export const S_LINE_TEMP_EVE = _crLineDashStyle(C.TEMP_NIGHT.color, DF_DASH_FILL)
export const S_LINE_TEMP_NIGHT = _crLineStyle({ stroke: C.TEMP_NIGHT.color })

export const S_BAR_RAIN = _crBarStyle(SC.RAIN)
export const S_BAR_SNOW = _crBarStyle(SC.SNOW)
