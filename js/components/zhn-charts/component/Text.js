"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Text = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _Global = require("../util/Global");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
const calculateWordWidths = _ref => {
  let {
    children,
    breakAll,
    style
  } = _ref;
  try {
    let words = [];
    if (!(0, _FnUtils._isNil)(children)) {
      if (breakAll) {
        words = children.toString().split('');
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    const wordsWithComputedWidth = words.map(word => ({
        word,
        width: (0, _DOMUtils.getStringSize)(word, style).width
      })),
      spaceWidth = breakAll ? 0 : (0, _DOMUtils.getStringSize)('\u00A0', style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  } catch (e) {
    return null;
  }
};
const calculateWordsByLines = (_ref2, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
  let {
    maxLines,
    children,
    style,
    breakAll
  } = _ref2;
  const shouldLimitLines = (0, _DataUtils.isNumber)(maxLines),
    text = children,
    calculate = function (words) {
      if (words === void 0) {
        words = [];
      }
      return words.reduce((result, _ref3) => {
        let {
          word,
          width
        } = _ref3;
        const currentLine = result[result.length - 1];
        if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width += width + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          const newLine = {
            words: [word],
            width
          };
          result.push(newLine);
        }
        return result;
      }, []);
    };
  const originalResult = calculate(initialWordsWithComputedWith),
    findLongestLine = words => words.reduce((a, b) => a.width > b.width ? a : b);
  if (!shouldLimitLines) {
    return originalResult;
  }
  const suffix = '.',
    checkOverflow = index => {
      const tempText = text.slice(0, index),
        words = calculateWordWidths({
          breakAll,
          style,
          children: tempText + suffix
        }).wordsWithComputedWidth,
        result = calculate(words),
        doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
      return [doesOverflow, result];
    };
  let start = 0,
    end = text.length - 1,
    iterations = 0,
    trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    const middle = Math.floor((start + end) / 2),
      prev = middle - 1,
      [doesPrevOverflow, result] = checkOverflow(prev),
      [doesMiddleOverflow] = checkOverflow(middle);
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }
  // Fallback to originalResult (result without trimming) if we cannot find the
  // where to trim.  This should not happen :tm:
  return trimmedResult || originalResult;
};
const getWordsWithoutCalculate = children => {
  const words = !(0, _FnUtils._isNil)(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words
  }];
};
const getWordsByLines = _ref4 => {
  let {
    width,
    scaleToFit,
    children,
    style,
    breakAll,
    maxLines
  } = _ref4;
  // Only perform calculations if using features that require them (multiline, scaleToFit)
  if ((width || scaleToFit) && !_Global.Global.isSsr) {
    let wordsWithComputedWidth, spaceWidth;
    const wordWidths = calculateWordWidths({
      breakAll,
      children,
      style
    });
    if (wordWidths) {
      const {
        wordsWithComputedWidth: wcw,
        spaceWidth: sw
      } = wordWidths;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll,
      children,
      maxLines,
      style
    }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
  }
  return getWordsWithoutCalculate(children);
};
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
const textDefaultProps = {
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
  const wordsByLines = (0, _uiApi.useMemo)(() => {
      return getWordsByLines({
        breakAll: props.breakAll,
        children: props.children,
        maxLines: props.maxLines,
        scaleToFit: props.scaleToFit,
        style: props.style,
        width: props.width
      });
    }, [props.breakAll, props.children, props.maxLines, props.scaleToFit, props.style, props.width]),
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
    } = props;
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
      } = props;
    transforms.push("scale(" + ((0, _DataUtils.isNumber)(width) ? width / lineWidth : 1) / lineWidth + ")");
  }
  if (angle) {
    transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
    ...(0, _ReactUtils.filterProps)(textProps, true),
    x: x,
    y: y,
    className: (0, _crCn.default)(_CL.CL_TEXT, className),
    textAnchor: textAnchor,
    fill: textProps.fill.includes('url') ? textDefaultProps.fill : textProps.fill,
    children: wordsByLines.map((line, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      x: x,
      dy: index === 0 ? startDy : lineHeight,
      children: line.words.join(breakAll ? '' : ' ')
    }, index))
  });
};
exports.Text = Text;
Text.defaultProps = textDefaultProps;
//# sourceMappingURL=Text.js.map