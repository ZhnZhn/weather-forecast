"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var S = {
  HAMBURGER: {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  }
};

var HamburgerButton =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(HamburgerButton, _Component);

  function HamburgerButton(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          storeKey = _this$props.storeKey,
          state = store.getState();

      if (state.layout[storeKey] !== _this.state.isOpen) {
        _this.setState(function (prev) {
          return {
            isOpen: !prev.isOpen
          };
        });
      }
    };

    _this.handleClick = function () {
      var _this$props2 = _this.props,
          onClick = _this$props2.onClick,
          store = _this$props2.store,
          storeKey = _this$props2.storeKey;
      store.dispatch(onClick(storeKey));
    };

    var _state = props.store.getState();

    _this.state = {
      isOpen: _state.layout[props.storeKey]
    };
    return _this;
  }

  var _proto = HamburgerButton.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var isOpen = this.state.isOpen,
        btClass = isOpen ? "bt-hamburger opened" : "bt-hamburger";
    return _react["default"].createElement("button", {
      className: btClass,
      style: S.HAMBURGER,
      onClick: this.handleClick
    }, _react["default"].createElement("span", null));
  };

  return HamburgerButton;
}(Component);

var _default = HamburgerButton;
exports["default"] = _default;
//# sourceMappingURL=HamburgerButton.js.map