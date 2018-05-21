'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; //import React, { Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var CL = {
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

var DF = {
  OPEN_COLOR: _Color2.default.YELLOW,
  CLOSE_COLOR: _Color2.default.BLANK
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
    color: _Color2.default.SIREN,
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

var OpenClose = (_temp = _class = function (_Component) {
  _inherits(OpenClose, _Component);

  function OpenClose(props) {
    _classCallCheck(this, OpenClose);

    var _this = _possibleConstructorReturn(this, (OpenClose.__proto__ || Object.getPrototypeOf(OpenClose)).call(this));

    _this._handleClick = function () {
      _this.setState(function (prev) {
        return { isOpen: !prev.isOpen };
      });
    };

    var isClose = props.isClose;

    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }

  _createClass(OpenClose, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          openColor = _props.openColor,
          closeColor = _props.closeColor,
          CompAfter = _props.CompAfter,
          isClickableCompAfter = _props.isClickableCompAfter,
          childStyle = _props.childStyle,
          children = _props.children,
          isOpen = this.state.isOpen;

      var _pathV = void 0,
          _fillV = void 0,
          _rootChildStyle = void 0,
          _rootChildCl = void 0;
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

      return _react2.default.createElement(
        'div',
        { style: _extends({}, S.ROOT_DIV, rootStyle) },
        _react2.default.createElement(
          'div',
          { className: CL.NOT_SELECTED },
          _react2.default.createElement(
            'div',
            {
              style: _extends({}, S.INLINE_BLOCK, S.CURSOR),
              onClick: this._handleClick
            },
            _react2.default.createElement(
              'div',
              { style: S.ROOT_SVG },
              _react2.default.createElement(
                'svg',
                {
                  viewBox: '0 0 16 16', width: '100%', height: '100%',
                  preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
                  style: S.INLINE_BLOCK
                },
                _react2.default.createElement('path', {
                  d: _pathV,
                  fill: _fillV,
                  strokeWidth: '1',
                  stroke: openColor
                })
              )
            ),
            _react2.default.createElement(
              'span',
              { style: S.CAPTION },
              caption
            ),
            CompAfter && isClickableCompAfter && CompAfter
          ),
          !isClickableCompAfter && CompAfter
        ),
        _react2.default.createElement(
          'div',
          {
            className: _rootChildCl,
            style: _extends({}, childStyle, _rootChildStyle)
          },
          children
        )
      );
    }
  }]);

  return OpenClose;
}(Component), _class.defaultProps = {
  openColor: DF.OPEN_COLOR,
  closeColor: DF.CLOSE_COLOR
}, _temp);
exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map