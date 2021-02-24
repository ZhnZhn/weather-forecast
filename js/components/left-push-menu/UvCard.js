"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _selectors = require("../../flux/selectors");

var _TooltipUvi = _interopRequireDefault(require("./TooltipUvi"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var Component = _react["default"].Component;
var CartesianGrid = _Chart["default"].CartesianGrid,
    Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    LineChart = _Chart["default"].LineChart,
    Tooltip = _Chart["default"].Tooltip;

var _transformUvi = function _transformUvi(hourlyArr) {
  return hourlyArr.map(function (_ref) {
    var timestamp = _ref.dt,
        uvi = _ref.uvi;
    return {
      day: _dt["default"].toDayHour(timestamp),
      uvi: uvi
    };
  });
};

var UvCard = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(UvCard, _Component);

  function UvCard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      data: []
    };

    _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sUV.recent(state);

      if (recent !== _this.state.recent) {
        _this.setState(function (prev) {
          return {
            data: _transformUvi((_selectors.sUV.byId(state, recent) || {}).list || [])
          };
        });
      }
    };

    return _this;
  }

  var _proto = UvCard.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var data = this.state.data;
    return /*#__PURE__*/_react["default"].createElement(ResponsiveContainer, {
      width: "100%",
      height: 300
    }, /*#__PURE__*/_react["default"].createElement(LineChart, (0, _extends2["default"])({
      data: data
    }, _Chart2["default"].HourlyChart), /*#__PURE__*/_react["default"].createElement(XAxis, (0, _extends2["default"])({
      dataKey: "day"
    }, _Chart2["default"].XAxis)), /*#__PURE__*/_react["default"].createElement(YAxis, {
      yAxisId: 1,
      orientation: "right",
      width: 45 //label="UV"
      ,
      dataKey: "uvi"
    }), /*#__PURE__*/_react["default"].createElement(CartesianGrid, _Chart2["default"].CartesianGrid), /*#__PURE__*/_react["default"].createElement(Tooltip, {
      offset: 24,
      content: /*#__PURE__*/_react["default"].createElement(_TooltipUvi["default"], {
        data: data
      })
    }), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: "uvi"
    }))));
  };

  return UvCard;
}(Component);

var _default = UvCard;
exports["default"] = _default;
//# sourceMappingURL=UvCard.js.map