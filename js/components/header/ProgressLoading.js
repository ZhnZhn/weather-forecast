"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _selectors = require("../../flux/selectors");

var _constants = require("../../flux/fetching/constants");

var _ProgressLine = _interopRequireDefault(require("../zhn-atoms/ProgressLine"));

var _jsxRuntime = require("react/jsx-runtime");

var COLOR_LOADING = '#2f7ed8',
    COLOR_FAILED = '#ed5813',
    _getDerivedState = function _getDerivedState(fetching) {
  switch (fetching) {
    case _constants.FETCH.LOADING:
      return [35, COLOR_LOADING];

    case _constants.FETCH.SUCCESS:
      return [100, COLOR_LOADING];

    case _constants.FETCH.FAILED:
      return [100, COLOR_FAILED];

    default:
      return [0, COLOR_LOADING];
  }
};

var ProgressLoading = function ProgressLoading() {
  var fetching = (0, _uiApi.useSelector)(_selectors.sApp.fetching),
      _getDerivedState2 = _getDerivedState(fetching),
      completed = _getDerivedState2[0],
      color = _getDerivedState2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine["default"], {
    height: 3,
    color: color,
    completed: completed
  });
};

var _default = ProgressLoading;
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map