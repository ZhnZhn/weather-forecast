'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React from 'react'

var CL = {
  BT: 'bt-raised',
  BT_DIV: 'bt-raised__div',
  BT_SPAN: 'bt-raised__span'
};

var S = {
  PRIMARY_SPAN: {
    color: 'greenyellow'
  }
};

var RaisedButton = function RaisedButton(_ref) {
  var rootStyle = _ref.rootStyle,
      _ref$clDiv = _ref.clDiv,
      clDiv = _ref$clDiv === undefined ? CL.BT_DIV : _ref$clDiv,
      caption = _ref.caption,
      isPrimary = _ref.isPrimary,
      onClick = _ref.onClick;

  var _spanStyle = isPrimary ? S.PRIMARY_SPAN : undefined;
  return _react2.default.createElement(
    'button',
    {
      tabIndex: 0,
      className: CL.BT,
      style: rootStyle,
      onClick: onClick
    },
    _react2.default.createElement(
      'div',
      { className: clDiv },
      _react2.default.createElement(
        'span',
        {
          className: CL.BT_SPAN,
          style: _spanStyle
        },
        caption
      )
    )
  );
};

exports.default = RaisedButton;
//# sourceMappingURL=RaisedButton.js.map