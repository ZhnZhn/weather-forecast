"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Tokens = require("../styles/Tokens");
var _RouterComp = _interopRequireDefault(require("./RouterComp"));
var _RaisedButton = _interopRequireDefault(require("../zhn/RaisedButton"));
var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));
var _ErrMsg = _interopRequireDefault(require("../zhn/ErrMsg"));
var _jsxRuntime = require("react/jsx-runtime");
const S_BT_LOAD = {
    margin: '16px 0 0 8px'
  },
  S_SPINNER = {
    margin: '24px 0 0 70px'
  },
  S_ERR_MSG = {
    margin: '8px 0 0 8px'
  };
const INITIAL = 'a',
  LOADING = 'b',
  FAILED = 'd';
const useLoadComp = (caption, compType) => {
  const [Comp, setComp] = (0, _uiApi.useState)(null),
    [loadStatus, setLoadStatus] = (0, _uiApi.useState)(INITIAL),
    hLoad = () => {
      setLoadStatus(LOADING);
      _RouterComp.default.getComp(compType).then(Comp => {
        setComp(_ => Comp);
      }).catch(err => setLoadStatus(FAILED));
    };
  if (Comp) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {});
  } else if (loadStatus === INITIAL) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton.default, {
      rootStyle: S_BT_LOAD,
      isPrimary: true,
      caption: `LOAD ${caption}`,
      onClick: hLoad
    });
  } else if (loadStatus === LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading.default, {
      style: S_SPINNER
    });
  } else if (loadStatus === FAILED) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg.default, {
      style: S_ERR_MSG,
      msg: _Tokens.MSG_LOADING_COMP_FALED
    });
  }
  return null;
};
var _default = exports.default = useLoadComp;
//# sourceMappingURL=useLoadComp.js.map