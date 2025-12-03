import { crProps } from '../../uiApi';
import { crCn } from '../../styleFn';

import {
  isNumber,
  isNumOrStr
} from '../util/DataUtils';

import { CL_TEXT } from '../CL';
import useWordsByLine from './useWordsByLine';

const _crStartDy = (
  verticalAnchor
) => verticalAnchor === 'start'
  ? '0.71em'
  : verticalAnchor === 'middle'
  ? '0.355em'
  : '0em';

const DF_PROPS = {
  x: 0,
  y: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
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

  if (!isNumOrStr(x) || !isNumOrStr(y)) {
    return null;
  }

  const _x = x + (isNumber(dx) ? dx : 0)
  , _y = y + (isNumber(dy) ? dy : 0)
  , startDy = _crStartDy(verticalAnchor);

  return (
    <text
      capHeight={capHeight}
      offset={offset}
      stroke={stroke}
      orientation={orientation}

      x={_x} y={_y}
      className={crCn(CL_TEXT, className)}
      textAnchor={textAnchor}
      fill={fill && fill.includes('url')
        ? DF_PROPS.fill
        : fill
      }
    >
      {wordsByLines.map((line, index) => (
         <tspan x={_x} dy={index === 0 ? startDy : lineHeight} key={index}>
           {line.words.join(breakAll ? '' : ' ')}
         </tspan>
      ))}
    </text>
  );
};
