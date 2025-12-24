import {
  isFn,
  isNullOrUndef
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement,
  createElement,
  crProps
} from "../../uiApi";

import { isNumber } from "../util/DataUtils";
import { Text } from "./Text";

import { getLabel } from "./LabelFn";
import { labelPositionFn } from "./LabelPositionFn";

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
    content:ContentElementOrComp,
    textBreakAll
  } = _props;
  if (!viewBox || (isNullOrUndef(value) && isNullOrUndef(children) && !isValidElement(ContentElementOrComp) && !isFn(ContentElementOrComp))) {
    return null;
  }

  if (isValidElement(ContentElementOrComp)) {
    return cloneUiElement(ContentElementOrComp, _props);
  }

  let label;
  if (isFn(ContentElementOrComp)) {
    label = createElement(ContentElementOrComp, props);
    if (isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(_props);
  }
  return (
    <Text
      offset={_props.offset}
      fill={_props.fill}
      stroke={_props.stroke}
      className={_props.className}
      {..._props.position(_props)}
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
