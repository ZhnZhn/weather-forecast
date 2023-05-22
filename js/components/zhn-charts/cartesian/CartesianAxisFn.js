"use strict";

exports.__esModule = true;
exports.getTickAnchors = void 0;
//[textAnchor, verticalAnchor]
var getTickAnchors = function getTickAnchors(orientation, mirror) {
  return [orientation === 'left' ? mirror ? 'start' : 'end' : orientation === 'right' ? mirror ? 'end' : 'start' : 'middle', orientation === 'left' || orientation === 'right' ? 'middle' : orientation === 'top' ? mirror ? 'start' : 'end' : mirror ? 'end' : 'start'];
};
exports.getTickAnchors = getTickAnchors;
//# sourceMappingURL=CartesianAxisFn.js.map