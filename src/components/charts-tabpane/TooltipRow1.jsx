import STYLE from './Label.Style';

const TooltipRow1 = ({
  t,
  v,
  style=STYLE.SERIA
}) => v == null ? null : (
 <div style={STYLE.ROW}>
   <span style={STYLE.CAPTION}>{`${t}:`}</span>
   <span style={style}>{v}</span>
 </div>
);

export default TooltipRow1
