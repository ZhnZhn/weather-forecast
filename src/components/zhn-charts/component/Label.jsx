import { isFn } from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement,
  createElement,
  crProps
} from "../../uiApi";

import { isNumber } from "../util/DataUtils";

import { Text } from "./Text";
import { labelPositionFn } from "./LabelPositionFn";

const _getLabel = (
  children,
  value,
  formatter
) => {
  const label = children == null
    ? value
    : children;
  return isFn(formatter)
    ? formatter(label)
    : label;
}

const DF_PROPS = {
  position: labelPositionFn,
  offset: 5
};

export const Label = (
  props
) => {
  const _props = crProps(DF_PROPS, props)
  , {
    viewBox,
    value,
    children,
    content,
    textBreakAll
  } = _props
  , _isValidElementContent = isValidElement(content)
  , _isFnContent = isFn(content);
  if (!viewBox
    || (value == null && children == null && !_isValidElementContent && !_isFnContent)) {
    return null;
  }

  if (_isValidElementContent) {
    return cloneUiElement(content, _props);
  }

  let label;
  if (_isFnContent) {
    label = createElement(content, _props);
    if (isValidElement(label)) {
      return label;
    }
  } else {
    label = _getLabel(children, value, _props.formatter);
  }
  return (
    <Text
      offset={_props.offset}
      fill={_props.fill}
      stroke={_props.stroke}
      className={_props.className}
      {..._props.position(
        viewBox,
        _props.parentViewBox,
        _props.offset,
        _props.xTopOffset
      )}
      breakAll={textBreakAll}
    >
      {label}
    </Text>
  );
}

export const parseViewBox = (props) => {
  const {
    //cx,
    //cy,
    //angle,
    //startAngle,
    //endAngle,
    //r,
    //radius,
    //innerRadius,
    //outerRadius,
    x,
    y,
    top,
    left,
    width,
    height,
    //clockWise,
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

  /*
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
  */
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
}

Label.displayName = "Label";
