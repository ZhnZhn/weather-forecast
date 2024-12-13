"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Router = _interopRequireDefault(require("../dialogs/Router"));
var _RouterData = _interopRequireDefault(require("../dialogs/RouterData"));
var _WrapperModalDialog = _interopRequireDefault(require("../zhn-atoms/WrapperModalDialog"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const DialogStack = _ref => {
  let {
    store,
    shows,
    data,
    dialogs,
    onClose
  } = _ref;
  return dialogs.map(dialog => {
    const {
      type,
      comp: Comp
    } = dialog;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
      isShow: shows[type],
      data: data[type],
      store: store,
      onClose: onClose.bind(null, type)
    }, type);
  });
};
const ModalDialogContainer = (0, _uiApi.memo)(_ref2 => {
  let {
    store
  } = _ref2;
  const _refModal = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)({
      isShow: false,
      currentDialog: null,
      dialogs: [],
      inits: {},
      shows: {},
      data: {}
    }),
    _hClose = (0, _uiApi.useCallback)(type => {
      setState(prevState => {
        prevState.shows[type] = false;
        return {
          ...prevState,
          isShow: false,
          currentDialog: null,
          shows: prevState.shows
        };
      });
    }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _onStore = () => {
      const {
          modal
        } = store.getState(),
        {
          id: type
        } = modal || {},
        _modal = (0, _uiApi.getRefValue)(_refModal);
      if (type && _modal !== modal) {
        (0, _uiApi.setRefValue)(_refModal, modal);
        setState(prevState => {
          const {
            inits,
            shows,
            data,
            dialogs
          } = prevState;
          if (!inits[type]) {
            dialogs.push({
              type,
              comp: _Router.default[type]
            });
            inits[type] = true;
          }
          shows[type] = true;
          data[type] = _RouterData.default.getData(store, type);
          return {
            isShow: true,
            currentDialog: type,
            shows,
            data,
            dialogs,
            inits
          };
        });
      }
    };
    return store.subscribe(_onStore);
  }, []);
  // store
  /*eslint-disable react-hooks/exhaustive-deps */

  const {
    isShow,
    currentDialog,
    shows,
    data,
    dialogs
  } = state;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperModalDialog.default, {
    isShow: isShow,
    onClose: _hClose.bind(null, currentDialog),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogStack, {
      store: store,
      shows: shows,
      data: data,
      dialogs: dialogs,
      onClose: _hClose
    })
  });
});

/*
ModalDialogContainer.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func
  })
}
*/
var _default = exports.default = ModalDialogContainer;
//# sourceMappingURL=ModalDialogContainer.js.map