import classNames from 'classnames';

import { Layer } from '../container/Layer';
import { Dot } from '../shape/Dot';
import { Label } from '../component/Label';
import { isNumOrStr } from '../util/DataUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { createLabeledScales } from '../util/CartesianUtils';
import { filterProps } from '../util/ReactUtils';
import { fCreateElement } from './cartesianFn';

const CL_REFERENCE_DOT = 'recharts-reference-dot'
, CL_REFERENCE_DOT_DOT = `${CL_REFERENCE_DOT}-dot`
, DISCARD = 'discard'
, HIDDEN = 'hidden';

const getCoordinate = (
  props
) => {
  const { x, y, xAxis, yAxis } = props
  , scales = createLabeledScales({
     x: xAxis.scale,
     y: yAxis.scale
   })
  , result = scales.apply({ x, y }, { bandAware: true });
  return ifOverflowMatches(props, DISCARD) && !scales.isInRange(result)
    ? null
    : result;
};

export const ReferenceDot = (
  props
) => {
    const {
      x,
      y,
      r,
      clipPathId
    } = props
    , isX = isNumOrStr(x)
    , isY = isNumOrStr(y);

    if (!isX || !isY) {
      return null;
    }

    const coordinate = getCoordinate(props);
    if (!coordinate) {
      return null;
    }

    const { x: cx, y: cy } = coordinate
    , { shape, className } = props
    , clipPath = ifOverflowMatches(props, HIDDEN)
       ? `url(#${clipPathId})`
       : void 0
    , dotProps = {
        clipPath,
        ...filterProps(props, true),
        cx,
        cy,
    };

    return (
     <Layer className={classNames(CL_REFERENCE_DOT, className)}>
        {ReferenceDot.renderDot(shape, dotProps)}
        {Label.renderCallByParent(props, {
           x: cx - r,
           y: cy - r,
           width: 2 * r,
           height: 2 * r,
        })}
     </Layer>
  );
}

ReferenceDot.displayName = 'ReferenceDot'
ReferenceDot.defaultProps = {
    isFront: false,
    ifOverflow: DISCARD,
    xAxisId: 0,
    yAxisId: 0,
    r: 10,
    fill: '#fff',
    stroke: '#ccc',
    fillOpacity: 1,
    strokeWidth: 1,
}

const _crDotElement = (
  props
) => (
  <Dot
    {...props}
    cx={props.cx}
    cy={props.cy}
    className={CL_REFERENCE_DOT_DOT}
  />
);

ReferenceDot.renderDot = fCreateElement(_crDotElement)
