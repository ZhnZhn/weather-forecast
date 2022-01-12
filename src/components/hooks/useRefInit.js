import React from '../_react';

const { useRef } = React;

const useRefInit = (crValue) => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = crValue()
  }
  return ref.current;
};

export default useRefInit
