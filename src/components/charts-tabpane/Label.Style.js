import {
  LABEL_COLOR,
  DAY_COLOR,
  TEMP_DAY_COLOR,
  TEMP_NIGHT_COLOR,
  CHART_POPUP
} from '../styles/uiTheme';
import SC from './SeriesColor';

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
export const S_CIRCLE_SPEED = _crCircleStyle(SC.SPEED, "none")
export const S_SPEED = _crSpanStyle(SC.SPEED)

export const S_CIRCLE_HUMIDITY = _crCircleStyle(SC.SPEED)
export const S_HUMIDITY = _crSpanStyle(SC.SPEED)

//CIRCLE_RAIN : _crCircleStyle(SC.RAIN),
export const S_RECT_RAIN = { stroke : SC.RAIN}
export const S_RAIN = _crSpanStyle(SC.RAIN)

export const S_RECT_SNOW = { stroke : SC.SNOW}
export const S_SNOW = _crSpanStyle(SC.SNOW)

export const S_CIRCLE_TEMP_MAX = _crCircleStyle(SC.TEMP_MAX, 'none')
export const S_TEMP_MAX = _crSpanStyle(SC.TEMP_MAX)

export const S_CIRCLE_TEMP_MIN = _crCircleStyle(SC.TEMP_MIN, 'none')
export const S_TEMP_MIN = _crSpanStyle(SC.TEMP_MIN)

export const S_CIRCLE_TEMP_MORN = _crCircleStyle(TEMP_DAY_COLOR, 'none')

export const S_CIRCLE_TEMP_DAY = _crCircleStyle(TEMP_DAY_COLOR)
export const S_TEMP_DAY = _crSpanStyle(TEMP_DAY_COLOR)

export const S_CIRCLE_TEMP_EVE = _crCircleStyle(TEMP_NIGHT_COLOR, 'none')

export const S_CIRCLE_TEMP_NIGHT = _crCircleStyle(TEMP_NIGHT_COLOR)
export const S_TEMP_NIGHT = _crSpanStyle(TEMP_NIGHT_COLOR)

export const S_CIRCLE_PRESSURE = _crCircleStyle(SC.PRESSURE)
export const S_PRESSURE = _crSpanStyle(SC.PRESSURE)

export const S_SERIA = _crSpanStyle(SC.SERIA)
export const S_CIRCLE_SERIA = _crCircleStyle(SC.SERIA)

export const S_POINTER = {
  lineHeight: 2,
  cursor: 'pointer'
}
export const S_FILTERED = {
  color: SC.FILTERED
}
