"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderActivePoints = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _types = require("../util/types");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _jsxRuntime = require("react/jsx-runtime");
var renderActiveDot = function renderActiveDot(option, props) {
  var dot = (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, (0, _extends2["default"])({}, props));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: "recharts-active-dot",
    children: dot
  }, props.key);
};
var renderActivePoints = function renderActivePoints(_ref) {
  var item = _ref.item,
    activePoint = _ref.activePoint,
    basePoint = _ref.basePoint,
    childIndex = _ref.childIndex,
    isRange = _ref.isRange;
  var result = [],
    key = item.props.key,
    _item$item$props = item.item.props,
    activeDot = _item$item$props.activeDot,
    dataKey = _item$item$props.dataKey,
    dotProps = (0, _extends2["default"])({
      index: childIndex,
      dataKey: dataKey,
      cx: activePoint.x,
      cy: activePoint.y,
      r: 4,
      fill: (0, _ChartUtils.getMainColorOfGraphicItem)(item.item),
      strokeWidth: 2,
      stroke: '#fff',
      payload: activePoint.payload,
      value: activePoint.value,
      key: key + "-activePoint-" + childIndex
    }, (0, _ReactUtils.filterProps)(activeDot), (0, _types.adaptEventHandlers)(activeDot));
  result.push(renderActiveDot(activeDot, dotProps));
  if (basePoint) {
    result.push(renderActiveDot(activeDot, (0, _extends2["default"])({}, dotProps, {
      cx: basePoint.x,
      cy: basePoint.y,
      key: key + "-basePoint-" + childIndex
    })));
  } else if (isRange) {
    result.push(null);
  }
  return result;
};
exports.renderActivePoints = renderActivePoints;
//# sourceMappingURL=renderActivePoints.js.map