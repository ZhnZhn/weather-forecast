import { useMemo } from '../../uiApi';
import classNames from 'classnames';

import { _isNil } from '../util/FnUtils';

import { isNumber, isNumOrStr } from '../util/DataUtils';
import { Global } from '../util/Global';
import { filterProps } from '../util/ReactUtils';
import { getStringSize } from '../util/DOMUtils';

const CL_TEXT = "recharts-text"
const BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
const calculateWordWidths = ({
  children,
  breakAll,
  style
}) => {
  try {
    let words = [];
    if (!_isNil(children)) {
      if (breakAll) {
        words = children.toString().split('');
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    const wordsWithComputedWidth = words.map(word => ({ word, width: getStringSize(word, style).width }))
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
  let start = 0;
  let end = text.length - 1;
  let iterations = 0;
  let trimmedResult;
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
  if ((width || scaleToFit) && !Global.isSsr) {
    let wordsWithComputedWidth, spaceWidth;
    const wordWidths = calculateWordWidths({ breakAll, children, style });
    if (wordWidths) {
      const { wordsWithComputedWidth: wcw, spaceWidth: sw } = wordWidths;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({ breakAll, children, maxLines, style }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
  }
  return getWordsWithoutCalculate(children);
};


const _crStartDy = (
  verticalAnchor
) => {
let startDy;
switch (verticalAnchor) {
  case 'start':
    startDy = '0.71em'
    //startDy = reduceCSSCalc(`calc(${capHeight})`);
    break;
  case 'middle':
    startDy = '0.355em'
    //startDy = reduceCSSCalc(`calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`);
    break;
  default:
    startDy = '0em'
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

export const Text = (props) => {
  const wordsByLines = useMemo(() => {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit: props.scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [
    props.breakAll,
    props.children,
    props.maxLines,
    props.scaleToFit,
    props.style,
    props.width
  ])
  , {
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

  if (!isNumOrStr(textProps.x) || !isNumOrStr(textProps.y)) {
    return null;
  }
  const x = textProps.x + (isNumber(dx) ? dx : 0)
  , y = textProps.y + (isNumber(dy) ? dy : 0)
  , transforms = [];
  let startDy = _crStartDy(verticalAnchor);
  if (scaleToFit) {
    const lineWidth = wordsByLines[0].width
    , { width } = props;
    transforms.push(`scale(${(isNumber(width) ? width / lineWidth : 1) / lineWidth})`);
  }
  if (angle) {
    transforms.push(`rotate(${angle}, ${x}, ${y})`);
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return (
    <text
      {...filterProps(textProps, true)}
      x={x} y={y}
      className={classNames(CL_TEXT, className)}
      textAnchor={textAnchor}
      fill={textProps.fill.includes('url') ? textDefaultProps.fill : textProps.fill}
    >
      {wordsByLines.map((line, index) => (
         <tspan x={x} dy={index === 0 ? startDy : lineHeight} key={index}>
           {line.words.join(breakAll ? '' : ' ')}
         </tspan>
      ))}
    </text>
  );
};

Text.defaultProps = textDefaultProps;
