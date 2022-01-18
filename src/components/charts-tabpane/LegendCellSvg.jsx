import LegendCell from './LegendCell';
import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';

import S from './Label.Style';

const LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

const LegendCellSvg = ({
  svgStyle=S.CIRCLE_SERIA,
  svgType,
  ...restProps
}) => {
  const SvgComp = svgType === 'rect'
    ? SvgRect
    : SvgCircle;
  return (
    <LegendCell
      style={LS_ITEM}
      {...restProps}
    >
      <SvgComp {...svgStyle} />
    </LegendCell>
  );
};

export default LegendCellSvg
