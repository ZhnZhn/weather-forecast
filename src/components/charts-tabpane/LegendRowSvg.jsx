import LegendCellSvg from './LegendCellSvg';
import S from './Label.Style';

const _crLabelStyle = (is, style=S.SERIA) => is
  ? {...style, ...S.FILTERED}
  : style;

const _crTitle = id => id.length < 4
  ? id.toUpperCase()
  : id[0].toUpperCase() + id.substring(1);

const DF_NOT_IS = Object.create(null);

const LegendRowSvg = ({
  style,
  configs,
  notIs=DF_NOT_IS,
  filtered,
  onFilter
}) => (
  <div style={style}>
  {
    configs.map(({
      id,
      title,
      titleStyle,
      svgType,
      svgStyle
    }) => notIs[id] ? null : (
       <LegendCellSvg
         key={id}
         title={title || _crTitle(id)}
         titleStyle={_crLabelStyle(filtered[id], titleStyle)}
         svgType={svgType}
         svgStyle={svgStyle}
         onClick={() => onFilter(id)}
       />
     ))
   }
   </div>
);

export default LegendRowSvg
