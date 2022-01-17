import STYLE from './Label.Style';

const TooltipContent = ({
  caption,
  children
}) => (
 <div style={STYLE.ROOT_DIV} >
    <div>
     <span style={STYLE.DAY}>{caption}</span>
    </div>
    {children}
 </div>
);

export default TooltipContent
