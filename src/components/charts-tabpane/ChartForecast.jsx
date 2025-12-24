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
import {
  S_COMPOSED_CHART,
  S_BAR_RAIN,
  S_BAR_SNOW,
  S_LINE_SPEED,
  S_LINE_PRESSURE,
  S_LINE_HUMIDITY,
  S_LINE_TEMP_MIN,
  S_LINE_TEMP_MAX,
  S_LINE_TEMP_MORNING,
  S_LINE_TEMP_DAY,
  S_LINE_TEMP_EVE,
  S_LINE_TEMP_NIGHT
} from './Chart.Style';
import {
  YAXIS_LABEL_TEMPERATURE
} from './YAxisLabel.Style';

const YAXIS_LABEL_TEMP = {
  ...YAXIS_LABEL_TEMPERATURE,    
  offset: 8,
  xTopOffset: 28
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

const _transformForecast = (
  arr
) => (arr||[])
 .map(({ dt:timestamp, rain=0, speed, temp, pressure, humidity, snow=0 }) => {
   const {
       day=null,
       night=null,
       morn=null,
       eve=null,
       max=null,
       min=null
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
  style: S_BAR_RAIN,
},{ id: 'speed', yId: WIND_SPEED_Y_ID , style: S_LINE_SPEED
},{ id: 'pressure', yId: PRESSURE_Y_ID, style: S_LINE_PRESSURE
},{ id: 'humidity', yId: HUMIDITY_Y_ID, style: S_LINE_HUMIDITY
},{ id: 'snow', type: 'bar', yId: SNOW_Y_ID, style: S_BAR_SNOW
},{ id: 'tempMin', style: S_LINE_TEMP_MIN
},{ id: 'tempMax', style: S_LINE_TEMP_MAX
},{ id: 'tempEve', style: S_LINE_TEMP_EVE
},{ id: 'tempMorn', style: S_LINE_TEMP_MORNING
},{ id: 'tempNight', style: S_LINE_TEMP_NIGHT
},{ id: 'tempDay', style: S_LINE_TEMP_DAY}
];

const _selectRecentById = (
  state
) => {
  const recent = sForecast.recent(state);
  return recent
    ? sForecast.listById(state, recent)
    : void 0;
};

const ChartForecast = () => {
  const [
    filtered,
    _hFilter
  ] = useSeriesFilter(INITIAL_FILTERED)
  , data = useSelectorData(_selectRecentById, _transformForecast)
  , isNot = useIsNoData(data);

  return (
    <ChartType1
       chartStyle={S_COMPOSED_CHART}
       data={data}
       TooltipComp={TooltipForecast}
       tooltipTrigger="click"
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
