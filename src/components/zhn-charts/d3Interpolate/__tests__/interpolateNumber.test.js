import { interpolateNumber } from "../index.js";

function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray
    : typeof expected === "object" ? inDeltaObject
    : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  let n = expected.length, i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaObject(actual, expected, delta) {
  for (let i in expected) if (!inDelta(actual[i], expected[i], delta)) return false;
  for (let i in actual) if (!(i in expected)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}

const _testInDelta = (
  actual,
  expected,
  delta = 1e-6
) => {
  expect(inDelta(actual, expected, delta)).toBe(true)
}

describe('interpolateNumber', () => {
  it("interpolateNumber(a, b) interpolates between two numbers a and b", () => {
    const i = interpolateNumber(10, 42);
    _testInDelta(i(0.0), 10.0);
    _testInDelta(i(0.1), 13.2);
    _testInDelta(i(0.2), 16.4);
    _testInDelta(i(0.3), 19.6);
    _testInDelta(i(0.4), 22.8);
    _testInDelta(i(0.5), 26.0);
    _testInDelta(i(0.6), 29.2);
    _testInDelta(i(0.7), 32.4);
    _testInDelta(i(0.8), 35.6);
    _testInDelta(i(0.9), 38.8);
    _testInDelta(i(1.0), 42.0);
  });

  it("interpolateNumber(a, b) gives exact ends for t=0 and t=1", () => {
    const a = 2e+42, b = 335;
    expect(interpolateNumber(a, b)(1)).toBe(b);
    expect(interpolateNumber(a, b)(0)).toBe(a);
  });
})
