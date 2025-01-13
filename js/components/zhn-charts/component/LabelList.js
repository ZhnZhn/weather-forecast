"use strict";

exports.__esModule = true;
exports.LabelList = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _Label = require("./Label");
var _Layer = require("../container/Layer");
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const CL_LABEL_LIST = "recharts-label-list";
const defaultProps = {
  valueAccessor: entry => {
    const {
      value
    } = entry || {};
    return (0, _FnUtils._isArr)(value) ? value[value.length - 1] : value;
  }
};
const LabelList = props => {
  const {
    data,
    valueAccessor,
    dataKey,
    clockWise,
    id,
    textBreakAll,
    ...restProps
  } = props;
  if (!data || !data.length) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: CL_LABEL_LIST,
    children: data.map((entry, index) => {
      const value = (0, _FnUtils._isNil)(dataKey) ? valueAccessor(entry, index) : (0, _ChartUtils.getValueByDataKey)(entry && entry.payload, dataKey),
        idProps = (0, _FnUtils._isNil)(id) ? {} : {
          id: `${id}-${index}`
        };
      return /*#__PURE__*/(0, _react.createElement)(_Label.Label, {
        ...(0, _ReactUtils.filterProps)(entry, true),
        ...restProps,
        ...idProps,
        parentViewBox: entry.parentViewBox,
        index: index,
        value: value,
        textBreakAll: textBreakAll,
        viewBox: _Label.Label.parseViewBox((0, _FnUtils._isNil)(clockWise) ? entry : {
          ...entry,
          clockWise
        }),
        key: `label-${index}`
      });
    })
  });
};
exports.LabelList = LabelList;
const KEY_LABELLIST_IMPLICIT = "labelList-implicit";
function _parseLabelList(label, data) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(LabelList, {
      data: data
    }, KEY_LABELLIST_IMPLICIT);
  }
  if ((0, _uiApi.isValidElement)(label) || (0, _FnUtils._isFn)(label)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(LabelList, {
      data: data,
      content: label
    }, KEY_LABELLIST_IMPLICIT);
  }
  if ((0, _FnUtils._isObject)(label)) {
    return /*#__PURE__*/(0, _react.createElement)(LabelList, {
      data: data,
      ...label,
      key: KEY_LABELLIST_IMPLICIT
    });
  }
  return null;
}
function renderCallByParent(parentProps, data, checkPropsLabel) {
  if (checkPropsLabel === void 0) {
    checkPropsLabel = true;
  }
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  const {
      children
    } = parentProps,
    explicitChildren = (0, _ReactUtils.findAllByType)(children, LabelList).map((child, index) => (0, _uiApi.cloneUiElement)(child, {
      data
    }, `labelList-${index}`));
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  const implicitLabelList = _parseLabelList(parentProps.label, data);
  return [implicitLabelList, ...explicitChildren];
}
LabelList.displayName = 'LabelList';
LabelList.renderCallByParent = renderCallByParent;
LabelList.defaultProps = defaultProps;
//# sourceMappingURL=LabelList.js.map