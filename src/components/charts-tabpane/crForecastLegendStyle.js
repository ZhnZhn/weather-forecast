import S from './Label.Style';

const _assign = Object.assign;

const _crLabelStyle = (is, style) => is
  ? _assign({}, style, S.POINTER, S.FILTERED)
  : _assign({}, style, S.POINTER);

const crForecastLegendStyle = (filtered) => {
  const _styles = {};
  _styles.tempMorn = _crLabelStyle(filtered.tempMorn, S.TEMP_DAY)
  _styles.tempDay = _crLabelStyle(filtered.tempDay, S.TEMP_DAY)
  _styles.tempEve = _crLabelStyle(filtered.tempEve, S.TEMP_NIGHT)
  _styles.tempNight = _crLabelStyle(filtered.tempNight, S.TEMP_NIGHT)
  _styles.tempMax = _crLabelStyle(filtered.tempMax, S.TEMP_MAX)
  _styles.tempMin = _crLabelStyle(filtered.tempMin, S.TEMP_MIN)
  _styles.rain = _crLabelStyle(filtered.rain, S.RAIN)
  _styles.speed = _crLabelStyle(filtered.speed, S.SPEED)
  _styles.pressure = _crLabelStyle(filtered.pressure, S.PRESSURE)
  _styles.humidity = _crLabelStyle(filtered.humidity, S.HUMIDITY)
  return _styles;
};

export default crForecastLegendStyle
