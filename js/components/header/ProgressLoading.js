"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _selectors = require("../../flux/selectors");
var _constants = require("../../flux/fetching/constants");
var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));
var _jsxRuntime = require("react/jsx-runtime");
const COLOR_LOADING = '#2f7ed8',
  COLOR_FAILED = '#ed5813',
  _getDerivedState = fetching => fetching === _constants.FETCH.LOADING ? [35, COLOR_LOADING] : fetching === _constants.FETCH.SUCCESS ? [100, COLOR_LOADING] : fetching === _constants.FETCH.FAILED ? [100, COLOR_FAILED] : [0, COLOR_LOADING];
const ProgressLoading = () => {
  const fetching = (0, _uiApi.useSelector)(_selectors.sApp.fetching),
    [completed, color] = _getDerivedState(fetching);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine.default, {
    color: color,
    completed: completed
  });
};
var _default = exports.default = (0, _memoEqual.default)(ProgressLoading);
//# sourceMappingURL=ProgressLoading.js.map