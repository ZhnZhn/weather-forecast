"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
describe('d3Color color', function () {
  it("color(format) parses CSS color names (e.g., \"rebeccapurple\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("moccasin"), 255, 228, 181, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("aliceblue"), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("yellow"), 255, 255, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("moccasin"), 255, 228, 181, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("aliceblue"), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("yellow"), 255, 255, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rebeccapurple"), 102, 51, 153, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("transparent"), NaN, NaN, NaN, 0);
  });
  it("color(format) parses 6-digit hexadecimal (e.g., \"#abcdef\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abcdef"), 171, 205, 239, 1);
  });
  it("color(format) parses 3-digit hexadecimal (e.g., \"#abc\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abc"), 170, 187, 204, 1);
  });
  it("color(format) does not parse 7-digit hexadecimal (e.g., \"#abcdef3\")", function () {
    expect((0, _index.color)("#abcdef3")).toBe(null);
  });
  it("color(format) parses 8-digit hexadecimal (e.g., \"#abcdef33\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abcdef33"), 171, 205, 239, 0.2);
  });
  it("color(format) parses 4-digit hexadecimal (e.g., \"#abc3\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abc3"), 170, 187, 204, 0.2);
  });
  it("color(format) parses RGB integer format (e.g., \"rgb(12,34,56)\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(12,34,56)"), 12, 34, 56, 1);
  });
  it("color(format) parses RGBA integer format (e.g., \"rgba(12,34,56,0.4)\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12,34,56,0.4)"), 12, 34, 56, 0.4);
  });
  it("color(format) parses RGB percentage format (e.g., \"rgb(12%,34%,56%)\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(12%,34%,56%)"), 31, 87, 143, 1);
    (0, _asserts.assertRgbEqual)((0, _index.color)("rgb(100%,100%,100%)"), 255, 255, 255, 1);
  });
  it("color(format) parses RGBA percentage format (e.g., \"rgba(12%,34%,56%,0.4)\")", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12%,34%,56%,0.4)"), 31, 87, 143, 0.4);
    (0, _asserts.assertRgbEqual)((0, _index.color)("rgba(100%,100%,100%,0.4)"), 255, 255, 255, 0.4);
  });
  it("color(format) parses HSL format (e.g., \"hsl(60,100%,20%)\")", function () {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
  });
  it("color(format) parses HSLA format (e.g., \"hsla(60,100%,20%,0.4)\")", function () {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
  });
  it("color(format) ignores leading and trailing whitespace", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" aliceblue\t\n"), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #abc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aabbcc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgb(120,30,50)\t\n"), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
  });
  it("color(format) ignores whitespace between numbers", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgb( 120 , 30 , 50 ) "), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsl( 120 , 30% , 50% ) "), 120, 0.3, 0.5, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgba( 12 , 34 , 56 , 0.4 ) "), 12, 34, 56, 0.4);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgba( 12% , 34% , 56% , 0.4 ) "), 31, 87, 143, 0.4);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsla( 60 , 100% , 20% , 0.4 ) "), 60, 1, 0.2, 0.4);
  });
  it("color(format) allows number signs", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(+120,+30,+50)"), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(+120,+30%,+50%)"), 120, 0.3, 0.5, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(-120,-30,-50)"), -120, -30, -50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(-120,-30%,-50%)"), NaN, NaN, -0.5, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12,34,56,+0.4)"), 12, 34, 56, 0.4);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12,34,56,-0.4)"), NaN, NaN, NaN, -0.4);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12%,34%,56%,+0.4)"), 31, 87, 143, 0.4);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12%,34%,56%,-0.4)"), NaN, NaN, NaN, -0.4);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(60,100%,20%,+0.4)"), 60, 1, 0.2, 0.4);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(60,100%,20%,-0.4)"), NaN, NaN, NaN, -0.4);
  });
  it("color(format) allows decimals for non-integer values", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(20.0%,30.4%,51.2%)"), 51, 78, 131, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(20.0,30.4%,51.2%)"), 20, 0.304, 0.512, 1);
  });
  it("color(format) allows leading decimal for hue, opacity and percentages", function () {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(.9,.3%,.5%)"), 0.9, 0.003, 0.005, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(.9,.3%,.5%,.5)"), 0.9, 0.003, 0.005, 0.5);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(.1%,.2%,.3%)"), 0, 1, 1, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(120,30,50,.5)"), 120, 30, 50, 0.5);
  });
  it("color(format) allows exponential format for hue, opacity and percentages", function () {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(1e1,2e1%,3e1%)"), 10, 0.2, 0.3, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(9e-1,3e-1%,5e-1%,5e-1)"), 0.9, 0.003, 0.005, 0.5);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(1e-1%,2e-1%,3e-1%)"), 0, 1, 1, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(120,30,50,1e-1)"), 120, 30, 50, 0.1);
  });
  it("color(format) does not allow decimals for integer values", function () {
    expect((0, _index.color)("rgb(120.5,30,50)")).toBe(null);
  });
  it("color(format) does not allow empty decimals", function () {
    expect((0, _index.color)("rgb(120.,30,50)")).toBe(null);
    expect((0, _index.color)("rgb(120.%,30%,50%)")).toBe(null);
    expect((0, _index.color)("rgba(120,30,50,1.)")).toBe(null);
    expect((0, _index.color)("rgba(12%,30%,50%,1.)")).toBe(null);
    expect((0, _index.color)("hsla(60,100%,20%,1.)")).toBe(null);
  });
  it("color(format) does not allow made-up names", function () {
    expect((0, _index.color)("bostock")).toBe(null);
  });
  it("color(format) allows achromatic colors", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(0,0,0,0)"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#0000"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#00000000"), NaN, NaN, NaN, 0);
  });
  it("color(format) does not allow whitespace before open paren or percent sign", function () {
    expect((0, _index.color)("rgb (120,30,50)")).toBe(null);
    expect((0, _index.color)("rgb (12%,30%,50%)")).toBe(null);
    expect((0, _index.color)("hsl (120,30%,50%)")).toBe(null);
    expect((0, _index.color)("hsl(120,30 %,50%)")).toBe(null);
    expect((0, _index.color)("rgba (120,30,50,1)")).toBe(null);
    expect((0, _index.color)("rgba (12%,30%,50%,1)")).toBe(null);
    expect((0, _index.color)("hsla (120,30%,50%,1)")).toBe(null);
  });
  it("color(format) is case-insensitive", function () {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("aLiCeBlUE"), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("transPARENT"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aBc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aaBBCC\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rGB(120,30,50)\t\n"), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" HSl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
  });
  it("color(format) returns undefined RGB channel values for unknown formats", function () {
    expect((0, _index.color)("invalid")).toBe(null);
    expect((0, _index.color)("hasOwnProperty")).toBe(null);
    expect((0, _index.color)("__proto__")).toBe(null);
    expect((0, _index.color)("#ab")).toBe(null);
  });
  it("color(format).hex() returns a hexadecimal string", function () {
    expect((0, _index.color)("rgba(12%,34%,56%,0.4)").hex()).toBe("#1f578f");
  });
});
//# sourceMappingURL=color.test.js.map