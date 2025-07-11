"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Text = void 0;
var _styleFn = require("../../styleFn");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _useWordsByLine = _interopRequireDefault(require("./useWordsByLine"));
var _jsxRuntime = require("react/jsx-runtime");
const _crStartDy = verticalAnchor => {
  let startDy;
  switch (verticalAnchor) {
    case 'start':
      startDy = '0.71em';
      //startDy = reduceCSSCalc(`calc(${capHeight})`);
      break;
    case 'middle':
      startDy = '0.355em';
      //startDy = reduceCSSCalc(`calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`);
      break;
    default:
      startDy = '0em';
      //startDy = reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
      break;
  }
  return startDy;
};
const DF_PROPS = {
  x: 0,
  y: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
  scaleToFit: false,
  textAnchor: 'start',
  verticalAnchor: 'end',
  fill: '#808080'
};
const Text = props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    wordsByLines = (0, _useWordsByLine.default)(_props),
    {
      dx,
      dy,
      textAnchor,
      verticalAnchor,
      scaleToFit,
      angle,
      lineHeight,
      //capHeight,
      className,
      breakAll,
      ...textProps
    } = _props;
  if (!(0, _DataUtils.isNumOrStr)(textProps.x) || !(0, _DataUtils.isNumOrStr)(textProps.y)) {
    return null;
  }
  const x = textProps.x + ((0, _DataUtils.isNumber)(dx) ? dx : 0),
    y = textProps.y + ((0, _DataUtils.isNumber)(dy) ? dy : 0),
    transforms = [];
  let startDy = _crStartDy(verticalAnchor);
  if (scaleToFit) {
    const lineWidth = wordsByLines[0].width,
      {
        width
      } = _props;
    transforms.push(`scale(${((0, _DataUtils.isNumber)(width) ? width / lineWidth : 1) / lineWidth})`);
  }
  if (angle) {
    transforms.push(`rotate(${angle}, ${x}, ${y})`);
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    ...(0, _ReactUtils.filterProps)(textProps, true),
    x: x,
    y: y,
    className: (0, _styleFn.crCn)(_CL.CL_TEXT, className),
    textAnchor: textAnchor,
    fill: textProps.fill.includes('url') ? DF_PROPS.fill : textProps.fill,
    children: wordsByLines.map((line, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      x: x,
      dy: index === 0 ? startDy : lineHeight,
      children: line.words.join(breakAll ? '' : ' ')
    }, index))
  });
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map