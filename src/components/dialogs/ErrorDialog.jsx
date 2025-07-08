import memoIsShow from '../hoc/memoIsShow';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import { sModal } from '../../flux/selectors';

const S_MODAL = {
  position: 'static',
  width: 335,
  height: 285,
  margin: '70px auto 0px'
}
, S_MSG = {
  height: 200,
  padding: 16,
  lineHeight: 1.2,
  fontWeight: 600
};


const ErrorDialog = ({
  isShow,
  store,
  onClose
}) => {
  const _errMsg = sModal.errMsg(store.getState());

  return (
    <ModalDialog
      style={S_MODAL}
      caption="Error Description"
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_MSG}>
        {_errMsg}
      </div>
    </ModalDialog>
  );
};

export default memoIsShow(ErrorDialog)
