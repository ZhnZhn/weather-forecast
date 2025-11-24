import { isObj } from '../../../utils/isTypeFn';

import { cloneUiElement } from '../../uiApi';
import { crCn } from '../../styleFn';

import { CartesianAxis } from '../cartesian/CartesianAxis';

import { getTicksOfAxis } from '../util/ChartUtils';
import {
  isNumber,
  getAnyElementOfObject,
} from '../util/DataUtils';

import { crAxisCl } from '../CL';

import {
  verticalCoordinatesGenerator,
  horizontalCoordinatesGenerator
} from './generateCategoricalChartFn';

const isFinit = Number.isFinite || isFinite;
const _getSafeValues = (
  obj
) => isObj(obj)
  ? Object.values(obj)
  : [];

const _getNumberValue = (
  value,
  dfValue
) => isNumber(value)
   ? value
   : dfValue;

const renderGrid = ({
  width,
  height,

  xAxisMap,
  yAxisMap,
  offset,

  element
}) => {
    const xAxis = getAnyElementOfObject(xAxisMap)
    , yAxisWithFiniteDomain = _getSafeValues(yAxisMap)
       .find(axis => axis.domain.every(isFinit))
    , yAxis = yAxisWithFiniteDomain || getAnyElementOfObject(yAxisMap)
    , _props = element.props || {};

    return cloneUiElement(element, {
      x: _getNumberValue(_props.x, offset.left),
      y: _getNumberValue(_props.y, offset.top),
      width: _getNumberValue(_props.width, offset.width),
      height: _getNumberValue(_props.height, offset.height),
      xAxis,
      yAxis,
      offset,
      chartWidth: width,
      chartHeight: height,
      verticalCoordinatesGenerator: _props.verticalCoordinatesGenerator || verticalCoordinatesGenerator,
      horizontalCoordinatesGenerator: _props.horizontalCoordinatesGenerator || horizontalCoordinatesGenerator
    }, element.key || 'grid');
};

const _axesTicksGenerator = (axis) => getTicksOfAxis(axis, true)
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @param {Object} element      The axis element
 * @param {String} displayName  The display name of axis
 * @param {Number} index        The index of element
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (
  axisOptions,
  element,
  displayName,
  index,
  width,
  height
) => {
  const {
    axisType,
    className
  } = axisOptions || {};
  return (
    <CartesianAxis
       {...axisOptions}
       key={element.key || `${displayName}-${index}`}
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
}) => {
  const axisObj = xAxisMap[element.props.xAxisId];
  return _renderAxis(
    axisObj,
    element,
    displayName,
    index,
    width,
    height
  );
};

const renderYAxis = ({
  width,
  height,
  yAxisMap,
  element,
  displayName,
  index
}) => {
  const axisObj = yAxisMap[element.props.yAxisId];
  return _renderAxis(
    axisObj,
    element,
    displayName,
    index,
    width,
    height
  );
};

const renderGraphicChild = ({
  formattedGraphicalItems,
  index,
  element
}) => {
  const item = formattedGraphicalItems
    .find(item => item.childIndex === index)
  if (!item) {
    return null;
  }

  const { key, ...itemProps } = item.props
  , graphicalItem = cloneUiElement(
    element, {...itemProps}, key
  );

  return [graphicalItem, null];
};

export const renderMap = {
  CartesianGrid: { handler: renderGrid, once: true },
  XAxis: { handler: renderXAxis },
  YAxis: { handler: renderYAxis },
  Bar: { handler: renderGraphicChild },
  Line: { handler: renderGraphicChild },
  Area: { handler: renderGraphicChild }
}
