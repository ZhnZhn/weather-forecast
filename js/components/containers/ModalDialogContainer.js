"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _Router = _interopRequireDefault(require("../dialogs/Router"));

var _RouterData = _interopRequireDefault(require("../dialogs/RouterData"));

var _WrapperModalDialog = _interopRequireDefault(require("../zhn-atoms/WrapperModalDialog"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
var DialogStack = function DialogStack(_ref) {
  var store = _ref.store,
      shows = _ref.shows,
      data = _ref.data,
      dialogs = _ref.dialogs,
      onClose = _ref.onClose;
  return dialogs.map(function (dialog) {
    var type = dialog.type,
        comp = dialog.comp;
    return (0, _uiApi.createElement)(comp, {
      key: type,
      isShow: shows[type],
      data: data[type],
      store: store,
      onClose: onClose.bind(null, type)
    });
  });
};

var ModalDialogContainer = (0, _uiApi.memo)(function (_ref2) {
  var store = _ref2.store;

  var _refModal = (0, _uiApi.useRef)(),
      _useState = (0, _uiApi.useState)({
    isShow: false,
    currentDialog: null,
    dialogs: [],
    inits: {},
    shows: {},
    data: {}
  }),
      state = _useState[0],
      setState = _useState[1],
      _hClose = (0, _uiApi.useCallback)(function (type) {
    setState(function (prevState) {
      prevState.shows[type] = false;
      return (0, _extends2["default"])({}, prevState, {
        isShow: false,
        currentDialog: null,
        shows: prevState.shows
      });
    });
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _uiApi.useEffect)(function () {
    var _onStore = function _onStore() {
      var _store$getState = store.getState(),
          modal = _store$getState.modal,
          _ref3 = modal || {},
          type = _ref3.id,
          _modal = (0, _uiApi.getRefValue)(_refModal);

      if (type && _modal !== modal) {
        (0, _uiApi.setRefValue)(_refModal, modal);
        setState(function (prevState) {
          var inits = prevState.inits,
              shows = prevState.shows,
              data = prevState.data,
              dialogs = prevState.dialogs;

          if (!inits[type]) {
            dialogs.push({
              type: type,
              comp: _Router["default"][type]
            });
            inits[type] = true;
          }

          shows[type] = true;
          data[type] = _RouterData["default"].getData(store, type);
          return {
            isShow: true,
            currentDialog: type,
            shows: shows,
            data: data,
            dialogs: dialogs,
            inits: inits
          };
        });
      }
    };

    return store.subscribe(_onStore);
  }, []); // store

  /*eslint-disable react-hooks/exhaustive-deps */

  var isShow = state.isShow,
      currentDialog = state.currentDialog,
      shows = state.shows,
      data = state.data,
      dialogs = state.dialogs;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperModalDialog["default"], {
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

var _default = ModalDialogContainer;
exports["default"] = _default;
//# sourceMappingURL=ModalDialogContainer.js.map