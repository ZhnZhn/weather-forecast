import {
  shapeSymbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from "../index";
import {
  assertPathEqual
} from "./asserts.test";

describe('d3Shape shapeSymbol', () => {
  it("shapeSymbol() returns a default symbol shape", () => {
    const s = shapeSymbol();
    expect(s.type()()).toBe(symbolCircle);
    expect(s.size()()).toBe(64);
    expect(s.context()).toBe(null);
    assertPathEqual(s(), "M4.514000,0A4.514000,4.514000,0,1,1,-4.514000,0A4.514000,4.514000,0,1,1,4.514000,0");
  });

  it("shapeSymbol().size(f)(…) propagates the context and arguments to the specified function", () => {
    const expected = {
      that: {}, args: [42]
    };
    let actual;
    shapeSymbol().size(function() { actual = {that: this, args: [].slice.call(arguments)}; return 64; }).apply(expected.that, expected.args);
    expect(actual).toEqual(expected);
  });

  it("shapeSymbol().type(f)(…) propagates the context and arguments to the specified function", () => {
    const expected = {
      that: {}, args: [42]
    };
    let actual;
    shapeSymbol().type(function() { actual = {that: this, args: [].slice.call(arguments)}; return symbolCircle; }).apply(expected.that, expected.args);
    expect(actual).toEqual(expected);
  });

  it("symbol.size(size) observes the specified size function", () => {
    const size = function(d, i) {
      return d.z * 2 + i;
    }
    , s = shapeSymbol().size(size);

    expect(s.size()).toBe(size);
    assertPathEqual(s({z: 0}, 0), "M0,0");
    assertPathEqual(s({z: Math.PI / 2}, 0), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
    assertPathEqual(s({z: 2 * Math.PI}, 0), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
    assertPathEqual(s({z: Math.PI}, 1), "M1.523000,0A1.523000,1.523000,0,1,1,-1.523000,0A1.523000,1.523000,0,1,1,1.523000,0");
    assertPathEqual(s({z: 4 * Math.PI}, 2), "M2.939000,0A2.939000,2.939000,0,1,1,-2.939000,0A2.939000,2.939000,0,1,1,2.939000,0");
  });

  it("symbol.size(size) observes the specified size constant", () => {
    const s = shapeSymbol();
    expect(s.size(42).size()()).toBe(42);
    assertPathEqual(s.size(0)(), "M0,0");
    assertPathEqual(s.size(Math.PI)(), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
    assertPathEqual(s.size(4 * Math.PI)(), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  });

  it("symbol.type(symbolCircle) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolCircle)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0");
    assertPathEqual(s(20), "M2.523000,0A2.523000,2.523000,0,1,1,-2.523000,0A2.523000,2.523000,0,1,1,2.523000,0");
  });

  it("symbol.type(symbolCross) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolCross)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
    assertPathEqual(s(20), "M-3,-1L-1,-1L-1,-3L1,-3L1,-1L3,-1L3,1L1,1L1,3L-1,3L-1,1L-3,1Z");
  });

  it("symbol.type(symbolDiamond) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolDiamond)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0L0,0L0,0L0,0Z");
    assertPathEqual(s(10), "M0,-2.943000L1.699000,0L0,2.943000L-1.699000,0Z");
  });

  it("symbol.type(symbolStar) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolStar)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
    assertPathEqual(s(10), "M0,-2.985000L0.670000,-0.922000L2.839000,-0.922000L1.084000,0.352000L1.754000,2.415000L0,1.140000L-1.754000,2.415000L-1.084000,0.352000L-2.839000,-0.922000L-0.670000,-0.922000Z");
  });

  it("symbol.type(symbolSquare) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolSquare)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0h0v0h0Z");
    assertPathEqual(s(4), "M-1,-1h2v2h-2Z");
    assertPathEqual(s(16), "M-2,-2h4v4h-4Z");
  });

  it("symbol.type(symbolTriangle) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolTriangle)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0L0,0L0,0Z");
    assertPathEqual(s(10), "M0,-2.775000L2.403000,1.387000L-2.403000,1.387000Z");
  });

  it("symbol.type(symbolWye) generates the expected path", () => {
    const s = shapeSymbol()
      .type(symbolWye)
      .size(function(d) { return d; });
    assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
    assertPathEqual(s(10), "M0.853000,0.493000L0.853000,2.199000L-0.853000,2.199000L-0.853000,0.493000L-2.331000,-0.361000L-1.478000,-1.839000L0,-0.985000L1.478000,-1.839000L2.331000,-0.361000Z");
  });

  it("symbol(type, size) is equivalent to shapeSymbol().type(type).size(size)", () => {
    const s0 = shapeSymbol()
      .type(symbolCross)
      .size(16)
    , s1 = shapeSymbol(symbolCross, 16);
    expect(s0()).toEqual(s1());
  });
})
