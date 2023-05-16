import {
  isValidElement,
  cloneElement,
  createElement
} from '../../uiApi';

import classNames from 'classnames';

import {
  _isFn,
  _isNil,
  _isObject
} from '../util/FnUtils';

import { Text } from './Text';
import {
  findAllByType,
  filterProps
} from '../util/ReactUtils';
import {
  isNumOrStr,
  isNumber,
  isPercent,
  getPercentValue,
  uniqueId,
  mathSign
} from '../util/DataUtils';
import { polarToCartesian } from '../util/PolarUtils';

const getLabel = (props) => {
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

const getDeltaAngle = (
  startAngle,
  endAngle
) => {
  const sign = mathSign(endAngle - startAngle)
  , deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};

const renderRadialLabel = (
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
      className={classNames('recharts-radial-bar-label', className)}
    >
      <defs>
        <path id={id} d={path}/>
      </defs>
      <textPath xlinkHref={`#${id}`}>{label}</textPath>
    </text>
  );
};

const getAttrsOfPolarLabel = (
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

const getAttrsOfCartesianLabel = (
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

const isPolar = (
  viewBox
) => 'cx' in viewBox && isNumber(viewBox.cx);

export const Label = (
  props
) => {
  const {
    viewBox,
    position,
    value,
    children,
    content,
    className = '',
    textBreakAll
  } = props;
  if (!viewBox || (_isNil(value) && _isNil(children) && !isValidElement(content) && !_isFn(content))) {
    return null;
  }

  if (isValidElement(content)) {
    return cloneElement(content, props);
  }
  let label;
  if (_isFn(content)) {
    label = createElement(content, props);
    if (isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  const isPolarLabel = isPolar(viewBox)
  , attrs = filterProps(props, true);
  if (isPolarLabel && (position === 'insideStart' || position === 'insideEnd' || position === 'end')) {
    return renderRadialLabel(props, label, attrs);
  }
  const positionAttrs = isPolarLabel
    ? getAttrsOfPolarLabel(props)
    : getAttrsOfCartesianLabel(props);
  return (
    <Text
      className={classNames('recharts-label', className)}
      {...attrs}
      {...positionAttrs}
      breakAll={textBreakAll}
    >
      {label}
    </Text>
  );
}

const parseViewBox = (props) => {
  const {
    cx,
    cy,
    angle,
    startAngle,
    endAngle,
    r,
    radius,
    innerRadius,
    outerRadius,
    x,
    y,
    top,
    left,
    width,
    height,
    clockWise,
    labelViewBox
  } = props;

  if (labelViewBox) {
    return labelViewBox;
  }
  if (isNumber(width) && isNumber(height)) {
    if (isNumber(x) && isNumber(y)) {
      return { x, y, width, height };
    }
    if (isNumber(top) && isNumber(left)) {
      return { x: top, y: left, width, height };
    }
  }
  if (isNumber(x) && isNumber(y)) {
    return { x, y, width: 0, height: 0 };
  }
  if (isNumber(cx) && isNumber(cy)) {
    return {
      cx,
      cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise
    };
  }
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
};

const KEY_LABEL_IMPLICIT = "label-implicit";
const parseLabel = (
  label,
  viewBox
) => {
  if (!label) {
    return null;
  }
  if (label === true) {
    return <Label key={KEY_LABEL_IMPLICIT} viewBox={viewBox}/>;
  }
  if (isNumOrStr(label)) {
    return <Label key={KEY_LABEL_IMPLICIT} viewBox={viewBox} value={label}/>;
  }
  if (isValidElement(label)) {
    if (label.type === Label) {
      return cloneElement(label, { key: KEY_LABEL_IMPLICIT, viewBox });
    }
    return <Label key={KEY_LABEL_IMPLICIT} content={label} viewBox={viewBox}/>;
  }
  if (_isFn(label)) {
    return <Label key={KEY_LABEL_IMPLICIT} content={label} viewBox={viewBox}/>;
  }
  if (_isObject(label)) {
    return <Label viewBox={viewBox} {...label} key={KEY_LABEL_IMPLICIT} />;
  }
  return null;
};

const renderCallByParent = (
  parentProps,
  viewBox,
  checkPropsLabel = true
) => {
  if (!parentProps || (!parentProps.children && checkPropsLabel && !parentProps.label)) {
    return null;
  }
  const { children } = parentProps
  , parentViewBox = parseViewBox(parentProps)
  , explicitChildren = findAllByType(children, Label).map((child, index) => cloneElement(child, {
      viewBox: viewBox || parentViewBox,
      // eslint-disable-next-line react/no-array-index-key
      key: `label-${index}`,
  }));

  if (!checkPropsLabel) {
    return explicitChildren;
  }
  const implicitLabel = parseLabel(parentProps.label, viewBox || parentViewBox);
  return [
    implicitLabel,
    ...explicitChildren
  ];
};

Label.displayName = 'Label';
Label.defaultProps = {
  offset: 5
};
Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent;
