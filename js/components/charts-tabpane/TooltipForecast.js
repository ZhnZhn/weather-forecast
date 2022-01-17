"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getPayload = _interopRequireDefault(require("./getPayload"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow2"));

var _TooltipRow2 = _interopRequireDefault(require("./TooltipRow1"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var TooltipForecast = function TooltipForecast(props) {
  var payload = (0, _getPayload["default"])(props);

  if (!payload) {
    return null;
  }

  var label = props.label,
      tempMorn = payload.tempMorn,
      tempDay = payload.tempDay,
      tempEve = payload.tempEve,
      tempNight = payload.tempNight,
      tempMin = payload.tempMin,
      tempMax = payload.tempMax,
      rain = payload.rain,
      speed = payload.speed,
      pressure = payload.pressure,
      humidity = payload.humidity;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent["default"], {
    caption: label,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      style1: _Label["default"].TEMP_DAY,
      t1: "Morn",
      v1: tempMorn,
      t2: "Day",
      v2: tempDay
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      style1: _Label["default"].TEMP_NIGHT,
      t1: "Eve",
      v1: tempEve,
      t2: "Night",
      v2: tempNight
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t1: "Min",
      v1: tempMin,
      style1: _Label["default"].TEMP_MIN,
      t2: "Max",
      v2: tempMax,
      style2: _Label["default"].TEMP_MAX
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t1: "Rain",
      v1: rain,
      style1: _Label["default"].RAIN,
      t2: "Wind",
      v2: speed,
      style2: _Label["default"].SPEED
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow2["default"], {
      t: "Pressure",
      v: pressure,
      style: _Label["default"].PRESSURE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow2["default"], {
      t: "Humidity",
      v: humidity,
      style: _Label["default"].SPEED
    })]
  });
};

var _default = TooltipForecast;
exports["default"] = _default;
//# sourceMappingURL=TooltipForecast.js.map