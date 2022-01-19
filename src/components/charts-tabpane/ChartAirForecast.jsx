
import memoEqual from '../hoc/memoEqual';
import Chart from '../charts/Chart';
import { sAir } from '../../flux/selectors';
import dt from '../../utils/dt';

import useSeriesFilter from './useSeriesFilter';
import useSelectorData from './useSelectorData';
import ChartType1 from './ChartType1';
import TooltipAirForecast from './TooltipAirForecast';
import LegendAirForecast from './LegendAirForecast';
import crListSeries from './crListSeries';
import STYLE from './Chart.Style';
import SC from './SeriesColor';

const {
 YAxis,
 Legend,
} = Chart;

const _crLabelColor = color => ({
  stroke: color,
  fill: color
});

const LABEL_POSITION = {
  position: "top",
  offset: 10
}
, LABEL_M3 = {
  ...LABEL_POSITION,
  value: "μg/m3"
}
, LABEL_CO = {
  ...LABEL_M3,
  ..._crLabelColor(SC.PRESSURE)
}
, LABEL_AQI = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.SPEED),
  value: "AQI"
};

const INITIAL_FILTERED = {
  aqi: false,
  co: false,
  no2: true,
  o3: true,
  pm2_5: true,
  pm10: true,
  no: true,
  nh3: true,
  so2: true
};

/*
co: 283.72
nh3: 0.39
no: 7.38
no2: 17.65
o3: 26.82
pm2_5: 19.57
pm10: 21.37
so2: 2.12
*/

const _transformAirForecast = arr => arr
 .map(({ dt:timestamp, components, main }) => {
   const _dh = dt.toDayHour(timestamp)
   , { aqi } = main || {};
   return {
     ...components,
     day: _dh,
     dt_text: `${_dh}:00`,
     aqi
   };
 })



const LINE_CONFIGS = [
{
  id: 'aqi',
  yId: 2,
  style: STYLE.LineSpeed
},{ id: 'no2' },{ id: 'o3'}, { id: 'pm2_5'}, { id: 'pm10' },{
  id: 'co',
  yId: 3,
  style: STYLE.LinePressure,
}, { id: 'no'}, { id: 'nh3'}, { id: 'so2'}
];


const ChartAirForecast = () => {
  const [filtered, _hFilter] = useSeriesFilter(INITIAL_FILTERED)
  , data = useSelectorData(sAir.forecast, _transformAirForecast)
  , _isHideYAxis1 = filtered.no2
       && filtered.o3
       && filtered.pm10
       && filtered.pm2_5
       && filtered.no
       && filtered.nh3
       && filtered.so2;

  return (
    <ChartType1
      data={data}
      TooltipComp={TooltipAirForecast}
    >
        <YAxis
           yAxisId={1}
           orientation="right"
           width={45}
           label={LABEL_M3}
           hide={_isHideYAxis1}
        />
        <YAxis
           yAxisId={2}
           orientation="right"
           width={45}
           label={LABEL_AQI}
           dataKey="aqi"
           hide={filtered.aqi}
           {...STYLE.YAxisSpeed}
        />
        <YAxis
           yAxisId={3}
           orientation="right"
           width={45}
           label={LABEL_CO}
           dataKey="co"
           hide={filtered.co}
           {...STYLE.YAxisPressure}
        />
        <Legend
           content={
               <LegendAirForecast
                  filtered={filtered}
                  onFilter={_hFilter}
               />
            }
        />
        {crListSeries(LINE_CONFIGS, filtered)}
      </ChartType1>
  );
};

export default memoEqual(ChartAirForecast)
