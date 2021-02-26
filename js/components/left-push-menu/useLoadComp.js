"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _RouterComp = _interopRequireDefault(require("./RouterComp"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn-atoms/SpinnerLoading"));

var _ErrMsg = _interopRequireDefault(require("../zhn-atoms/ErrMsg"));

var useState = _react["default"].useState;
var S = {
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
var INITIAL = 'a',
    LOADING = 'b',
    FAILED = 'd';

var useLoadComp = function useLoadComp(caption, compType) {
  var _useState = useState(null),
      comp = _useState[0],
      setComp = _useState[1],
      _useState2 = useState(INITIAL),
      loadStatus = _useState2[0],
      setLoadStatus = _useState2[1],
      hLoad = function hLoad() {
    setLoadStatus(LOADING);

    _RouterComp["default"].getComp(compType).then(setComp)["catch"](function (err) {
      return setLoadStatus(FAILED);
    });
  };

  if (comp) {
    return comp;
  } else if (loadStatus === INITIAL) {
    return /*#__PURE__*/_react["default"].createElement(_RaisedButton["default"], {
      rootStyle: S.BT_LOAD,
      isPrimary: true,
      caption: "LOAD " + caption,
      onClick: hLoad
    });
  } else if (loadStatus === LOADING) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerLoading["default"], {
      style: S.SPINNER
    });
  } else if (loadStatus === FAILED) {
    return /*#__PURE__*/_react["default"].createElement(_ErrMsg["default"], {
      style: S.ERR_MSG,
      msg: "Error during loading."
    });
  }

  return null;
};

var _default = useLoadComp;
exports["default"] = _default;
//# sourceMappingURL=useLoadComp.js.map