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

import {
  filterProps
} from '../util/ReactUtils';

import {
  adaptEventHandlers
} from '../util/types';

import { Dot } from '../shape/Dot';
import { Layer } from '../container/Layer';

const renderActiveDot = (
  option,
  props
) => {
  const dot = isValidElement(option)
    ? cloneUiElement(option, props)
    : isFn(option)
        ? option(props)
        : <Dot {...props}/>;

  return (
    <Layer
        className="recharts-active-dot"
        key={props.key}
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
      r: 4,
      fill: getMainColorOfGraphicItem(item.item),
      strokeWidth: 2,
      stroke: '#fff',
      payload: activePoint.payload,
      value: activePoint.value,
      key: `${key}-activePoint-${childIndex}`,
      ...filterProps(activeDot),
      ...adaptEventHandlers(activeDot),
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
