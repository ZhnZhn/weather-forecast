"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

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
      clDiv = _ref$clDiv === void 0 ? CL.BT_DIV : _ref$clDiv,
      caption = _ref.caption,
      isPrimary = _ref.isPrimary,
      onClick = _ref.onClick;

  var _spanStyle = isPrimary ? S.PRIMARY_SPAN : undefined;

  return _react["default"].createElement("button", {
    tabIndex: 0,
    className: CL.BT,
    style: rootStyle,
    onClick: onClick
  }, _react["default"].createElement("div", {
    className: clDiv
  }, _react["default"].createElement("span", {
    className: CL.BT_SPAN,
    style: _spanStyle
  }, caption)));
};

var _default = RaisedButton;
exports["default"] = _default;
//# sourceMappingURL=RaisedButton.js.map