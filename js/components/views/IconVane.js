"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require("../_react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from 'prop-types';

var IconVane = function IconVane(_ref) {
   var deg = _ref.deg;
   return _react2.default.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg",
         viewBox: "0 0 17 18", width: "100%", height: "100%",
         preserveAspectRatio: "none", "aria-labelledby": "title",
         className: "icon__popup__vane",
         style: { transform: "rotate(" + deg + "deg)" }
      },
      _react2.default.createElement(
         "title",
         { id: "title" },
         "Icon Wind Vane"
      ),
      _react2.default.createElement("path", { d: "M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0" })
   );
};

/*
IconVane.propTypes = {
  deg: PropTypes.number
}
*/

//import React from 'react';
exports.default = IconVane;
//# sourceMappingURL=IconVane.js.map