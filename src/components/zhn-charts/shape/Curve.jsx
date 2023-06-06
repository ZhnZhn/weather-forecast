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

import classNames from 'classnames';

import {
  _isFn,
  _isArr,
  _upperFirst
} from '../util/FnUtils';

import { adaptEventHandlers } from '../util/types';
import { filterProps } from '../util/ReactUtils';
import { isNumber } from '../util/DataUtils';

const CL_CURVE = 'recharts-curve';

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
    curveStepBefore,
};

const defined = (
  p
) => p.x === +p.x && p.y === +p.y
, getX = (p) => p.x
, getY = (p) => p.y;

const getCurveFactory = (
  type,
  layout
) => {
    if (_isFn(type)) {
        return type;
    }
    const name = `curve${_upperFirst(type)}`;
    if (name === 'curveMonotone' && layout) {
        return CURVE_FACTORIES[`${name}${layout === 'vertical' ? 'Y' : 'X'}`];
    }
    return CURVE_FACTORIES[name] || curveLinear;
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
    if (_isArr(baseLine)) {
        const formatBaseLine = connectNulls
          ? baseLine.filter(base => defined(base))
          : baseLine
        , areaPoints = formatPoints
           .map((entry, index) => ({
               ...entry,
               base: formatBaseLine[index]
             })
           );

        lineFunction = layout === 'vertical'
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

    if (layout === 'vertical' && isNumber(baseLine)) {
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

export const Curve = props => {
    const {
      className,
      points,
      path,
      pathRef
    } = props;

    if ((!points || !points.length) && !path) {
      return null;
    }
    const realPath = points && points.length
      ? getPath(props)
      : path;
    return (
      <path
        {...filterProps(props)}
        {...adaptEventHandlers(props)}
        className={classNames(CL_CURVE, className)}
        d={realPath}
        ref={pathRef}
      />
    );
};

Curve.defaultProps = {
  type: 'linear',
  points: [],
  connectNulls: false
};
