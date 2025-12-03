"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Text = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _DataUtils = require("../util/DataUtils");
var _CL = require("../CL");
var _useWordsByLine = _interopRequireDefault(require("./useWordsByLine"));
var _jsxRuntime = require("react/jsx-runtime");
const _crStartDy = verticalAnchor => verticalAnchor === 'start' ? '0.71em' : verticalAnchor === 'middle' ? '0.355em' : '0em';
const DF_PROPS = {
  x: 0,
  y: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
  textAnchor: 'start',
  verticalAnchor: 'end',
  fill: '#808080'
};
const Text = props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    wordsByLines = (0, _useWordsByLine.default)(_props),
    {
      dx,
      dy,
      textAnchor,
      verticalAnchor,
      lineHeight,
      className,
      breakAll,
      fill,
      x,
      y,
      capHeight,
      offset,
      stroke,
      orientation
    } = _props;
  if (!(0, _DataUtils.isNumOrStr)(x) || !(0, _DataUtils.isNumOrStr)(y)) {
    return null;
  }
  const _x = x + ((0, _DataUtils.isNumber)(dx) ? dx : 0),
    _y = y + ((0, _DataUtils.isNumber)(dy) ? dy : 0),
    startDy = _crStartDy(verticalAnchor);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    capHeight: capHeight,
    offset: offset,
    stroke: stroke,
    orientation: orientation,
    x: _x,
    y: _y,
    className: (0, _styleFn.crCn)(_CL.CL_TEXT, className),
    textAnchor: textAnchor,
    fill: fill && fill.includes('url') ? DF_PROPS.fill : fill,
    children: wordsByLines.map((line, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      x: _x,
      dy: index === 0 ? startDy : lineHeight,
      children: line.words.join(breakAll ? '' : ' ')
    }, index))
  });
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map