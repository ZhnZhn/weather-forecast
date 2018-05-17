'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Caption = require('./Caption');

var _Caption2 = _interopRequireDefault(_Caption);

var _DayItem = require('./DayItem');

var _DayItem2 = _interopRequireDefault(_DayItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; //import React from 'react';


var PeriodForecast = function PeriodForecast(_ref) {
   var dayStyle = _ref.dayStyle,
       _ref$forecast = _ref.forecast,
       forecast = _ref$forecast === undefined ? {} : _ref$forecast,
       captionStyle = _ref.captionStyle,
       onClickItem = _ref.onClickItem;

   return _react2.default.createElement(
      'div',
      { style: { cursor: 'auto' } },
      _react2.default.createElement(_Caption2.default, {
         forecast: forecast,
         style: captionStyle
      }),
      _react2.default.createElement(
         'div',
         null,
         _renderForecast(dayStyle, forecast, onClickItem)
      )
   );
};

exports.default = PeriodForecast;
//# sourceMappingURL=PeriodForecast.js.map