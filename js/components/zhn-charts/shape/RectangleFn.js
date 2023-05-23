"use strict";

exports.__esModule = true;
exports.isInRectangle = exports.getRectanglePath = void 0;
var isInRectangle = function isInRectangle(point, rect) {
  if (!point || !rect) {
    return false;
  }
  var px = point.x,
    py = point.y,
    x = rect.x,
    y = rect.y,
    width = rect.width,
    height = rect.height;
  return Math.abs(width) > 0 && Math.abs(height) > 0 ? px >= Math.min(x, x + width) && px <= Math.max(x, x + width) && py >= Math.min(y, y + height) && py <= Math.max(y, y + height) : false;
};
exports.isInRectangle = isInRectangle;
var getRectanglePath = function getRectanglePath(x, y, width, height, radius) {
  var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2),
    ySign = height >= 0 ? 1 : -1,
    xSign = width >= 0 ? 1 : -1,
    clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && radius instanceof Array) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }
    path = "M" + x + "," + (y + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += "A " + newRadius[0] + "," + newRadius[0] + ",0,0," + clockWise + "," + (x + xSign * newRadius[0]) + "," + y;
    }
    path += "L " + (x + width - xSign * newRadius[1]) + "," + y;
    if (newRadius[1] > 0) {
      path += "A " + newRadius[1] + "," + newRadius[1] + ",0,0," + clockWise + ",\n    " + (x + width) + "," + (y + ySign * newRadius[1]);
    }
    path += "L " + (x + width) + "," + (y + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += "A " + newRadius[2] + "," + newRadius[2] + ",0,0," + clockWise + ",\n    " + (x + width - xSign * newRadius[2]) + "," + (y + height);
    }
    path += "L " + (x + xSign * newRadius[3]) + "," + (y + height);
    if (newRadius[3] > 0) {
      path += "A " + newRadius[3] + "," + newRadius[3] + ",0,0," + clockWise + ",\n    " + x + "," + (y + height - ySign * newRadius[3]);
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = "M " + x + "," + (y + ySign * _newRadius) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + xSign * _newRadius) + "," + y + "\n        L " + (x + width - xSign * _newRadius) + "," + y + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + width) + "," + (y + ySign * _newRadius) + "\n        L " + (x + width) + "," + (y + height - ySign * _newRadius) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + width - xSign * _newRadius) + "," + (y + height) + "\n        L " + (x + xSign * _newRadius) + "," + (y + height) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + x + "," + (y + height - ySign * _newRadius) + " Z";
  } else {
    path = "M " + x + "," + y + " h " + width + " v " + height + " h " + -width + " Z";
  }
  return path;
};
exports.getRectanglePath = getRectanglePath;
//# sourceMappingURL=RectangleFn.js.map