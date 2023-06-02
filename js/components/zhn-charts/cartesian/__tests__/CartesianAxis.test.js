"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
var CustomizeLabel = function CustomizeLabel(_ref) {
  var x = _ref.x,
    y = _ref.y;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    "data-testid": "customized-label",
    x: x,
    y: y,
    children: "test"
  });
};
var CustomizedTick = function CustomizedTick(_ref2) {
  var x = _ref2.x,
    y = _ref2.y;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    "data-testid": "customized-tick",
    x: x,
    y: y,
    children: "test"
  });
};
describe('<CartesianAxis />', function () {
  var ticks = [{
    value: 10,
    coordinate: 50
  }, {
    value: 1000,
    coordinate: 100
  }, {
    value: 20,
    coordinate: 150
  }];
  it('Renders 5 ticks in simple CartesianAxis', function () {
    var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "bottom",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "test"
        })
      })),
      container = _render.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(1);
  });
  it('Renders no ticks in simple CartesianAxis', function () {
    var _render2 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "bottom",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: [],
          label: "test"
        })
      })),
      container = _render2.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(0);
  });
  it('Renders ticks when interval="preserveStartEnd"', function () {
    var _render3 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "bottom",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "test",
          interval: "preserveStartEnd"
        })
      })),
      container = _render3.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
  });
  it('gets font states from its ComputedStyle', function () {
    var myStyle = {
      fontSize: '14px',
      letterSpacing: '0.5em'
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(myStyle);
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
        "data-testid": "hello",
        orientation: "bottom",
        y: 100,
        width: 400,
        height: 50,
        viewBox: {
          x: 0,
          y: 0,
          width: 500,
          height: 500
        },
        ticks: ticks,
        label: "test",
        interval: "preserveStartEnd"
      })
    }));
    var container = document.querySelector('#recharts_measurement_span');
    expect(container == null ? void 0 : container.style).toMatchObject(myStyle);
  });
  it('Renders ticks when interval="preserveStart"', function () {
    var _render4 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "bottom",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "test",
          interval: "preserveStart"
        })
      })),
      container = _render4.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation top', function () {
    var _render5 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "top",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "top"
        })
      })),
      container = _render5.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(1);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation left', function () {
    var _render6 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "left",
          y: 100,
          width: 50,
          height: 400,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "left"
        })
      })),
      container = _render6.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(1);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation right', function () {
    var _render7 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "right",
          y: 100,
          width: 50,
          height: 400,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: "right"
        })
      })),
      container = _render7.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(1);
  });
  it('Renders label when label is a function', function () {
    var _render8 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "left",
          y: 100,
          width: 50,
          height: 400,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: CustomizeLabel
        })
      })),
      container = _render8.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(_react.screen.getAllByTestId('customized-label')).toHaveLength(1);
  });
  it('Renders label when label is a react element', function () {
    var _render9 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "right",
          y: 100,
          width: 50,
          height: 400,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          ticks: ticks,
          label: /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomizeLabel, {})
        })
      })),
      container = _render9.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    expect(_react.screen.getAllByTestId('customized-label')).toHaveLength(1);
  });
  it('Render customized ticks when tick is set to be a ReactElement', function () {
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
        orientation: "bottom",
        y: 100,
        width: 400,
        height: 50,
        viewBox: {
          x: 0,
          y: 0,
          width: 500,
          height: 500
        },
        ticks: ticks,
        tick: /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomizedTick, {}),
        interval: 0
      })
    }));
    expect(_react.screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });
  it('Render customized ticks when ticks is an array of strings and interval is 0', function () {
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
        orientation: "bottom",
        y: 100,
        width: 400,
        height: 50,
        viewBox: {
          x: 0,
          y: 0,
          width: 500,
          height: 500
        },
        ticks: ticks,
        tick: /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomizedTick, {}),
        interval: 0
      })
    }));
    expect(_react.screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });
  it('Render customized ticks when tick is set to be a function', function () {
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
      width: 500,
      height: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
        orientation: "bottom",
        y: 100,
        width: 400,
        height: 50,
        viewBox: {
          x: 0,
          y: 0,
          width: 500,
          height: 500
        },
        ticks: ticks,
        tick: CustomizedTick,
        interval: 0
      })
    }));
    expect(_react.screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });
  it('Renders no ticks when tick is set to false', function () {
    var _render10 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
        width: 500,
        height: 500,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CartesianAxis, {
          orientation: "bottom",
          y: 100,
          width: 400,
          height: 50,
          viewBox: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          },
          tick: false
        })
      })),
      container = _render10.container;
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(0);
  });
});
//# sourceMappingURL=CartesianAxis.test.js.map