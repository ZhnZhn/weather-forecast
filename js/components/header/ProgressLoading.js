"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _constants = require("../../flux/fetching/constants");

var _ProgressLine = _interopRequireDefault(require("../zhn-atoms/ProgressLine"));

var COLOR = {
  LOADING: '#2f7ed8',
  FAILED: '#ed5813'
};

var _getDerivedState = function _getDerivedState(fetching) {
  switch (fetching) {
    case _constants.FETCH.LOADING:
      return [35, COLOR.LOADING];

    case _constants.FETCH.SUCCESS:
      return [100, COLOR.LOADING];

    case _constants.FETCH.FAILED:
      return [100, COLOR.FAILED];

    default:
      return [0, COLOR.LOADING];
  }
};

var ProgressLoading = function ProgressLoading() {
  var fetching = (0, _reactRedux.useSelector)(function (state) {
    return state.fetching;
  }),
      _getDerivedState2 = _getDerivedState(fetching),
      completed = _getDerivedState2[0],
      color = _getDerivedState2[1];

  return /*#__PURE__*/_react["default"].createElement(_ProgressLine["default"], {
    height: 3,
    color: color,
    completed: completed
  });
};

var _default = ProgressLoading;
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map