'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  CELL: {
    paddingBottom: '4px',
    cursor: 'pointer'
  }
};

var LegendCell = function LegendCell(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick,
      children = _ref.children,
      titleStyle = _ref.titleStyle,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title;
  return _react2.default.createElement(
    'div',
    {
      style: _extends({}, S.CELL, style),
      onClick: onClick
    },
    children,
    _react2.default.createElement(
      'span',
      { style: titleStyle },
      title
    )
  );
};

exports.default = LegendCell;
//# sourceMappingURL=LegendCell.js.map