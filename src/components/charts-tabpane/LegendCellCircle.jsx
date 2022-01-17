import LegendCell from './LegendCell';
import SvgCircle from './SvgCircle';

import S from './Label.Style';

const LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

const LegendCellCircle = ({
  circleStyle=S.CIRCLE_SERIA,
  ...restProps
}) => (
  <LegendCell
    style={LS_ITEM}
    {...restProps}
  >
    <SvgCircle {...circleStyle} />
  </LegendCell>
);

export default LegendCellCircle
