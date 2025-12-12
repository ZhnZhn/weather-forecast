import {
  formatAxisMap
} from '../util/CartesianUtils';

import {
  getBarPosition,
  getTicksOfAxis,
  getBandSizeOfAxis,
  getLegendProps
} from '../util/ChartUtils';

import {
  parseChildIndex,
  validateWidthHeight,
  findAllByType,
  findChildByType,
  renderByMap
} from '../util/ReactUtils';

import {
  getDisplayedData,
  crAxisComponent
} from './chartFn';

import { XAxis } from '../cartesian/XAxis';
import { YAxis } from '../cartesian/YAxis';

import { Legend } from '../component/Legend';

import {
  getOrderedTooltipTicks,
  getBarSizeList,
  isItemTypeBar,
  getComposedDataFn,
  getAxisNameByLayout
} from './generateCategoricalChartFn';

import { calculateOffset } from './calculateOffset';
import { getAxisMap } from './getAxisMap';

import { renderMap } from './renderFn';

const DF_AXIS_ID = 0;
const _getObjectKeys = Object.keys;

const _calcLegendWidth = (
  width,
  margin
) => width - (margin.left || 0) - (margin.right || 0);

const _crBarPosition = (
  cateAxis,
  cateTicks,
  bandSize,
  maxBarSize,
  barGap,
  barCategoryGap,
  sizeList
) => {
  const barBandSize = getBandSizeOfAxis(
     cateAxis,
     cateTicks,
     true
  ) ?? maxBarSize ?? 0
  , isBarBandSize = barBandSize !== bandSize
  , barPosition = getBarPosition({
     barGap,
     barCategoryGap,
     bandSize: isBarBandSize
       ? barBandSize
       : bandSize,
     sizeList,
     maxBarSize
  });

  return isBarBandSize
    ? barPosition.map(pos => ({
      ...pos,
      position: {
        ...pos.position,
        offset: pos.position.offset - barBandSize / 2
      }
    })) : barPosition;
};

const _crAxisObj = (
  axisComponents,
  currentState,
  item
) => axisComponents.reduce((result, entry) => {
  const axisMap = currentState[`${entry.axisType}Map`]
  , id = item.props[`${entry.axisType}Id`] || DF_AXIS_ID
  , axis = axisMap && axisMap[id];
  return {
    ...result,
    [entry.axisType]: axis,
    [`${entry.axisType}Ticks`]: getTicksOfAxis(axis)
  };
}, {});


const fGetFormatItems = (
  axisComponents
) => (props, currentState) => {
  const {
    graphicalItems,
    offset
  } = currentState
  , {
    barSize,
    layout,
    barGap,
    barCategoryGap,
    maxBarSize: globalMaxBarSize
  } = props
  , {
    numericAxisName,
    cateAxisName
  } = getAxisNameByLayout(layout)
  , formattedItems = []
  , sizeList = getBarSizeList(
      graphicalItems,
      barSize
  );

  graphicalItems.forEach((item, index) => {
    const displayedData = getDisplayedData(
      props.data,
      {},
      item
    )
    , {
      dataKey,
      maxBarSize: childMaxBarSize
    } = item.props
    , axisObj = _crAxisObj(
      axisComponents,
      currentState,
      item
    )
    , cateAxis = axisObj[cateAxisName]
    , cateTicks = axisObj[`${cateAxisName}Ticks`]
    , bandSize = getBandSizeOfAxis(cateAxis, cateTicks)
    , barPosition = isItemTypeBar(item) ? _crBarPosition(
       cateAxis,
       cateTicks,
       bandSize,
       childMaxBarSize == null
         ? globalMaxBarSize
         : childMaxBarSize,
       barGap,
       barCategoryGap,
       sizeList
    ) : void 0
    , composedFn = getComposedDataFn(item)
    /*
    , composedFn = item
       && item.type
       && item.type.getComposedData;
    */

    if (composedFn) {
      formattedItems.push({
        props: {
          ...composedFn({
            ...axisObj,
            displayedData,
            props,
            dataKey,
            item,
            bandSize,
            barPosition,
            offset,
            layout
          }),
          key: item.key || `item-${index}`,
          [numericAxisName]: axisObj[numericAxisName],
          [cateAxisName]: axisObj[cateAxisName]
        },
        childIndex: parseChildIndex(item, props.children),
        item
      });
    }
  });
  return formattedItems;
};

const axisComponents = [
  crAxisComponent('xAxis', XAxis),
  crAxisComponent('yAxis', YAxis)
]
, getFormatItems = fGetFormatItems(axisComponents);

/**
 * The AxisMaps are expensive to render on large data sets
 * so provide the ability to store them in state and only update them when necessary
 * they are dependent upon the start and end index of
 * the brush so it's important that this method is called _after_
 * the state is updated with any new start/end indices
 *
 * @param {Object} props          The props object to be used for updating the axismaps
 * dataStartIndex: The start index of the data series when a brush is applied
 * dataEndIndex: The end index of the data series when a brush is applied
 * updateId: The update id
 * @param {Object} prevState      Prev state
 * @return {Object} state New state to set
 */
export const fUpdateStateOfAxisMapsOffsetAndStackGroups = (
  chartName,
  GraphicalChild
) => (
  {props},
  legendBBox,
  clipPathId
) => {

  if (!validateWidthHeight(props.width, props.height)) {
    return [];
  }

  const {
    children,
    layout,

    width,
    height,
    margin
  } = props
  , {
    cateAxisName
  } = getAxisNameByLayout(layout)
  , graphicalItems = findAllByType(
      children,
      GraphicalChild
    )
  , axisObj = axisComponents.reduce((result, entry) => {
      result[`${entry.axisType}Map`] = getAxisMap(props, {
         ...entry,
         graphicalItems
      })
      return result;
  }, {});

  const offset = calculateOffset({
    ...axisObj,
    props,
    graphicalItems
  }, legendBBox, findChildByType(children, Legend));

  _getObjectKeys(axisObj)
     .forEach(key => {
        axisObj[key] = formatAxisMap(
          props,
          axisObj[key],
          offset,
          key.replace('Map', ''),
          chartName
        );
     });

  const formattedGraphicalItems = getFormatItems(props, {
    ...axisObj,
    graphicalItems,
    offset
  });

  const [
    _legendProps,
    _legendItem
  ] = getLegendProps({
    children,
    formattedGraphicalItems,
    legendWidth: _calcLegendWidth(width, margin)
  });

  return [
    offset,
    getOrderedTooltipTicks(axisObj[`${cateAxisName}Map`]),
    graphicalItems,
    renderByMap(children, {
      clipPathId,
      width,
      height,
      layout,
      children,

      offset,
      xAxisMap: axisObj.xAxisMap,
      yAxisMap: axisObj.yAxisMap,
      formattedGraphicalItems
    }, renderMap),
    _legendProps,
    _legendItem
  ];
}
