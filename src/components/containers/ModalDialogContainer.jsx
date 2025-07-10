//import PropTypes from 'prop-types';
import {
  memo,
  useRef,
  useState,
  useCallback,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import Router from '../dialogs/Router';
import RouterData from '../dialogs/RouterData';
import WrapperModalDialog from '../zhn/WrapperModalDialog';

const DialogStack = ({
  store,
  shows,
  data,
  dialogs,
  onClose
}) => dialogs.map(dialog => {
  const {
    type,
    comp:Comp
  } = dialog;
  return (<Comp
    key={type}
    isShow={shows[type]}
    data={data[type]}
    store={store}
    onClose={onClose.bind(null, type)}
  />);
});

const ModalDialogContainer = memo(({
  store
}) => {
  const _refModal = useRef()
  , [
    state,
    setState
  ] = useState({
     isShow: false,
     currentDialog: null,
     dialogs: [],
     inits: {},
     shows: {},
     data: {}
  })
  , _hClose = useCallback(type => {
    setState(prevState => {
      prevState.shows[type] = false
      return {
        ...prevState,
        isShow: false,
        currentDialog: null,
        shows: prevState.shows
      };
    })
  }, [])

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _onStore = () => {
      const { modal } = store.getState()
      , { id:type } = modal || {}
      , _modal = getRefValue(_refModal);
      if (type && _modal !== modal) {
        setRefValue(_refModal, modal)
        setState(prevState => {
          const {
            inits,
            shows,
            data,
            dialogs
          } = prevState;
          if (!inits[type]){
            dialogs.push({
              type,
              comp: Router[type]
            })
            inits[type] = true
          }
          shows[type] = true
          data[type] = RouterData.getData(store, type)
          return {
            isShow: true,
            currentDialog: type,
            shows,
            data,
            dialogs,
            inits
          };
        })
      }
    }
    return store.subscribe(_onStore);
  }, [])
  // store
  /*eslint-disable react-hooks/exhaustive-deps */

  const {
    isShow,
    currentDialog,
    shows,
    data,
    dialogs
  } = state;

  return (
    <WrapperModalDialog
      isShow={isShow}
      onClose={_hClose.bind(null, currentDialog)}
    >
      <DialogStack
        store={store}
        shows={shows}
        data={data}
        dialogs={dialogs}
        onClose={_hClose}
      />
   </WrapperModalDialog>
  );
})

/*
ModalDialogContainer.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func
  })
}
*/

export default ModalDialogContainer
