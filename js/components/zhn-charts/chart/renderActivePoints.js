"use strict";

exports.__esModule = true;
exports.renderActivePoints = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _types = require("../util/types");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _jsxRuntime = require("react/jsx-runtime");
const renderActiveDot = (option, props) => {
  const dot = (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneUiElement)(option, props) : (0, _isTypeFn.isFn)(option) ? option(props) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, {
    ...props
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: "recharts-active-dot",
    children: dot
  }, props.key);
};
const renderActivePoints = _ref => {
  let {
    item,
    activePoint,
    basePoint,
    childIndex,
    isRange
  } = _ref;
  const result = [],
    {
      key
    } = item.props,
    {
      activeDot,
      dataKey
    } = item.item.props,
    dotProps = {
      index: childIndex,
      dataKey,
      cx: activePoint.x,
      cy: activePoint.y,
      r: 4,
      fill: (0, _ChartUtils.getMainColorOfGraphicItem)(item.item),
      strokeWidth: 2,
      stroke: '#fff',
      payload: activePoint.payload,
      value: activePoint.value,
      key: `${key}-activePoint-${childIndex}`,
      ...(0, _ReactUtils.filterProps)(activeDot),
      ...(0, _types.adaptEventHandlers)(activeDot)
    };
  result.push(renderActiveDot(activeDot, dotProps));
  if (basePoint) {
    result.push(renderActiveDot(activeDot, {
      ...dotProps,
      cx: basePoint.x,
      cy: basePoint.y,
      key: `${key}-basePoint-${childIndex}`
    }));
  } else if (isRange) {
    result.push(null);
  }
  return result;
};
exports.renderActivePoints = renderActivePoints;
//# sourceMappingURL=renderActivePoints.js.map