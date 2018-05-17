'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  SVG: {
    position: 'relative',
    top: '2px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
}; //import React from 'react';


var SvgRest = function SvgRest(_ref) {
  var _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'green' : _ref$stroke,
      fill = _ref.fill;

  if (!fill) {
    fill = stroke;
  }
  return _react2.default.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 18 18', width: '100%', height: '100%',
      preserveAspectRatio: 'none', 'aria-labelledby': 'title',
      style: S.SVG
    },
    _react2.default.createElement(
      'title',
      { id: 'title' },
      'Rest Marker'
    ),
    _react2.default.createElement('rect', {
      x: '3', y: '0', width: '11', height: '18',
      stroke: stroke, fill: fill
    })
  );
};

exports.default = SvgRest;
//# sourceMappingURL=SvgRect.js.map