import {
  S_SERIA,
  S_TOOLTIP_ROW,
  S_CAPTION
} from './Label.Style';

const TooltipRow1 = ({
  t,
  v,
  style=S_SERIA
}) => v == null ? null : (
 <div style={S_TOOLTIP_ROW}>
   <span style={S_CAPTION}>{`${t}:`}</span>
   <span style={style}>{v}</span>
 </div>
);

export default TooltipRow1
