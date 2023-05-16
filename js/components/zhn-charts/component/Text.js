"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Text = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _Global = require("../util/Global");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["dx", "dy", "textAnchor", "verticalAnchor", "scaleToFit", "angle", "lineHeight", "className", "breakAll"];
var CL_TEXT = "recharts-text";
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = function calculateWordWidths(_ref) {
  var children = _ref.children,
    breakAll = _ref.breakAll,
    style = _ref.style;
  try {
    var words = [];
    if (!(0, _FnUtils._isNil)(children)) {
      if (breakAll) {
        words = children.toString().split('');
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map(function (word) {
        return {
          word: word,
          width: (0, _DOMUtils.getStringSize)(word, style).width
        };
      }),
      spaceWidth = breakAll ? 0 : (0, _DOMUtils.getStringSize)("\xA0", style).width;
    return {
      wordsWithComputedWidth: wordsWithComputedWidth,
      spaceWidth: spaceWidth
    };
  } catch (e) {
    return null;
  }
};
var calculateWordsByLines = function calculateWordsByLines(_ref2, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) {
  var maxLines = _ref2.maxLines,
    children = _ref2.children,
    style = _ref2.style,
    breakAll = _ref2.breakAll;
  var shouldLimitLines = (0, _DataUtils.isNumber)(maxLines),
    text = children,
    calculate = function calculate(words) {
      if (words === void 0) {
        words = [];
      }
      return words.reduce(function (result, _ref3) {
        var word = _ref3.word,
          width = _ref3.width;
        var currentLine = result[result.length - 1];
        if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width += width + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          var newLine = {
            words: [word],
            width: width
          };
          result.push(newLine);
        }
        return result;
      }, []);
    };
  var originalResult = calculate(initialWordsWithComputedWith),
    findLongestLine = function findLongestLine(words) {
      return words.reduce(function (a, b) {
        return a.width > b.width ? a : b;
      });
    };
  if (!shouldLimitLines) {
    return originalResult;
  }
  var suffix = '.',
    checkOverflow = function checkOverflow(index) {
      var tempText = text.slice(0, index),
        words = calculateWordWidths({
          breakAll: breakAll,
          style: style,
          children: tempText + suffix
        }).wordsWithComputedWidth,
        result = calculate(words),
        doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
      return [doesOverflow, result];
    };
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2),
      prev = middle - 1,
      _checkOverflow = checkOverflow(prev),
      doesPrevOverflow = _checkOverflow[0],
      result = _checkOverflow[1],
      _checkOverflow2 = checkOverflow(middle),
      doesMiddleOverflow = _checkOverflow2[0];
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
var getWordsWithoutCalculate = function getWordsWithoutCalculate(children) {
  var words = !(0, _FnUtils._isNil)(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words: words
  }];
};
var getWordsByLines = function getWordsByLines(_ref4) {
  var width = _ref4.width,
    scaleToFit = _ref4.scaleToFit,
    children = _ref4.children,
    style = _ref4.style,
    breakAll = _ref4.breakAll,
    maxLines = _ref4.maxLines;
  // Only perform calculations if using features that require them (multiline, scaleToFit)
  if ((width || scaleToFit) && !_Global.Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll: breakAll,
      children: children,
      style: style
    });
    if (wordWidths) {
      var wcw = wordWidths.wordsWithComputedWidth,
        sw = wordWidths.spaceWidth;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll: breakAll,
      children: children,
      maxLines: maxLines,
      style: style
    }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
  }
  return getWordsWithoutCalculate(children);
};
var _crStartDy = function _crStartDy(verticalAnchor) {
  var startDy;
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
var textDefaultProps = {
  x: 0,
  y: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
  scaleToFit: false,
  textAnchor: 'start',
  verticalAnchor: 'end',
  fill: '#808080'
};
var Text = function Text(props) {
  var wordsByLines = (0, _uiApi.useMemo)(function () {
      return getWordsByLines({
        breakAll: props.breakAll,
        children: props.children,
        maxLines: props.maxLines,
        scaleToFit: props.scaleToFit,
        style: props.style,
        width: props.width
      });
    }, [props.breakAll, props.children, props.maxLines, props.scaleToFit, props.style, props.width]),
    dx = props.dx,
    dy = props.dy,
    textAnchor = props.textAnchor,
    verticalAnchor = props.verticalAnchor,
    scaleToFit = props.scaleToFit,
    angle = props.angle,
    lineHeight = props.lineHeight,
    className = props.className,
    breakAll = props.breakAll,
    textProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  if (!(0, _DataUtils.isNumOrStr)(textProps.x) || !(0, _DataUtils.isNumOrStr)(textProps.y)) {
    return null;
  }
  var x = textProps.x + ((0, _DataUtils.isNumber)(dx) ? dx : 0),
    y = textProps.y + ((0, _DataUtils.isNumber)(dy) ? dy : 0),
    transforms = [];
  var startDy = _crStartDy(verticalAnchor);
  if (scaleToFit) {
    var lineWidth = wordsByLines[0].width,
      width = props.width;
    transforms.push("scale(" + ((0, _DataUtils.isNumber)(width) ? width / lineWidth : 1) / lineWidth + ")");
  }
  if (angle) {
    transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(textProps, true), {
    x: x,
    y: y,
    className: (0, _classnames["default"])(CL_TEXT, className),
    textAnchor: textAnchor,
    fill: textProps.fill.includes('url') ? textDefaultProps.fill : textProps.fill,
    children: wordsByLines.map(function (line, index) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
        x: x,
        dy: index === 0 ? startDy : lineHeight,
        children: line.words.join(breakAll ? '' : ' ')
      }, index);
    })
  }));
};
exports.Text = Text;
Text.defaultProps = textDefaultProps;
//# sourceMappingURL=Text.js.map