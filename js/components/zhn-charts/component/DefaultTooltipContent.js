"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.DefaultTooltipContent = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _jsxRuntime = require("react/jsx-runtime");
var _this = void 0;
var CL_TOOLTIP_ITEM = "recharts-tooltip-item",
  CL_TOOLTIP_ITEM_NAME = CL_TOOLTIP_ITEM + "-name",
  CL_TOOLTIP_ITEM_SEPARATOR = CL_TOOLTIP_ITEM + "-separator",
  CL_TOOLTIP_ITEM_VALUE = CL_TOOLTIP_ITEM + "-value",
  CL_TOOLTIP_ITEM_UNIT = CL_TOOLTIP_ITEM + "-unit",
  CL_TOOLTIP_ITEM_LIST = CL_TOOLTIP_ITEM + "-list",
  CL_DEFAULT_TOOLTIP = "recharts-default-tooltip",
  CL_TOOLTIP_LABEL = "recharts-tooltip-label";
var _defaultFormatter = function _defaultFormatter(value) {
  return (0, _FnUtils._isArr)(value) && (0, _DataUtils.isNumOrStr)(value[0]) && (0, _DataUtils.isNumOrStr)(value[1]) ? value.join(' ~ ') : value;
};
var _renderContent = function _renderContent(props) {
  var payload = props.payload,
    separator = props.separator,
    formatter = props.formatter,
    itemStyle = props.itemStyle,
    itemSorter = props.itemSorter;
  if (payload && payload.length) {
    var listStyle = {
        padding: 0,
        margin: 0
      },
      items = (itemSorter
      //? _sortBy(payload, itemSorter)
      ? payload.sort(itemSorter) : payload).map(function (entry, i) {
        if (entry.type === 'none') {
          return null;
        }
        var finalItemStyle = (0, _extends2["default"])({
          display: 'block',
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || '#000'
        }, itemStyle);
        var finalFormatter = entry.formatter || formatter || _defaultFormatter;
        var value = entry.value,
          name = entry.name;
        if (finalFormatter && value != null && name != null) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if ((0, _FnUtils._isArr)(formatted)) {
            value = formatted[0];
            name = formatted[1];
          } else {
            value = formatted;
          }
        }
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
          className: CL_TOOLTIP_ITEM,
          style: finalItemStyle,
          children: [(0, _DataUtils.isNumOrStr)(name) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL_TOOLTIP_ITEM_NAME,
            children: name
          }) : null, (0, _DataUtils.isNumOrStr)(name) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL_TOOLTIP_ITEM_SEPARATOR,
            children: separator
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL_TOOLTIP_ITEM_VALUE,
            children: value
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL_TOOLTIP_ITEM_UNIT,
            children: entry.unit || ''
          })]
        }, "tooltip-item-" + i);
      });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: CL_TOOLTIP_ITEM_LIST,
      style: listStyle,
      children: items
    });
  }
  return null;
};
var DefaultTooltipContent = (0, _uiApi.memo)(function (props) {
  var wrapperClassName = props.wrapperClassName,
    contentStyle = props.contentStyle,
    labelClassName = props.labelClassName,
    labelStyle = props.labelStyle,
    label = props.label,
    labelFormatter = props.labelFormatter,
    payload = props.payload,
    finalStyle = (0, _extends2["default"])({
      margin: 0,
      padding: 10,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      whiteSpace: 'nowrap'
    }, contentStyle),
    finalLabelStyle = (0, _extends2["default"])({
      margin: 0
    }, labelStyle),
    hasLabel = !(0, _FnUtils._isNil)(label);
  var finalLabel = hasLabel ? label : '';
  var wrapperCN = (0, _classnames["default"])(CL_DEFAULT_TOOLTIP, wrapperClassName),
    labelCN = (0, _classnames["default"])(CL_TOOLTIP_LABEL, labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: wrapperCN,
    style: finalStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: labelCN,
      style: finalLabelStyle,
      children: (0, _uiApi.isValidElement)(finalLabel) ? finalLabel : "" + finalLabel
    }), _renderContent(_this.props)]
  });
});
exports.DefaultTooltipContent = DefaultTooltipContent;
DefaultTooltipContent.displayName = 'DefaultTooltipContent';
DefaultTooltipContent.defaultProps = {
  separator: ' : ',
  contentStyle: {},
  itemStyle: {},
  labelStyle: {}
};
//# sourceMappingURL=DefaultTooltipContent.js.map