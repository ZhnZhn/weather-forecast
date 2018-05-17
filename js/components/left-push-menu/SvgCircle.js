'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  SVG: {
    position: 'relative',
    top: '4px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
}; //import React from 'react';


var SvgCircle = function SvgCircle(_ref) {
  var stroke = _ref.stroke,
      fill = _ref.fill;

  return _react2.default.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 18 18', width: '100%', height: '100%',
      preserveAspectRatio: 'none', 'aria-labelledby': 'title',
      style: STYLE.SVG
    },
    _react2.default.createElement(
      'title',
      { id: 'title' },
      'Circle Marker'
    ),
    _react2.default.createElement('circle', { r: '6', stroke: stroke, strokeWidth: '2', fill: fill, cx: '9', cy: '9' })
  );
};

exports.default = SvgCircle;
//# sourceMappingURL=SvgCircle.js.map