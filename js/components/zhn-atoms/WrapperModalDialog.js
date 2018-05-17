'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; //import React, { Component } from 'react'


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;
//import PropTypes from 'prop-types'

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

var WrapperModalDialog = (_temp = _class = function (_Component) {
  _inherits(WrapperModalDialog, _Component);

  function WrapperModalDialog(props) {
    _classCallCheck(this, WrapperModalDialog);

    var _this = _possibleConstructorReturn(this, (WrapperModalDialog.__proto__ || Object.getPrototypeOf(WrapperModalDialog)).call(this));

    _this.wasClosing = true;
    return _this;
  }
  /*
  static propTypes = {
    isShow  : PropTypes.bool,
    timeout : PropTypes.number,
    onClose : PropTypes.func
  }
  */


  _createClass(WrapperModalDialog, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.wasClosing) {
        setTimeout(function () {
          _this2.setState({});
        }, this.props.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          children = _props.children,
          onClose = _props.onClose;

      var _className = void 0,
          _style = void 0;
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

      return _react2.default.createElement(
        'div',
        { className: _className, style: _style, onClick: onClose },
        children
      );
    }
  }]);

  return WrapperModalDialog;
}(Component), _class.defaultProps = {
  timeout: 450
}, _temp);
exports.default = WrapperModalDialog;
//# sourceMappingURL=WrapperModalDialog.js.map