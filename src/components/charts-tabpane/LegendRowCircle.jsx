import LegendCellCircle from './LegendCellCircle';
import S from './Label.Style';

const _crLabelStyle = (is, style=S.SERIA) => is
  ? {...style, ...S.FILTERED}
  : style;

const LegendRowCircle = ({
  style,
  configs,
  filtered,
  onFilter
}) => (
  <div style={style}>
  {
    configs.map(({
      id,
      title,
      tStyle,
      cStyle
     }) => (
       <LegendCellCircle
         key={id}
         title={title || id.toUpperCase()}
         titleStyle={_crLabelStyle(filtered[id], tStyle)}
         circleStyle={cStyle}
         onClick={() => onFilter(id)}
       />
     ))
   }
   </div>
);

export default LegendRowCircle
