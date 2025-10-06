"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _Rectangle = require("../Rectangle");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _getNodeRectangles = container => container.querySelectorAll(`.${_CL.CL_RECTANGLE}`);
describe('<Rectangle />', () => {
  const rectangleRadiusCases = [{
    radius: [5, 10, 8, 15]
  }, {
    radius: 5
  }];
  test.each(rectangleRadiusCases)('Should render 1 rectangle in simple Rectangle when radius is $radius', _ref => {
    let {
      radius
    } = _ref;
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 400,
      height: 400,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 50,
        width: 80,
        height: 100,
        radius: radius,
        fill: "#ff7300"
      })
    }));
    expect(_getNodeRectangles(container)).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
  it('Should render 4 arc when height < 0', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 400,
      height: 400,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 200,
        width: 80,
        height: -100,
        radius: 5,
        fill: "#ff7300"
      })
    }));
    const rects = _getNodeRectangles(container);
    expect(rects).toHaveLength(1);
    //expect(rects[0]).toHaveAttribute('d');
    const paths = rects[0].getAttribute('d') || '';
    expect(paths.length - paths.split('A').join('').length).toBe(4);
    expect(container).toMatchSnapshot();
  });
  it("Shouldn't render anything when height === 0 || width === 0", () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Surface, {
      width: 400,
      height: 400,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 200,
        width: 80,
        height: 0,
        radius: 5,
        fill: "#ff7300"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 200,
        width: 0,
        height: 30,
        radius: 5,
        fill: "#ff7300"
      })]
    }));
    expect(_getNodeRectangles(container)).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
  it("Shouldn't render any path when x, y, width or height is not a number", () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Surface, {
      width: 400,
      height: 400,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: "a",
        y: 50,
        width: 80,
        height: 100,
        fill: "#ff7300"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: "b",
        width: 80,
        height: 100,
        fill: "#ff7300"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 50,
        width: "c",
        height: 100,
        fill: "#ff7300"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
        x: 50,
        y: 50,
        width: 80,
        height: "d",
        fill: "#ff7300"
      })]
    }));
    expect(_getNodeRectangles(container)).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
});
//# sourceMappingURL=Rectangle.test.js.map