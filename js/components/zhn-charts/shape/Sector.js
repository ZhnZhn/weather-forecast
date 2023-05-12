"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Sector = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _ReactUtils = require("../util/ReactUtils");
var _PolarUtils = require("../util/PolarUtils");
var _DataUtils = require("../util/DataUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_SECTOR = 'recharts-sector';
var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle),
    deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign * deltaAngle;
};
var getTangentCircle = function getTangentCircle(_ref) {
  var cx = _ref.cx,
    cy = _ref.cy,
    radius = _ref.radius,
    angle = _ref.angle,
    sign = _ref.sign,
    isExternal = _ref.isExternal,
    cornerRadius = _ref.cornerRadius,
    cornerIsExternal = _ref.cornerIsExternal;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius,
    theta = Math.asin(cornerRadius / centerRadius) / _PolarUtils.RADIAN,
    centerAngle = cornerIsExternal ? angle : angle + sign * theta,
    center = (0, _PolarUtils.polarToCartesian)(cx, cy, centerRadius, centerAngle)
    // The coordinate of point which is tangent to the circle
    ,
    circleTangency = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, centerAngle)
    // The coordinate of point which is tangent to the radius line
    ,
    lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle,
    lineTangency = (0, _PolarUtils.polarToCartesian)(cx, cy, centerRadius * Math.cos(theta * _PolarUtils.RADIAN), lineTangencyAngle);
  return {
    center: center,
    circleTangency: circleTangency,
    lineTangency: lineTangency,
    theta: theta
  };
};
var getSectorPath = function getSectorPath(_ref2) {
  var cx = _ref2.cx,
    cy = _ref2.cy,
    innerRadius = _ref2.innerRadius,
    outerRadius = _ref2.outerRadius,
    startAngle = _ref2.startAngle,
    endAngle = _ref2.endAngle;
  var angle = getDeltaAngle(startAngle, endAngle)
    // When the angle of sector equals to 360, star point and end point coincide
    ,
    tempEndAngle = startAngle + angle,
    outerStartPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, startAngle),
    outerEndPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, tempEndAngle);
  var path = "M " + outerStartPoint.x + "," + outerStartPoint.y + "\n      A " + outerRadius + "," + outerRadius + ",0,\n      " + +(Math.abs(angle) > 180) + "," + +(startAngle > tempEndAngle) + ",\n      " + outerEndPoint.x + "," + outerEndPoint.y;
  if (innerRadius > 0) {
    var innerStartPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, startAngle),
      innerEndPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, tempEndAngle);
    path += "L " + innerEndPoint.x + "," + innerEndPoint.y + "\n        A " + innerRadius + "," + innerRadius + ",0,\n        " + +(Math.abs(angle) > 180) + "," + +(startAngle <= tempEndAngle) + ",\n        " + innerStartPoint.x + "," + innerStartPoint.y + " Z";
  } else {
    path += "L " + cx + "," + cy + " Z";
  }
  return path;
};
var getSectorWithCorner = function getSectorWithCorner(_ref3) {
  var cx = _ref3.cx,
    cy = _ref3.cy,
    innerRadius = _ref3.innerRadius,
    outerRadius = _ref3.outerRadius,
    cornerRadius = _ref3.cornerRadius,
    forceCornerRadius = _ref3.forceCornerRadius,
    cornerIsExternal = _ref3.cornerIsExternal,
    startAngle = _ref3.startAngle,
    endAngle = _ref3.endAngle;
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle),
    _getTangentCircle = getTangentCircle({
      cx: cx,
      cy: cy,
      radius: outerRadius,
      angle: startAngle,
      sign: sign,
      cornerRadius: cornerRadius,
      cornerIsExternal: cornerIsExternal
    }),
    soct = _getTangentCircle.circleTangency,
    solt = _getTangentCircle.lineTangency,
    sot = _getTangentCircle.theta;
  var _getTangentCircle2 = getTangentCircle({
      cx: cx,
      cy: cy,
      radius: outerRadius,
      angle: endAngle,
      sign: -sign,
      cornerRadius: cornerRadius,
      cornerIsExternal: cornerIsExternal
    }),
    eoct = _getTangentCircle2.circleTangency,
    eolt = _getTangentCircle2.lineTangency,
    eot = _getTangentCircle2.theta;
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return "M " + solt.x + "," + solt.y + "\n       a" + cornerRadius + "," + cornerRadius + ",0,0,1," + cornerRadius * 2 + ",0\n       a" + cornerRadius + "," + cornerRadius + ",0,0,1," + -cornerRadius * 2 + ",0";
    }
    return getSectorPath({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    });
  }
  var path = "M " + solt.x + "," + solt.y + "\n    A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + soct.x + "," + soct.y + "\n    A" + outerRadius + "," + outerRadius + ",0," + +(outerArcAngle > 180) + "," + +(sign < 0) + "," + eoct.x + "," + eoct.y + "\n    A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + eolt.x + "," + eolt.y;
  if (innerRadius > 0) {
    var _getTangentCircle3 = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: innerRadius,
        angle: startAngle,
        sign: sign,
        isExternal: true,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal
      }),
      sict = _getTangentCircle3.circleTangency,
      silt = _getTangentCircle3.lineTangency,
      sit = _getTangentCircle3.theta;
    var _getTangentCircle4 = getTangentCircle({
        cx: cx,
        cy: cy,
        radius: innerRadius,
        angle: endAngle,
        sign: -sign,
        isExternal: true,
        cornerRadius: cornerRadius,
        cornerIsExternal: cornerIsExternal
      }),
      eict = _getTangentCircle4.circleTangency,
      eilt = _getTangentCircle4.lineTangency,
      eit = _getTangentCircle4.theta;
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return path + "L" + cx + "," + cy + "Z";
    }
    path += "L" + eilt.x + "," + eilt.y + "\n     A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + eict.x + "," + eict.y + "\n     A" + innerRadius + "," + innerRadius + ",0," + +(innerArcAngle > 180) + "," + +(sign > 0) + "," + sict.x + "," + sict.y + "\n     A" + cornerRadius + "," + cornerRadius + ",0,0," + +(sign < 0) + "," + silt.x + "," + silt.y + "Z";
  } else {
    path += "L" + cx + "," + cy + "Z";
  }
  return path;
};
var Sector = (0, _uiApi.memo)(function (props) {
  var cx = props.cx,
    cy = props.cy,
    innerRadius = props.innerRadius,
    outerRadius = props.outerRadius,
    cornerRadius = props.cornerRadius,
    forceCornerRadius = props.forceCornerRadius,
    cornerIsExternal = props.cornerIsExternal,
    startAngle = props.startAngle,
    endAngle = props.endAngle,
    className = props.className;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = (0, _classnames["default"])(CL_SECTOR, className),
    deltaRadius = outerRadius - innerRadius,
    cr = (0, _DataUtils.getPercentValue)(cornerRadius, deltaRadius, 0, true),
    path = cr > 0 && Math.abs(startAngle - endAngle) < 360 ? getSectorWithCorner({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius: forceCornerRadius,
      cornerIsExternal: cornerIsExternal,
      startAngle: startAngle,
      endAngle: endAngle
    }) : getSectorPath({
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props, true), {
    className: layerClass,
    d: path,
    role: "img"
  }));
});
exports.Sector = Sector;
Sector.defaultProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
//# sourceMappingURL=Sector.js.map