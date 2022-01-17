import { useState } from '../uiApi';

import RouterComp from './RouterComp';
import RaisedButton from '../zhn-atoms/RaisedButton';
import SpinnerLoading from '../zhn-atoms/SpinnerLoading';
import ErrMsg from '../zhn-atoms/ErrMsg';

const S_BT_LOAD = { margin: '16px 0 0 8px' }
, S_SPINNER = { margin: '24px 0 0 70px' }
, S_ERR_MSG = { margin: '8px 0 0 8px' };

const  INITIAL = 'a'
, LOADING = 'b'
, FAILED = 'd';

const useLoadComp = (caption, compType) => {
  const [Comp, setComp] = useState(null)
  , [loadStatus, setLoadStatus] = useState(INITIAL)
  , hLoad = () => {
      setLoadStatus(LOADING)
      RouterComp
        .getComp(compType)
        .then(Comp => { setComp(_ => Comp) })
        .catch(err => setLoadStatus(FAILED))
   };

  if (Comp) {
    return <Comp />;
  } else if (loadStatus === INITIAL) {
    return (
      <RaisedButton
        rootStyle={S_BT_LOAD}
        isPrimary={true}
        caption={`LOAD ${caption}`}
        onClick={hLoad}
    />);
  } else if (loadStatus === LOADING) {
    return (
      <SpinnerLoading
        style={S_SPINNER}
      />
    );
  } else if (loadStatus === FAILED) {
    return (
      <ErrMsg
        style={S_ERR_MSG}
        msg="Error during loading."
      />
    );
  }
  return null;
};

export default useLoadComp
