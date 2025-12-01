import {
  getBarSizeList,
  getBarPosition,
  getTicksOfAxis,
  getStackedDataOfItem,
  getBandSizeOfAxis,
  getStackGroupsByAxisId,
  getLegendProps
} from '../util/ChartUtils';

import {
  parseChildIndex,
  validateWidthHeight,
  getDisplayName,
  findAllByType,
  findChildByType,

  renderByMap
} from '../util/ReactUtils';

import { Legend } from '../component/Legend';

import {
  getDisplayedData
} from './chartFn';

import {
  getOrderedTooltipTicks,
  hasGraphicalBarItem,
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

const fGetFormatItems = (
  axisComponents
) => (props, currentState) => {
  const {
    graphicalItems,
    stackGroups,
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
  , hasBar = hasGraphicalBarItem(graphicalItems)
  , sizeList = hasBar && getBarSizeList({ barSize, stackGroups })
  , formattedItems = [];
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
    , numericAxisId = item.props[`${numericAxisName}Id`]
    , cateAxisId = item.props[`${cateAxisName}Id`];
    const axisObj = axisComponents.reduce((result, entry) => {
      const axisMap = currentState[`${entry.axisType}Map`]
      , id = item.props[`${entry.axisType}Id`] || DF_AXIS_ID
      , axis = axisMap && axisMap[id];
      return {
        ...result,
        [entry.axisType]: axis,
        [`${entry.axisType}Ticks`]: getTicksOfAxis(axis),
      };
    }, {});

    const cateAxis = axisObj[cateAxisName]
    , cateTicks = axisObj[`${cateAxisName}Ticks`]
    , stackedData = stackGroups
        && stackGroups[numericAxisId]
        && stackGroups[numericAxisId].hasStack
        && getStackedDataOfItem(item, stackGroups[numericAxisId].stackGroups)
    , itemIsBar = getDisplayName(item.type).indexOf('Bar') >= 0
    , bandSize = getBandSizeOfAxis(cateAxis, cateTicks);

    let barPosition = [];
    if (itemIsBar) {
      // ???bar,??bar???
      const maxBarSize = childMaxBarSize == null
        ? globalMaxBarSize
        : childMaxBarSize
      , barBandSize = getBandSizeOfAxis(
          cateAxis,
          cateTicks,
          true
        ) ?? maxBarSize ?? 0;
      barPosition = getBarPosition({
        barGap,
        barCategoryGap,
        bandSize: barBandSize !== bandSize ? barBandSize : bandSize,
        sizeList: sizeList[cateAxisId],
        maxBarSize,
      });
      if (barBandSize !== bandSize) {
        barPosition = barPosition.map((pos) => ({
          ...pos,
          position: { ...pos.position, offset: pos.position.offset - barBandSize / 2 },
        }));
      }
    }
    const composedFn = item && item.type && item.type.getComposedData;
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
            stackedData,
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
  GraphicalChild,
  axisComponents,
  formatAxisMap
) => {
  const getFormatItems = fGetFormatItems(axisComponents);
  return (
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
      stackOffset,
      data,
      reverseStackOrder,

      width,
      height,
      margin
    } = props
    , {
      numericAxisName,
      cateAxisName
    } = getAxisNameByLayout(layout)
    , graphicalItems = findAllByType(
        children,
        GraphicalChild
      )
    , stackGroups = getStackGroupsByAxisId(
        data,
        graphicalItems,
        `${numericAxisName}Id`,
        `${cateAxisName}Id`,
        stackOffset,
        reverseStackOrder
      )
    , axisObj = axisComponents.reduce((result, entry) => {
        result[`${entry.axisType}Map`] = getAxisMap(props, {
           ...entry,
           graphicalItems,
           stackGroups: entry.axisType === numericAxisName && stackGroups
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
         axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
       });

    const formattedGraphicalItems = getFormatItems(props, {
      ...axisObj,
      graphicalItems,
      stackGroups,
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
  };
}
