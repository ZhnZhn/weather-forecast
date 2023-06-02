"use strict";

var _index = require("../index");
describe('format', function () {
  it("format(specifier)(number) returns a string", function () {
    expect(typeof (0, _index.format)("d")(0)).toBe("string");
  });
  it("format(specifier).toString() returns the normalized specifier", function () {
    expect((0, _index.format)("d") + "").toBe(" >-d");
  });
  it("format(specifier) throws an error for invalid formats", function () {
    expect(function () {
      (0, _index.format)("foo");
    }).toThrow(/invalid format: foo/);
    expect(function () {
      (0, _index.format)(".-2s");
    }).toThrow(/invalid format: \.-2s/);
    expect(function () {
      (0, _index.format)(".f");
    }).toThrow(/invalid format: \.f/);
  });
  it("format(\",.\") unreasonable precision values are clamped to reasonable values", function () {
    expect((0, _index.format)(".30f")(0)).toBe("0.00000000000000000000");
    expect((0, _index.format)(".0g")(1)).toBe("1");
  });
  it("format(\"s\") handles very small and very large values", function () {
    expect((0, _index.format)("s")(Number.MIN_VALUE)).toBe("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005y");
    expect((0, _index.format)("s")(Number.MAX_VALUE)).toBe("179769000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Y");
  });
  it("format(\"n\") is equivalent to format(\",g\")", function () {
    expect((0, _index.format)("n")(123456.78)).toBe("123,457");
    expect((0, _index.format)(",g")(123456.78)).toBe("123,457");
  });
  it("format(\"012\") is equivalent to format(\"0=12\")", function () {
    expect((0, _index.format)("012")(123.456)).toBe("00000123.456");
    expect((0, _index.format)("0=12")(123.456)).toBe("00000123.456");
  });
});
//# sourceMappingURL=format.test.js.map