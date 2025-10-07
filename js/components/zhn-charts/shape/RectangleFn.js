"use strict";

exports.__esModule = true;
exports.getRectanglePath = void 0;
const _getSign = value => value >= 0 ? 1 : -1;
const _crRadiusCaseArr = (radius, maxRadius) => [0, 0, 0, 0].map((v, i) => radius[i] > maxRadius ? maxRadius : radius[i]);
const _crRadiusCaseNumber = (radius, maxRadius) => {
  const r = Math.min(maxRadius, radius);
  return [r, r, r, r];
};
const _crRadius = (radius, maxRadius) => maxRadius > 0 && radius instanceof Array ? _crRadiusCaseArr(radius, maxRadius) : maxRadius > 0 && radius === +radius && radius > 0 ? _crRadiusCaseNumber(radius, maxRadius) : '';
const _crARadiusClockWise = (radius, clockWise) => `A ${radius} ${radius} 0 0 ${clockWise}`;
const _crA0 = (radius, clockWise, x, xSign, y, ySign) => {
    const A = radius > 0 ? ` ${_crARadiusClockWise(radius, clockWise)} ${x + xSign * radius} ${y}` : '';
    return `M ${x} ${y + ySign * radius}${A}`;
  },
  _crA1 = (radius, clockWise, x, xSign, y, ySign, width) => {
    const A = radius > 0 ? ` ${_crARadiusClockWise(radius, clockWise)} ${x + width} ${y + ySign * radius}` : '';
    return `L ${x + width - xSign * radius} ${y}${A}`;
  },
  _crA2 = (radius, clockWise, x, xSign, y, ySign, width, height) => {
    const A = radius > 0 ? ` ${_crARadiusClockWise(radius, clockWise)} ${x + width - xSign * radius} ${y + height}` : '';
    return `L ${x + width} ${y + height - ySign * radius}${A}`;
  },
  _crA3 = (radius, clockWise, x, xSign, y, ySign, height) => {
    const A = radius > 0 ? ` ${_crARadiusClockWise(radius, clockWise)} ${x} ${y + height - ySign * radius}` : '';
    return `L ${x + xSign * radius} ${y + height}${A}`;
  };
const _crPath = (radius, x, width, y, height) => {
  const clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0,
    xSign = _getSign(width),
    ySign = _getSign(height);
  return `${_crA0(radius[0], clockWise, x, xSign, y, ySign)} ${_crA1(radius[1], clockWise, x, xSign, y, ySign, width)} ${_crA2(radius[2], clockWise, x, xSign, y, ySign, width, height)} ${_crA3(radius[3], clockWise, x, xSign, y, ySign, height)} Z`;
};
const getRectanglePath = (x, y, width, height, radius) => {
  const maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2),
    _radius = _crRadius(radius, maxRadius);
  return _radius ? _crPath(_radius, x, width, y, height) : `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
};
exports.getRectanglePath = getRectanglePath;
//# sourceMappingURL=RectangleFn.js.map