import Chart from '../charts/Chart';
import STYLE from './Chart.Style';
import {
  YAXIS_LABEL_TEMPERATURE,
  YAXIS_LABEL_PRESSURE,
  YAXIS_LABEL_WIND,
  YAXIS_LABEL_RAIN,
  YAXIS_LABEL_SNOW,
} from './YAxisLabel.Style';

const { YAxis } = Chart;

export const crYAxisTemp = (yId, filtered) => (
  <YAxis
     label={YAXIS_LABEL_TEMPERATURE}
     yAxisId={yId}
     orientation="right"
     width={45}
     hide={filtered.temp}
     dataKey="temp"
  />
);

export const crYAxisPressure = (yId, filtered) => (
  <YAxis {...STYLE.YAxisPressure}
     label={YAXIS_LABEL_PRESSURE}
     orientation="right"
     width={80}
     type="number"
     domain={['dataMin', 'dataMax']}
     yAxisId={yId}
     hide={filtered.pressure}
     dataKey="pressure"
  />
);

export const crYAxisWindSpeed = (yId, filtered) => (
  <YAxis {...STYLE.YAxisSpeed}
    label={YAXIS_LABEL_WIND}
    orientation="right"
    width={45}
    yAxisId={yId}
    hide={filtered.speed}
    dataKey="speed"
  />
);

export const crYAxisRain = (yId, filtered) => (
  <YAxis {...STYLE.YAxisRain}
      label={YAXIS_LABEL_RAIN}
      orientation="right"
      width={54}
      yAxisId={yId}
      hide={filtered.rain}
      dataKey="rain"
   />
);

export const crYAxisSnow = (yId, filtered) => (
  <YAxis {...STYLE.YAxisSnow}
      label={YAXIS_LABEL_SNOW}
      orientation="right"
      width={54}
      yAxisId={yId}
      hide={filtered.snow}
      dataKey="snow"
   />
);
