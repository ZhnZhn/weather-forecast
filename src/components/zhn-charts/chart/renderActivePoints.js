import {
  isFn
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement
} from '../../uiApi';

import {
  getMainColorOfGraphicItem,
} from '../util/ChartUtils';

/*
import { adaptEventHandlers } from '../util/types';
*/

import { Dot } from '../shape/Dot';
import { Layer } from '../container/Layer';

const renderActiveDot = (
  option,
  {key, ...restProps}
) => {
  const dot = isValidElement(option)
    ? cloneUiElement(option, restProps)
    : isFn(option)
        ? option(restProps)
        : <Dot {...restProps}/>;

  return (
    <Layer
        className="recharts-active-dot"
        key={key}
    >
      {dot}
    </Layer>
  );
};

export const renderActivePoints = ({
  item,
  activePoint,
  basePoint,
  childIndex,
  isRange
}) => {
  const result = []
  , {
    key
  } = item.props
  , {
    activeDot,
    dataKey
  } = item.item.props
  , dotProps = {
      index: childIndex,
      dataKey,
      cx: activePoint.x,
      cy: activePoint.y,

      r: activeDot.r || 4,
      fill: activeDot.fill || getMainColorOfGraphicItem(item.item),
      stroke: activeDot.stroke || '#fff',
      strokeWidth: activeDot.strokeWidth || 2,
      strokeDasharray: activeDot.strokeDasharray,

      payload: activePoint.payload,
      value: activePoint.value,
      key: `${key}-activePoint-${childIndex}`,
      //...adaptEventHandlers(activeDot),
  };
  result.push(renderActiveDot(activeDot, dotProps));

  if (basePoint) {
    result.push(renderActiveDot(activeDot, {
      ...dotProps,
      cx: basePoint.x,
      cy: basePoint.y,
      key: `${key}-basePoint-${childIndex}`,
    }));
  } else if (isRange) {
    result.push(null);
  }

  return result;
}
