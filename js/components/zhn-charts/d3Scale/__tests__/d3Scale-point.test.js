"use strict";

var _index = require("../index");
describe('d3Scale scalePoint, scaleBand', function () {
  it("scalePoint() has the expected defaults", function () {
    var s = (0, _index.scalePoint)();
    expect(s.domain()).toEqual([]);
    expect(s.range()).toEqual([0, 1]);
    expect(s.bandwidth()).toBe(0);
    expect(s.step()).toBe(1);
    expect(s.round()).toBe(false);
    expect(s.padding()).toBe(0);
    expect(s.align()).toBe(0.5);
  });
  it("scalePoint() does not expose paddingInner and paddingOuter", function () {
    var s = (0, _index.scalePoint)();
    expect(s.paddingInner).toBe(undefined);
    expect(s.paddingOuter).toBe(undefined);
  });
  it("scalePoint() is similar to scaleBand().paddingInner(1)", function () {
    var p = (0, _index.scalePoint)().domain(["foo", "bar"]).range([0, 960]);
    var b = (0, _index.scaleBand)().domain(["foo", "bar"]).range([0, 960]).paddingInner(1);
    expect(p.domain().map(p)).toEqual(b.domain().map(b));
    expect(p.bandwidth()).toBe(b.bandwidth());
    expect(p.step()).toBe(b.step());
  });
  it("point.padding(p) sets the band outer padding to p", function () {
    var p = (0, _index.scalePoint)().domain(["foo", "bar"]).range([0, 960]).padding(0.5);
    var b = (0, _index.scaleBand)().domain(["foo", "bar"]).range([0, 960]).paddingInner(1).paddingOuter(0.5);
    expect(p.domain().map(p)).toEqual(b.domain().map(b));
    expect(p.bandwidth()).toBe(b.bandwidth());
    expect(p.step()).toBe(b.step());
  });
  it("point.copy() returns a copy", function () {
    var s = (0, _index.scalePoint)();
    expect(s.domain()).toEqual([]);
    expect(s.range()).toEqual([0, 1]);
    expect(s.bandwidth()).toBe(0);
    expect(s.step()).toBe(1);
    expect(s.round()).toBe(false);
    expect(s.padding()).toBe(0);
    expect(s.align()).toBe(0.5);
  });
});
//# sourceMappingURL=d3Scale-point.test.js.map