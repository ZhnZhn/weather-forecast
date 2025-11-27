"use strict";

exports.__esModule = true;
exports.fUpdateStateOfAxisMapsOffsetAndStackGroups = void 0;
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _Legend = require("../component/Legend");
var _chartFn = require("./chartFn");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _calculateOffset = require("./calculateOffset");
var _getAxisMap = require("./getAxisMap");
var _renderFn = require("./renderFn");
const DF_AXIS_ID = 0;
const _getObjectKeys = Object.keys;
const fGetFormatItems = axisComponents => (props, currentState) => {
  const {
      graphicalItems,
      stackGroups,
      offset,
      updateId,
      dataStartIndex,
      dataEndIndex
    } = currentState,
    {
      barSize,
      layout,
      barGap,
      barCategoryGap,
      maxBarSize: globalMaxBarSize
    } = props,
    {
      numericAxisName,
      cateAxisName
    } = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
    hasBar = (0, _generateCategoricalChartFn.hasGraphicalBarItem)(graphicalItems),
    sizeList = hasBar && (0, _ChartUtils.getBarSizeList)({
      barSize,
      stackGroups
    }),
    formattedItems = [];
  graphicalItems.forEach((item, index) => {
    const displayedData = (0, _chartFn.getDisplayedData)(props.data, {
        dataStartIndex,
        dataEndIndex
      }, item),
      {
        dataKey,
        maxBarSize: childMaxBarSize
      } = item.props,
      numericAxisId = item.props[numericAxisName + "Id"],
      cateAxisId = item.props[cateAxisName + "Id"];
    const axisObj = axisComponents.reduce((result, entry) => {
      const axisMap = currentState[entry.axisType + "Map"],
        id = item.props[entry.axisType + "Id"] || DF_AXIS_ID,
        axis = axisMap && axisMap[id];
      return Object.assign({}, result, {
        [entry.axisType]: axis,
        [entry.axisType + "Ticks"]: (0, _ChartUtils.getTicksOfAxis)(axis)
      });
    }, {});
    const cateAxis = axisObj[cateAxisName],
      cateTicks = axisObj[cateAxisName + "Ticks"],
      stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _ChartUtils.getStackedDataOfItem)(item, stackGroups[numericAxisId].stackGroups),
      itemIsBar = (0, _ReactUtils.getDisplayName)(item.type).indexOf('Bar') >= 0,
      bandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks);
    let barPosition = [];
    if (itemIsBar) {
      var _ref, _getBandSizeOfAxis;
      // ???bar,??bar???
      const maxBarSize = childMaxBarSize == null ? globalMaxBarSize : childMaxBarSize,
        barBandSize = (_ref = (_getBandSizeOfAxis = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks, true)) != null ? _getBandSizeOfAxis : maxBarSize) != null ? _ref : 0;
      barPosition = (0, _ChartUtils.getBarPosition)({
        barGap,
        barCategoryGap,
        bandSize: barBandSize !== bandSize ? barBandSize : bandSize,
        sizeList: sizeList[cateAxisId],
        maxBarSize
      });
      if (barBandSize !== bandSize) {
        barPosition = barPosition.map(pos => Object.assign({}, pos, {
          position: Object.assign({}, pos.position, {
            offset: pos.position.offset - barBandSize / 2
          })
        }));
      }
    }
    const composedFn = item && item.type && item.type.getComposedData;
    if (composedFn) {
      formattedItems.push({
        props: Object.assign({}, composedFn(Object.assign({}, axisObj, {
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
        })), {
          key: item.key || "item-" + index,
          [numericAxisName]: axisObj[numericAxisName],
          [cateAxisName]: axisObj[cateAxisName],
          animationId: updateId
        }),
        childIndex: (0, _ReactUtils.parseChildIndex)(item, props.children),
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
const fUpdateStateOfAxisMapsOffsetAndStackGroups = (chartName, GraphicalChild, axisComponents, formatAxisMap) => {
  const getFormatItems = fGetFormatItems(axisComponents);
  return (_ref2, legendBBox, clipPathId) => {
    let {
      props,
      dataStartIndex,
      dataEndIndex,
      updateId
    } = _ref2;
    if (!(0, _ReactUtils.validateWidthHeight)(props.width, props.height)) {
      return [];
    }
    const {
        children,
        layout,
        stackOffset,
        data,
        reverseStackOrder,
        width,
        height
      } = props,
      {
        numericAxisName,
        cateAxisName
      } = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
      graphicalItems = (0, _ReactUtils.findAllByType)(children, GraphicalChild),
      stackGroups = (0, _ChartUtils.getStackGroupsByAxisId)(data, graphicalItems, numericAxisName + "Id", cateAxisName + "Id", stackOffset, reverseStackOrder),
      axisObj = axisComponents.reduce((result, entry) => {
        const name = entry.axisType + "Map";
        return Object.assign({}, result, {
          [name]: (0, _getAxisMap.getAxisMap)(props, Object.assign({}, entry, {
            graphicalItems,
            stackGroups: entry.axisType === numericAxisName && stackGroups,
            dataStartIndex,
            dataEndIndex
          }))
        });
      }, {});
    const offset = (0, _calculateOffset.calculateOffset)(Object.assign({}, axisObj, {
      props,
      graphicalItems
    }), legendBBox, (0, _ReactUtils.findChildByType)(children, _Legend.Legend));
    _getObjectKeys(axisObj).forEach(key => {
      axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
    });
    const formattedGraphicalItems = getFormatItems(props, Object.assign({}, axisObj, {
      dataStartIndex,
      dataEndIndex,
      updateId,
      graphicalItems,
      stackGroups,
      offset
    }));
    return [offset, formattedGraphicalItems, (0, _generateCategoricalChartFn.getOrderedTooltipTicks)(axisObj[cateAxisName + "Map"]), graphicalItems, (0, _ReactUtils.renderByMap)(children, {
      clipPathId,
      width,
      height,
      layout,
      children,
      offset,
      xAxisMap: axisObj.xAxisMap,
      yAxisMap: axisObj.yAxisMap,
      formattedGraphicalItems
    }, _renderFn.renderMap)];
  };
};
exports.fUpdateStateOfAxisMapsOffsetAndStackGroups = fUpdateStateOfAxisMapsOffsetAndStackGroups;
//# sourceMappingURL=fUpdateStateOfAxisOffsetAndStackGroups.js.map