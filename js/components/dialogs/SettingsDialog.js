"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));
var _Dialog = _interopRequireDefault(require("./Dialog.Style"));
var _useRerender = _interopRequireDefault(require("../hooks/useRerender"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));
var _CardApiKey = _interopRequireDefault(require("./CardApiKey"));
var _CardUi = _interopRequireDefault(require("./CardUi"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const S_MODAL = {
    position: 'static',
    width: 320,
    height: 285,
    margin: '70px auto 0px'
  },
  S_TABS = {
    textAlign: 'left',
    marginLeft: 24
  },
  S_TAB_SELECTED = {
    color: 'black'
  },
  S_CARD_ROOT = {
    position: 'relative',
    height: 200
  },
  S_CARD_BUTTONS = {
    position: 'absolute',
    right: 8,
    bottom: 4
  };
const SettingsDialog = _ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const {
      onSetTheme,
      onSet,
      onAir
    } = data,
    theme = (0, _uiApi.useContext)(_ThemeContext.default),
    rerender = (0, _useRerender.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _handleSetTheme = (0, _uiApi.useCallback)(item => {
      onSetTheme(theme, item.value);
      rerender();
    }, [])
    // theme, onSetTheme, rerender
    /*eslint-enable react-hooks/exhaustive-deps */,
    TS = theme.createStyle(_Dialog.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    style: {
      ...S_MODAL,
      ...TS.R_DIALOG
    },
    caption: "User Settings",
    isShow: isShow,
    isWithButton: false,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      width: "100%",
      tabsStyle: S_TABS,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "API Key",
        selectedStyle: S_TAB_SELECTED,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CardApiKey.default, {
          style: S_CARD_ROOT,
          buttonsStyle: S_CARD_BUTTONS,
          onSet: onSet,
          onClose: onClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "UI Theme",
        selectedStyle: S_TAB_SELECTED,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CardUi.default, {
          style: S_CARD_ROOT,
          buttonsStyle: S_CARD_BUTTONS,
          onSetTheme: _handleSetTheme,
          onAir: onAir,
          onClose: onClose
        })
      })]
    })
  });
};

/*
SettingsDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    onSet: PropTypes.func,
    onAir: PropTypes.func,
    onSetTheme: PropTypes.func,
  }),
  onClose: PropTypes.func
}
*/
var _default = exports.default = (0, _memoIsShow.default)(SettingsDialog);
//# sourceMappingURL=SettingsDialog.js.map