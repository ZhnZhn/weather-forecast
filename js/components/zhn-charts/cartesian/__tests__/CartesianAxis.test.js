"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _CL = require("../../CL");
var _jsxRuntime = require("react/jsx-runtime");
/*
const CustomizeLabel = ({
  x,
  y
}) => (
  <text data-testid="customized-label" x={x} y={y}>
    test
  </text>
);
*/const CustomizedTick = _ref => {
  let {
    x,
    y
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    "data-testid": "customized-tick",
    x: x,
    y: y,
    children: "test"
  });
};
describe('<CartesianAxis />', () => {
  const ticks = [{
    value: 10,
    coordinate: 50
  }, {
    value: 1000,
    coordinate: 100
  }, {
    value: 20,
    coordinate: 150
  }];
  it('Renders 5 ticks in simple CartesianAxis', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    //expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(0);
  });
  it('Renders no ticks in simple CartesianAxis', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(0);
  });
  it('Renders ticks when interval="preserveStartEnd"', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
  });
  it('gets font states from its ComputedStyle', () => {
    const myStyle = {
      fontSize: '14px',
      letterSpacing: '0.5em'
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(myStyle);
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    const container = document.querySelector('#recharts_measurement_span');
    expect(container == null ? void 0 : container.style).toMatchObject(myStyle);
  });
  it('Renders ticks when interval="preserveStart"', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation top', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    //expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(0);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation left', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    //expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(0);
  });
  it('Renders 5 ticks in a CartesianAxis which has orientation right', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(ticks.length);
    //expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
    expect(container.querySelectorAll("." + _CL.CL_LABEL)).toHaveLength(0);
  });

  /*
  it('Renders label when label is a function', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="left"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label={CustomizeLabel}
        />
      </Surface>,
    );
      expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(screen.getAllByTestId('customized-label')).toHaveLength(1);
  });
  */

  /*
  it('Renders label when label is a react element', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="right"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label={<CustomizeLabel />}
        />
      </Surface>,
    );
      expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(screen.getAllByTestId('customized-label')).toHaveLength(1);
  });
  */

  it('Render customized ticks when tick is set to be a ReactElement', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
  it('Render customized ticks when ticks is an array of strings and interval is 0', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
  it('Render customized ticks when tick is set to be a function', () => {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
  it('Renders no ticks when tick is set to false', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Surface, {
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
    }));
    expect(container.querySelectorAll("." + _CL.CL_AXIS_TICK)).toHaveLength(0);
  });
});
//# sourceMappingURL=CartesianAxis.test.js.map