import {
  S_TOOLTIP,
  S_DAY
} from './Label.Style';

const TooltipContent = ({
  caption,
  children
}) => (
 <div style={S_TOOLTIP} >
    <div>
     <span style={S_DAY}>{caption}</span>
    </div>
    {children}
 </div>
);

export default TooltipContent
