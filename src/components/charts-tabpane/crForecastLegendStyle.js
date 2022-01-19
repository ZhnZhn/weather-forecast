import S from './Label.Style';

const _assign = Object.assign
, _crLabelStyle = (is, style) => is
  ? _assign({}, style, S.POINTER, S.FILTERED)
  : _assign({}, style, S.POINTER);

const crForecastLegendStyle = (filtered) => _assign({}, {
  tempMorn: _crLabelStyle(filtered.tempMorn, S.TEMP_DAY),
  tempDay: _crLabelStyle(filtered.tempDay, S.TEMP_DAY),
  tempEve: _crLabelStyle(filtered.tempEve, S.TEMP_NIGHT),
  tempNight: _crLabelStyle(filtered.tempNight, S.TEMP_NIGHT),
  tempMax: _crLabelStyle(filtered.tempMax, S.TEMP_MAX),
  tempMin: _crLabelStyle(filtered.tempMin, S.TEMP_MIN),
  rain: _crLabelStyle(filtered.rain, S.RAIN),
  speed: _crLabelStyle(filtered.speed, S.SPEED),
  pressure: _crLabelStyle(filtered.pressure, S.PRESSURE),
  humidity: _crLabelStyle(filtered.humidity, S.HUMIDITY)
});

export default crForecastLegendStyle
