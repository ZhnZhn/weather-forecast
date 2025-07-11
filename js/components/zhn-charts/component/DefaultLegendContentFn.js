"use strict";

exports.__esModule = true;
exports.renderItems = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _types = require("../util/types");
var _Surface = require("../container/Surface");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const SIZE = 32;
const _renderIcon = (data, props) => {
  const {
      inactiveColor
    } = props,
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
      className: _CL.CL_LEGEND_ICON
    });
  }
  if (data.type === 'line') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: color,
      d: `M0,${halfSize}h${thirdSize}
        A${sixthSize},${sixthSize},0,1,1,${2 * thirdSize},${halfSize}
        H${SIZE}M${2 * thirdSize},${halfSize}
        A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`,
      className: _CL.CL_LEGEND_ICON
    });
  }
  if (data.type === 'rect') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      stroke: "none",
      fill: color,
      d: `M0,${SIZE / 8}h${SIZE}v${SIZE * 3 / 4}h${-SIZE}z`,
      className: _CL.CL_LEGEND_ICON
    });
  }
  if ((0, _uiApi.isValidElement)(data.legendIcon)) {
    const iconProps = {
      ...data
    };
    delete iconProps.legendIcon;
    return (0, _uiApi.cloneUiElement)(data.legendIcon, iconProps);
  }
  return null;
};
const renderItems = props => {
  const {
      payload,
      iconSize,
      layout,
      formatter,
      inactiveColor
    } = props,
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
  return payload.map((entry, i) => {
    const finalFormatter = entry.formatter || formatter,
      className = (0, _styleFn.crCn)(`${_CL.CL_LEGEND_ITEM} legend-item-${i}`, entry.inactive && 'inactive');
    if (entry.type === 'none') {
      return null;
    }
    const color = entry.inactive ? inactiveColor : entry.color;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
      className: className,
      style: itemStyle,
      ...(0, _types.adaptEventsOfChild)(props, entry, i),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Surface.Surface, {
        width: iconSize,
        height: iconSize,
        viewBox: viewBox,
        style: svgStyle,
        children: _renderIcon(entry)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: _CL.CL_LEGEND_ITEM_TEXT,
        style: {
          color
        },
        children: finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value
      })]
    }, `legend-item-${i}`);
  });
};
exports.renderItems = renderItems;
//# sourceMappingURL=DefaultLegendContentFn.js.map