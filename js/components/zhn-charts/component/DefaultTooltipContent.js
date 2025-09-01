"use strict";

exports.__esModule = true;
exports.DefaultTooltipContent = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _DataUtils = require("../util/DataUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _defaultFormatter = value => (0, _isTypeFn.isArr)(value) && (0, _DataUtils.isNumOrStr)(value[0]) && (0, _DataUtils.isNumOrStr)(value[1]) ? value.join(' ~ ') : value;
const _renderContent = props => {
  const {
    payload,
    separator,
    formatter,
    itemStyle,
    itemSorter
  } = props;
  if (payload && payload.length) {
    const listStyle = {
        padding: 0,
        margin: 0
      },
      items = (itemSorter
      //? _sortBy(payload, itemSorter)
      ? payload.sort(itemSorter) : payload).map((entry, i) => {
        if (entry.type === 'none') {
          return null;
        }
        const finalItemStyle = {
          display: 'block',
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || '#000',
          ...itemStyle
        };
        const finalFormatter = entry.formatter || formatter || _defaultFormatter;
        let {
          value,
          name
        } = entry;
        if (finalFormatter && value != null && name != null) {
          const formatted = finalFormatter(value, name, entry, i, payload);
          if ((0, _isTypeFn.isArr)(formatted)) {
            [value, name] = formatted;
          } else {
            value = formatted;
          }
        }
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
          className: _CL.CL_TOOLTIP_ITEM,
          style: finalItemStyle,
          children: [(0, _DataUtils.isNumOrStr)(name) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _CL.CL_TOOLTIP_ITEM_NAME,
            children: name
          }) : null, (0, _DataUtils.isNumOrStr)(name) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _CL.CL_TOOLTIP_ITEM_SEPARATOR,
            children: separator
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _CL.CL_TOOLTIP_ITEM_VALUE,
            children: value
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _CL.CL_TOOLTIP_ITEM_UNIT,
            children: entry.unit || ''
          })]
        }, `tooltip-item-${i}`);
      });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: _CL.CL_TOOLTIP_ITEM_LIST,
      style: listStyle,
      children: items
    });
  }
  return null;
};
const DefaultTooltipContent = exports.DefaultTooltipContent = (0, _uiApi.memo)(props => {
  const {
      wrapperClassName,
      contentStyle,
      labelClassName,
      labelStyle,
      label,
      labelFormatter,
      payload
    } = props,
    finalStyle = {
      margin: 0,
      padding: 10,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      whiteSpace: 'nowrap',
      ...contentStyle
    },
    finalLabelStyle = {
      margin: 0,
      ...labelStyle
    },
    hasLabel = !(0, _isTypeFn.isNullOrUndef)(label);
  let finalLabel = hasLabel ? label : '';
  const wrapperCN = (0, _styleFn.crCn)(_CL.CL_DEFAULT_TOOLTIP, wrapperClassName),
    labelCN = (0, _styleFn.crCn)(_CL.CL_TOOLTIP_LABEL, labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: wrapperCN,
    style: finalStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: labelCN,
      style: finalLabelStyle,
      children: (0, _uiApi.isValidElement)(finalLabel) ? finalLabel : `${finalLabel}`
    }), _renderContent((void 0).props)]
  });
});
DefaultTooltipContent.displayName = 'DefaultTooltipContent';
DefaultTooltipContent.defaultProps = {
  separator: ' : ',
  contentStyle: {},
  itemStyle: {},
  labelStyle: {}
};
//# sourceMappingURL=DefaultTooltipContent.js.map