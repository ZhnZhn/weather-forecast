"use strict";

var _react = require("@testing-library/react");
var _JsAnimation = require("../JsAnimation");
var _jsxRuntime = require("react/jsx-runtime");
describe('JsAnimation', () => {
  test('should change the style of children from to to value and duration', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_JsAnimation.JsAnimation, {
      duration: 500,
      children: t => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "test-wrapper",
        style: {
          opacity: t
        }
      })
    }));
    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('0');
    return (0, _react.waitFor)(() => {
      const element = container.getElementsByClassName('test-wrapper')[0];
      expect(element.style.opacity).toBe('1');
    }, {
      timeout: 800
    });
  });
  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_JsAnimation.JsAnimation, {
      attributeName: "opacity",
      duration: 500,
      onAnimationEnd: handleAnimationEnd,
      children: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})
    }));
    expect(handleAnimationEnd).toHaveBeenCalledTimes(0);
    await (0, _react.waitFor)(() => {
      expect(handleAnimationEnd).toHaveBeenCalledTimes(1);
    }, {
      timeout: 900
    });
  });
});
//# sourceMappingURL=JsAnimation.test.js.map