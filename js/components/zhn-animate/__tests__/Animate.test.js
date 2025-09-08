"use strict";

var _react = require("@testing-library/react");
var _index = require("../index");
var _jsxRuntime = require("react/jsx-runtime");
describe('Animate', () => {
  test('should change the style of children from to value by attributeName and duration', () => {
    const {
      container
    } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Animate, {
      duration: 500,
      children: _ref => {
        let {
          t
        } = _ref;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "test-wrapper",
          style: {
            opacity: t
          }
        });
      }
    }));
    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('0');
    return (0, _react.waitFor)(() => {
      const element = container.getElementsByClassName('test-wrapper')[0];
      expect(element.style.opacity).toBe('1');
    }, {
      timeout: 700
    });
  });
  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Animate, {
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
//# sourceMappingURL=Animate.test.js.map