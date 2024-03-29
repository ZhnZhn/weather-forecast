"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getPayload = _interopRequireDefault(require("./getPayload"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow1"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var TooltipHourly = function TooltipHourly(props) {
  var payload = (0, _getPayload["default"])(props);

  if (!payload) {
    return null;
  }

  var dt_text = payload.dt_text,
      temp = payload.temp,
      pressure = payload.pressure,
      rain = payload.rain,
      snow = payload.snow,
      speed = payload.speed;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent["default"], {
    caption: dt_text,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t: "Temp",
      v: temp
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t: "Pressure",
      v: pressure,
      style: _Label["default"].PRESSURE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t: "Speed",
      v: speed,
      style: _Label["default"].SPEED
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t: "Rain",
      v: rain,
      s: _Label["default"].RAIN
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t: "Snow",
      v: snow,
      s: _Label["default"].RAIN
    })]
  });
};

var _default = TooltipHourly;
exports["default"] = _default;
//# sourceMappingURL=TooltipHourly.js.map