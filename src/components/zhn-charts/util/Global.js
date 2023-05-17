const parseIsSsrByDefault = () => !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
  && window.setTimeout
);

export const Global = {
  isSsr: parseIsSsrByDefault(),
  get: (key) => {
    return Global[key];
  },
  set: (key, value) => {
    if (typeof key === 'string') {
      Global[key] = value;
    } else {
      const keys = Object.keys(key);
      if (keys && keys.length) {
        keys.forEach((k) => {
          Global[k] = key[k];
        });
      }
    }
  }
};
