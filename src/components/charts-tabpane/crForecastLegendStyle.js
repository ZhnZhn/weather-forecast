import S from './Label.Style';

const _assign = Object.assign;

const _crLabelStyle = (is, style) => is
  ? _assign({}, style, S.POINTER)
  : _assign({}, style, S.POINTER, S.FILTERED);

const crForecastLegendStyle = (filters) => {
  const _styles = {};
  _styles.tempMorn = _crLabelStyle(filters.tempMorn, S.TEMP_DAY)
  _styles.tempDay = _crLabelStyle(filters.tempDay, S.TEMP_DAY)
  _styles.tempEve = _crLabelStyle(filters.tempEve, S.TEMP_NIGHT)
  _styles.tempNight = _crLabelStyle(filters.tempNight, S.TEMP_NIGHT)
  _styles.tempMax = _crLabelStyle(filters.tempMax, S.TEMP_MAX)
  _styles.tempMin = _crLabelStyle(filters.tempMin, S.TEMP_MIN)
  _styles.rain = _crLabelStyle(filters.rain, S.RAIN)
  _styles.speed = _crLabelStyle(filters.speed, S.SPEED)
  _styles.pressure = _crLabelStyle(filters.pressure, S.PRESSURE)
  _styles.humidity = _crLabelStyle(filters.humidity, S.HUMIDITY)
  return _styles;
};

export default crForecastLegendStyle
