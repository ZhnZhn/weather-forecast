export const range = (begin, end) => {
  const arr = [];

  for (let i = begin; i < end; ++i) {
    arr[i - begin] = i;
  }

  return arr;
};

export const memoize = (fn) => {
  let lastArgs = null;
  let lastResult = null;

  return (...args) => lastArgs  
    && args.every((val, i) => val === lastArgs[i])
    ? lastResult
    : (lastArgs = args, lastResult = fn(...args));
};
