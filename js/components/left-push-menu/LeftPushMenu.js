"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _useLoadComp = _interopRequireDefault(require("./useLoadComp"));

var _PeriodForecast = _interopRequireDefault(require("../wrapper/PeriodForecast"));

var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));

var _LeftPushMenu = _interopRequireDefault(require("./LeftPushMenu.Style"));

var _CompType = _interopRequireDefault(require("./CompType"));

var useRef = _react["default"].useRef,
    useCallback = _react["default"].useCallback;

var LeftPushMenu = function LeftPushMenu(_ref) {
  var id = _ref.id,
      theme = _ref.theme;

  var _refDetail = useRef(),
      _hClickItem = useCallback(function (item, event) {
    _refDetail.current.setItem(item);
  }, []),
      _hCloseDetail = useCallback(function () {
    _refDetail.current.close();
  }, []),
      compOrBtOrErr = (0, _useLoadComp["default"])('CHARTS', _CompType["default"].CTB),
      STYLE = theme.createStyle(_LeftPushMenu["default"]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    style: STYLE.ROOT_DIV
  }, /*#__PURE__*/_react["default"].createElement(_PeriodForecast["default"], {
    onUpdate: _hCloseDetail,
    onClickItem: _hClickItem
  }), /*#__PURE__*/_react["default"].createElement(_DayDetailPopup["default"], {
    ref: _refDetail,
    onClose: _hCloseDetail
  }), compOrBtOrErr);
};

var _default = LeftPushMenu;
exports["default"] = _default;
//# sourceMappingURL=LeftPushMenu.js.map