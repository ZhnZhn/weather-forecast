"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var useSeriesFilter = function useSeriesFilter(initialFiltered) {
  var _useState = (0, _uiApi.useState)(initialFiltered),
      filtered = _useState[0],
      setFiltered = _useState[1],
      hFilter = (0, _uiApi.useCallback)(function (dataKey) {
    setFiltered(function (prevFiltered) {
      prevFiltered[dataKey] = !prevFiltered[dataKey];
      return (0, _extends2["default"])({}, prevFiltered);
    });
  }, []);

  return [filtered, hFilter];
};

var _default = useSeriesFilter;
exports["default"] = _default;
//# sourceMappingURL=useSeriesFilter.js.map