import {
  isValidElement,
  cloneUiElement
} from '../../uiApi';

import { crCn } from '../../styleFn';

import { isLayoutHorizontal } from '../util/ChartUtils';
import { adaptEventsOfChild } from '../util/types';
import { Surface } from '../container/Surface';

import {
  CL_LEGEND_ICON,
  CL_LEGEND_ITEM,
  CL_LEGEND_ITEM_TEXT
} from '../CL';

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
    return cloneUiElement(data.legendIcon, iconProps);
  }
  return null;
}

const S_SURFACE_SVG = {
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: 4
};

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
     display: isLayoutHorizontal(layout)
       ? 'inline-block'
       : 'block',
     marginRight: 10
  };  
  return payload.map((entry, i) => {
    const finalFormatter = entry.formatter || formatter

    return entry.type === 'none' ? null : (
      <li
        key={`legend-item-${i}`}
        className={crCn(
          `${CL_LEGEND_ITEM} legend-item-${i}`,
          entry.inactive && 'inactive'
        )}
        style={itemStyle}
        {...adaptEventsOfChild(props, entry, i)}
      >
        <Surface
           width={iconSize}
           height={iconSize}
           viewBox={viewBox}
           style={S_SURFACE_SVG}
        >
          {_renderIcon(entry)}
        </Surface>
        <span
          className={CL_LEGEND_ITEM_TEXT}
          style={{ color: entry.inactive
            ? inactiveColor
            : entry.color }}
        >
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
