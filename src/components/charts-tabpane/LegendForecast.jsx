import { memo } from '../uiApi';

import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import LegendCell from './LegendCell';
import crForecastLegendStyle from './crForecastLegendStyle'
import S from './Label.Style';

const S_ROOT_DIV = { margin: '1rem 0 0 3rem' }
, S_INLINE = { display: 'inline-block' }
, S_COL_MR1 = {
  ...S_INLINE,
  marginRight: '1rem'
}
, S_COL_ML1 = {
  ...S_INLINE,
  marginLeft: '1rem'
};

const areEqual = (prevProps, nextProps) =>
  prevProps.filtered === nextProps.filtered
  && prevProps.isSnow === nextProps.isSnow;

const LegendForecast = ({
  isSnow,
  filtered,
  onFilter
}) => {
  const styles = crForecastLegendStyle(filtered);
  return (
  <div style={S_ROOT_DIV}>
     <div style={S_COL_MR1}>
       <LegendCell
         titleStyle={styles.tempMorn}
         title="T Morn"
         onClick={() => onFilter('tempMorn')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MORN} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempDay}
         title="T Day"
         onClick={() => onFilter('tempDay')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_DAY} />
       </LegendCell>
     </div>
     <div style={S_INLINE}>
       <LegendCell
         titleStyle={styles.tempEve}
         title="T Eve"
         onClick={() => onFilter('tempEve')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_EVE} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempNight}
         title="T Night"
         onClick={() => onFilter('tempNight')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_NIGHT} />
       </LegendCell>
     </div>
     <div style={S_COL_ML1}>
       <LegendCell
         titleStyle={styles.tempMax}
         title="T Max"
         onClick={() => onFilter('tempMax')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MAX} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempMin}
         title="T Min"
         onClick={() => onFilter('tempMin')}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MIN} />
       </LegendCell>
     </div>
     <div style={S_COL_ML1}>
       <LegendCell
         titleStyle={styles.rain}
         title="Rain"
         onClick={() => onFilter('rain')}
       >
         <SvgRect {...S.RECT_RAIN} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.speed}
         title="Wind"
         onClick={() => onFilter('speed')}
       >
         <SvgCircle {...S.CIRCLE_SPEED} />
       </LegendCell>
     </div>
     <div style={S_COL_ML1}>
       <LegendCell
         titleStyle={styles.pressure}
         title="Pressure"
         onClick={() => onFilter('pressure')}
       >
         <SvgCircle {...S.CIRCLE_PRESSURE} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.humidity}
         title="Humidity"
         onClick={() => onFilter('humidity')}
       >
         <SvgCircle {...S.CIRCLE_HUMIDITY} />
       </LegendCell>
     </div>
     {
       isSnow && <div style={S_COL_ML1}>
          <LegendCell
            titleStyle={styles.snow}
            title="Snow"
            onClick={() => onFilter('snow')}
          >
            <SvgRect {...S.RECT_SNOW} />
          </LegendCell>
       </div>
     }
  </div>
)}

export default memo(LegendForecast, areEqual)
