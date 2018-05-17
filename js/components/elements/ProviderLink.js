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
  var className = _ref.className,
      style = _ref.style,
      prefixCL = _ref.prefixCL,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? 'Powered By ' : _ref$prefix;
  return _react2.default.createElement(
    'div',
    { className: className, style: style },
    _react2.default.createElement(
      'span',
      { className: prefixCL },
      prefix
    ),
    _react2.default.createElement(
      'a',
      {
        className: CL,
        style: S.LINK,
        href: 'https://openweathermap.org/'
      },
      'OpenWeatherMap'
    )
  );
};

exports.default = ProviderLink;
//# sourceMappingURL=ProviderLink.js.map