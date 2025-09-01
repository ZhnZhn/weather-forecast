import {
  isArr,
  isNumber,
  isFn
} from '../../../utils/isTypeFn';

import { crCn } from '../../styleFn';

import {
  line as shapeLine,
  area as shapeArea,
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from '../d3Shape';

import {
  _upperFirst
} from '../util/FnUtils';

import { adaptEventHandlers } from '../util/types';
import {
  crProps,
  filterProps
} from '../util/ReactUtils';

import { CL_CURVE } from '../CL';

const CURVE_FACTORIES = {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore
};

const _isLayoutVertical = (
  layout
) => layout === 'vertical';

const defined = (
  p
) => p.x === +p.x && p.y === +p.y
, getX = (p) => p.x
, getY = (p) => p.y;

const getCurveFactory = (
  type,
  layout
) => {
  if (isFn(type)) {
    return type;
  }
  const name = `curve${_upperFirst(type)}`;
  return name === 'curveMonotone' && layout
    ? CURVE_FACTORIES[`${name}${_isLayoutVertical(layout) ? 'Y' : 'X'}`]
    : CURVE_FACTORIES[name] || curveLinear;
};

/**
 * Calculate the path of curve
 * @return {String} path
 */
const getPath = ({
  type,
  points,
  baseLine,
  layout,
  connectNulls
}) => {
    const curveFactory = getCurveFactory(type, layout)
    , formatPoints = connectNulls
        ? points.filter(entry => defined(entry))
        : points;
    let lineFunction;
    if (isArr(baseLine)) {
        const formatBaseLine = connectNulls
          ? baseLine.filter(base => defined(base))
          : baseLine
        , areaPoints = formatPoints
           .map((entry, index) => ({
               ...entry,
               base: formatBaseLine[index]
             })
           );

        lineFunction = _isLayoutVertical(layout)
          ?  shapeArea()
              .y(getY)
              .x1(getX)
              .x0(d => d.base.x)
          : shapeArea()
              .x(getX)
              .y1(getY)
              .y0(d => d.base.y);

        lineFunction
          .defined(defined)
          .curve(curveFactory);
        return lineFunction(areaPoints);
    }

    if (_isLayoutVertical(layout) && isNumber(baseLine)) {
      lineFunction = shapeArea()
        .y(getY)
        .x1(getX)
        .x0(baseLine);
    } else if (isNumber(baseLine)) {
      lineFunction = shapeArea()
        .x(getX)
        .y1(getY)
        .y0(baseLine);
    } else {
      lineFunction = shapeLine()
        .x(getX)
        .y(getY);
    }
    lineFunction
      .defined(defined)
      .curve(curveFactory);
    return lineFunction(formatPoints);
};

const DF_PROPS = {
  type: 'linear',
  points: [],
  connectNulls: false
};

export const Curve = props => {
  const _props = crProps(DF_PROPS, props)
  , {
    className,
    points,
    path,
    pathRef
  } = _props;

  return (!points || !points.length) && !path
    ? null
    : (
       <path
         {...filterProps(_props)}
         {...adaptEventHandlers(_props)}
         className={crCn(CL_CURVE, className)}
         d={points && points.length
             ? getPath(props)
             : path
           }
         ref={pathRef}
       />
     );
}
