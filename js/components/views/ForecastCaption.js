'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Caption = function Caption(props) {
  var _props$forecast = props.forecast,
      forecast = _props$forecast === undefined ? {} : _props$forecast,
      _forecast$city = forecast.city,
      city = _forecast$city === undefined ? {} : _forecast$city,
      name = city.name,
      country = city.country;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      null,
      name
    ),
    _react2.default.createElement(
      'span',
      null,
      ':'
    ),
    _react2.default.createElement(
      'span',
      null,
      country
    )
  );
};

exports.default = Caption;
//# sourceMappingURL=D:\_Dev\_React\_Saga\js\components\views\ForecastCaption.js.map