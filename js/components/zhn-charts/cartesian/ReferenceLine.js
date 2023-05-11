"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ReferenceLine = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _some2 = _interopRequireDefault(require("lodash/some"));
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _DataUtils = require("../util/DataUtils");
var _CartesianUtils = require("../util/CartesianUtils");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_REFERENCE_LINE = 'recharts-reference-line',
  CL_REFERENCE_LINE_LINE = CL_REFERENCE_LINE + "-line",
  DISCARD = 'discard',
  ORIENTATION_LEFT = 'left',
  ORIENTATION_TOP = 'top';
var renderLine = function renderLine(option, props) {
  return (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({}, props, {
    className: CL_REFERENCE_LINE_LINE
  }));
};
var getEndPoints = function getEndPoints(scales, isFixedX, isFixedY, isSegment, props) {
  var _props$viewBox = props.viewBox,
    x = _props$viewBox.x,
    y = _props$viewBox.y,
    width = _props$viewBox.width,
    height = _props$viewBox.height,
    position = props.position;
  if (isFixedY) {
    var yCoord = props.y,
      orientation = props.yAxis.orientation,
      coord = scales.y.apply(yCoord, {
        position: position
      });
    if ((0, _IfOverflowMatches.ifOverflowMatches)(props, DISCARD) && !scales.y.isInRange(coord)) {
      return null;
    }
    var points = [{
      x: x + width,
      y: coord
    }, {
      x: x,
      y: coord
    }];
    return orientation === ORIENTATION_LEFT ? points.reverse() : points;
  }
  if (isFixedX) {
    var xCoord = props.x,
      _orientation = props.xAxis.orientation,
      _coord = scales.x.apply(xCoord, {
        position: position
      });
    if ((0, _IfOverflowMatches.ifOverflowMatches)(props, DISCARD) && !scales.x.isInRange(_coord)) {
      return null;
    }
    var _points = [{
      x: _coord,
      y: y + height
    }, {
      x: _coord,
      y: y
    }];
    return _orientation === ORIENTATION_TOP ? _points.reverse() : _points;
  }
  if (isSegment) {
    var segment = props.segment,
      _points2 = segment.map(function (p) {
        return scales.apply(p, {
          position: position
        });
      });
    return (0, _IfOverflowMatches.ifOverflowMatches)(props, DISCARD) && (0, _some2["default"])(_points2, function (p) {
      return !scales.isInRange(p);
    }) ? null : _points2;
  }
  return null;
};
var ReferenceLine = function ReferenceLine(props) {
  var fixedX = props.x,
    fixedY = props.y,
    segment = props.segment,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    shape = props.shape,
    className = props.className,
    clipPathId = props.clipPathId,
    scales = (0, _CartesianUtils.createLabeledScales)({
      x: xAxis.scale,
      y: yAxis.scale
    }),
    isX = (0, _DataUtils.isNumOrStr)(fixedX),
    isY = (0, _DataUtils.isNumOrStr)(fixedY),
    isSegment = segment && segment.length === 2,
    endPoints = getEndPoints(scales, isX, isY, isSegment, props);
  if (!endPoints) {
    return null;
  }
  var _endPoints$ = endPoints[0],
    x1 = _endPoints$.x,
    y1 = _endPoints$.y,
    _endPoints$2 = endPoints[1],
    x2 = _endPoints$2.x,
    y2 = _endPoints$2.y,
    clipPath = (0, _IfOverflowMatches.ifOverflowMatches)(props, 'hidden') ? "url(#" + clipPathId + ")" : void 0,
    lineProps = (0, _extends2["default"])({
      clipPath: clipPath
    }, (0, _ReactUtils.filterProps)(props, true), {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: (0, _classnames["default"])(CL_REFERENCE_LINE, className),
    children: [renderLine(shape, lineProps), _Label.Label.renderCallByParent(props, (0, _CartesianUtils.rectWithCoords)({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }))]
  });
};
exports.ReferenceLine = ReferenceLine;
ReferenceLine.displayName = 'ReferenceLine';
ReferenceLine.defaultProps = {
  isFront: false,
  ifOverflow: DISCARD,
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle'
};
//# sourceMappingURL=ReferenceLine.js.map