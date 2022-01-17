"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _RouterComp = _interopRequireDefault(require("./RouterComp"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn-atoms/SpinnerLoading"));

var _ErrMsg = _interopRequireDefault(require("../zhn-atoms/ErrMsg"));

var _jsxRuntime = require("react/jsx-runtime");

var S_BT_LOAD = {
  margin: '16px 0 0 8px'
},
    S_SPINNER = {
  margin: '24px 0 0 70px'
},
    S_ERR_MSG = {
  margin: '8px 0 0 8px'
};
var INITIAL = 'a',
    LOADING = 'b',
    FAILED = 'd';

var useLoadComp = function useLoadComp(caption, compType) {
  var _useState = (0, _uiApi.useState)(null),
      Comp = _useState[0],
      setComp = _useState[1],
      _useState2 = (0, _uiApi.useState)(INITIAL),
      loadStatus = _useState2[0],
      setLoadStatus = _useState2[1],
      hLoad = function hLoad() {
    setLoadStatus(LOADING);

    _RouterComp["default"].getComp(compType).then(function (Comp) {
      setComp(function (_) {
        return Comp;
      });
    })["catch"](function (err) {
      return setLoadStatus(FAILED);
    });
  };

  if (Comp) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {});
  } else if (loadStatus === INITIAL) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton["default"], {
      rootStyle: S_BT_LOAD,
      isPrimary: true,
      caption: "LOAD " + caption,
      onClick: hLoad
    });
  } else if (loadStatus === LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading["default"], {
      style: S_SPINNER
    });
  } else if (loadStatus === FAILED) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg["default"], {
      style: S_ERR_MSG,
      msg: "Error during loading."
    });
  }

  return null;
};

var _default = useLoadComp;
exports["default"] = _default;
//# sourceMappingURL=useLoadComp.js.map