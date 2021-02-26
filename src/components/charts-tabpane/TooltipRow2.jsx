import React from '../_react'

import STYLE from './Label.Style'

const _crValue = v => v == null
 ? ''
 : v;

const TitleValue = ({ t, v, style }) => (
  <>
   <span style={STYLE.LABEL}>{`${t}:`}</span>
   <span style={style}>{_crValue(v)}&nbsp;</span>
  </>
);

const TooltipRow2 = ({t1, v1, t2, v2, style1, style2}) => {
  if ( v1 == null && v2 == null) {
    return null;
  }
  return (
   <div style={STYLE.ROW}>
     <TitleValue t={t1} v={v1} style={style1} />
     <TitleValue t={t2} v={v2} style={style2||style1} />
   </div>
  );
}

export default TooltipRow2
