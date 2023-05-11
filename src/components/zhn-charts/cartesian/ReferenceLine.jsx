import classNames from 'classnames';

import _some from 'lodash/some';

import { Layer } from '../container/Layer';
import { Label } from '../component/Label';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { isNumOrStr } from '../util/DataUtils';
import { createLabeledScales, rectWithCoords } from '../util/CartesianUtils';
import { filterProps } from '../util/ReactUtils';
import { fCreateElement } from './cartesianFn';

const CL_REFERENCE_LINE = 'recharts-reference-line'
, CL_REFERENCE_LINE_LINE = `${CL_REFERENCE_LINE}-line`
, DISCARD = 'discard'
, ORIENTATION_LEFT = 'left'
, ORIENTATION_TOP = 'top';

const _crLineElement = (
  props
) => (
  <line {...props} className={CL_REFERENCE_LINE_LINE} />
);

const _renderLine = fCreateElement(_crLineElement);

const getEndPoints = (
  scales,
  isFixedX,
  isFixedY,
  isSegment,
  props
) => {
  const {
    viewBox: { x, y, width, height },
    position
  } = props;
  if (isFixedY) {
    const {
      y: yCoord,
      yAxis: { orientation }
    } = props
    , coord = scales.y.apply(yCoord, { position });
    if (ifOverflowMatches(props, DISCARD) && !scales.y.isInRange(coord)) {
      return null;
    }
    const points = [
      { x: x + width, y: coord },
      { x, y: coord }
    ];
    return orientation === ORIENTATION_LEFT
      ? points.reverse()
      : points;
  }

  if (isFixedX) {
    const {
      x: xCoord,
      xAxis: { orientation }
    } = props
    , coord = scales.x.apply(xCoord, { position });
    if (ifOverflowMatches(props, DISCARD) && !scales.x.isInRange(coord)) {
      return null;
    }
    const points = [
      { x: coord, y: y + height },
      { x: coord, y }
    ];
    return orientation === ORIENTATION_TOP
      ? points.reverse()
      : points;
  }

  if (isSegment) {
    const { segment } = props
    , points = segment
       .map(p => scales.apply(p, { position }));
    return ifOverflowMatches(props, DISCARD)
      && _some(points, p => !scales.isInRange(p))
      ? null
      : points;
  }

  return null;
};

export const ReferenceLine = (props) => {
  const {
    x: fixedX,
    y: fixedY,
    segment,
    xAxis,
    yAxis,
    shape,
    className,
    clipPathId
  } = props
  , scales = createLabeledScales({
     x: xAxis.scale,
     y: yAxis.scale
   })
  , isX = isNumOrStr(fixedX)
  , isY = isNumOrStr(fixedY)
  , isSegment = segment && segment.length === 2
  , endPoints = getEndPoints(
     scales,
     isX,
     isY,
     isSegment,
     props
   );

  if (!endPoints) {
    return null;
  }
  const [
    { x: x1, y: y1 },
    { x: x2, y: y2 }
  ] = endPoints
  , clipPath = ifOverflowMatches(props, 'hidden')
     ? `url(#${clipPathId})`
     : void 0
  , lineProps = {
     clipPath,
     ...filterProps(props, true),
     x1,
     y1,
     x2,
     y2,
  };

  return (
   <Layer className={classNames(CL_REFERENCE_LINE, className)}>
     {_renderLine(shape, lineProps)}
     {Label.renderCallByParent(props, rectWithCoords({ x1, y1, x2, y2 }))}
   </Layer>
  );
}

ReferenceLine.displayName = 'ReferenceLine'
ReferenceLine.defaultProps = {
  isFront: false,
  ifOverflow: DISCARD,
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle'
}
