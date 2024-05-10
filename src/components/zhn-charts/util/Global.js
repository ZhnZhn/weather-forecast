const parseIsSsrByDefault = () => !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
  && window.setTimeout
);

export const IS_SSR = parseIsSsrByDefault()
