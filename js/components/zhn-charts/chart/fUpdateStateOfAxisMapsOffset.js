"use strict";

exports.__esModule = true;
exports.fUpdateStateOfAxisMapsOffset = void 0;
var _CartesianUtils = require("../util/CartesianUtils");
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _chartFn = require("./chartFn");
var _XAxis = require("../cartesian/XAxis");
var _YAxis = require("../cartesian/YAxis");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _calculateOffset = require("./calculateOffset");
var _getAxisMap = require("./getAxisMap");
var _renderFn = require("./renderFn");
const DF_AXIS_ID = 0;
const _getObjectKeys = Object.keys;
const _calcLegendWidth = (width, margin) => width - (margin.left || 0) - (margin.right || 0);
const _crBarPosition = (cateAxis, cateTicks, bandSize, maxBarSize, barGap, barCategoryGap, sizeList) => {
  const barBandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks, true) ?? maxBarSize ?? 0,
    isBarBandSize = barBandSize !== bandSize,
    barPosition = (0, _ChartUtils.getBarPosition)({
      barGap,
      barCategoryGap,
      bandSize: isBarBandSize ? barBandSize : bandSize,
      sizeList,
      maxBarSize
    });
  return isBarBandSize ? barPosition.map(pos => ({
    ...pos,
    position: {
      ...pos.position,
      offset: pos.position.offset - barBandSize / 2
    }
  })) : barPosition;
};
const _crAxisObj = (axisComponents, currentState, item) => axisComponents.reduce((result, entry) => {
  const axisMap = currentState[`${entry.axisType}Map`],
    id = item.props[`${entry.axisType}Id`] || DF_AXIS_ID,
    axis = axisMap && axisMap[id];
  return {
    ...result,
    [entry.axisType]: axis,
    [`${entry.axisType}Ticks`]: (0, _ChartUtils.getTicksOfAxis)(axis)
  };
}, {});
const fGetFormatItems = axisComponents => (props, currentState) => {
  const {
      graphicalItems,
      offset
    } = currentState,
    {
      layout,
      barSize,
      barGap,
      barCategoryGap,
      maxBarSize: globalMaxBarSize
    } = props,
    {
      numericAxisName,
      cateAxisName
    } = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
    formattedItems = [],
    sizeList = (0, _generateCategoricalChartFn.getBarSizeList)(graphicalItems, barSize);
  graphicalItems.forEach((item, index) => {
    const displayedData = (0, _chartFn.getDisplayedData)(props.data, {}, item),
      {
        dataKey,
        maxBarSize: childMaxBarSize
      } = item.props,
      axisObj = _crAxisObj(axisComponents, currentState, item),
      cateAxis = axisObj[cateAxisName],
      cateTicks = axisObj[`${cateAxisName}Ticks`],
      bandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks),
      barPosition = (0, _generateCategoricalChartFn.isItemTypeBar)(item) ? _crBarPosition(cateAxis, cateTicks, bandSize, childMaxBarSize == null ? globalMaxBarSize : childMaxBarSize, barGap, barCategoryGap, sizeList) : void 0,
      composedFn = (0, _generateCategoricalChartFn.getComposedDataFn)(item);
    if (composedFn) {
      formattedItems.push({
        props: {
          ...composedFn({
            ...axisObj,
            displayedData,
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
        childIndex: (0, _ReactUtils.parseChildIndex)(item, props.children),
        item
      });
    }
  });
  return formattedItems;
};
const axisComponents = [(0, _chartFn.crAxisComponent)('xAxis', _XAxis.XAxis), (0, _chartFn.crAxisComponent)('yAxis', _YAxis.YAxis)],
  getFormatItems = fGetFormatItems(axisComponents);

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
const fUpdateStateOfAxisMapsOffset = (chartName, GraphicalChild) => (_ref, legendBBox, clipPathId) => {
  let {
    props
  } = _ref;
  if (!(0, _ChartUtils.validateWidthHeight)(props.width, props.height)) {
    return [];
  }
  const {
      children,
      layout,
      width,
      height,
      margin
    } = props,
    {
      cateAxisName
    } = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
    graphicalItems = (0, _ReactUtils.findAllByType)(children, GraphicalChild),
    axisObj = axisComponents.reduce((result, entry) => {
      result[`${entry.axisType}Map`] = (0, _getAxisMap.getAxisMap)(props, {
        ...entry,
        graphicalItems
      });
      return result;
    }, {}),
    legendItem = (0, _ChartUtils.findChildTypeLegend)(children),
    offset = (0, _calculateOffset.calculateOffset)({
      ...axisObj,
      width,
      height,
      margin
    }, legendBBox, legendItem);
  _getObjectKeys(axisObj).forEach(key => {
    axisObj[key] = (0, _CartesianUtils.formatAxisMap)(props, axisObj[key], offset, key.replace('Map', ''), chartName);
  });
  const formattedGraphicalItems = getFormatItems(props, {
      ...axisObj,
      graphicalItems,
      offset
    }),
    [_legendProps, _legendItem] = (0, _ChartUtils.getLegendProps)({
      legendItem,
      formattedGraphicalItems,
      legendWidth: _calcLegendWidth(width, margin)
    });
  return [offset, (0, _generateCategoricalChartFn.getOrderedTooltipTicks)(axisObj[`${cateAxisName}Map`]), graphicalItems, (0, _ReactUtils.renderByMap)(children, {
    clipPathId,
    width,
    height,
    layout,
    children,
    offset,
    xAxisMap: axisObj.xAxisMap,
    yAxisMap: axisObj.yAxisMap,
    formattedGraphicalItems
  }, _renderFn.renderMap), _legendProps, _legendItem];
};
exports.fUpdateStateOfAxisMapsOffset = fUpdateStateOfAxisMapsOffset;
//# sourceMappingURL=fUpdateStateOfAxisMapsOffset.js.map