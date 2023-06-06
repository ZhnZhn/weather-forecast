const reNumber = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g;
function formatNumber(s) {
  return Math.abs((s = +s) - Math.round(s)) < 1e-6 ? Math.round(s) : s.toFixed(6);
}

function normalizePath(path) {
  return path.replace(reNumber, formatNumber);
}

export function assertPathEqual(actual, expected) {
  expect(normalizePath(actual + "")).toBe(normalizePath(expected + ""));
}

describe('d3Path', () => {
  test('d3Path helper functions', () => {
    expect(true).toBe(true)
  })
})
