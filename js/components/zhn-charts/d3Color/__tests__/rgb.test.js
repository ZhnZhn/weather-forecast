"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
/*
import {
  hsl
} from "../color";
*/

const COLOR_BLACK = "#000000" // black
  ,
  COLOR_MOCCASIN = "#ffe4b5" // moccasin
  ,
  COLOR_ALICEBLUE = "#f0f8ff" // aliceblue
  ,
  COLOR_RED = "#ff0000" //red
  ,
  COLOR_WHITE = "#ffffff"; // white

describe('d3Color rgb', () => {
  it("rgb(…) returns an instance of rgb and color", () => {
    const c = (0, _index.rgb)(70, 130, 180);
    expect(c instanceof _index.rgb).toBe(true);
    expect(c instanceof _index.color).toBe(true);
  });
  it("rgb(…) exposes r, g and b channel values and opacity", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("#abc"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("rgba(170, 187, 204, 0.4)"), 170, 187, 204, 0.4);
  });
  it("rgb.toString() formats as rgb(…) or rgba(…)", () => {
    expect((0, _index.rgb)("#abcdef") + "").toBe("rgb(171, 205, 239)");
    expect((0, _index.rgb)(COLOR_MOCCASIN) + "").toBe("rgb(255, 228, 181)");
    //expect(rgb("hsl(60, 100%, 20%)") + "").toBe("rgb(102, 102, 0)");
    expect((0, _index.rgb)("rgb(12, 34, 56)") + "").toBe("rgb(12, 34, 56)");
    expect((0, _index.rgb)((0, _index.rgb)(12, 34, 56)) + "").toBe("rgb(12, 34, 56)");
    //expect(rgb(hsl(60, 1, 0.2)) + "").toBe("rgb(102, 102, 0)");
    expect((0, _index.rgb)("rgba(12, 34, 56, 0.4)") + "").toBe("rgba(12, 34, 56, 0.4)");
    expect((0, _index.rgb)("rgba(12%, 34%, 56%, 0.4)") + "").toBe("rgba(31, 87, 143, 0.4)");
    //expect(rgb("hsla(60, 100%, 20%, 0.4)") + "").toBe("rgba(102, 102, 0, 0.4)");
  });
  it("rgb.formatRgb() formats as rgb(…) or rgba(…)", () => {
    expect((0, _index.rgb)("#abcdef").formatRgb()).toBe("rgb(171, 205, 239)");
    //expect(rgb("hsl(60, 100%, 20%)").formatRgb()).toBe("rgb(102, 102, 0)");
    expect((0, _index.rgb)("rgba(12%, 34%, 56%, 0.4)").formatRgb()).toBe("rgba(31, 87, 143, 0.4)");
    //expect(rgb("hsla(60, 100%, 20%, 0.4)").formatRgb()).toBe("rgba(102, 102, 0, 0.4)");
  });

  /*
  it("rgb.formatHsl() formats as hsl(…) or hsla(…)", () => {
    expect(rgb("#abcdef").formatHsl()).toBe("hsl(210, 68%, 80.3921568627451%)");
    expect(rgb("hsl(60, 100%, 20%)").formatHsl()).toBe("hsl(60, 100%, 20%)");
    expect(rgb("rgba(12%, 34%, 56%, 0.4)").formatHsl()).toBe("hsla(210, 64.70588235294117%, 34%, 0.4)");
    expect(rgb("hsla(60, 100%, 20%, 0.4)").formatHsl()).toBe("hsla(60, 100%, 20%, 0.4)");
  });
  */

  it("rgb.formatHex() formats as #rrggbb", () => {
    expect((0, _index.rgb)("#abcdef").formatHex()).toBe("#abcdef");
    //expect(rgb("hsl(60, 100%, 20%)").formatHex()).toBe("#666600");
    expect((0, _index.rgb)("rgba(12%, 34%, 56%, 0.4)").formatHex()).toBe("#1f578f");
    //expect(rgb("hsla(60, 100%, 20%, 0.4)").formatHex()).toBe("#666600");
  });
  it("rgb.formatHex8() formats as #rrggbbaa", () => {
    expect((0, _index.rgb)("#abcdef").formatHex8()).toBe("#abcdefff");
    //expect(rgb("hsl(60, 100%, 20%)").formatHex8()).toBe("#666600ff");
    expect((0, _index.rgb)("rgba(12%, 34%, 56%, 0.4)").formatHex8()).toBe("#1f578f66");
    //expect(rgb("hsla(60, 100%, 20%, 0.4)").formatHex8()).toBe("#66660066");
  });
  it("rgb.hex() is an alias for rgb.formatHex()", () => {
    expect(_index.color.prototype.hex).toBe(_index.color.prototype.formatHex);
    expect(_index.rgb.prototype.hex).toBe(_index.rgb.prototype.formatHex);
  });
  it("rgb.toString() reflects r, g and b channel values and opacity", () => {
    const c = (0, _index.rgb)("#abc");
    ++c.r;
    ++c.g;
    ++c.b;
    c.opacity = 0.5;
    expect(c + "").toBe("rgba(171, 188, 205, 0.5)");
  });
  it("rgb.toString() treats undefined channel values as 0", () => {
    expect((0, _index.rgb)("invalid") + "").toBe("rgb(0, 0, 0)");
    expect((0, _index.rgb)(NaN, 12, 34) + "").toBe("rgb(0, 12, 34)");
  });
  it("rgb.toString() treats undefined opacity as 1", () => {
    const c = (0, _index.rgb)("#abc");
    ++c.r;
    ++c.g;
    ++c.b;
    c.opacity = NaN;
    expect(c + "").toBe("rgb(171, 188, 205)");
  });
  it("rgb.toString() clamps r, g, b and opacity channel values", () => {
    expect((0, _index.rgb)(-1, 2, 3) + "").toBe("rgb(0, 2, 3)");
    expect((0, _index.rgb)(2, -1, 3) + "").toBe("rgb(2, 0, 3)");
    expect((0, _index.rgb)(2, 3, -1) + "").toBe("rgb(2, 3, 0)");
    expect((0, _index.rgb)(2, 3, -1, -0.2) + "").toBe("rgba(2, 3, 0, 0)");
    expect((0, _index.rgb)(2, 3, -1, 1.2) + "").toBe("rgb(2, 3, 0)");
  });
  it("rgb.toString() rounds r, g and b channel values", () => {
    expect((0, _index.rgb)(0.5, 2.0, 3.0) + "").toBe("rgb(1, 2, 3)");
    expect((0, _index.rgb)(2.0, 0.5, 3.0) + "").toBe("rgb(2, 1, 3)");
    expect((0, _index.rgb)(2.0, 3.0, 0.5) + "").toBe("rgb(2, 3, 1)");
  });
  it("rgb(r, g, b) does not round channel values", () => {
    (0, _asserts.assertRgbEqual)((0, _index.rgb)(1.2, 2.6, 42.9), 1.2, 2.6, 42.9, 1);
  });
  it("rgb(r, g, b) does not clamp channel values", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(-10, -20, -30), -10, -20, -30, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(300, 400, 500), 300, 400, 500, 1);
  });
  it("rgb(r, g, b).clamp() rounds and clamps channel values", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(-10, -20, -30).clamp(), 0, 0, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(10.5, 20.5, 30.5).clamp(), 11, 21, 31, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(300, 400, 500).clamp(), 255, 255, 255, 1);
    expect((0, _index.rgb)(10.5, 20.5, 30.5, -1).clamp().opacity).toBe(0);
    expect((0, _index.rgb)(10.5, 20.5, 30.5, 0.5).clamp().opacity).toBe(0.5);
    expect((0, _index.rgb)(10.5, 20.5, 30.5, 2).clamp().opacity).toBe(1);
    expect((0, _index.rgb)(10.5, 20.5, 30.5, NaN).clamp().opacity).toBe(1);
  });
  it("rgb(r, g, b, opacity) does not clamp opacity", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(-10, -20, -30, -0.2), -10, -20, -30, -0.2);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(300, 400, 500, 1.2), 300, 400, 500, 1.2);
  });
  it("rgb(r, g, b) coerces channel values to numbers", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("12", "34", "56"), 12, 34, 56, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(null, null, null), 0, 0, 0, 1);
  });
  it("rgb(r, g, b, opacity) coerces opacity to number", () => {
    (0, _asserts.assertRgbEqual)((0, _index.rgb)(-10, -20, -30, "-0.2"), -10, -20, -30, -0.2);
    (0, _asserts.assertRgbEqual)((0, _index.rgb)(300, 400, 500, "1.2"), 300, 400, 500, 1.2);
  });
  it("rgb(r, g, b) allows undefined channel values", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(undefined, 42, 56), NaN, 42, 56, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(42, undefined, 56), 42, NaN, 56, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(42, 56, undefined), 42, 56, NaN, 1);
  });
  it("rgb(r, g, b, opacity) converts undefined opacity to 1", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(10, 20, 30, null), 10, 20, 30, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(10, 20, 30, undefined), 10, 20, 30, 1);
  });
  it("rgb(format) parses the specified format and converts to RGB", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("#abcdef"), 171, 205, 239, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("#abc"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("rgb(12, 34, 56)"), 12, 34, 56, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("rgb(12%, 34%, 56%)"), 31, 87, 143, 1);
    //assertRgbApproxEqual(rgb("hsl(60,100%,20%)"), 102, 102, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(COLOR_ALICEBLUE), 240, 248, 255, 1);
    //assertRgbApproxEqual(rgb("hsla(60,100%,20%,0.4)"), 102, 102, 0, 0.4);
  });
  it("rgb(format) ignores all channels if the alpha is <= 0", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("rgba(12,34,45,0)"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("rgba(12,34,45,-0.1)"), NaN, NaN, NaN, -0.1);
  });
  it("rgb(format) returns undefined channel values for unknown formats", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)("invalid"), NaN, NaN, NaN, NaN);
  });
  it("rgb(rgb) copies an RGB color", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = (0, _index.rgb)(c1);
    (0, _asserts.assertRgbApproxEqual)(c1, 70, 130, 180, 0.4);
    c1.r = c1.g = c1.b = c1.opacity = 0;
    (0, _asserts.assertRgbApproxEqual)(c1, 0, 0, 0, 0);
    (0, _asserts.assertRgbApproxEqual)(c2, 70, 130, 180, 0.4);
  });

  /*
  it("rgb(hsl) converts from HSL", () => {
    assertRgbApproxEqual(rgb(hsl(0, 1, 0.5)), 255, 0, 0, 1);
    assertRgbApproxEqual(rgb(hsl(0, 1, 0.5, 0.4)), 255, 0, 0, 0.4);
  });
  */

  it("rgb(color) converts from another colorspace via rgb()", () => {
    function TestColor() {}
    TestColor.prototype = Object.create(_index.color.prototype);
    TestColor.prototype.rgb = function () {
      return (0, _index.rgb)(12, 34, 56, 0.4);
    };
    TestColor.prototype.toString = function () {
      throw new Error("should use rgb, not toString");
    };
    (0, _asserts.assertRgbApproxEqual)((0, _index.rgb)(new TestColor()), 12, 34, 56, 0.4);
  });
  it("rgb.displayable() returns true if the color is within the RGB gamut and opacity is in [0,1]", () => {
    expect((0, _index.rgb)(COLOR_WHITE).displayable()).toBe(true);
    expect((0, _index.rgb)(COLOR_RED).displayable()).toBe(true);
    expect((0, _index.rgb)(COLOR_BLACK).displayable()).toBe(true);
    expect((0, _index.rgb)("invalid").displayable()).toBe(false);
    expect((0, _index.rgb)(-1, 0, 0).displayable()).toBe(false);
    expect((0, _index.rgb)(0, -1, 0).displayable()).toBe(false);
    expect((0, _index.rgb)(0, 0, -1).displayable()).toBe(false);
    expect((0, _index.rgb)(256, 0, 0).displayable()).toBe(false);
    expect((0, _index.rgb)(0, 256, 0).displayable()).toBe(false);
    expect((0, _index.rgb)(0, 0, 256).displayable()).toBe(false);
    expect((0, _index.rgb)(0, 0, 255, 0).displayable()).toBe(true);
    expect((0, _index.rgb)(0, 0, 255, 1.2).displayable()).toBe(false);
    expect((0, _index.rgb)(0, 0, 255, -0.2).displayable()).toBe(false);
  });
  it("rgb.brighter(k) returns a brighter color if k > 0", () => {
    const c = (0, _index.rgb)("rgba(165, 42, 42, 0.4)");
    (0, _asserts.assertRgbApproxEqual)(c.brighter(0.5), 197, 50, 50, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c.brighter(1), 236, 60, 60, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c.brighter(2), 337, 86, 86, 0.4);
  });
  it("rgb.brighter(k) returns a copy", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter(1);
    (0, _asserts.assertRgbApproxEqual)(c1, 70, 130, 180, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c2, 100, 186, 257, 0.4);
  });
  it("rgb.brighter() is equivalent to rgb.brighter(1)", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter();
    const c3 = c1.brighter(1);
    (0, _asserts.assertRgbApproxEqual)(c2, c3.r, c3.g, c3.b, 0.4);
  });
  it("rgb.brighter(k) is equivalent to rgb.darker(-k)", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter(1.5);
    const c3 = c1.darker(-1.5);
    (0, _asserts.assertRgbApproxEqual)(c2, c3.r, c3.g, c3.b, 0.4);
  });
  it("rgb(\"black\").brighter() still returns black", () => {
    const c1 = (0, _index.rgb)(COLOR_BLACK);
    const c2 = c1.brighter(1);
    (0, _asserts.assertRgbApproxEqual)(c1, 0, 0, 0, 1);
    (0, _asserts.assertRgbApproxEqual)(c2, 0, 0, 0, 1);
  });
  it("rgb.darker(k) returns a darker color if k > 0", () => {
    const c = (0, _index.rgb)("rgba(165, 42, 42, 0.4)");
    (0, _asserts.assertRgbApproxEqual)(c.darker(0.5), 138, 35, 35, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c.darker(1), 115, 29, 29, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c.darker(2), 81, 21, 21, 0.4);
  });
  it("rgb.darker(k) returns a copy", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker(1);
    (0, _asserts.assertRgbApproxEqual)(c1, 70, 130, 180, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c2, 49, 91, 126, 0.4);
  });
  it("rgb.darker() is equivalent to rgb.darker(1)", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker();
    const c3 = c1.darker(1);
    (0, _asserts.assertRgbApproxEqual)(c2, c3.r, c3.g, c3.b, 0.4);
  });
  it("rgb.darker(k) is equivalent to rgb.brighter(-k)", () => {
    const c1 = (0, _index.rgb)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker(1.5);
    const c3 = c1.brighter(-1.5);
    (0, _asserts.assertRgbApproxEqual)(c2, c3.r, c3.g, c3.b, 0.4);
  });
  it("rgb.rgb() returns this", () => {
    const c = (0, _index.rgb)(70, 130, 180);
    expect(c.rgb()).toBe(c);
  });
  it("rgb.copy(…) returns a new rgb with the specified channel values", () => {
    const c = (0, _index.rgb)(70, 130, 180);
    expect(c.copy() instanceof _index.rgb).toBe(true);
    expect(c.copy() + "").toBe("rgb(70, 130, 180)");
    expect(c.copy({
      opacity: 0.2
    }) + "").toBe("rgba(70, 130, 180, 0.2)");
    expect(c.copy({
      r: 20
    }) + "").toBe("rgb(20, 130, 180)");
    expect(c.copy({
      r: 20,
      g: 40
    }) + "").toBe("rgb(20, 40, 180)");
  });
});
//# sourceMappingURL=rgb.test.js.map