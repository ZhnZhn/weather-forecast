"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _OpenClose = _interopRequireDefault(require("../zhn-atoms/OpenClose"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Caption = _interopRequireDefault(require("./Caption"));

var _DayItem = _interopRequireDefault(require("./DayItem"));

//import React from 'react';
var S = {
  ROOT: {
    cursor: 'auto'
  },
  OPEN_CLOSE: {
    lineHeight: 1.5
  }
};

var _renderForecast = function _renderForecast(dayStyle, forecast, onClick) {
  var _forecast$list = forecast.list,
      list = _forecast$list === void 0 ? [] : _forecast$list;
  return list.map(function (item, index) {
    return _react["default"].createElement(_DayItem["default"], {
      key: index,
      style: dayStyle,
      item: item,
      onClick: onClick
    });
  });
};

var PeriodForecast = function PeriodForecast(_ref) {
  var dayStyle = _ref.dayStyle,
      _ref$forecast = _ref.forecast,
      forecast = _ref$forecast === void 0 ? {} : _ref$forecast,
      captionStyle = _ref.captionStyle,
      onClickItem = _ref.onClickItem;
  return _react["default"].createElement("div", {
    style: S.ROOT
  }, _react["default"].createElement(_OpenClose["default"], {
    rootStyle: S.OPEN_CLOSE,
    openColor: _Color["default"].BROWN,
    isClickableCompAfter: true,
    CompAfter: _react["default"].createElement(_Caption["default"], {
      style: captionStyle,
      forecast: forecast
    })
  }, _react["default"].createElement("div", null, _renderForecast(dayStyle, forecast, onClickItem))));
};

var _default = PeriodForecast;
exports["default"] = _default;
//# sourceMappingURL=PeriodForecast.js.map