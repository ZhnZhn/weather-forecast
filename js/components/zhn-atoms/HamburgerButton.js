'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; //import React, { Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;

var STYLE = {
  HAMBURGER: {
    /*backgroundColor: '#80c040',*/
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  }
};

var HamburgerButton = (_temp = _class = function (_Component) {
  _inherits(HamburgerButton, _Component);

  function HamburgerButton(props) {
    _classCallCheck(this, HamburgerButton);

    var _this = _possibleConstructorReturn(this, (HamburgerButton.__proto__ || Object.getPrototypeOf(HamburgerButton)).call(this, props));

    _initialiseProps.call(_this);

    var state = props.store.getState();
    _this.state = {
      isOpen: state.layout[props.storeKey]
    };
    return _this;
  }

  _createClass(HamburgerButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen,
          btClass = !isOpen ? "bt-hamburger" : "bt-hamburger opened";


      return _react2.default.createElement(
        'button',
        {
          className: btClass,
          style: STYLE.HAMBURGER,
          onClick: this.handleClick
        },
        _react2.default.createElement('span', null)
      );
    }
  }]);

  return HamburgerButton;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onStore = function () {
    var _props = _this2.props,
        store = _props.store,
        storeKey = _props.storeKey,
        state = store.getState();

    if (state.layout[storeKey] !== _this2.state.isOpen) {
      _this2.setState(function (prev) {
        return { isOpen: !prev.isOpen };
      });
    }
  };

  this.handleClick = function () {
    var _props2 = _this2.props,
        onClick = _props2.onClick,
        store = _props2.store,
        storeKey = _props2.storeKey;

    store.dispatch(onClick(storeKey));
  };
}, _temp);
exports.default = HamburgerButton;
//# sourceMappingURL=HamburgerButton.js.map