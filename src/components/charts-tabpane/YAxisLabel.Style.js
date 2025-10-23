import {
  SPEED_COLOR,
  RAIN_COLOR,
  SNOW_COLOR,
  PRESSURE_COLOR  
} from './SeriesColor';

const LABEL_POSITION = {
  position: "top",
  offset: 10
};

const _crLabelColor = color => ({
  stroke: color,
  fill: color
});

export const YAXIS_LABEL_TEMPERATURE = {
  ...LABEL_POSITION,
  value: "°C"
};

export const YAXIS_LABEL_PRESSURE = {
  ...LABEL_POSITION,
  ..._crLabelColor(PRESSURE_COLOR),
  value: "hPa",
  xTopOffset: -10
};

export const crYAxisLabelWind = (value='m/s') => ({
  ...LABEL_POSITION,
  ..._crLabelColor(SPEED_COLOR),
  value
});

export const YAXIS_LABEL_RAIN = {
  ...LABEL_POSITION,
  ..._crLabelColor(RAIN_COLOR),
  value: "mm"
};

export const YAXIS_LABEL_SNOW = {
  ...YAXIS_LABEL_RAIN,
  ..._crLabelColor(SNOW_COLOR)
};
