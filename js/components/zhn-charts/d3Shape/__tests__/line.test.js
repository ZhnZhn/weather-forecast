"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
describe('d3Shape line', function () {
  it("line() returns a default line shape", function () {
    var l = (0, _index.line)();
    expect(l.x()([42, 34])).toBe(42);
    expect(l.y()([42, 34])).toBe(34);
    expect(l.defined()([42, 34])).toBe(true);
    expect(l.curve()).toBe(_index.curveLinear);
    expect(l.context()).toBe(null);
    (0, _asserts.assertPathEqual)(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5");
  });
  it("line(x, y) sets x and y", function () {
    var x = function x() {},
      y = function y() {};
    expect((0, _index.line)(x).x()).toBe(x);
    expect((0, _index.line)(x, y).y()).toBe(y);
    expect((0, _index.line)(3, 2).x()("aa")).toBe(3);
    expect((0, _index.line)(3, 2).y()("aa")).toBe(2);
  });
  it("line.x(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.line)().x(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("line.y(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.line)().y(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("line.defined(f)(data) passes d, i and data to the specified function f", function () {
    var data = ["a", "b"],
      actual = [];
    (0, _index.line)().defined(function () {
      actual.push([].slice.call(arguments));
    })(data);
    expect(actual).toEqual([["a", 0, data], ["b", 1, data]]);
  });
  it("line.x(x)(data) observes the specified function", function () {
    var l = (0, _index.line)().x(function (d) {
      return d.x;
    });
    (0, _asserts.assertPathEqual)(l([{
      x: 0,
      1: 1
    }, {
      x: 2,
      1: 3
    }, {
      x: 4,
      1: 5
    }]), "M0,1L2,3L4,5");
  });
  it("line.x(x)(data) observes the specified constant", function () {
    var l = (0, _index.line)().x(0);
    (0, _asserts.assertPathEqual)(l([{
      1: 1
    }, {
      1: 3
    }, {
      1: 5
    }]), "M0,1L0,3L0,5");
  });
  it("line.y(y)(data) observes the specified function", function () {
    var l = (0, _index.line)().y(function (d) {
      return d.y;
    });
    (0, _asserts.assertPathEqual)(l([{
      0: 0,
      y: 1
    }, {
      0: 2,
      y: 3
    }, {
      0: 4,
      y: 5
    }]), "M0,1L2,3L4,5");
  });
  it("line.y(y)(data) observes the specified constant", function () {
    var l = (0, _index.line)().y(0);
    (0, _asserts.assertPathEqual)(l([{
      0: 0
    }, {
      0: 2
    }, {
      0: 4
    }]), "M0,0L2,0L4,0");
  });
  it("line.curve(curve) sets the curve method", function () {
    var l = (0, _index.line)().curve(_index.curveLinearClosed);
    expect(l([])).toBe(null);
    (0, _asserts.assertPathEqual)(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  });
  it("line.digits(digits) sets the maximum fractional digits", function () {
    var points = [[0, Math.PI], [Math.E, 4]];
    var l = (0, _index.line)();
    expect(l.digits()).toBe(3);
    expect(l(points)).toBe("M0,3.142L2.718,4");
    expect(l.digits(6)).toBe(l);
    expect(l.digits()).toBe(6);
    expect(l(points)).toBe("M0,3.141593L2.718282,4");
    expect((0, _index.line)()(points)).toBe("M0,3.142L2.718,4");
    expect(l.digits(null)).toBe(l);
    expect(l.digits()).toBe(null);
    expect(l(points)).toBe("M0,3.141592653589793L2.718281828459045,4");
    expect((0, _index.line)()(points)).toBe("M0,3.142L2.718,4");
    expect(l.digits(3)).toBe(l);
    expect(l.digits()).toBe(3);
    expect(l(points)).toBe("M0,3.142L2.718,4");
  });
});
//# sourceMappingURL=line.test.js.map