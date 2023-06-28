"use strict";

var _react = require("@testing-library/react");
var _index = require("../index");
var _jsxRuntime = require("react/jsx-runtime");
describe('Animate', () => {
  test('should change the style of children from to value by attributeName and duration', () => {
    const {
      container
    } = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Animate, {
      from: "1",
      to: "0",
      attributeName: "opacity",
      duration: 500,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "test-wrapper"
      })
    }));
    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('1');
    return (0, _react.waitFor)(() => {
      expect(element.style.opacity).toBe('0');
    }, {
      timeout: 700
    });
  });
  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn();
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Animate, {
      from: "1",
      to: "0",
      attributeName: "opacity",
      duration: 500,
      onAnimationEnd: handleAnimationEnd,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})
    }));
    expect(handleAnimationEnd).toHaveBeenCalledTimes(0);
    await (0, _react.waitFor)(() => {
      expect(handleAnimationEnd).toHaveBeenCalledTimes(1);
    }, {
      timeout: 900
    });
  });
  test('should change style as steps', async () => {
    const firstHandleAnimationEnd = jest.fn(),
      secondHandleAnimationEnd = jest.fn();
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Animate, {
      steps: [{
        duration: 0,
        style: {
          opacity: 0
        }
      }, {
        duration: 500,
        style: {
          opacity: 1
        },
        onAnimationEnd: firstHandleAnimationEnd
      }, {
        duration: 500,
        style: {
          opacity: 0.5
        }
      }],
      onAnimationEnd: secondHandleAnimationEnd,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})
    }));
    expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(0);
    expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(0);
    await (0, _react.waitFor)(() => {
      expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(1);
      expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(0);
    }, {
      timeout: 900
    });
    await (0, _react.waitFor)(() => {
      expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(1);
      expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(1);
    }, {
      timeout: 1400
    });
  });
});
//# sourceMappingURL=Animate.test.js.map