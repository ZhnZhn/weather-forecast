import { crCn } from '../../styleFn';

import {
  isNumber,
  isNumOrStr
} from '../util/DataUtils';
import {
  crProps,
  filterProps
} from '../util/ReactUtils';

import { CL_TEXT } from '../CL';
import useWordsByLine from './useWordsByLine';

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

export const Text = (props) => {
  const _props = crProps(DF_PROPS, props)
  , wordsByLines = useWordsByLine(_props)
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
  } = _props;

  if (!isNumOrStr(textProps.x) || !isNumOrStr(textProps.y)) {
    return null;
  }
  const x = textProps.x + (isNumber(dx) ? dx : 0)
  , y = textProps.y + (isNumber(dy) ? dy : 0)
  , transforms = [];
  let startDy = _crStartDy(verticalAnchor);
  if (scaleToFit) {
    const lineWidth = wordsByLines[0].width
    , { width } = _props;
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
      className={crCn(CL_TEXT, className)}
      textAnchor={textAnchor}
      fill={textProps.fill.includes('url')
        ? DF_PROPS.fill
        : textProps.fill
      }
    >
      {wordsByLines.map((line, index) => (
         <tspan x={x} dy={index === 0 ? startDy : lineHeight} key={index}>
           {line.words.join(breakAll ? '' : ' ')}
         </tspan>
      ))}
    </text>
  );
};
