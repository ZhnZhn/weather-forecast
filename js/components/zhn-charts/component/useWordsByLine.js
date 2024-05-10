"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _Global = require("../util/Global");
var _DOMUtils = require("../util/DOMUtils");
const BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
const calculateWordWidths = _ref => {
  let {
    children,
    breakAll,
    style
  } = _ref;
  try {
    const words = (0, _FnUtils._isNil)(children) ? [] : children.toString().split(breakAll ? '' : BREAKING_SPACES),
      wordsWithComputedWidth = words.map(word => ({
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
  if ((width || scaleToFit) && !_Global.IS_SSR) {
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
const useWordsByLine = _ref5 => {
  let {
    breakAll,
    children,
    maxLines,
    scaleToFit,
    style,
    width
  } = _ref5;
  return (0, _uiApi.useMemo)(() => getWordsByLines({
    breakAll,
    children,
    maxLines,
    scaleToFit,
    style,
    width
  }), [breakAll, children, maxLines, scaleToFit, style, width]);
};
var _default = exports.default = useWordsByLine;
//# sourceMappingURL=useWordsByLine.js.map