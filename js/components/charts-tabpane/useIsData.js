"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.useIsSnow = exports.useIsRain = void 0;

var _fUseIsData = _interopRequireDefault(require("./fUseIsData"));

var _hasData = require("./hasData");

var useIsRain = (0, _fUseIsData["default"])(_hasData.hasRain);
exports.useIsRain = useIsRain;
var useIsSnow = (0, _fUseIsData["default"])(_hasData.hasSnow);
exports.useIsSnow = useIsSnow;
//# sourceMappingURL=useIsData.js.map