"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _selectors = require("../../flux/selectors");
var _useLoadComp = _interopRequireDefault(require("./useLoadComp"));
var _WrapperPeriodForecast = _interopRequireDefault(require("../wrapper/WrapperPeriodForecast"));
var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));
var _LeftPushMenu = _interopRequireDefault(require("./LeftPushMenu.Style"));
var _CompType = _interopRequireDefault(require("./CompType"));
var _jsxRuntime = require("react/jsx-runtime");
const LeftPushMenu = _ref => {
  let {
    id,
    theme
  } = _ref;
  const isAir = (0, _uiApi.useSelector)(_selectors.sSettings.isAir),
    _refDetail = (0, _uiApi.useRef)(),
    [_hClickItem, _hCloseDetail] = (0, _uiApi.useMemo)(() => [(item, event) => {
      (0, _uiApi.getRefValue)(_refDetail).setItem(item);
    }, () => {
      (0, _uiApi.getRefValue)(_refDetail).close();
    }], []),
    CompOrBtOrErrEl = (0, _useLoadComp.default)('CHARTS', _CompType.default.CTB),
    STYLE = theme.createStyle(_LeftPushMenu.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: id,
    style: STYLE.ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperPeriodForecast.default, {
      onUpdate: _hCloseDetail,
      onClickItem: _hClickItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayDetailPopup.default, {
      refEl: _refDetail,
      onClose: _hCloseDetail
    }), (0, _uiApi.cloneUiElement)(CompOrBtOrErrEl, {
      isAir
    })]
  });
};
var _default = exports.default = LeftPushMenu;
//# sourceMappingURL=LeftPushMenu.js.map