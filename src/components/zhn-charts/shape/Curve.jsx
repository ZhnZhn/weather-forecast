import {
  isArr,
  isNotEmptyArr,
  isNumber
} from '../../../utils/isTypeFn';

import { crProps } from '../../uiApi';
import { crCn } from '../../styleFn';

import {
  line as shapeLine,
  area as shapeArea,

  curveMonotoneX,
  curveMonotoneY
} from '../d3Shape';

import { isLayoutVertical } from '../util/ChartUtils';
import { CL_CURVE } from '../CL';

const defined = (
  p
) => p.x === +p.x && p.y === +p.y
, getX = (p) => p.x
, getY = (p) => p.y;

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
    const _isLayoutVertical = isLayoutVertical(layout)
    , curveFactory = type || (_isLayoutVertical
        ? curveMonotoneY
        : curveMonotoneX)
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

        lineFunction = _isLayoutVertical
          ? shapeArea()
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

    if (_isLayoutVertical && isNumber(baseLine)) {
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
    points,
    path
  } = _props
  , _d = isNotEmptyArr(points)
    ? getPath(props)
    : path;

  return _d
    ? (<path
         ref={_props.pathRef}
         fill={_props.fill}
         stroke={_props.stroke}
         strokeWidth={_props.strokeWidth}
         strokeDasharray={_props.strokeDasharray}
         className={crCn(CL_CURVE, _props.className)}
         d={_d}
       />
     ) : null;
}
