"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _jsxRuntime = require("react/jsx-runtime");
describe('<CartesianGrid />', function () {
  var horizontalPoints = [10, 20, 30, 100, 400];
  var verticalPoints = [100, 200, 300, 400];
  test('Render 5 horizontal lines and 4 vertical lines in simple CartesianGrid', function () {
    var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianGrid, {
          x: 0,
          y: 0,
          width: 500,
          height: 500,
          verticalPoints: verticalPoints,
          horizontalPoints: horizontalPoints
        })
      })),
      container = _render.container;
    expect(container.querySelectorAll('line')).toHaveLength(horizontalPoints.length + verticalPoints.length);
  });
  test("Don't render any lines when verticalPoints and horizontalPoints are empty", function () {
    var _render2 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianGrid, {
          width: 500,
          height: 500
        })
      })),
      container = _render2.container;
    expect(container.querySelectorAll('line')).toHaveLength(0);
  });
  test("Don't render any lines when width or height is smaller than 0", function () {
    var _render3 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianGrid, {
          width: 0,
          height: 500
        })
      })),
      container = _render3.container;
    expect(container.querySelectorAll('line')).toHaveLength(0);
  });
});
//# sourceMappingURL=CartesianGrid.test.js.map