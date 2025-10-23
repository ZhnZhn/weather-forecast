import {
  DAY_COLOR,
  TEMP_DAY_COLOR,
  TEMP_NIGHT_COLOR
 } from '../styles/uiTheme';
import {
  TEMP_MIN_COLOR,
  TEMP_MAX_COLOR,
  SPEED_COLOR,
  RAIN_COLOR,
  SNOW_COLOR,
  PRESSURE_COLOR
} from './SeriesColor';

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
    stroke: DAY_COLOR,
    fill: DAY_COLOR
  }
}
export const S_YAXIS_SPEED = _crYAxisStyle(SPEED_COLOR)
export const S_YAXIS_RAIN = _crYAxisStyle(RAIN_COLOR)
export const S_YAXIS_SNOW = _crYAxisStyle(SNOW_COLOR)
export const S_YAXIS_PRESSURE = _crYAxisStyle(PRESSURE_COLOR)

export const S_CARTESIAN_GRID = {
  stroke: "#555",
  vertical: false
}

export const S_LINE_PRESSURE = _crLineDashStyle(PRESSURE_COLOR)
export const S_LINE_RAIN = _crLineDashStyle(RAIN_COLOR)
export const S_LINE_SPEED = _crLineDashStyle(SPEED_COLOR, DF_DASH_FILL)
export const S_LINE_HUMIDITY = _crLineStyle({ stroke: SPEED_COLOR })
export const S_LINE_TEMP_MAX = _crLineDashStyle(TEMP_MAX_COLOR, DF_DASH_FILL)
export const S_LINE_TEMP_MIN = _crLineDashStyle(TEMP_MIN_COLOR, DF_DASH_FILL)
export const S_LINE_TEMP_MORNING = _crLineDashStyle(TEMP_DAY_COLOR, DF_DASH_FILL)
export const S_LINE_TEMP_DAY = _crLineStyle({ stroke: TEMP_DAY_COLOR })
export const S_LINE_TEMP_EVE = _crLineDashStyle(TEMP_NIGHT_COLOR, DF_DASH_FILL)
export const S_LINE_TEMP_NIGHT = _crLineStyle({ stroke: TEMP_NIGHT_COLOR })

export const S_BAR_RAIN = _crBarStyle(RAIN_COLOR)
export const S_BAR_SNOW = _crBarStyle(SNOW_COLOR)
