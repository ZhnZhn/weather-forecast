"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LabelList = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _Label = require("./Label");
var _Layer = require("../container/Layer");
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["data", "valueAccessor", "dataKey", "clockWise", "id", "textBreakAll"];
var CL_LABEL_LIST = "recharts-label-list";
var defaultProps = {
  valueAccessor: function valueAccessor(entry) {
    var _ref = entry || {},
      value = _ref.value;
    return (0, _FnUtils._isArr)(value) ? value[value.length - 1] : value;
  }
};
var LabelList = function LabelList(props) {
  var data = props.data,
    valueAccessor = props.valueAccessor,
    dataKey = props.dataKey,
    clockWise = props.clockWise,
    id = props.id,
    textBreakAll = props.textBreakAll,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  if (!data || !data.length) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: CL_LABEL_LIST,
    children: data.map(function (entry, index) {
      var value = (0, _FnUtils._isNil)(dataKey) ? valueAccessor(entry, index) : (0, _ChartUtils.getValueByDataKey)(entry && entry.payload, dataKey),
        idProps = (0, _FnUtils._isNil)(id) ? {} : {
          id: id + "-" + index
        };
      return /*#__PURE__*/(0, _react.createElement)(_Label.Label, (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(entry, true), restProps, idProps, {
        parentViewBox: entry.parentViewBox,
        index: index,
        value: value,
        textBreakAll: textBreakAll,
        viewBox: _Label.Label.parseViewBox((0, _FnUtils._isNil)(clockWise) ? entry : (0, _extends2["default"])({}, entry, {
          clockWise: clockWise
        })),
        key: "label-" + index
      }));
    })
  });
};
exports.LabelList = LabelList;
var KEY_LABELLIST_IMPLICIT = "labelList-implicit";
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
    return /*#__PURE__*/(0, _react.createElement)(LabelList, (0, _extends2["default"])({
      data: data
    }, label, {
      key: KEY_LABELLIST_IMPLICIT
    }));
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
  var children = parentProps.children,
    explicitChildren = (0, _ReactUtils.findAllByType)(children, LabelList).map(function (child, index) {
      return (0, _uiApi.cloneElement)(child, {
        data: data,
        key: "labelList-" + index
      });
    });
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  var implicitLabelList = _parseLabelList(parentProps.label, data);
  return [implicitLabelList].concat(explicitChildren);
}
LabelList.displayName = 'LabelList';
LabelList.renderCallByParent = renderCallByParent;
LabelList.defaultProps = defaultProps;
//# sourceMappingURL=LabelList.js.map