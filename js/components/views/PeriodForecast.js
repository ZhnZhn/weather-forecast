"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _OpenClose = _interopRequireDefault(require("../zhn-atoms/OpenClose"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Caption = _interopRequireDefault(require("./Caption"));

var _DayItem = _interopRequireDefault(require("./DayItem"));

var _jsxRuntime = require("react/jsx-runtime");

var S_ROOT = {
  cursor: 'auto'
},
    S_OPEN_CLOSE = {
  lineHeight: 1.5
};

var PeriodForecast = function PeriodForecast(_ref) {
  var captionStyle = _ref.captionStyle,
      dayStyle = _ref.dayStyle,
      forecast = _ref.forecast,
      onClickItem = _ref.onClickItem;

  var _ref2 = forecast || {},
      list = _ref2.list;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose["default"], {
      isInitial: true,
      style: S_OPEN_CLOSE,
      openColor: _Color["default"].BROWN,
      isClickableCompAfter: true,
      CompAfter: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Caption["default"], {
        style: captionStyle,
        forecast: forecast
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: (list || []).map(function (item, index) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayItem["default"], {
            style: dayStyle,
            item: item,
            onClick: onClickItem
          }, index);
        })
      })
    })
  });
};

var _default = PeriodForecast;
exports["default"] = _default;
//# sourceMappingURL=PeriodForecast.js.map