"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _hasData = require("./hasData");

var fUseIsData = function fUseIsData(hasProperty) {
  return function (data) {
    return (0, _uiApi.useMemo)(function () {
      return hasProperty(data);
    }, [data]);
  };
},
    useIsRain = fUseIsData(_hasData.hasRain),
    useIsSnow = fUseIsData(_hasData.hasSnow);

var useIsNoData = function useIsNoData(data) {
  var _isRain = useIsRain(data),
      _isSnow = useIsSnow(data);

  return (0, _uiApi.useMemo)(function () {
    return {
      rain: !_isRain,
      snow: !_isSnow
    };
  }, [_isRain, _isSnow]);
};

var _default = useIsNoData;
exports["default"] = _default;
//# sourceMappingURL=useIsNoData.js.map