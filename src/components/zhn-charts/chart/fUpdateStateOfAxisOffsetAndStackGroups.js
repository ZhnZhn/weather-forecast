import { isNullOrUndef } from '../../../utils/isTypeFn';

import {
  getBarSizeList,
  getBarPosition,
  getTicksOfAxis,
  getStackedDataOfItem,
  getBandSizeOfAxis,
  getStackGroupsByAxisId
} from '../util/ChartUtils';

import {
  parseChildIndex,
  validateWidthHeight,
  getDisplayName,
  findAllByType
} from '../util/ReactUtils';

import {
  getDisplayedData
} from './chartFn';

import {
  tooltipTicksGenerator,
  hasGraphicalBarItem,
  getAxisNameByLayout
} from './generateCategoricalChartFn';

import { calculateOffset } from './calculateOffset';
import { getAxisMap } from './getAxisMap';

const DF_AXIS_ID = 0;
const _getObjectKeys = Object.keys;

const fGetFormatItems = (
  axisComponents
) => (props, currentState) => {
  const {
    graphicalItems,
    stackGroups,
    offset,
    updateId,
    dataStartIndex,
    dataEndIndex
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
      props.data, {
      dataStartIndex,
      dataEndIndex }, item
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
      const maxBarSize = isNullOrUndef(childMaxBarSize)
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
            layout,
            dataStartIndex,
            dataEndIndex
          }),
          key: item.key || `item-${index}`,
          [numericAxisName]: axisObj[numericAxisName],
          [cateAxisName]: axisObj[cateAxisName],
          animationId: updateId,
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
  return ({
    props,
    dataStartIndex,
    dataEndIndex,
    updateId },
    legendBBox
  ) => {
    if (!validateWidthHeight(props.width, props.height)) {
      return {};
    }
    const {
      children,
      layout,
      stackOffset,
      data,
      reverseStackOrder
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
        const name = `${entry.axisType}Map`;
        return {
          ...result,
          [name]: getAxisMap(props, {
             ...entry,
             graphicalItems,
             stackGroups: entry.axisType === numericAxisName && stackGroups,
             dataStartIndex,
             dataEndIndex
          })
        };
    }, {});

    const offset = calculateOffset({
      ...axisObj,
      props,
      graphicalItems
    }, legendBBox);

    _getObjectKeys(axisObj)
       .forEach(key => {
         axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
       });

    const cateAxisMap = axisObj[`${cateAxisName}Map`]
    , ticksObj = tooltipTicksGenerator(cateAxisMap)
    , formattedGraphicalItems = getFormatItems(props, {
        ...axisObj,
        dataStartIndex,
        dataEndIndex,
        updateId,
        graphicalItems,
        stackGroups,
        offset,
    });    
    return {
      formattedGraphicalItems,
      graphicalItems,
      offset,
      stackGroups,
      ...ticksObj,
      ...axisObj,
    };
  };
}
