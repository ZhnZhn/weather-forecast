import { fStopDefaultFor } from '../uiApi';
import BtSvgClose from '../zhn/BtSvgClose';

import {
  S_TOOLTIP,
  S_DAY
} from './Label.Style';

const S_CAPTION = {
  position: 'relative'
}
, S_BT_CLOSE = {
  position: 'absolute',
  top: -2,
  right: 2
}
, COLOR_BT_CLOSE = '#8bc34a';

const TooltipContent = ({
  caption,
  onClose,
  children
}) => (
 <div style={S_TOOLTIP} >
    <div style={S_CAPTION}>
      <span style={S_DAY}>{caption}</span>
      {onClose && <BtSvgClose
        style={S_BT_CLOSE}
        color={COLOR_BT_CLOSE}
        onClose={fStopDefaultFor(onClose)}
      />}
    </div>
    {children}
 </div>
);

export default TooltipContent
