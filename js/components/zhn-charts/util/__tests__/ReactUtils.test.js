"use strict";

var _react = require("@testing-library/react");
var _index = require("../../index");
var _ReactUtils = require("../ReactUtils");
var _types = require("../types");
var _jsxRuntime = require("react/jsx-runtime");
const _crElementKeys = elements => elements.map(el => el.key);
describe('ReactUtils', () => {
  describe('filterProps', () => {
    test('should call filterProps wtesth any boolean and return a null result', () => {
      expect((0, _ReactUtils.filterProps)(true)).toBe(null);
      expect((0, _ReactUtils.filterProps)(false)).toBe(null);
    });
    test('should call filterProps wtesth a non-object and return null', () => {
      expect((0, _ReactUtils.filterProps)(125)).toBe(null);
    });
    test('should call filterProps wtesth a react element extract properties and filter out non-svg properties', () => {
      expect((0, _ReactUtils.filterProps)(/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        id: "test",
        value: 1
      }))).toEqual({
        id: 'test'
      });
    });
    test('should pass props and filter out non wanted properties', () => {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        helloWorld: 1234,
        viewBox: '0 0 0 0',
        dx: 1,
        dy: 1
      })).toEqual({
        dx: 1,
        dy: 1
      });
    });
    test('should expect viewBox on type "svg"', () => {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        helloWorld: 1234,
        viewBox: '0 0 0 0'
      }, false, 'svg')).toEqual({
        viewBox: '0 0 0 0'
      });
    });
    test('should include events when includeEvents is true', () => {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        helloWorld: 1234,
        viewBox: '0 0 0 0',
        onClick: jest.fn()
      }, true, 'svg')).toEqual({
        viewBox: '0 0 0 0',
        onClick: expect.any(Function)
      });
    });
    test('should filter out "points" attribute when included without an svg type that explicitly uses "points"', () => {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        points: '1234',
        onClick: jest.fn()
      }, true)).toEqual({
        onClick: expect.any(Function)
      });
    });
    test('filterProps return presentation attributes', () => {
      const resultKeys = Object.keys((0, _ReactUtils.filterProps)({
        stroke: '#000',
        fill: '#000',
        r: 6
      }));
      expect(resultKeys).toContain('stroke');
      expect(resultKeys).toContain('fill');
      expect(resultKeys).toContain('r');
    });
  });
  describe('isValidSpreadableProp', () => {
    test('return true for valid SVG element attribute', () => {
      const isValid = (0, _ReactUtils.isValidSpreadableProp)(42, 'height');
      expect(isValid).toBe(true);
    });
    test('return false for invalid SVG element attribute', () => {
      const isValid = (0, _ReactUtils.isValidSpreadableProp)(42, 'type');
      expect(isValid).toBe(false);
    });
    test('return true for event when includeEvents is true', () => {
      const isValid = (0, _ReactUtils.isValidSpreadableProp)(() => true, 'onClick', true);
      expect(isValid).toBe(true);
    });
    test('return true for valid SVGElementType', () => {
      const isValid = (0, _ReactUtils.isValidSpreadableProp)('00 00 00 00', 'points', false, 'polyline');
      expect(isValid).toBe(true);
    });
  });
  describe('getDisplayName', () => {
    test('getDisplayName return empty string when has a null as input', () => {
      // added never casting to test runtime value
      const result = (0, _ReactUtils.getDisplayName)(null);
      expect(result).toBe('');
    });
    test('getDisplayName return the same string when has a string as input', () => {
      const result = (0, _ReactUtils.getDisplayName)('test');
      expect(result).toBe('test');
    });
    test('getDisplayName return the "Component" when has an object as input', () => {
      const test = {},
        result = (0, _ReactUtils.getDisplayName)(test);
      expect(result).toBe('Component');
    });
  });

  /*
  describe('adaptEventHandlers', () => {
    test('adaptEventHandlers return event attributes', () => {
      const resultKeys = Object.keys(adaptEventHandlers({
        a: 1,
        onMouseEnter: jest.fn(),
      }));
      expect(resultKeys).toContain('onMouseEnter');
      expect(resultKeys).not.toContain('a');
    });
      test('adaptEventHandlers return null when input is not a react element', () => {
      expect(adaptEventHandlers(null)).toBe(null);
      expect(adaptEventHandlers(jest.fn())).toBe(null);
      expect(adaptEventHandlers(1)).toBe(null);
    });
  });
  */

  describe('adaptEventsOfChild', () => {
    test('adaptEventsOfChild return null when input is not a props', () => {
      expect((0, _types.adaptEventsOfChild)(null, undefined, 0)).toBe(null);
      expect((0, _types.adaptEventsOfChild)(1, undefined, 0)).toBe(null);
    });
  });
  describe('validateWidthHeight', () => {
    test('validateWidthHeight return false when a react element has width or height smaller than 0', () => {
      const {
        container
      } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.LineChart, {
        width: 0,
        height: 0,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "a"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          dataKey: "b"
        })]
      }));
      expect((0, _ReactUtils.validateWidthHeight)(container)).toBe(false);
    });
    test('validateWidthHeight return false when input is not a react element', () => {
      expect((0, _ReactUtils.validateWidthHeight)({
        a: 1
      })).toBe(false);
      expect((0, _ReactUtils.validateWidthHeight)(jest.fn())).toBe(false);
    });
  });
  describe('isChildrenEqual', () => {
    test('isChildrenEqual when children has no null children', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "a"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: "0",
          y: "0",
          width: "20",
          height: "20"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          x: "0",
          y: "0",
          children: "12"
        })]
      })];
      expect((0, _ReactUtils.isChildrenEqual)(children, children)).toBe(true);
    });
    test('isChildrenEqual when children has null children', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "a"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: "0",
          y: "0",
          width: "20",
          height: "20"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          x: "0",
          y: "0",
          children: "12"
        }), null]
      })];
      expect((0, _ReactUtils.isChildrenEqual)(children, children)).toBe(true);
    });
    test('isChildrenEqual false when children are not equal', () => {
      const childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "a"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: "0",
          y: "0",
          width: "20",
          height: "20"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          x: "0",
          y: "0",
          children: "12"
        })]
      })];
      const childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "a"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: "0",
          y: "0",
          width: "20",
          height: "20"
        })]
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
    test('isChildrenEqual return false when single child are not equal', () => {
      const childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
        dataKey: "a"
      })];
      const childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
        dataKey: "b"
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
    test("isChildrenEqual return false when one has child and another don't has child", () => {
      const childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: null
      })];
      const childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        })
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
    test('isChildrenEqual return true when only has a child in an array', () => {
      const childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: ['A'].map(value => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
            dataKey: value
          }, value);
        })
      })];
      const childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: ['B'].map(value => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
            dataKey: value
          }, value);
        })
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
  });
  describe('toArray', () => {
    test('basic', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "1"
        }, "1"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "2"
        }, "2"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "3"
        }, "3")],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(3);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3']);
    });
    test('Array', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: "1"
        }, "1"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "2"
          }, "2"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "3"
          }, "3")]
        })],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(3);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3']);
    });
    test('Ignores `undefined` and `null`', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [null, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "1"), null, undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "2"), undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "3")]
        })],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(3);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3']);
    });
    test('Iterable', () => {
      const iterable = {
        *[Symbol.iterator]() {
          yield /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "5"
          }, "5");
          yield null;
          yield /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "6"
          }, "6");
        }
      };
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [[/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "1"
          }, "1")], /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "2"
          }, "2"), null, new Set([/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "3"
          }, "3"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "4"
          }, "4")]), iterable]
        })],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(6);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3', '4', '5', '6']);
    });
    test('Fragment', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: "1"
          }, "1"), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              children: "2"
            }, "2"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              children: "3"
            }, "3")]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                children: "4"
              }, "4"), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                children: "5"
              }, "5")]
            })
          })]
        })],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(5);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3', '4', '5']);
    });
  });
  describe('findAllByType', () => {
    test('findAllByType returns children that matched the type', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "a"), null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          dataKey: "A"
        }), undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "b"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "c")],
        lineChildren = (0, _ReactUtils.findAllByType)(children, _index.Line);
      expect(lineChildren.length).toBe(3);
      expect(_crElementKeys(lineChildren)).toEqual(['a', 'b', 'c']);
    });
    test('findAllByType includes children inside of the fragment', () => {
      const children = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "a"), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "b"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "c"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
            dataKey: "A"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "d")
          })]
        })],
        lineChildren = (0, _ReactUtils.findAllByType)(children, _index.Line);
      expect(lineChildren.length).toBe(4);
      expect(_crElementKeys(lineChildren)).toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
//# sourceMappingURL=ReactUtils.test.js.map