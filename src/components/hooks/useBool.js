import React from '../_react';

const { useState, useCallback } = React;

const useBool = (initialValue) => {
  const [is, setIs] = useState(() => !!initialValue)
  /*eslint-disable react-hooks/exhaustive-deps */
  , setTrue = useCallback(() => setIs(true), [])
  , setFalse = useCallback(() => setIs(false), []);
  //setIs
  /*eslint-enable react-hooks/exhaustive-deps */
  return [is, setTrue, setFalse];
};

export default useBool
