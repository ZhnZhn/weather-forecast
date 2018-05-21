'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _OpenClose = require('../zhn-atoms/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Caption = require('./Caption');

var _Caption2 = _interopRequireDefault(_Caption);

var _DayItem = require('./DayItem');

var _DayItem2 = _interopRequireDefault(_DayItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    cursor: 'auto'
  },
  OPEN_CLOSE: {
    lineHeight: 1.5
  }
}; //import React from 'react';


var _renderForecast = function _renderForecast(dayStyle, forecast, onClick) {
  var _forecast$list = forecast.list,
      list = _forecast$list === undefined ? [] : _forecast$list;

  return list.map(function (item, index) {
    return _react2.default.createElement(_DayItem2.default, { key: index,
      style: dayStyle,
      item: item,
      onClick: onClick
    });
  });
};

var PeriodForecast = function PeriodForecast(_ref) {
  var dayStyle = _ref.dayStyle,
      _ref$forecast = _ref.forecast,
      forecast = _ref$forecast === undefined ? {} : _ref$forecast,
      captionStyle = _ref.captionStyle,
      onClickItem = _ref.onClickItem;

  return _react2.default.createElement(
    'div',
    { style: S.ROOT },
    _react2.default.createElement(
      _OpenClose2.default,
      {
        rootStyle: S.OPEN_CLOSE,
        openColor: _Color2.default.BROWN,
        isClickableCompAfter: true,
        CompAfter: _react2.default.createElement(_Caption2.default, {
          style: captionStyle,
          forecast: forecast
        })
      },
      _react2.default.createElement(
        'div',
        null,
        _renderForecast(dayStyle, forecast, onClickItem)
      )
    )
  );
};

exports.default = PeriodForecast;
//# sourceMappingURL=PeriodForecast.js.map