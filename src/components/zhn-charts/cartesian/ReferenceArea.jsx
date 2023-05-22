import classNames from 'classnames';

import { Layer } from '../container/Layer';
import { Label } from '../component/Label';
import { createLabeledScales, rectWithPoints } from '../util/CartesianUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { isNumOrStr } from '../util/DataUtils';
import { Rectangle } from '../shape/Rectangle';
import { filterProps } from '../util/ReactUtils';
import {
  crClipPathIdIf,
  fCreateElement
} from './cartesianFn';

const CL_REFERENCE_AREA = 'recharts-reference-area'
, CL_REFERENCE_AREA_RECT = `${CL_REFERENCE_AREA}-rect`
, DISCARD = 'discard';

const getRect = (
  hasX1,
  hasX2,
  hasY1,
  hasY2,
  props
) => {
  const {
    x1: xValue1,
    x2: xValue2,
    y1: yValue1,
    y2: yValue2,
    xAxis,
    yAxis
  } = props;
  if (!xAxis || !yAxis) {
    return null;
  }
  const scales = createLabeledScales({
    x: xAxis.scale,
    y: yAxis.scale
  })
  , p1 = {
    x: hasX1 ? scales.x.apply(xValue1, { position: 'start' }) : scales.x.rangeMin,
    y: hasY1 ? scales.y.apply(yValue1, { position: 'start' }) : scales.y.rangeMin
  }
  , p2 = {
    x: hasX2 ? scales.x.apply(xValue2, { position: 'end' }) : scales.x.rangeMax,
    y: hasY2 ? scales.y.apply(yValue2, { position: 'end' }) : scales.y.rangeMax
  };

  return ifOverflowMatches(props, DISCARD) && (!scales.isInRange(p1) || !scales.isInRange(p2))
    ? null
    : rectWithPoints(p1, p2);
};

export const ReferenceArea = (
  props
) => {
  const {
    x1,
    x2,
    y1,
    y2,
    className,
    shape
  } = props
  , hasX1 = isNumOrStr(x1)
  , hasX2 = isNumOrStr(x2)
  , hasY1 = isNumOrStr(y1)
  , hasY2 = isNumOrStr(y2);

  if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) {
    return null;
  }

  const rect = getRect(hasX1, hasX2, hasY1, hasY2, props);
  if (!rect && !shape) {
    return null;
  }
  const clipPath = crClipPathIdIf(props);
  return (
    <Layer className={classNames(CL_REFERENCE_AREA, className)}>
      {ReferenceArea.renderRect(shape, { clipPath, ...filterProps(props, true), ...rect })}
      {Label.renderCallByParent(props, rect)}
    </Layer>
  );
}

ReferenceArea.displayName = 'ReferenceArea'
ReferenceArea.defaultProps = {
  isFront: false,
  ifOverflow: DISCARD,
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#ccc',
  fillOpacity: 0.5,
  stroke: 'none',
  strokeWidth: 1
}

const _crRectangleElement = (
  props
) => (
  <Rectangle
    {...props}
    className={CL_REFERENCE_AREA_RECT}
  />
);

ReferenceArea.renderRect = fCreateElement(_crRectangleElement)
