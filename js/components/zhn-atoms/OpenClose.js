"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var CL = {
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};
var DF = {
  OPEN_COLOR: _Color["default"].YELLOW,
  CLOSE_COLOR: _Color["default"].BLANK
};
var S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  CAPTION: {
    color: _Color["default"].SIREN,
    paddingLeft: '4px',
    verticalAlign: 'top',
    //color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  CURSOR: {
    cursor: 'pointer'
  },
  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};
var PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
var PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var OpenClose =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(OpenClose, _Component);

  function OpenClose(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleClick = function () {
      _this.setState(function (prev) {
        return {
          isOpen: !prev.isOpen
        };
      });
    };

    var isClose = props.isClose;
    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }

  var _proto = OpenClose.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        caption = _this$props.caption,
        openColor = _this$props.openColor,
        closeColor = _this$props.closeColor,
        CompAfter = _this$props.CompAfter,
        isClickableCompAfter = _this$props.isClickableCompAfter,
        childStyle = _this$props.childStyle,
        children = _this$props.children,
        isOpen = this.state.isOpen;

    var _pathV, _fillV, _rootChildStyle, _rootChildCl;

    if (isOpen) {
      _pathV = PATH_OPEN;
      _fillV = openColor;
      _rootChildStyle = S.BLOCK;
      _rootChildCl = CL.SHOW_POPUP;
    } else {
      _pathV = PATH_CLOSE;
      _fillV = closeColor;
      _rootChildStyle = S.NONE;
      _rootChildCl = null;
    }

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT_DIV, {}, rootStyle)
    }, _react["default"].createElement("div", {
      className: CL.NOT_SELECTED
    }, _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.INLINE_BLOCK, {}, S.CURSOR),
      onClick: this._handleClick
    }, _react["default"].createElement("div", {
      style: S.ROOT_SVG
    }, _react["default"].createElement("svg", {
      viewBox: "0 0 16 16",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: S.INLINE_BLOCK
    }, _react["default"].createElement("path", {
      d: _pathV,
      fill: _fillV,
      strokeWidth: "1",
      stroke: openColor
    }))), _react["default"].createElement("span", {
      style: S.CAPTION
    }, caption), CompAfter && isClickableCompAfter && CompAfter), !isClickableCompAfter && CompAfter), _react["default"].createElement("div", {
      className: _rootChildCl,
      style: (0, _extends2["default"])({}, childStyle, {}, _rootChildStyle)
    }, children));
  };

  return OpenClose;
}(Component);

OpenClose.defaultProps = {
  openColor: DF.OPEN_COLOR,
  closeColor: DF.CLOSE_COLOR
};
var _default = OpenClose;
exports["default"] = _default;
//# sourceMappingURL=OpenClose.js.map