"use strict";

var _index = require("../index");
var _formatSpecifier = require("../formatSpecifier");
describe('formatSpecifier', function () {
  it("formatSpecifier(specifier) throws an error for invalid formats", function () {
    expect(function () {
      (0, _index.formatSpecifier)("foo");
    }).toThrow(/invalid format: foo/);
    expect(function () {
      (0, _index.formatSpecifier)(".-2s");
    }).toThrow(/invalid format: \.-2s/);
    expect(function () {
      (0, _index.formatSpecifier)(".f");
    }).toThrow(/invalid format: \.f/);
  });
  it("formatSpecifier(specifier) returns an instanceof formatSpecifier", function () {
    var s = (0, _index.formatSpecifier)("");
    expect(s instanceof _index.formatSpecifier).toBe(true);
  });
  it("formatSpecifier(\"\") has the expected defaults", function () {
    var s = (0, _index.formatSpecifier)("");
    expect(s.fill).toBe(" ");
    expect(s.align).toBe(">");
    expect(s.sign).toBe("-");
    expect(s.symbol).toBe("");
    expect(s.zero).toBe(false);
    expect(s.width).toBe(undefined);
    expect(s.comma).toBe(false);
    expect(s.precision).toBe(undefined);
    expect(s.trim).toBe(false);
    expect(s.type).toBe("");
  });
  it("formatSpecifier(specifier) preserves unknown types", function () {
    var s = (0, _index.formatSpecifier)("q");
    expect(s.trim).toBe(false);
    expect(s.type).toBe("q");
  });
  it("formatSpecifier(specifier) preserves shorthand", function () {
    var s = (0, _index.formatSpecifier)("");
    expect(s.trim).toBe(false);
    expect(s.type).toBe("");
  });
  it("formatSpecifier(specifier).toString() reflects current field values", function () {
    var s = (0, _index.formatSpecifier)("");
    expect((s.fill = "_", s) + "").toBe("_>-");
    expect((s.align = "^", s) + "").toBe("_^-");
    expect((s.sign = "+", s) + "").toBe("_^+");
    expect((s.symbol = "$", s) + "").toBe("_^+$");
    expect((s.zero = true, s) + "").toBe("_^+$0");
    expect((s.width = 12, s) + "").toBe("_^+$012");
    expect((s.comma = true, s) + "").toBe("_^+$012,");
    expect((s.precision = 2, s) + "").toBe("_^+$012,.2");
    expect((s.type = "f", s) + "").toBe("_^+$012,.2f");
    expect((s.trim = true, s) + "").toBe("_^+$012,.2~f");
    expect((0, _index.format)(s)(42)).toBe("+$0,000,000,042");
  });
  it("formatSpecifier(specifier).toString() clamps precision to zero", function () {
    var s = (0, _index.formatSpecifier)("");
    expect((s.precision = -1, s) + "").toBe(" >-.0");
  });
  it("formatSpecifier(specifier).toString() clamps width to one", function () {
    var s = (0, _index.formatSpecifier)("");
    expect((s.width = -1, s) + "").toBe(" >-1");
  });
  it("new FormatSpecifier({}) has the expected defaults", function () {
    var s = new _formatSpecifier.FormatSpecifier({});
    expect(s.fill).toBe(" ");
    expect(s.align).toBe(">");
    expect(s.sign).toBe("-");
    expect(s.symbol).toBe("");
    expect(s.zero).toBe(false);
    expect(s.width).toBe(undefined);
    expect(s.comma).toBe(false);
    expect(s.precision).toBe(undefined);
    expect(s.trim).toBe(false);
    expect(s.type).toBe("");
  });
  it("new FormatSpecifier({…}) coerces all inputs to the expected types", function () {
    var s = new _formatSpecifier.FormatSpecifier({
      fill: 1,
      align: 2,
      sign: 3,
      symbol: 4,
      zero: 5,
      width: 6,
      comma: 7,
      precision: 8,
      trim: 9,
      type: 10
    });
    expect(s.fill).toBe("1");
    expect(s.align).toBe("2");
    expect(s.sign).toBe("3");
    expect(s.symbol).toBe("4");
    expect(s.zero).toBe(true);
    expect(s.width).toBe(6);
    expect(s.comma).toBe(true);
    expect(s.precision).toBe(8);
    expect(s.trim).toBe(true);
    expect(s.type).toBe("10");
  });
});
//# sourceMappingURL=formatSpecifier.test.js.map