import React from '../_react';

import RouterComp from './RouterComp';
import RaisedButton from '../zhn-atoms/RaisedButton';
import SpinnerLoading from '../zhn-atoms/SpinnerLoading';
import ErrMsg from '../zhn-atoms/ErrMsg';

const { useState } = React;

const S = {
  BT_LOAD: {
    marginTop: 16,
    marginLeft: 8
  },
  SPINNER: {
    marginTop: 24,
    marginLeft: 70
  },
  ERR_MSG: {
    marginTop: 8,
    marginLeft: 8
  }
};

const  INITIAL = 'a'
, LOADING = 'b'
, FAILED = 'd';

const useLoadComp = (caption, compType) => {
  const [comp, setComp] = useState(null)
  , [loadStatus, setLoadStatus] = useState(INITIAL)
  , hLoad = () => {
      setLoadStatus(LOADING)
      RouterComp
        .getComp(compType)
        .then(setComp)
        .catch(err => setLoadStatus(FAILED))
  };

  if (comp) {
    return comp;
  } else if (loadStatus === INITIAL) {
    return (
      <RaisedButton
        rootStyle={S.BT_LOAD}
        isPrimary={true}
        caption={`LOAD ${caption}`}
        onClick={hLoad}
    />);
  } else if (loadStatus === LOADING) {
    return (
      <SpinnerLoading
        style={S.SPINNER}
      />
    );
  } else if (loadStatus === FAILED) {
    return (
      <ErrMsg
        style={S.ERR_MSG}
        msg="Error during loading."
      />
    );
  }
  return null;
};

export default useLoadComp
