'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; //import React, { Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Interact = require('../../utils/Interact');

var _Interact2 = _interopRequireDefault(_Interact);

var _SvgClose = require('../zhn-atoms/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _actions = require('../../flux/layout/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var CLASS_SHOW = 'show-popup';

var STYLE = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '12px',
    right: '6px'
  }
};

var FlyPopup = (_temp = _class = function (_Component) {
  _inherits(FlyPopup, _Component);

  /*
  static propTypes = {
     rootStyle: PropTypes.object,
     store: PropTypes.object,
     storeKey: PropTypes.string
  }
  */

  function FlyPopup(props) {
    _classCallCheck(this, FlyPopup);

    var _this = _possibleConstructorReturn(this, (FlyPopup.__proto__ || Object.getPrototypeOf(FlyPopup)).call(this, props));

    _initialiseProps.call(_this);

    var store = props.store,
        storeKey = props.storeKey;

    var state = store.getState();
    _this.state = {
      isShow: state.layout[storeKey]
    };
    return _this;
  }

  _createClass(FlyPopup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _Interact2.default.makeDragable(this.domRootDiv);
      var store = this.props.store;

      this.unsubsribe = store.subscribe(this._onStore);
    }
  }, {
    key: 'componetWillUnmount',
    value: function componetWillUnmount() {
      this.unsubsribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          rootStyle = _props.rootStyle,
          isShow = this.state.isShow,
          _styleShow = isShow ? STYLE.BLOCK : STYLE.NONE,
          _classShow = isShow ? CLASS_SHOW : undefined;

      return _react2.default.createElement(
        'div',
        {
          ref: this._refRootDiv,
          className: _classShow,
          style: _extends({}, rootStyle, _styleShow)
        },
        _react2.default.createElement(_SvgClose2.default, {
          style: STYLE.SVG_CLOSE,
          onClose: this.handleClose
        }),
        children
      );
    }
  }]);

  return FlyPopup;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onStore = function () {
    var _props2 = _this2.props,
        store = _props2.store,
        storeKey = _props2.storeKey,
        _store$getState = store.getState(),
        layout = _store$getState.layout,
        isShow = _this2.state.isShow;

    if (layout[storeKey] !== isShow) {
      _this2.setState({ isShow: layout[storeKey] });
    }
  };

  this.handleClose = function () {
    var _props3 = _this2.props,
        store = _props3.store,
        storeKey = _props3.storeKey;

    store.dispatch((0, _actions.toggleLayout)(storeKey));
  };

  this._refRootDiv = function (c) {
    return _this2.domRootDiv = c;
  };
}, _temp);
exports.default = FlyPopup;
//# sourceMappingURL=FlyPopup.js.map