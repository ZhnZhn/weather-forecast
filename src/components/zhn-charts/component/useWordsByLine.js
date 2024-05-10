import { useMemo } from '../../uiApi';

import { _isNil } from '../util/FnUtils';
import { isNumber } from '../util/DataUtils';
import { IS_SSR } from '../util/Global';
import { getStringSize } from '../util/DOMUtils';

const BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
const calculateWordWidths = ({
  children,
  breakAll,
  style
}) => {
  try {
    const words = _isNil(children) ? [] : children
      .toString()
      .split(breakAll ? '' : BREAKING_SPACES)
    , wordsWithComputedWidth = words
      .map(word => ({
        word,
        width: getStringSize(word, style).width
      }))
    , spaceWidth = breakAll
       ? 0
       : getStringSize('\u00A0', style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  }
  catch (e) {
    return null;
  }
};

const calculateWordsByLines = ({
  maxLines,
  children,
  style,
  breakAll },
  initialWordsWithComputedWith,
  spaceWidth,
  lineWidth,
  scaleToFit
) => {
  const shouldLimitLines = isNumber(maxLines)
  , text = children
  , calculate = (words = []) => words.reduce((result, { word, width }) => {
     const currentLine = result[result.length - 1];
     if (currentLine
       && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))
     ) {
       // Word can be added to an existing line
       currentLine.words.push(word);
       currentLine.width += width + spaceWidth;
     } else {
       // Add first word to line or word is too long to scaleToFit on existing line
       const newLine = { words: [word], width };
       result.push(newLine);
     }
     return result;
  }, []);
  const originalResult = calculate(initialWordsWithComputedWith)
  , findLongestLine = (
    words
  ) => words.reduce((a, b) => (a.width > b.width ? a : b));
  if (!shouldLimitLines) {
    return originalResult;
  }
  const suffix = '.'
  , checkOverflow = (index) => {
      const tempText = text.slice(0, index)
      , words = calculateWordWidths({
         breakAll,
         style,
         children: tempText + suffix,
      }).wordsWithComputedWidth
      , result = calculate(words)
      , doesOverflow = result.length > maxLines
        || findLongestLine(result).width > Number(lineWidth);
      return [doesOverflow, result];
  };
  let start = 0
  , end = text.length - 1
  , iterations = 0
  , trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    const middle = Math.floor((start + end) / 2)
    , prev = middle - 1
    , [doesPrevOverflow, result] = checkOverflow(prev)
    , [doesMiddleOverflow] = checkOverflow(middle);
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

const getWordsWithoutCalculate = (children) => {
  const words = !_isNil(children)
    ? children.toString().split(BREAKING_SPACES)
    : [];
  return [{ words }];
};

const getWordsByLines = ({
  width,
  scaleToFit,
  children,
  style,
  breakAll,
  maxLines
}) => {
  // Only perform calculations if using features that require them (multiline, scaleToFit)
  if ((width || scaleToFit) && !IS_SSR) {
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
    }, wordsWithComputedWidth,
       spaceWidth,
       width,
       scaleToFit
    );
  }
  return getWordsWithoutCalculate(children);
};

const useWordsByLine = ({
  breakAll,
  children,
  maxLines,
  scaleToFit,
  style,
  width
}) => useMemo(() => getWordsByLines({
    breakAll,
    children,
    maxLines,
    scaleToFit,
    style,
    width
  }), [
  breakAll,
  children,
  maxLines,
  scaleToFit,
  style,
  width
]);

export default useWordsByLine
