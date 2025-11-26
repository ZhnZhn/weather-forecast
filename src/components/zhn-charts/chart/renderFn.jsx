import { isObj } from '../../../utils/isTypeFn';

import { cloneUiElement } from '../../uiApi';
import { crCn } from '../../styleFn';

import { CartesianAxis } from '../cartesian/CartesianAxis';

import { getTicksOfAxis } from '../util/ChartUtils';
import { getAnyElementOfObject } from '../util/DataUtils';

import { crAxisCl } from '../CL';

const isFinit = Number.isFinite || isFinite;
const _getSafeValues = (
  obj
) => isObj(obj)
  ? Object.values(obj)
  : [];

const renderGrid = ({
  element,
  offset,
  width,
  height,
  xAxisMap,
  yAxisMap,
}) => cloneUiElement(element, {
  offset,
  chartWidth: width,
  chartHeight: height,
  xAxis: getAnyElementOfObject(xAxisMap),
  yAxis: _getSafeValues(yAxisMap)
     .find(axis => axis.domain.every(isFinit))
     || getAnyElementOfObject(yAxisMap)
  }, element.key || 'grid'
);

const _axesTicksGenerator = (axis) => getTicksOfAxis(axis, true)

const _crCartesianAxisKey = (
  element,
  displayName,
  index
) => element.key || `${displayName}-${index}`
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (
  axisOptions,
  width,
  height,
  key
) => {
  const {
    axisType,
    className
  } = axisOptions || {};
  return (
    <CartesianAxis
       key={key}
       {...axisOptions}
       className={crCn(crAxisCl(axisType), className)}
       viewBox={{ x: 0, y: 0, width, height }}
       ticksGenerator={_axesTicksGenerator}
    />
  );
}

const renderXAxis = ({
  width,
  height,
  xAxisMap,
  element,
  displayName,
  index
}) => _renderAxis(
  xAxisMap[element.props.xAxisId],
  width,
  height,
  _crCartesianAxisKey(element, displayName, index)
);

const renderYAxis = ({
  width,
  height,
  yAxisMap,
  element,
  displayName,
  index
}) => _renderAxis(
  yAxisMap[element.props.yAxisId],
  width,
  height,
  _crCartesianAxisKey(element, displayName, index)
);

const renderGraphicChild = ({
  formattedGraphicalItems,
  index
}) => {
  const item = formattedGraphicalItems
    .find(item => item.childIndex === index)
  if (!item) {
    return null;
  }

  const { key, ...itemProps } = item.props
  return cloneUiElement(
    item.item, {...itemProps}, key
  );
};

export const renderMap = {
  CartesianGrid: { handler: renderGrid, once: true },
  XAxis: { handler: renderXAxis },
  YAxis: { handler: renderYAxis },
  Bar: { handler: renderGraphicChild },
  Line: { handler: renderGraphicChild },
  Area: { handler: renderGraphicChild }
}
