import {
  isValidElement,
  cloneElement
} from '../../uiApi';

import classNames from 'classnames';

import { Surface } from '../container/Surface';
import { Symbols } from '../shape/Symbols';

import { adaptEventsOfChild } from '../util/types';

export const CL_DF_LEGEND = "recharts-default-legend"

const CL_LEGEND_ICON = "recharts-legend-icon"
, CL_LEGEND_ITEM = "recharts-legend-item"
, CL_LEGEND_ITEM_TEXT = `${CL_LEGEND_ITEM}-text`
const SIZE = 32;

const _renderIcon = (
  data,
  props
) => {
  const { inactiveColor } = props
  , halfSize = SIZE / 2
  , sixthSize = SIZE / 6
  , thirdSize = SIZE / 3
  , color = data.inactive
     ? inactiveColor
     : data.color;
  if (data.type === 'plainline') {
    return (
      <line
        strokeWidth={4}
        fill="none"
        stroke={color}
        strokeDasharray={data.payload.strokeDasharray}
        x1={0}
        y1={halfSize}
        x2={SIZE}
        y2={halfSize}
        className={CL_LEGEND_ICON}
      />
    );
  }
  if (data.type === 'line') {
    return (
      <path
        strokeWidth={4}
        fill="none"
        stroke={color}
        d={`M0,${halfSize}h${thirdSize}
        A${sixthSize},${sixthSize},0,1,1,${2 * thirdSize},${halfSize}
        H${SIZE}M${2 * thirdSize},${halfSize}
        A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
        className={CL_LEGEND_ICON}
      />
    );
  }
  if (data.type === 'rect') {
    return (
      <path
        stroke="none"
        fill={color}
        d={`M0,${SIZE / 8}h${SIZE}v${(SIZE * 3) / 4}h${-SIZE}z`}
        className={CL_LEGEND_ICON}
      />
    );
  }
  if (isValidElement(data.legendIcon)) {
    const iconProps = { ...data };
    delete iconProps.legendIcon;
    return cloneElement(data.legendIcon, iconProps);
  }
  return (
    <Symbols
      fill={color}
      cx={halfSize}
      cy={halfSize}
      size={SIZE}
      sizeType="diameter"
      type={data.type}
    />
  );
}

export const renderItems = (
  props
) => {
  const {
    payload,
    iconSize,
    layout,
    formatter,
    inactiveColor
  } = props
  , viewBox = {
     x: 0,
     y: 0,
     width: SIZE,
     height: SIZE
  }
  , itemStyle = {
     display: layout === 'horizontal'
       ? 'inline-block'
       : 'block',
     marginRight: 10
  }
  , svgStyle = {
     display: 'inline-block',
     verticalAlign: 'middle',
     marginRight: 4
  };
  return payload.map((entry, i) => {
    const finalFormatter = entry.formatter || formatter
    , className = classNames({
      [CL_LEGEND_ITEM]: true,
      [`legend-item-${i}`]: true,
      inactive: entry.inactive,
    });
    if (entry.type === 'none') {
      return null;
    }
    const color = entry.inactive
      ? inactiveColor
      : entry.color;
    return (
      <li
        className={className}
        style={itemStyle}
        key={`legend-item-${i}`}
        {...adaptEventsOfChild(props, entry, i)}
      >
        <Surface width={iconSize} height={iconSize} viewBox={viewBox} style={svgStyle}>
          {_renderIcon(entry)}
        </Surface>
        <span className={CL_LEGEND_ITEM_TEXT} style={{ color }}>
        {
          finalFormatter
           ? finalFormatter(entry.value, entry, i)
           : entry.value
        }
        </span>
      </li>
    );
  });
}
