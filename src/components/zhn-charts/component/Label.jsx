import {
  isValidElement,
  cloneElement,
  createElement
} from "../../uiApi";

import crCn from "../../zhn-utils/crCn";

import {
  _isFn,
  _isNil,
  _isObject
} from "../util/FnUtils";

import { Text } from "./Text";
import {
  crProps,
  findAllByType,
  filterProps
} from "../util/ReactUtils";
import {
  isNumOrStr,
  isNumber
} from "../util/DataUtils";

import {
  getAttrsOfCartesianLabel,
  getLabel
} from "./LabelFn";

import { CL_LABEL } from "../CL";

const DF_PROPS = {
  offset: 5,
  className: ""
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
    className,
    textBreakAll
  } = _props;
  if (!viewBox || (_isNil(value) && _isNil(children) && !isValidElement(content) && !_isFn(content))) {
    return null;
  }

  if (isValidElement(ContentElementOrComp)) {
    return cloneElement(ContentElementOrComp, _props);
  }

  let label;
  if (_isFn(ContentElementOrComp)) {
    label = createElement(ContentElementOrComp, props);
    if (isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(_props);
  }

  return (
    <Text
      className={crCn(CL_LABEL, className)}
      // attrs
      {...filterProps(_props, true)}
      // positionAttrs
      {...getAttrsOfCartesianLabel(_props)}
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

Label.displayName = "Label";
Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent;
