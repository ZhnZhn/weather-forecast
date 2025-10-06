"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
let i = 0;
const _crUniqueKey = () => {
  i += 1;
  return `key${i}`;
};
const _getElementByClassName = function (container, className) {
  if (className === void 0) {
    className = _CL.CL_BAR_RECTANGLE;
  }
  return container.querySelectorAll(`.${className}`);
};
describe('<Bar />', () => {
  const data = [{
    x: 10,
    y: 50,
    width: 20,
    height: 50,
    value: 100,
    label: 'test1'
  }, {
    x: 50,
    y: 50,
    width: 20,
    height: 50,
    value: 200,
    label: 'test2'
  }, {
    x: 90,
    y: 50,
    width: 20,
    height: 50,
    value: 300,
    label: 'test3'
  }];
  it(`Render ${data.length} rectangles in a simple Bar`, () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        isAnimationActive: false,
        layout: "horizontal",
        data: data,
        dataKey: "value",
        fill: "#0922a5"
      })
    }));
    expect(_getElementByClassName(container)).toHaveLength(data.length);
    const allBarPaths = _getElementByClassName(container, `${_CL.CL_BAR} .${_CL.CL_RECTANGLE}`),
      _renderedPaths = Array.from(allBarPaths).map(bar => ({
        d: bar.getAttribute("d"),
        fill: bar.getAttribute("fill")
      }));
    expect(_renderedPaths).toEqual([{
      d: "M 10,50 h 20 v 50 h -20 Z",
      fill: "#0922a5"
    }, {
      d: "M 50,50 h 20 v 50 h -20 Z",
      fill: "#0922a5"
    }, {
      d: "M 90,50 h 20 v 50 h -20 Z",
      fill: "#0922a5"
    }]);
  });
  it(`Should use property radius`, () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        isAnimationActive: false,
        layout: "horizontal",
        data: data,
        dataKey: "value",
        fill: "#0922a5",
        radius: 2
      })
    }));
    expect(_getElementByClassName(container)).toHaveLength(data.length);
    const allBarPaths = _getElementByClassName(container, `${_CL.CL_BAR} .${_CL.CL_RECTANGLE}`),
      _renderedPaths = Array.from(allBarPaths).map(bar => ({
        d: bar.getAttribute("d"),
        fill: bar.getAttribute("fill")
      }));
    expect(_renderedPaths).toEqual([{
      d: `M 10,52
        A 2,2,0,0,1,12,50
        L 28,50
        A 2,2,0,0,1,30,52
        L 30,98
        A 2,2,0,0,1,28,100
        L 12,100
        A 2,2,0,0,1,10,98 Z`,
      fill: "#0922a5"
    }, {
      d: `M 50,52
        A 2,2,0,0,1,52,50
        L 68,50
        A 2,2,0,0,1,70,52
        L 70,98
        A 2,2,0,0,1,68,100
        L 52,100
        A 2,2,0,0,1,50,98 Z`,
      fill: "#0922a5"
    }, {
      d: `M 90,52
        A 2,2,0,0,1,92,50
        L 108,50
        A 2,2,0,0,1,110,52
        L 110,98
        A 2,2,0,0,1,108,100
        L 92,100
        A 2,2,0,0,1,90,98 Z`,
      fill: "#0922a5"
    }]);
  });
  it(`Render ${data.length} rectangles in a vertical Bar`, () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        isAnimationActive: false,
        layout: "vertical",
        data: data,
        dataKey: "value"
      })
    }));
    expect(_getElementByClassName(container)).toHaveLength(data.length);
  });
  it("Don't render any rectangle when data is empty", () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        data: [],
        dataKey: "value"
      })
    }));
    expect(_getElementByClassName(container)).toHaveLength(0);
  });
});
describe('<Bar /> With background', () => {
  const composedDataWithBackground = [{
    x: 10,
    y: 50,
    width: 20,
    height: 20,
    value: 40,
    label: 'test',
    background: {
      x: 10,
      y: 50,
      width: 20,
      height: 50
    }
  }, {
    x: 50,
    y: 50,
    width: 20,
    height: 50,
    value: 100,
    label: 'test',
    background: {
      x: 50,
      y: 50,
      width: 20,
      height: 50
    }
  }];
  it('Will create a background Rectangle with the passed in props', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        background: {
          fill: '#000'
        },
        data: composedDataWithBackground,
        dataKey: "value"
      })
    }));
    expect(_getElementByClassName(container, _CL.CL_BAR_BACKGROUND_RECTANGLE)).toHaveLength(composedDataWithBackground.length);
  });
  it('Will accept a function for the background prop', () => {
    const CL_TEST_CUSTOM_BACKGROUND = 'test-custom-background',
      backgroundComponent = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_TEST_CUSTOM_BACKGROUND
      }, _crUniqueKey()),
      {
        container
      } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          background: backgroundComponent,
          data: composedDataWithBackground,
          dataKey: "value"
        })
      }));
    expect(_getElementByClassName(container, CL_TEST_CUSTOM_BACKGROUND)).toHaveLength(composedDataWithBackground.length);
  });
});
//# sourceMappingURL=Bar.test.js.map