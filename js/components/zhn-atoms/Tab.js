"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React, { Component } from 'react';
var CL = "tab";
var S = {
  BT: {
    color: '#2f7ed8',
    borderBottom: '3px solid #2f7ed8'
  },
  TITLE: {
    color: '#2f7ed8'
  }
};

var Tab = function Tab(_ref) {
  var id = _ref.id,
      title = _ref.title,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;

  var _btStyle = isSelected ? S.BT : null,
      _titleStyle = isSelected ? S.TITLE : null;

  return _react["default"].createElement("button", {
    className: CL,
    style: _btStyle,
    id: "tab-" + id,
    role: "tab",
    "aria-selected": isSelected,
    "aria-controls": "tabpanel-" + id,
    tabIndex: "0",
    onClick: onClick
  }, _react["default"].createElement("span", {
    style: _titleStyle
  }, title));
};

var _default = Tab;
exports["default"] = _default;
//# sourceMappingURL=Tab.js.map