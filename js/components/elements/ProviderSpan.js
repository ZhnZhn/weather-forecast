'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = "data-provider-link";

var S = {
  LINK: {
    color: '#ff9800'
  }
};

var ProviderLink = function ProviderLink(_ref) {
  var style = _ref.style,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? 'Powered By ' : _ref$prefix;
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(
      'span',
      null,
      prefix
    ),
    _react2.default.createElement(
      'a',
      {
        className: CL,
        href: 'https://openweathermap.org/',
        style: S.LINK
      },
      'OpenWeatherMap'
    )
  );
};

exports.default = ProviderLink;
//# sourceMappingURL=ProviderSpan.js.map