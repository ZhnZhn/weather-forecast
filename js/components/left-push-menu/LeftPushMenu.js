"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _selectors = require("../../flux/selectors");

var _useLoadComp = _interopRequireDefault(require("./useLoadComp"));

var _WrapperPeriodForecast = _interopRequireDefault(require("../wrapper/WrapperPeriodForecast"));

var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));

var _LeftPushMenu = _interopRequireDefault(require("./LeftPushMenu.Style"));

var _CompType = _interopRequireDefault(require("./CompType"));

var _jsxRuntime = require("react/jsx-runtime");

var LeftPushMenu = function LeftPushMenu(_ref) {
  var id = _ref.id,
      theme = _ref.theme;

  var isAir = (0, _reactRedux.useSelector)(_selectors.sSettings.isAir),
      _refDetail = (0, _uiApi.useRef)(),
      _hClickItem = (0, _uiApi.useCallback)(function (item, event) {
    _refDetail.current.setItem(item);
  }, []),
      _hCloseDetail = (0, _uiApi.useCallback)(function () {
    _refDetail.current.close();
  }, []),
      CompOrBtOrErrEl = (0, _useLoadComp["default"])('CHARTS', _CompType["default"].CTB),
      STYLE = theme.createStyle(_LeftPushMenu["default"]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: id,
    style: STYLE.ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperPeriodForecast["default"], {
      onUpdate: _hCloseDetail,
      onClickItem: _hClickItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayDetailPopup["default"], {
      ref: _refDetail,
      onClose: _hCloseDetail
    }), (0, _uiApi.cloneElement)(CompOrBtOrErrEl, {
      isAir: isAir
    })]
  });
};

var _default = LeftPushMenu;
exports["default"] = _default;
//# sourceMappingURL=LeftPushMenu.js.map