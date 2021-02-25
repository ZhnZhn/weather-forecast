
import {COLOR as C, POPUP as P} from '../styles/theme';


const _assign = Object.assign;
/*
const _assign = (...args) => {
  args.unshift({});
  return Object.assign.apply(Object, args);
}
*/

const _crLabelStyle = (is, style) => is
  ? _assign({}, style, S.POINTER)
  : _assign({}, style, S.POINTER, S.FILTERED);


let _filters;
let _styles = {};
const _crLegendStyles = (filters) => {
  if (_filters !== filters){
     _styles.tempMorn = _crLabelStyle(filters.tempMorn, S.TEMP_DAY)
     _styles.tempDay = _crLabelStyle(filters.tempDay, S.TEMP_DAY)
     _styles.tempEve = _crLabelStyle(filters.tempEve, S.TEMP_NIGHT)
     _styles.tempNight = _crLabelStyle(filters.tempNight, S.TEMP_NIGHT)
     _styles.tempMax = _crLabelStyle(filters.tempMax, S.TEMP_MAX)
     _styles.tempMin = _crLabelStyle(filters.tempMin, S.TEMP_MIN)
     _styles.rain = _crLabelStyle(filters.rain, S.RAIN)
     _styles.speed = _crLabelStyle(filters.speed, S.SPEED)
     return _assign({}, _styles);
  }
  return _styles;
}

const _fnCircle = (stroke='green', fill) => {
  fill = (fill) ? fill : stroke
  return {
    stroke : stroke,
    fill: fill
  }
}
const _fnSpan = (color='green') => {
  return {
    color, fontWeight : 'bold'
  }
}

const CAPTION_STYLE = {
  display: 'inline-block',
  color: C.LABEL.color,
  fontWeight: 'bold',
}

const S = {
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

  DAY : _fnSpan(C.DAY.color),

  CIRCLE_SPEED : _fnCircle("#3F51B5", "none"),
  SPEED : _fnSpan('#3f51b5'),

  CIRCLE_RAIN : _fnCircle("#0922A5"),
  RECT_RAIN : { stroke : '#0922a5'},
  RAIN : _fnSpan('#0922a5'),

  CIRCLE_TEMP_MAX : _fnCircle('#F44336', 'none'),
  TEMP_MAX : _fnSpan('#F44336'),

  CIRCLE_TEMP_MIN : _fnCircle('#03A9F4', 'none'),
  TEMP_MIN : _fnSpan('#03a9f4'),

  CIRCLE_TEMP_MORN : _fnCircle(C.TEMP_DAY.color, 'none'),

  CIRCLE_TEMP_DAY : _fnCircle(C.TEMP_DAY.color),
  TEMP_DAY : _fnSpan(C.TEMP_DAY.color),

  CIRCLE_TEMP_EVE : _fnCircle(C.TEMP_NIGHT.color, 'none'),

  CIRCLE_TEMP_NIGHT : _fnCircle(C.TEMP_NIGHT.color),
  TEMP_NIGHT : _fnSpan(C.TEMP_NIGHT.color),

  CIRCLE_PRESSURE : _fnCircle("#0D2339"),

  POINTER : {
    cursor : 'pointer',
    lineHeight : 2
  },
  FILTERED : {
    color : '#9e9e9e'
  },
  crLegendStyles : _crLegendStyles
}

export default S
