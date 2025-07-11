"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _selectors = require("../../flux/selectors");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _WrapperPeriodForecast = _interopRequireDefault(require("../wrapper/WrapperPeriodForecast"));
var _useLoadComp = _interopRequireDefault(require("./useLoadComp"));
var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));
var _CompType = _interopRequireDefault(require("./CompType"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LEFT_PUSH_MENU = `${_styleFn.CL_BG} left-push-menu`;
const LeftPushMenu = _ref => {
  let {
    id
  } = _ref;
  const isAir = (0, _uiApi.useSelector)(_selectors.sSettings.isAir),
    isPushMenu = (0, _uiApi.useSelector)(_selectors.sLayout.isPushMenu),
    _refDetail = (0, _uiApi.useRef)(),
    [_hClickItem, _hCloseDetail] = (0, _uiApi.useMemo)(() => [(item, event) => {
      (0, _uiApi.getRefValue)(_refDetail).setItem(item);
    }, () => {
      (0, _uiApi.getRefValue)(_refDetail).close();
    }], []),
    CompOrBtOrErrEl = (0, _useLoadComp.default)('CHARTS', _CompType.default.CTB),
    _style = isPushMenu ? {
      transform: 'translateX(0px)'
    } : {
      transform: 'translateX(-100%)'
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: id,
    className: CL_LEFT_PUSH_MENU,
    style: _style,
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