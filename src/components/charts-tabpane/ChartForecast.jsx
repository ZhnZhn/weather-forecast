import memoEqual from '../hoc/memoEqual'

import {
  YAxis,
  Legend
} from '../charts/Chart';

import dt from '../../utils/dt';
import { sForecast } from '../../flux/selectors';

import useSeriesFilter from './useSeriesFilter';
import useSelectorData from './useSelectorData';
import useIsNoData from './useIsNoData';
import ChartType1 from './ChartType1';
import {
  crYAxisRain,
  crYAxisPressure,
  crYAxisWindSpeed,
  crYAxisSnow
} from './crYAxis';
import crListSeries from './crListSeries';
import TooltipForecast from './TooltipForecast';
import LegendForecast from './LegendForecast';
import STYLE from './Chart.Style';

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
  humidity: true,
  snow: true
};

const _transformForecast = (arr=[]) => arr
 .map(({ dt:timestamp, rain=0, speed, temp, pressure, humidity, snow=0 }) => {
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
       rain,
       speed,
       pressure,
       humidity,
       snow
    };
});

const T_Y_ID = 1
, WIND_SPEED_Y_ID = 2
, PRESSURE_Y_ID = 3
, HUMIDITY_Y_ID = 4
, RAIN_Y_ID = 5
, SNOW_Y_ID = 6
, SERIA_CONFIGS = [{
  id: 'rain',
  type: 'bar',
  yId: RAIN_Y_ID,
  style: STYLE.BarRain,
},{ id: 'speed', yId: WIND_SPEED_Y_ID , style: STYLE.LineSpeed
},{ id: 'pressure', yId: PRESSURE_Y_ID, style: STYLE.LinePressure
},{ id: 'humidity', yId: HUMIDITY_Y_ID, style: STYLE.LineHumidity
},{ id: 'snow', type: 'bar', yId: SNOW_Y_ID, style: STYLE.BarSnow
},{ id: 'tempMin', style: STYLE.LineTempMin
},{ id: 'tempMax', style: STYLE.LineTempMax
},{ id: 'tempEve', style: STYLE.LineTempEve
},{ id: 'tempMorn', style: STYLE.LineTempMorn
},{ id: 'tempNight', style: STYLE.LineTempNight
},{ id: 'tempDay', style: STYLE.LineTempDay}
];

const _selectRecentById = state => {
  const recent = sForecast.recent(state);
  return recent
    ? sForecast.listById(state, recent)
    : void 0;
};

const ChartForecast = () => {
  const [filtered, _hFilter] = useSeriesFilter(INITIAL_FILTERED)
  , data = useSelectorData(_selectRecentById, _transformForecast)
  , isNot = useIsNoData(data);

  return (
    <ChartType1
       chartStyle={STYLE.ComposedChart}
       data={data}
       TooltipComp={TooltipForecast}
    >
      <YAxis
         yAxisId={T_Y_ID}
         label={YAXIS_LABEL_TEMP}
      />
      {crYAxisWindSpeed(WIND_SPEED_Y_ID, filtered)}
      {crYAxisPressure(PRESSURE_Y_ID, filtered)}
      {crYAxisWindSpeed(HUMIDITY_Y_ID, filtered, 'humidity', '%')}
      {!isNot.rain && crYAxisRain(RAIN_Y_ID, filtered)}
      {!isNot.snow && crYAxisSnow(SNOW_Y_ID, filtered)}
      <Legend
        content={(
           <LegendForecast
              isNot={isNot}
              filtered={filtered}
              onFilter={_hFilter}
            />
        )}
      />
      {crListSeries(SERIA_CONFIGS, filtered, isNot)}
    </ChartType1>
  );
};

export default memoEqual(ChartForecast)
