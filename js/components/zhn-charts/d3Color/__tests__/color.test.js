"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
const COLOR_MOCCASIN = "#ffe4b5" // moccasin
  ,
  COLOR_ALICEBLUE = "#f0f8ff" // aliceblue
  ,
  COLOR_YELLOW = "#ffff00" //yellow
  ,
  COLOR_REBECCAPURPLE = "#663399"; // rebeccapurple

describe('d3Color color', () => {
  it("color(format) parses CSS color names (e.g., \"rebeccapurple\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_MOCCASIN), 255, 228, 181, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_ALICEBLUE), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_YELLOW), 255, 255, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_MOCCASIN), 255, 228, 181, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_ALICEBLUE), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_YELLOW), 255, 255, 0, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(COLOR_REBECCAPURPLE), 102, 51, 153, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("transparent"), NaN, NaN, NaN, 0);
  });
  it("color(format) parses 6-digit hexadecimal (e.g., \"#abcdef\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abcdef"), 171, 205, 239, 1);
  });
  it("color(format) parses 3-digit hexadecimal (e.g., \"#abc\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abc"), 170, 187, 204, 1);
  });
  it("color(format) does not parse 7-digit hexadecimal (e.g., \"#abcdef3\")", () => {
    expect((0, _index.color)("#abcdef3")).toBe(null);
  });
  it("color(format) parses 8-digit hexadecimal (e.g., \"#abcdef33\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abcdef33"), 171, 205, 239, 0.2);
  });
  it("color(format) parses 4-digit hexadecimal (e.g., \"#abc3\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#abc3"), 170, 187, 204, 0.2);
  });
  it("color(format) parses RGB integer format (e.g., \"rgb(12,34,56)\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(12,34,56)"), 12, 34, 56, 1);
  });
  it("color(format) parses RGBA integer format (e.g., \"rgba(12,34,56,0.4)\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12,34,56,0.4)"), 12, 34, 56, 0.4);
  });
  it("color(format) parses RGB percentage format (e.g., \"rgb(12%,34%,56%)\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(12%,34%,56%)"), 31, 87, 143, 1);
    (0, _asserts.assertRgbEqual)((0, _index.color)("rgb(100%,100%,100%)"), 255, 255, 255, 1);
  });
  it("color(format) parses RGBA percentage format (e.g., \"rgba(12%,34%,56%,0.4)\")", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(12%,34%,56%,0.4)"), 31, 87, 143, 0.4);
    (0, _asserts.assertRgbEqual)((0, _index.color)("rgba(100%,100%,100%,0.4)"), 255, 255, 255, 0.4);
  });
  it("color(format) parses HSL format (e.g., \"hsl(60,100%,20%)\")", () => {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
  });
  it("color(format) parses HSLA format (e.g., \"hsla(60,100%,20%,0.4)\")", () => {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
  });
  it("color(format) ignores leading and trailing whitespace", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(` ${COLOR_ALICEBLUE}\t\n`), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #abc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aabbcc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgb(120,30,50)\t\n"), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
  });
  it("color(format) ignores whitespace between numbers", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgb( 120 , 30 , 50 ) "), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsl( 120 , 30% , 50% ) "), 120, 0.3, 0.5, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgba( 12 , 34 , 56 , 0.4 ) "), 12, 34, 56, 0.4);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rgba( 12% , 34% , 56% , 0.4 ) "), 31, 87, 143, 0.4);
    (0, _asserts.assertHslEqual)((0, _index.color)(" hsla( 60 , 100% , 20% , 0.4 ) "), 60, 1, 0.2, 0.4);
  });
  it("color(format) allows number signs", () => {
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
  it("color(format) allows decimals for non-integer values", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(20.0%,30.4%,51.2%)"), 51, 78, 131, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(20.0,30.4%,51.2%)"), 20, 0.304, 0.512, 1);
  });
  it("color(format) allows leading decimal for hue, opacity and percentages", () => {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(.9,.3%,.5%)"), 0.9, 0.003, 0.005, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(.9,.3%,.5%,.5)"), 0.9, 0.003, 0.005, 0.5);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(.1%,.2%,.3%)"), 0, 1, 1, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(120,30,50,.5)"), 120, 30, 50, 0.5);
  });
  it("color(format) allows exponential format for hue, opacity and percentages", () => {
    (0, _asserts.assertHslEqual)((0, _index.color)("hsl(1e1,2e1%,3e1%)"), 10, 0.2, 0.3, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)("hsla(9e-1,3e-1%,5e-1%,5e-1)"), 0.9, 0.003, 0.005, 0.5);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgb(1e-1%,2e-1%,3e-1%)"), 0, 1, 1, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(120,30,50,1e-1)"), 120, 30, 50, 0.1);
  });
  it("color(format) does not allow decimals for integer values", () => {
    expect((0, _index.color)("rgb(120.5,30,50)")).toBe(null);
  });
  it("color(format) does not allow empty decimals", () => {
    expect((0, _index.color)("rgb(120.,30,50)")).toBe(null);
    expect((0, _index.color)("rgb(120.%,30%,50%)")).toBe(null);
    expect((0, _index.color)("rgba(120,30,50,1.)")).toBe(null);
    expect((0, _index.color)("rgba(12%,30%,50%,1.)")).toBe(null);
    expect((0, _index.color)("hsla(60,100%,20%,1.)")).toBe(null);
  });
  it("color(format) does not allow made-up names", () => {
    expect((0, _index.color)("bostock")).toBe(null);
  });
  it("color(format) allows achromatic colors", () => {
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("rgba(0,0,0,0)"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#0000"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("#00000000"), NaN, NaN, NaN, 0);
  });
  it("color(format) does not allow whitespace before open paren or percent sign", () => {
    expect((0, _index.color)("rgb (120,30,50)")).toBe(null);
    expect((0, _index.color)("rgb (12%,30%,50%)")).toBe(null);
    expect((0, _index.color)("hsl (120,30%,50%)")).toBe(null);
    expect((0, _index.color)("hsl(120,30 %,50%)")).toBe(null);
    expect((0, _index.color)("rgba (120,30,50,1)")).toBe(null);
    expect((0, _index.color)("rgba (12%,30%,50%,1)")).toBe(null);
    expect((0, _index.color)("hsla (120,30%,50%,1)")).toBe(null);
  });
  it("color(format) is case-insensitive", () => {
    //assertRgbApproxEqual(color("aLiCeBlUE"), 240, 248, 255, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)("transPARENT"), NaN, NaN, NaN, 0);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aBc\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" #aaBBCC\t\n"), 170, 187, 204, 1);
    (0, _asserts.assertRgbApproxEqual)((0, _index.color)(" rGB(120,30,50)\t\n"), 120, 30, 50, 1);
    (0, _asserts.assertHslEqual)((0, _index.color)(" HSl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
  });
  it("color(format) returns undefined RGB channel values for unknown formats", () => {
    expect((0, _index.color)("invalid")).toBe(null);
    expect((0, _index.color)("hasOwnProperty")).toBe(null);
    expect((0, _index.color)("__proto__")).toBe(null);
    expect((0, _index.color)("#ab")).toBe(null);
  });
  it("color(format).hex() returns a hexadecimal string", () => {
    expect((0, _index.color)("rgba(12%,34%,56%,0.4)").hex()).toBe("#1f578f");
  });
});
//# sourceMappingURL=color.test.js.map