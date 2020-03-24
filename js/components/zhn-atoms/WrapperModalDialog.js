"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

//import React, { Component } from 'react'
var Component = _react["default"].Component; //import PropTypes from 'prop-types'

var CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};
var STYLE = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
};

var WrapperModalDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(WrapperModalDialog, _Component);

  function WrapperModalDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.wasClosing = true;
    return _this;
  }

  var _proto = WrapperModalDialog.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    if (this.wasClosing) {
      setTimeout(function () {
        _this2.setState({});
      }, this.props.timeout);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        children = _this$props.children,
        onClose = _this$props.onClose;

    var _className, _style;

    if (this.wasClosing) {
      _className = CL.INIT;
      _style = STYLE.HIDE;
      this.wasClosing = false;
    } else {
      _className = isShow ? CL.SHOWING : CL.HIDING;
      _style = isShow ? STYLE.SHOW : STYLE.HIDE_BACKGROUND;

      if (!isShow) {
        this.wasClosing = true;
      }
    }

    return _react["default"].createElement("div", {
      className: _className,
      style: _style,
      onClick: onClose
    }, children);
  };

  return WrapperModalDialog;
}(Component);

WrapperModalDialog.defaultProps = {
  timeout: 450
};
var _default = WrapperModalDialog;
exports["default"] = _default;
//# sourceMappingURL=WrapperModalDialog.js.map