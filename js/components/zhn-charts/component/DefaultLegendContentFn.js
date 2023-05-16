"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderItems = exports.CL_DF_LEGEND = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _Surface = require("../container/Surface");
var _Symbols = require("../shape/Symbols");
var _types = require("../util/types");
var _jsxRuntime = require("react/jsx-runtime");
var CL_DF_LEGEND = "recharts-default-legend";
exports.CL_DF_LEGEND = CL_DF_LEGEND;
var CL_LEGEND_ICON = "recharts-legend-icon",
  CL_LEGEND_ITEM = "recharts-legend-item",
  CL_LEGEND_ITEM_TEXT = CL_LEGEND_ITEM + "-text";
var SIZE = 32;
var _renderIcon = function _renderIcon(data, props) {
  var inactiveColor = props.inactiveColor,
    halfSize = SIZE / 2,
    sixthSize = SIZE / 6,
    thirdSize = SIZE / 3,
    color = data.inactive ? inactiveColor : data.color;
  if (data.type === 'plainline') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: color,
      strokeDasharray: data.payload.strokeDasharray,
      x1: 0,
      y1: halfSize,
      x2: SIZE,
      y2: halfSize,
      className: CL_LEGEND_ICON
    });
  }
  if (data.type === 'line') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: color,
      d: "M0," + halfSize + "h" + thirdSize + "\n        A" + sixthSize + "," + sixthSize + ",0,1,1," + 2 * thirdSize + "," + halfSize + "\n        H" + SIZE + "M" + 2 * thirdSize + "," + halfSize + "\n        A" + sixthSize + "," + sixthSize + ",0,1,1," + thirdSize + "," + halfSize,
      className: CL_LEGEND_ICON
    });
  }
  if (data.type === 'rect') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      stroke: "none",
      fill: color,
      d: "M0," + SIZE / 8 + "h" + SIZE + "v" + SIZE * 3 / 4 + "h" + -SIZE + "z",
      className: CL_LEGEND_ICON
    });
  }
  if ((0, _uiApi.isValidElement)(data.legendIcon)) {
    var iconProps = (0, _extends2["default"])({}, data);
    delete iconProps.legendIcon;
    return (0, _uiApi.cloneElement)(data.legendIcon, iconProps);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Symbols.Symbols, {
    fill: color,
    cx: halfSize,
    cy: halfSize,
    size: SIZE,
    sizeType: "diameter",
    type: data.type
  });
};
var renderItems = function renderItems(props) {
  var payload = props.payload,
    iconSize = props.iconSize,
    layout = props.layout,
    formatter = props.formatter,
    inactiveColor = props.inactiveColor,
    viewBox = {
      x: 0,
      y: 0,
      width: SIZE,
      height: SIZE
    },
    itemStyle = {
      display: layout === 'horizontal' ? 'inline-block' : 'block',
      marginRight: 10
    },
    svgStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: 4
    };
  return payload.map(function (entry, i) {
    var _classNames;
    var finalFormatter = entry.formatter || formatter,
      className = (0, _classnames["default"])((_classNames = {}, _classNames[CL_LEGEND_ITEM] = true, _classNames["legend-item-" + i] = true, _classNames.inactive = entry.inactive, _classNames));
    if (entry.type === 'none') {
      return null;
    }
    var color = entry.inactive ? inactiveColor : entry.color;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", (0, _extends2["default"])({
      className: className,
      style: itemStyle
    }, (0, _types.adaptEventsOfChild)(props, entry, i), {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Surface.Surface, {
        width: iconSize,
        height: iconSize,
        viewBox: viewBox,
        style: svgStyle,
        children: _renderIcon(entry)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_LEGEND_ITEM_TEXT,
        style: {
          color: color
        },
        children: finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value
      })]
    }), "legend-item-" + i);
  });
};
exports.renderItems = renderItems;
//# sourceMappingURL=DefaultLegendContentFn.js.map