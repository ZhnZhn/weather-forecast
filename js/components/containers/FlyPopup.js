"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _actions = require("../../flux/layout/actions");

//import React, { Component } from 'react';
var Component = _react["default"].Component;
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
    top: '16px',
    right: '6px'
  }
};

var FlyPopup =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(FlyPopup, _Component);

  /*
  static propTypes = {
     rootStyle: PropTypes.object,
     store: PropTypes.object,
     storeKey: PropTypes.string
  }
  */
  function FlyPopup(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          storeKey = _this$props.storeKey,
          _store$getState = store.getState(),
          layout = _store$getState.layout,
          isShow = _this.state.isShow;

      if (layout[storeKey] !== isShow) {
        _this.setState({
          isShow: layout[storeKey]
        });
      }
    };

    _this.handleClose = function () {
      var _this$props2 = _this.props,
          store = _this$props2.store,
          storeKey = _this$props2.storeKey;
      store.dispatch((0, _actions.toggleLayout)(storeKey));
    };

    _this._refRootDiv = function (c) {
      return _this.domRootDiv = c;
    };

    var _store = props.store,
        _storeKey = props.storeKey;

    var state = _store.getState();

    _this.state = {
      isShow: state.layout[_storeKey]
    };
    return _this;
  }

  var _proto = FlyPopup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Interact["default"].makeDragable(this.domRootDiv);

    var store = this.props.store;
    this.unsubsribe = store.subscribe(this._onStore);
  };

  _proto.componetWillUnmount = function componetWillUnmount() {
    this.unsubsribe();
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        rootStyle = _this$props3.rootStyle,
        isShow = this.state.isShow,
        _styleShow = isShow ? STYLE.BLOCK : STYLE.NONE,
        _classShow = isShow ? CLASS_SHOW : undefined;

    return _react["default"].createElement("div", {
      ref: this._refRootDiv,
      className: _classShow,
      style: (0, _extends2["default"])({}, rootStyle, {}, _styleShow)
    }, _react["default"].createElement(_SvgClose["default"], {
      style: STYLE.SVG_CLOSE,
      onClose: this.handleClose
    }), children);
  };

  return FlyPopup;
}(Component);

var _default = FlyPopup;
exports["default"] = _default;
//# sourceMappingURL=FlyPopup.js.map