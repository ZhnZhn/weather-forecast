import { bisect } from "../d3Array";

describe('d3Array bisect' , () => {
  it("bisect(array, value) returns the index after an exact match", () => {
    const numbers = [1, 2, 3];
    expect(bisect(numbers, 1)).toBe(1);
    expect(bisect(numbers, 2)).toBe(2);
    expect(bisect(numbers, 3)).toBe(3);
  });

  it("bisect(array, value) returns the index after the last match", () => {
    const numbers = [1, 2, 2, 3];
    expect(bisect(numbers, 1)).toBe(1);
    expect(bisect(numbers, 2)).toBe(3);
    expect(bisect(numbers, 3)).toBe(4);
  });

  it("bisect(empty, value) returns zero", () => {
    expect(bisect([], 1)).toBe(0);
  });

  it("bisect(array, value) returns the insertion point of a non-exact match", () => {
    const numbers = [1, 2, 3];
    expect(bisect(numbers, 0.5)).toBe(0);
    expect(bisect(numbers, 1.5)).toBe(1);
    expect(bisect(numbers, 2.5)).toBe(2);
    expect(bisect(numbers, 3.5)).toBe(3);
  });

  it("bisect(array, value, lo) observes the specified lower bound", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(bisect(numbers, 0, 2)).toBe(2);
    expect(bisect(numbers, 1, 2)).toBe(2);
    expect(bisect(numbers, 2, 2)).toBe(2);
    expect(bisect(numbers, 3, 2)).toBe(3);
    expect(bisect(numbers, 4, 2)).toBe(4);
    expect(bisect(numbers, 5, 2)).toBe(5);
    expect(bisect(numbers, 6, 2)).toBe(5);
  });

  it("bisect(array, value, lo, hi) observes the specified bounds", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(bisect(numbers, 0, 2, 3)).toBe(2);
    expect(bisect(numbers, 1, 2, 3)).toBe(2);
    expect(bisect(numbers, 2, 2, 3)).toBe(2);
    expect(bisect(numbers, 3, 2, 3)).toBe(3);
    expect(bisect(numbers, 4, 2, 3)).toBe(3);
    expect(bisect(numbers, 5, 2, 3)).toBe(3);
    expect(bisect(numbers, 6, 2, 3)).toBe(3);
  });

  it("bisect(array, value) handles large sparse d3", () => {
    const numbers = [];
    let i = 1 << 30;
    numbers[i++] = 1;
    numbers[i++] = 2;
    numbers[i++] = 3;
    numbers[i++] = 4;
    numbers[i++] = 5;
    expect(bisect(numbers, 0, i - 5, i)).toBe(i - 5);
    expect(bisect(numbers, 1, i - 5, i)).toBe(i - 4);
    expect(bisect(numbers, 2, i - 5, i)).toBe(i - 3);
    expect(bisect(numbers, 3, i - 5, i)).toBe(i - 2);
    expect(bisect(numbers, 4, i - 5, i)).toBe(i - 1);
    expect(bisect(numbers, 5, i - 5, i)).toBe(i - 0);
    expect(bisect(numbers, 6, i - 5, i)).toBe(i - 0);
  });

  it("bisect(array, value, lo, hi) keeps non-comparable values to the right", () => {
    const values = [1, 2, null, undefined];
    expect(bisect(values, 1)).toBe(1);
    expect(bisect(values, 2)).toBe(2);
    expect(bisect(values, null)).toBe(4);
    expect(bisect(values, undefined)).toBe(4);
    expect(bisect(values, NaN)).toBe(4);
  });
});
