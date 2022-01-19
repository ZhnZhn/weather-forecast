import memoEqual from '../hoc/memoEqual'
import Chart from '../charts/Chart';
import dt from '../../utils/dt';
import { sForecast } from '../../flux/selectors';

import useSeriesFilter from './useSeriesFilter';
import useSelectorData from './useSelectorData';
import ChartType1 from './ChartType1';
import {
  crYAxisRain,
  crYAxisPressure,
  crYAxisWindSpeed
} from './crYAxis';
import crListSeries from './crListSeries';
import TooltipForecast from './TooltipForecast';
import LegendForecast from './LegendForecast';
import STYLE from './Chart.Style';

const {
  YAxis,
  Legend
} = Chart;

const YAXIS_LABEL_TEMP = {
    value: "°C",
    //position: "top",
    //offset: 8,

   //offset: -18,
   //position: 'insideTop'
   //angle: -90,
   //position: 'insideLeft'
   //offset: 10,
   //position: "insideTopRight",
   //position: "insideStart"
};

const INITIAL_FILTERED = {
  tempDay: false,
  tempNight: true,
  tempMorn: true,
  tempEve: true,
  tempMax: true,
  tempMin: true,
  rain: true,
  speed: true,
  pressure: true,
  humidity: true
};

const _transformForecast = (arr=[]) => arr
 .map(({ dt:timestamp, rain=0, speed, temp, pressure, humidity }) => {
   const {
       day=null, night=null, morn=null,
       eve=null, max=null, min=null
    } = temp || {};
    return {
       day: dt.toShortDayOfWeek(timestamp),
       tempDay: day,
       tempNight: night,
       tempMorn: morn,
       tempEve: eve,
       tempMax: max,
       tempMin: min,
       rain, speed,
       pressure,
       humidity
    };
});

const SERIA_CONFIGS = [{
  id: 'rain',
  type: 'bar',
  yId: 2,
  style: STYLE.BarRain,
},{ id: 'speed', yId: 3 , style: STYLE.LineSpeed
},{ id: 'pressure', yId: 4, style: STYLE.LinePressure
},{ id: 'humidity', yId: 5, style: STYLE.LineHumidity
},{ id: 'tempMin', style: STYLE.LineTempMin
},{ id: 'tempMax', style: STYLE.LineTempMax
},{ id: 'tempEve', style: STYLE.LineTempEve
},{ id: 'tempMorn', style: STYLE.LineTempMorn
},{ id: 'tempNight', style: STYLE.LineTempNight
},{ id: 'tempDay', style: STYLE.LineTempDay}
]

const _selectRecentById = state => {
  const recent = sForecast.recent(state);
  return recent
    ? sForecast.listById(state, recent)
    : void 0;
};

const ChartForecast = () => {
  const [filtered, _hFilter] = useSeriesFilter(INITIAL_FILTERED)
  , data = useSelectorData(_selectRecentById, _transformForecast);

  return (
    <ChartType1
       chartStyle={STYLE.ComposedChart}
       data={data}
       TooltipComp={TooltipForecast}
    >
      <YAxis
         yAxisId={1}
         label={YAXIS_LABEL_TEMP}
      />
      {crYAxisRain(2, filtered)}
      {crYAxisWindSpeed(3, filtered)}
      {crYAxisPressure(4, filtered)}
      {crYAxisWindSpeed(5, filtered, 'humidity', '%')}
      <Legend
        content={(
           <LegendForecast
               filtered={filtered}
               onFilter={_hFilter}
            />
        )}
      />
      {crListSeries(SERIA_CONFIGS, filtered)}
    </ChartType1>
  );
};

export default memoEqual(ChartForecast)