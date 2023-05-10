"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fUpdateStateOfAxisMapsOffsetAndStackGroups = void 0;
var _extends5 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _FnUtils = require("../util/FnUtils");
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _chartFn = require("./chartFn");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _calculateOffset = require("./calculateOffset");
var _getAxisMap = require("./getAxisMap");
var _getObjectKeys = Object.keys;
var fGetFormatItems = function fGetFormatItems(axisComponents) {
  return function (props, currentState) {
    var graphicalItems = currentState.graphicalItems,
      stackGroups = currentState.stackGroups,
      offset = currentState.offset,
      updateId = currentState.updateId,
      dataStartIndex = currentState.dataStartIndex,
      dataEndIndex = currentState.dataEndIndex,
      barSize = props.barSize,
      layout = props.layout,
      barGap = props.barGap,
      barCategoryGap = props.barCategoryGap,
      globalMaxBarSize = props.maxBarSize,
      _getAxisNameByLayout = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
      numericAxisName = _getAxisNameByLayout.numericAxisName,
      cateAxisName = _getAxisNameByLayout.cateAxisName,
      hasBar = (0, _generateCategoricalChartFn.hasGraphicalBarItem)(graphicalItems),
      sizeList = hasBar && (0, _ChartUtils.getBarSizeList)({
        barSize: barSize,
        stackGroups: stackGroups
      }),
      formattedItems = [];
    graphicalItems.forEach(function (item, index) {
      var displayedData = (0, _chartFn.getDisplayedData)(props.data, {
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex
        }, item),
        _item$props = item.props,
        dataKey = _item$props.dataKey,
        childMaxBarSize = _item$props.maxBarSize,
        numericAxisId = item.props[numericAxisName + "Id"],
        cateAxisId = item.props[cateAxisName + "Id"];
      var axisObj = axisComponents.reduce(function (result, entry) {
        var _extends2;
        var axisMap = currentState[entry.axisType + "Map"],
          id = item.props[entry.axisType + "Id"],
          axis = axisMap && axisMap[id];
        return (0, _extends5["default"])({}, result, (_extends2 = {}, _extends2[entry.axisType] = axis, _extends2[entry.axisType + "Ticks"] = (0, _ChartUtils.getTicksOfAxis)(axis), _extends2));
      }, {});
      var cateAxis = axisObj[cateAxisName],
        cateTicks = axisObj[cateAxisName + "Ticks"],
        stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _ChartUtils.getStackedDataOfItem)(item, stackGroups[numericAxisId].stackGroups),
        itemIsBar = (0, _ReactUtils.getDisplayName)(item.type).indexOf('Bar') >= 0,
        bandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks);
      var barPosition = [];
      if (itemIsBar) {
        var _ref, _getBandSizeOfAxis;
        // ???bar,??bar???
        var maxBarSize = (0, _FnUtils._isNil)(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize,
          barBandSize = (_ref = (_getBandSizeOfAxis = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks, true)) != null ? _getBandSizeOfAxis : maxBarSize) != null ? _ref : 0;
        barPosition = (0, _ChartUtils.getBarPosition)({
          barGap: barGap,
          barCategoryGap: barCategoryGap,
          bandSize: barBandSize !== bandSize ? barBandSize : bandSize,
          sizeList: sizeList[cateAxisId],
          maxBarSize: maxBarSize
        });
        if (barBandSize !== bandSize) {
          barPosition = barPosition.map(function (pos) {
            return (0, _extends5["default"])({}, pos, {
              position: (0, _extends5["default"])({}, pos.position, {
                offset: pos.position.offset - barBandSize / 2
              })
            });
          });
        }
      }
      var composedFn = item && item.type && item.type.getComposedData;
      if (composedFn) {
        var _extends3;
        formattedItems.push({
          props: (0, _extends5["default"])({}, composedFn((0, _extends5["default"])({}, axisObj, {
            displayedData: displayedData,
            props: props,
            dataKey: dataKey,
            item: item,
            bandSize: bandSize,
            barPosition: barPosition,
            offset: offset,
            stackedData: stackedData,
            layout: layout,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          })), (_extends3 = {
            key: item.key || "item-" + index
          }, _extends3[numericAxisName] = axisObj[numericAxisName], _extends3[cateAxisName] = axisObj[cateAxisName], _extends3.animationId = updateId, _extends3)),
          childIndex: (0, _ReactUtils.parseChildIndex)(item, props.children),
          item: item
        });
      }
    });
    return formattedItems;
  };
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
var fUpdateStateOfAxisMapsOffsetAndStackGroups = function fUpdateStateOfAxisMapsOffsetAndStackGroups(chartName, GraphicalChild, axisComponents, formatAxisMap) {
  var getFormatItems = fGetFormatItems(axisComponents);
  return function (_ref2, prevState) {
    var props = _ref2.props,
      dataStartIndex = _ref2.dataStartIndex,
      dataEndIndex = _ref2.dataEndIndex,
      updateId = _ref2.updateId;
    if (!(0, _ReactUtils.validateWidthHeight)({
      props: props
    })) {
      return null;
    }
    var children = props.children,
      layout = props.layout,
      stackOffset = props.stackOffset,
      data = props.data,
      reverseStackOrder = props.reverseStackOrder,
      _getAxisNameByLayout2 = (0, _generateCategoricalChartFn.getAxisNameByLayout)(layout),
      numericAxisName = _getAxisNameByLayout2.numericAxisName,
      cateAxisName = _getAxisNameByLayout2.cateAxisName,
      graphicalItems = (0, _ReactUtils.findAllByType)(children, GraphicalChild),
      stackGroups = (0, _ChartUtils.getStackGroupsByAxisId)(data, graphicalItems, numericAxisName + "Id", cateAxisName + "Id", stackOffset, reverseStackOrder),
      axisObj = axisComponents.reduce(function (result, entry) {
        var _extends4;
        var name = entry.axisType + "Map";
        return (0, _extends5["default"])({}, result, (_extends4 = {}, _extends4[name] = (0, _getAxisMap.getAxisMap)(props, (0, _extends5["default"])({}, entry, {
          graphicalItems: graphicalItems,
          stackGroups: entry.axisType === numericAxisName && stackGroups,
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex
        })), _extends4));
      }, {});
    var offset = (0, _calculateOffset.calculateOffset)((0, _extends5["default"])({}, axisObj, {
      props: props,
      graphicalItems: graphicalItems
    }), prevState == null ? void 0 : prevState.legendBBox);
    _getObjectKeys(axisObj).forEach(function (key) {
      axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
    });
    var cateAxisMap = axisObj[cateAxisName + "Map"],
      ticksObj = (0, _generateCategoricalChartFn.tooltipTicksGenerator)(cateAxisMap),
      formattedGraphicalItems = getFormatItems(props, (0, _extends5["default"])({}, axisObj, {
        dataStartIndex: dataStartIndex,
        dataEndIndex: dataEndIndex,
        updateId: updateId,
        graphicalItems: graphicalItems,
        stackGroups: stackGroups,
        offset: offset
      }));
    return (0, _extends5["default"])({
      formattedGraphicalItems: formattedGraphicalItems,
      graphicalItems: graphicalItems,
      offset: offset,
      stackGroups: stackGroups
    }, ticksObj, axisObj);
  };
};
exports.fUpdateStateOfAxisMapsOffsetAndStackGroups = fUpdateStateOfAxisMapsOffsetAndStackGroups;
//# sourceMappingURL=fUpdateStateOfAxisOffsetAndStackGroups.js.map