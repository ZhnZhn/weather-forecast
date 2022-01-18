import SC from './SeriesColor';

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
  ..._crLabelColor(SC.PRESSURE),
  value: "hPa"
};

export const YAXIS_LABEL_WIND = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.SPEED),
  value: "m/s"
};

export const YAXIS_LABEL_RAIN = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.RAIN),
  value: "mm"
};

export const YAXIS_LABEL_SNOW = {
  ...YAXIS_LABEL_RAIN,
  ..._crLabelColor(SC.SNOW)
};
