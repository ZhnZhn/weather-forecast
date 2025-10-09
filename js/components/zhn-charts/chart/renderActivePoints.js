"use strict";

exports.__esModule = true;
exports.renderActivePoints = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _jsxRuntime = require("react/jsx-runtime");
/*
import { adaptEventHandlers } from '../util/types';
*/

const renderActiveDot = (option, _ref) => {
  let {
    key,
    ...restProps
  } = _ref;
  const dot = (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneUiElement)(option, restProps) : (0, _isTypeFn.isFn)(option) ? option(restProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, {
    ...restProps
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: "recharts-active-dot",
    children: dot
  }, key);
};
const renderActivePoints = _ref2 => {
  let {
    item,
    activePoint,
    basePoint,
    childIndex,
    isRange
  } = _ref2;
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
      r: activeDot.r || 4,
      fill: activeDot.fill || (0, _ChartUtils.getMainColorOfGraphicItem)(item.item),
      stroke: activeDot.stroke || '#fff',
      strokeWidth: activeDot.strokeWidth || 2,
      strokeDasharray: activeDot.strokeDasharray,
      payload: activePoint.payload,
      value: activePoint.value,
      key: `${key}-activePoint-${childIndex}`
      //...adaptEventHandlers(activeDot),
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