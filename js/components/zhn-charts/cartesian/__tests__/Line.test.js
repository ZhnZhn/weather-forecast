"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
describe('<Line />', function () {
  var data = [{
    x: 10,
    y: 50,
    value: 100
  }, {
    x: 50,
    y: 50,
    value: 100
  }, {
    x: 90,
    y: 50,
    value: 100
  }];
  it('Render a path in a simple Line', function () {
    var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          isAnimationActive: false,
          points: data
        })
      })),
      container = _render.container;
    expect(container.querySelectorAll('.' + _CL.CL_LINE_CURVE)).toHaveLength(1);
  });
  it("Don't render any path when data is empty", function () {
    var _render2 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          points: []
        })
      })),
      container = _render2.container;
    expect(container.querySelectorAll('.' + _CL.CL_LINE_CURVE)).toHaveLength(0);
  });
});
//# sourceMappingURL=Line.test.js.map