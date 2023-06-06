export const noop = () => {}

export const isFn = v => typeof v === 'function'
export const isUndef = v => v === void 0

export function crFnConstant(x) {
  return function constant() {
    return x;
  };
}

export const arrayFrom = Array.from

export function crArrayFrom(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : arrayFrom(x); // Map, Set, iterable, string, or anything else
}
