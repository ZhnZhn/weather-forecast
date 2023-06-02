"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
var i = 0;
var _crUniqueKey = function _crUniqueKey() {
  i += 1;
  return "key" + i;
};
describe('<Bar />', function () {
  var data = [{
    x: 10,
    y: 50,
    width: 20,
    height: 50,
    value: 100,
    label: 'test'
  }, {
    x: 50,
    y: 50,
    width: 20,
    height: 50,
    value: 100,
    label: 'test'
  }, {
    x: 90,
    y: 50,
    width: 20,
    height: 50,
    value: 100,
    label: 'test'
  }];
  it("Render " + data.length + " rectangles in a simple Bar", function () {
    var wrapper = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        isAnimationActive: false,
        layout: "horizontal",
        data: data,
        dataKey: "value"
      })
    }));
    expect(wrapper.getAllByRole('img')).toHaveLength(data.length);
  });
  it("Render " + data.length + " rectangles in a vertical Bar", function () {
    var wrapper = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        isAnimationActive: false,
        layout: "vertical",
        data: data,
        dataKey: "value"
      })
    }));
    expect(wrapper.getAllByRole('img')).toHaveLength(data.length);
  });
  it("Don't render any rectangle when data is empty", function () {
    var wrapper = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
        data: [],
        dataKey: "value"
      })
    }));
    expect(wrapper.queryAllByRole('img')).toHaveLength(0);
  });
});
describe('<Bar /> With background', function () {
  var composedDataWithBackground = [{
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
  it('Will create a background Rectangle with the passed in props', function () {
    var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          background: {
            fill: '#000'
          },
          data: composedDataWithBackground,
          dataKey: "value"
        })
      })),
      container = _render.container;
    expect(container.querySelectorAll("." + _CL.CL_BAR_BACKGROUND_RECTANGLE)).toHaveLength(composedDataWithBackground.length);
  });
  it('Will accept a function for the background prop', function () {
    var CL_TEST_CUSTOM_BACKGROUND = 'test-custom-background',
      backgroundComponent = function backgroundComponent() {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: CL_TEST_CUSTOM_BACKGROUND
        }, _crUniqueKey());
      },
      _render2 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          background: backgroundComponent,
          data: composedDataWithBackground,
          dataKey: "value"
        })
      })),
      container = _render2.container;
    expect(container.querySelectorAll("." + CL_TEST_CUSTOM_BACKGROUND)).toHaveLength(composedDataWithBackground.length);
  });
});
//# sourceMappingURL=Bar.test.js.map