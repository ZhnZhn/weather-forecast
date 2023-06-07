"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _react = require("@testing-library/react");
var _index = require("../../index");
var _ReactUtils = require("../ReactUtils");
var _types = require("../types");
var _jsxRuntime = require("react/jsx-runtime");
var _crElementKeys = function _crElementKeys(elements) {
  return elements.map(function (el) {
    return el.key;
  });
};
describe('ReactUtils', function () {
  describe('filterProps', function () {
    test('should call filterProps wtesth any boolean and return a null result', function () {
      expect((0, _ReactUtils.filterProps)(true)).toBe(null);
      expect((0, _ReactUtils.filterProps)(false)).toBe(null);
    });
    test('should call filterProps wtesth a non-object and return null', function () {
      expect((0, _ReactUtils.filterProps)(125)).toBe(null);
    });
    test('should call filterProps wtesth a react element extract properties and filter out non-svg properties', function () {
      expect((0, _ReactUtils.filterProps)( /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        id: "test",
        value: 1
      }))).toEqual({
        id: 'test'
      });
    });
    test('should pass props and filter out non wanted properties', function () {
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
    test('should expect viewBox on type "svg"', function () {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        helloWorld: 1234,
        viewBox: '0 0 0 0'
      }, false, 'svg')).toEqual({
        viewBox: '0 0 0 0'
      });
    });
    test('should include events when includeEvents is true', function () {
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
    test('should filter out "points" attribute when included without an svg type that explicitly uses "points"', function () {
      expect((0, _ReactUtils.filterProps)({
        test: '1234',
        points: '1234',
        onClick: jest.fn()
      }, true)).toEqual({
        onClick: expect.any(Function)
      });
    });
    test('filterProps return presentation attributes', function () {
      var resultKeys = Object.keys((0, _ReactUtils.filterProps)({
        stroke: '#000',
        fill: '#000',
        r: 6
      }));
      expect(resultKeys).toContain('stroke');
      expect(resultKeys).toContain('fill');
      expect(resultKeys).toContain('r');
    });
  });
  describe('isValidSpreadableProp', function () {
    test('return true for valid SVG element attribute', function () {
      var isValid = (0, _ReactUtils.isValidSpreadableProp)(42, 'height');
      expect(isValid).toBe(true);
    });
    test('return false for invalid SVG element attribute', function () {
      var isValid = (0, _ReactUtils.isValidSpreadableProp)(42, 'type');
      expect(isValid).toBe(false);
    });
    test('return true for event when includeEvents is true', function () {
      var isValid = (0, _ReactUtils.isValidSpreadableProp)(function () {
        return true;
      }, 'onClick', true);
      expect(isValid).toBe(true);
    });
    test('return true for valid SVGElementType', function () {
      var isValid = (0, _ReactUtils.isValidSpreadableProp)('00 00 00 00', 'points', false, 'polyline');
      expect(isValid).toBe(true);
    });
  });
  describe('getDisplayName', function () {
    test('getDisplayName return empty string when has a null as input', function () {
      // added never casting to test runtime value
      var result = (0, _ReactUtils.getDisplayName)(null);
      expect(result).toBe('');
    });
    test('getDisplayName return the same string when has a string as input', function () {
      var result = (0, _ReactUtils.getDisplayName)('test');
      expect(result).toBe('test');
    });
    test('getDisplayName return the "Component" when has an object as input', function () {
      var test = {},
        result = (0, _ReactUtils.getDisplayName)(test);
      expect(result).toBe('Component');
    });
  });
  describe('adaptEventHandlers', function () {
    test('adaptEventHandlers return event attributes', function () {
      var resultKeys = Object.keys((0, _types.adaptEventHandlers)({
        a: 1,
        onMouseEnter: jest.fn()
      }));
      expect(resultKeys).toContain('onMouseEnter');
      expect(resultKeys).not.toContain('a');
    });
    test('adaptEventHandlers return null when input is not a react element', function () {
      expect((0, _types.adaptEventHandlers)(null)).toBe(null);
      expect((0, _types.adaptEventHandlers)(jest.fn())).toBe(null);
      expect((0, _types.adaptEventHandlers)(1)).toBe(null);
    });
  });
  describe('adaptEventsOfChild', function () {
    test('adaptEventsOfChild return null when input is not a props', function () {
      expect((0, _types.adaptEventsOfChild)(null, undefined, 0)).toBe(null);
      expect((0, _types.adaptEventsOfChild)(1, undefined, 0)).toBe(null);
    });
  });
  describe('validateWidthHeight', function () {
    test('validateWidthHeight return false when a react element has width or height smaller than 0', function () {
      var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.LineChart, {
          width: 0,
          height: 0,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
            dataKey: "a"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
            dataKey: "b"
          })]
        })),
        container = _render.container;
      expect((0, _ReactUtils.validateWidthHeight)(container)).toBe(false);
    });
    test('validateWidthHeight return false when input is not a react element', function () {
      expect((0, _ReactUtils.validateWidthHeight)({
        a: 1
      })).toBe(false);
      expect((0, _ReactUtils.validateWidthHeight)(jest.fn())).toBe(false);
    });
  });
  describe('isChildrenEqual', function () {
    test('isChildrenEqual when children has no null children', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
    test('isChildrenEqual when children has null children', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
    test('isChildrenEqual false when children are not equal', function () {
      var childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
      var childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
    test('isChildrenEqual return false when single child are not equal', function () {
      var childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
        dataKey: "a"
      })];
      var childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
        dataKey: "b"
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
    test("isChildrenEqual return false when one has child and another don't has child", function () {
      var childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: null
      })];
      var childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
          dataKey: "b"
        })
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
    test('isChildrenEqual return true when only has a child in an array', function () {
      var childrenOne = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: ['A'].map(function (value) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
            dataKey: value
          }, value);
        })
      })];
      var childrenTwo = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: ['B'].map(function (value) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {
            dataKey: value
          }, value);
        })
      })];
      expect((0, _ReactUtils.isChildrenEqual)(childrenOne, childrenTwo)).toBe(false);
    });
  });
  describe('toArray', function () {
    test('basic', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
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
    test('Array', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
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
    test('Ignores `undefined` and `null`', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [null, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "1"), null, undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "2"), undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {}, "3")]
        })],
        result = (0, _ReactUtils.toArray)(children);
      expect(result.length).toBe(3);
      expect(_crElementKeys(result)).toEqual(['1', '2', '3']);
    });
    test('Iterable', function () {
      var _iterable;
      var iterable = (_iterable = {}, _iterable[Symbol.iterator] = /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                children: "5"
              }, "5");
            case 2:
              _context.next = 4;
              return null;
            case 4:
              _context.next = 6;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                children: "6"
              }, "6");
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }), _iterable);
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
    test('Fragment', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
  describe('findAllByType', function () {
    test('findAllByType returns children that matched the type', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "a"), null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Bar, {
          dataKey: "A"
        }), undefined, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "b"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "c")],
        lineChildren = (0, _ReactUtils.findAllByType)(children, _index.Line);
      expect(lineChildren.length).toBe(3);
      expect(_crElementKeys(lineChildren)).toEqual(['a', 'b', 'c']);
    });
    test('findAllByType includes children inside of the fragment', function () {
      var children = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Line, {}, "a"), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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