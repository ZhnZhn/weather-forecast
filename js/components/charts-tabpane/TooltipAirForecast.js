"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getPayload = _interopRequireDefault(require("./getPayload"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow2"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var TooltipAirForecast = function TooltipAirForecast(props) {
  var payload = (0, _getPayload["default"])(props);

  if (!payload) {
    return null;
  }

  var dt_text = payload.dt_text,
      aqi = payload.aqi,
      no2 = payload.no2,
      pm10 = payload.pm10,
      o3 = payload.o3,
      pm2_5 = payload.pm2_5,
      co = payload.co;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent["default"], {
    caption: dt_text,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t1: "AQI",
      v1: aqi,
      style1: _Label["default"].SPEED,
      t2: "CO",
      v2: co,
      style2: _Label["default"].PRESSURE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t1: "NO2",
      v1: no2,
      t2: "O3",
      v2: o3
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow["default"], {
      t1: "PM10",
      v1: pm10,
      t2: "PM2.5",
      v2: pm2_5
    })]
  });
};

var _default = TooltipAirForecast;
exports["default"] = _default;
//# sourceMappingURL=TooltipAirForecast.js.map