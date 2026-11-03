//import { rs } from '@rstest/core';

export const crTestFn = (fn) => rs.fn(fn)

export const testSpyOn = (...args) => rs.spyOn(...args)