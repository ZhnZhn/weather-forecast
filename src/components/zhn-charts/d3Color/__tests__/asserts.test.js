import { rgb } from "../index";
import { hsl } from "../color";

export function assertRgbEqual(
  actual,
  r,
  g,
  b,
  opacity
) {
  expect(actual instanceof rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : actual.r === r)
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : actual.g === g)
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : actual.b === b)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  ).toBe(true);
}

export function assertRgbApproxEqual(
  actual,
  r,
  g,
  b,
  opacity
) {
  expect(actual instanceof rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : Math.round(actual.r) === Math.round(r))
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : Math.round(actual.g) === Math.round(g))
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : Math.round(actual.b) === Math.round(b))
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  ).toBe(true);
}

export function assertHslEqual(
  actual,
  h,
  s,
  l,
  opacity
) {
  expect(actual instanceof hsl
    && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h +   1e-6)
    && (isNaN(s) ? isNaN(actual.s) && actual.s !== actual.s : s - 1e-6 <= actual.s && actual.s <= s +   1e-6)
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l +   1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  ).toBe(true);
}

describe('d3Color asserts', () => {
  it('assert helper functions', () => {
    expect(true).toBe(true)
  })
})
