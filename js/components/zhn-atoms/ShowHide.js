"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var SHOW_POPUP = 'show-popup';
var S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

var ShowHide = function ShowHide(props) {
  var isShow = props.isShow,
      className = props.className,
      style = props.style,
      children = props.children,
      _styleShow = isShow ? S.SHOW : S.HIDE,
      _classShow = isShow ? SHOW_POPUP : '',
      _className = className ? className + " " + _classShow : _classShow !== '' ? _classShow : undefined;

  return _react["default"].createElement("div", {
    className: _className,
    style: Object.assign({}, style, _styleShow)
  }, children);
};

var _default = ShowHide;
exports["default"] = _default;
//# sourceMappingURL=ShowHide.js.map