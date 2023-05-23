"use strict";

exports.__esModule = true;
exports.detectReferenceElementsDomain = void 0;
var _DataUtils = require("./DataUtils");
var detectReferenceElementsDomain = function detectReferenceElementsDomain(children, domain, axisId, axisType, specifiedTicks) {
  var finalDomain = domain;
  if (specifiedTicks && specifiedTicks.length) {
    finalDomain = specifiedTicks.reduce(function (result, tick) {
      if ((0, _DataUtils.isNumber)(tick)) {
        return [Math.min(result[0], tick), Math.max(result[1], tick)];
      }
      return result;
    }, finalDomain);
  }
  return finalDomain;
};
exports.detectReferenceElementsDomain = detectReferenceElementsDomain;
//# sourceMappingURL=DetectReferenceElementsDomain.js.map