"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _PeriodForecast = _interopRequireDefault(require("../wrapper/PeriodForecast"));

var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));

var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));

var _ForecastChart = _interopRequireDefault(require("./ForecastChart"));

var _HourlyChart = _interopRequireDefault(require("./HourlyChart"));

var _UviChart = _interopRequireDefault(require("./UviChart"));

var _LeftPushMenu = _interopRequireDefault(require("./LeftPushMenu.Style"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var useRef = _react["default"].useRef,
    useCallback = _react["default"].useCallback;
var requestHourly = _handlers["default"].requestHourly,
    requestUvi = _handlers["default"].requestUvi;
var S = {
  TABS: {
    textAlign: 'left'
  }
};

var _setBackgroundColorTo = function _setBackgroundColorTo(theme, ref, styleProperty) {
  var _el = ref.current;

  if (_el) {
    _el.style.backgroundColor = theme.createStyle(_LeftPushMenu["default"])[styleProperty];
  }
};

var LeftPushMenu = function LeftPushMenu(_ref) {
  var id = _ref.id,
      theme = _ref.theme;

  var _refDetail = useRef(),
      _refDetailEl = useRef(),
      _markDay = useCallback(function (currentTarget) {
    _refDetailEl.current = currentTarget;

    _setBackgroundColorTo(theme, _refDetailEl, 'C_BG_MARK');
  }, [theme]),
      _unmarkDay = useCallback(function () {
    _setBackgroundColorTo(theme, _refDetailEl, 'C_BG_UNMARK');
  }, [theme]),
      _hClickItem = useCallback(function (item, event) {
    event.persist();

    _unmarkDay();

    _markDay(event.currentTarget);

    _refDetail.current.setItem(item);
  }, [_unmarkDay, _markDay]),
      _hCloseDetail = useCallback(function () {
    _unmarkDay();

    _refDetail.current.close();
  }, [_unmarkDay]);

  var STYLE = theme.createStyle(_LeftPushMenu["default"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    style: STYLE.ROOT_DIV
  }, /*#__PURE__*/_react["default"].createElement(_PeriodForecast["default"], {
    onUpdate: _hCloseDetail,
    onClickItem: _hClickItem
  }), /*#__PURE__*/_react["default"].createElement(_DayDetailPopup["default"], {
    ref: _refDetail,
    onClose: _hCloseDetail
  }), /*#__PURE__*/_react["default"].createElement(_TabPane["default"], {
    key: "1",
    width: "100%",
    tabsStyle: S.TABS
  }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "7 Days"
  }, /*#__PURE__*/_react["default"].createElement(_ForecastChart["default"], null)), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "5 Days/3 Hours",
    onClick: requestHourly
  }, /*#__PURE__*/_react["default"].createElement(_HourlyChart["default"], null)), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "UV index",
    onClick: requestUvi
  }, /*#__PURE__*/_react["default"].createElement(_UviChart["default"], null))));
};

var _default = LeftPushMenu;
exports["default"] = _default;
//# sourceMappingURL=LeftPushMenu.js.map