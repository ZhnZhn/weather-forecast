import classNames from 'classnames';

import {
  _isFn,
  _isNil,
  _isObject
} from '../util/FnUtils';

import {
  isNumber,
  isPercent,
  getPercentValue,
  uniqueId,
  mathSign
} from '../util/DataUtils';
import { polarToCartesian } from '../util/PolarUtils';

const CL_RADIAL_BAR_LABEL = 'recharts-radial-bar-label';

export const getLabel = (
  props
) => {
  const {
    value,
    formatter
  } = props
  , label = _isNil(props.children)
    ? value
    : props.children;
  return _isFn(formatter)
    ? formatter(label)
    : label;
};

export const getDeltaAngle = (
  startAngle,
  endAngle
) => {
  const sign = mathSign(endAngle - startAngle)
  , deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};

export const renderRadialLabel = (
  labelProps,
  label,
  attrs
) => {
  const {
    position,
    viewBox,
    offset,
    className
  } = labelProps
  , {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise
  } = viewBox
  , radius = (innerRadius + outerRadius) / 2
  , deltaAngle = getDeltaAngle(startAngle, endAngle)
  , sign = deltaAngle >= 0 ? 1 : -1;

  let labelAngle, direction;

  if (position === 'insideStart') {
    labelAngle = startAngle + sign * offset;
    direction = clockWise;
  } else if (position === 'insideEnd') {
    labelAngle = endAngle - sign * offset;
    direction = !clockWise;
  } else if (position === 'end') {
    labelAngle = endAngle + sign * offset;
    direction = clockWise;
  }
  direction = deltaAngle <= 0 ? direction : !direction;

  const startPoint = polarToCartesian(cx, cy, radius, labelAngle)
  , endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359)
  , path = `M${startPoint.x},${startPoint.y}
     A${radius},${radius},0,1,${direction ? 0 : 1},
     ${endPoint.x},${endPoint.y}`;

  const id = _isNil(labelProps.id)
    ? uniqueId('recharts-radial-line-')
    : labelProps.id;

  return (
    <text
      {...attrs}
      dominantBaseline="central"
      className={classNames(CL_RADIAL_BAR_LABEL, className)}
    >
      <defs>
        <path id={id} d={path}/>
      </defs>
      <textPath xlinkHref={`#${id}`}>{label}</textPath>
    </text>
  );
};

export const getAttrsOfPolarLabel = (
  props
) => {
  const {
    viewBox,
    offset,
    position
  } = props
  , {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  } = viewBox
  , midAngle = (startAngle + endAngle) / 2;
  if (position === 'outside') {
    const { x, y } = polarToCartesian(cx, cy, outerRadius + offset, midAngle);
    return {
      x,
      y,
      textAnchor: x >= cx ? 'start' : 'end',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'center') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'centerTop') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }
  if (position === 'centerBottom') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'end'
    };
  }
  const r = (innerRadius + outerRadius) / 2
  , { x, y } = polarToCartesian(cx, cy, r, midAngle);
  return {
    x,
    y,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  };
};

export const getAttrsOfCartesianLabel = (
  props
) => {
  const {
    viewBox,
    parentViewBox,
    offset,
    position
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  // Define vertical offsets and position inverts based on the value being positive or negative
  , verticalSign = height >= 0 ? 1 : -1
  , verticalOffset = verticalSign * offset
  , verticalEnd = verticalSign > 0 ? 'end' : 'start'
  , verticalStart = verticalSign > 0 ? 'start' : 'end'
  // Define horizontal offsets and position inverts based on the value being positive or negative
  , horizontalSign = width >= 0 ? 1 : -1
  , horizontalOffset = horizontalSign * offset
  , horizontalEnd = horizontalSign > 0 ? 'end' : 'start'
  , horizontalStart = horizontalSign > 0 ? 'start' : 'end';
  if (position === 'top') {
    const attrs = {
      x: x + width / 2,
      y: y - verticalSign * offset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    };
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            height: Math.max(y - parentViewBox.y, 0),
            width,
        }
        : {}),
    };
  }
  if (position === 'bottom') {
    const attrs = {
      x: x + width / 2,
      y: y + height + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart,
    };
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
            width
        }
        : {}),
    };
  }
  if (position === 'left') {
    const attrs = {
      x: x - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle',
    };
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(attrs.x - parentViewBox.x, 0),
            height
        }
        : {}),
    };
  }
  if (position === 'right') {
    const attrs = {
      x: x + width + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    };
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(parentViewBox.x + parentViewBox.width - attrs.x, 0),
            height
          }
        : {})
    };
  }
  const sizeAttrs = parentViewBox
    ? { width, height }
    : {};
  if (position === 'insideLeft') {
    return {
      x: x + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle',
      ...sizeAttrs
    };
  }
  if (position === 'insideRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle',
      ...sizeAttrs
    };
  }
  if (position === 'insideTop') {
    return {
      x: x + width / 2,
      y: y + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottom') {
    return {
      x: x + width / 2,
      y: y + height - verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if (position === 'insideTopLeft') {
    return {
      x: x + horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideTopRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomLeft') {
    return {
      x: x + horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if (_isObject(position)
    && (isNumber(position.x) || isPercent(position.x))
    && (isNumber(position.y) || isPercent(position.y))
  ) {
    return {
      x: x + getPercentValue(position.x, width),
      y: y + getPercentValue(position.y, height),
      textAnchor: 'end',
      verticalAnchor: 'end',
      ...sizeAttrs
    };
  }
  return {
    x: x + width / 2,
    y: y + height / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
    ...sizeAttrs
  };
};

export const isPolar = (
  viewBox
) => 'cx' in viewBox && isNumber(viewBox.cx);
