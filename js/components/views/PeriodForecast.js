"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _Color = require("../styles/Color");
var _Caption = _interopRequireDefault(require("./Caption"));
var _DayItem = _interopRequireDefault(require("./DayItem"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT = {
    cursor: 'auto'
  },
  S_OPEN_CLOSE = {
    lineHeight: 1.5
  };
const PeriodForecast = _ref => {
  let {
    captionStyle,
    dayStyle,
    forecast,
    onClickItem
  } = _ref;
  const {
    list
  } = forecast || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
      isInitial: true,
      style: S_OPEN_CLOSE,
      openColor: _Color.COLOR_BROWN,
      isClickableCompAfter: true,
      CompAfter: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Caption.default, {
        style: captionStyle,
        forecast: forecast
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: (list || []).map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayItem.default, {
          style: dayStyle,
          item: item,
          onClick: onClickItem
        }, index))
      })
    })
  });
};
var _default = exports.default = PeriodForecast;
//# sourceMappingURL=PeriodForecast.js.map