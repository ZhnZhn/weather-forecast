
import {COLOR as C, POPUP as P} from '../styles/theme';
import SC from './SeriesColor';

const _crCircleStyle = (stroke='green', fill) => ({
  stroke,
  fill: fill || stroke
});
const _crSpanStyle = (color='green') => ({
  color,
  fontWeight: 'bold'
});

const CAPTION_STYLE = {
  display: 'inline-block',
  color: C.LABEL.color,
  fontWeight: 'bold',
};

const STYLE = {
  ROOT_DIV : {
    ...P.CHART,
    padding: 8
  },
  LABEL : {
    ...CAPTION_STYLE,
    width: 50
  },
  CAPTION: {
    ...CAPTION_STYLE,
    paddingRight: 4
  },
  ROW: {
    paddingTop: 8
  },

  DAY : _crSpanStyle(C.DAY.color),

  CIRCLE_SPEED : _crCircleStyle(SC.SPEED, "none"),
  SPEED : _crSpanStyle(SC.SPEED),

  CIRCLE_HUMIDITY : _crCircleStyle(SC.SPEED),
  HUMIDITY : _crSpanStyle(SC.SPEED),

  //CIRCLE_RAIN : _crCircleStyle(SC.RAIN),
  RECT_RAIN : { stroke : SC.RAIN},
  RAIN : _crSpanStyle(SC.RAIN),

  RECT_SNOW : { stroke : SC.SNOW},
  SNOW: _crSpanStyle(SC.SNOW),


  CIRCLE_TEMP_MAX : _crCircleStyle(SC.TEMP_MAX, 'none'),
  TEMP_MAX : _crSpanStyle(SC.TEMP_MAX),

  CIRCLE_TEMP_MIN : _crCircleStyle(SC.TEMP_MIN, 'none'),
  TEMP_MIN : _crSpanStyle(SC.TEMP_MIN),

  CIRCLE_TEMP_MORN : _crCircleStyle(C.TEMP_DAY.color, 'none'),

  CIRCLE_TEMP_DAY : _crCircleStyle(C.TEMP_DAY.color),
  TEMP_DAY : _crSpanStyle(C.TEMP_DAY.color),

  CIRCLE_TEMP_EVE : _crCircleStyle(C.TEMP_NIGHT.color, 'none'),

  CIRCLE_TEMP_NIGHT : _crCircleStyle(C.TEMP_NIGHT.color),
  TEMP_NIGHT : _crSpanStyle(C.TEMP_NIGHT.color),

  CIRCLE_PRESSURE : _crCircleStyle(SC.PRESSURE),
  PRESSURE: _crSpanStyle(SC.PRESSURE),

  SERIA : _crSpanStyle(SC.SERIA),
  CIRCLE_SERIA : _crCircleStyle(SC.SERIA),

  POINTER : {
    lineHeight : 2,
    cursor : 'pointer'
  },
  FILTERED : {
    color : SC.FILTERED
  }
};

export default STYLE
