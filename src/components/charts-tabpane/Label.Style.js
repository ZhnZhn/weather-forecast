import {
  LABEL_COLOR,
  DAY_COLOR,
  TEMP_DAY_COLOR,
  TEMP_NIGHT_COLOR,
  CHART_POPUP
} from '../styles/uiTheme';
import {
  TEMP_MAX_COLOR,
  TEMP_MIN_COLOR,
  SPEED_COLOR,
  RAIN_COLOR,
  SNOW_COLOR,
  PRESSURE_COLOR,
  SERIA_COLOR,
  FILTERED_COLOR  
} from './SeriesColor';

const _crCircleStyle = (
  stroke='green',
  fill
) => ({
  stroke,
  fill: fill || stroke
});
const _crSpanStyle = (
  color='green'
) => ({
  color,
  fontWeight: 'bold'
});

const CAPTION_STYLE = {
  display: 'inline-block',
  color: LABEL_COLOR,
  fontWeight: 'bold',
};

export const S_TOOLTIP = {
  ...CHART_POPUP,
  padding: 8
}
export const S_TOOLTIP_ROW = {
  paddingTop: 8
}
export const S_LABEL = {
  ...CAPTION_STYLE,
  width: 50
}
export const S_CAPTION = {
  ...CAPTION_STYLE,
  paddingRight: 4
}

export const S_DAY = _crSpanStyle(DAY_COLOR)
export const S_CIRCLE_SPEED = _crCircleStyle(SPEED_COLOR, "none")
export const S_SPEED = _crSpanStyle(SPEED_COLOR)

export const S_CIRCLE_HUMIDITY = _crCircleStyle(SPEED_COLOR)
export const S_HUMIDITY = _crSpanStyle(SPEED_COLOR)

//CIRCLE_RAIN : _crCircleStyle(SC.RAIN),
export const S_RECT_RAIN = { stroke : RAIN_COLOR}
export const S_RAIN = _crSpanStyle(RAIN_COLOR)

export const S_RECT_SNOW = { stroke : SNOW_COLOR}
export const S_SNOW = _crSpanStyle(SNOW_COLOR)

export const S_CIRCLE_TEMP_MAX = _crCircleStyle(TEMP_MAX_COLOR, 'none')
export const S_TEMP_MAX = _crSpanStyle(TEMP_MAX_COLOR)

export const S_CIRCLE_TEMP_MIN = _crCircleStyle(TEMP_MIN_COLOR, 'none')
export const S_TEMP_MIN = _crSpanStyle(TEMP_MIN_COLOR)

export const S_CIRCLE_TEMP_MORN = _crCircleStyle(TEMP_DAY_COLOR, 'none')

export const S_CIRCLE_TEMP_DAY = _crCircleStyle(TEMP_DAY_COLOR)
export const S_TEMP_DAY = _crSpanStyle(TEMP_DAY_COLOR)

export const S_CIRCLE_TEMP_EVE = _crCircleStyle(TEMP_NIGHT_COLOR, 'none')

export const S_CIRCLE_TEMP_NIGHT = _crCircleStyle(TEMP_NIGHT_COLOR)
export const S_TEMP_NIGHT = _crSpanStyle(TEMP_NIGHT_COLOR)

export const S_CIRCLE_PRESSURE = _crCircleStyle(PRESSURE_COLOR)
export const S_PRESSURE = _crSpanStyle(PRESSURE_COLOR)

export const S_SERIA = _crSpanStyle(SERIA_COLOR)
export const S_CIRCLE_SERIA = _crCircleStyle(SERIA_COLOR)

export const S_POINTER = {
  lineHeight: 2,
  cursor: 'pointer'
}
export const S_FILTERED = {
  color: FILTERED_COLOR
}
