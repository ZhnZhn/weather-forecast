import { YAxis } from '../charts/Chart';

import {
  S_YAXIS_RAIN,
  S_YAXIS_SNOW,
  S_YAXIS_SPEED,
  S_YAXIS_PRESSURE
} from './Chart.Style';

import {
  YAXIS_LABEL_TEMPERATURE,
  YAXIS_LABEL_PRESSURE,
  crYAxisLabelWind,
  YAXIS_LABEL_RAIN,
  YAXIS_LABEL_SNOW,
} from './YAxisLabel.Style';

export const crYAxisTemp = (
  yId,
  filtered
) => (
  <YAxis
     label={YAXIS_LABEL_TEMPERATURE}
     yAxisId={yId}
     orientation="right"
     width={45}
     hide={filtered.temp}
     dataKey="temp"
  />
)

export const crYAxisPressure = (
  yId,
  filtered
) => (
  <YAxis {...S_YAXIS_PRESSURE}
     label={YAXIS_LABEL_PRESSURE}
     orientation="right"
     width={80}
     type="number"
     domain={['dataMin', 'dataMax']}
     yAxisId={yId}
     hide={filtered.pressure}
     dataKey="pressure"
  />
)

export const crYAxisWindSpeed = (
  yId,
  filtered,
  id='speed',
  value
) => (
  <YAxis {...S_YAXIS_SPEED}
    label={crYAxisLabelWind(value)}
    orientation="right"
    width={45}
    yAxisId={yId}
    hide={filtered[id]}
    dataKey={id}
  />
)

export const crYAxisRain = (
  yId,
  filtered
) => (
  <YAxis {...S_YAXIS_RAIN}
      label={YAXIS_LABEL_RAIN}
      orientation="right"
      width={54}
      yAxisId={yId}
      hide={filtered.rain}
      dataKey="rain"
   />
)

export const crYAxisSnow = (
  yId,
  filtered
) => (
  <YAxis {...S_YAXIS_SNOW}
      label={YAXIS_LABEL_SNOW}
      orientation="right"
      width={54}
      yAxisId={yId}
      hide={filtered.snow}
      dataKey="snow"
   />
)
