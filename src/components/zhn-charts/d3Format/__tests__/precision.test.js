import {
  precisionFixed,
  precisionPrefix,
  precisionRound
} from '../index';

describe('precisionFixed', ()=>{
  const fn = precisionFixed;
  it("precisionFixed(number) returns the expected value", () => {
    expect(fn(8.9)).toBe(0);
    expect(fn(1.1)).toBe(0);
    expect(fn(0.89)).toBe(1);
    expect(fn(0.11)).toBe(1);
    expect(fn(0.089)).toBe(2);
    expect(fn(0.011)).toBe(2);
  });
})

describe('precisionPrefix', ()=>{
  const fn = precisionPrefix;
  // A generalization from µ to all prefixes:
  // expect(fn(1e-6, 1e-6)).toBe(0); // 1µ
  // expect(fn(1e-6, 1e-7)).toBe(0); // 10µ
  // expect(fn(1e-6, 1e-8)).toBe(0); // 100µ
  it("precisionPrefix(step, value) returns zero if step has the same units as value", () => {
    for (let i = -24; i <= 24; i += 3) {
      for (let j = i; j < i + 3; ++j) {
        expect(fn(+("1e" + i), +("1e" + j))).toBe(0);
      }
    }
  });

  // A generalization from µ to all prefixes:
  // expect(fn(1e-9, 1e-6)).toBe(); // 0.001µ
  // expect(fn(1e-8, 1e-6)).toBe(); // 0.01µ
  // expect(fn(1e-7, 1e-6)).toBe(); // 0.1µ
  it("precisionPrefix(step, value) returns greater than zero if fractional digits are needed", () => {
    for (let i = -24; i <= 24; i += 3) {
      for (let j = i - 4; j < i; ++j) {
        expect(fn(+("1e" + j), +("1e" + i))).toBe(i - j);
      }
    }
  });

  it("precisionPrefix(step, value) returns the expected precision when value is less than one yocto", () => {
    expect(fn(1e-24, 1e-24)).toBe(0); // 1y
    expect(fn(1e-25, 1e-25)).toBe(1); // 0.1y
    expect(fn(1e-26, 1e-26)).toBe(2); // 0.01y
    expect(fn(1e-27, 1e-27)).toBe(3); // 0.001y
    expect(fn(1e-28, 1e-28)).toBe(4); // 0.0001y
  });

  it("precisionPrefix(step, value) returns the expected precision when value is greater than than one yotta", () => {
    expect(fn(1e24, 1e24)).toBe(0); // 1Y
    expect(fn(1e24, 1e25)).toBe(0); // 10Y
    expect(fn(1e24, 1e26)).toBe(0); // 100Y
    expect(fn(1e24, 1e27)).toBe(0); // 1000Y
    expect(fn(1e23, 1e27)).toBe(1); // 1000.0Y
  });
})

describe('precisionRound', () => {
  const fn = precisionRound;
  it("precisionRound(step, max) returns the expected value", () => {
    expect(fn(0.1, 1.1)).toBe(2); // "1.0", "1.1"
    expect(fn(0.01, 0.99)).toBe(2); // "0.98", "0.99"
    expect(fn(0.01, 1.00)).toBe(2); // "0.99", "1.0"
    expect(fn(0.01, 1.01)).toBe(3); // "1.00", "1.01"
  });
})
