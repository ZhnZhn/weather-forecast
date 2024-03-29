"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getCoordinatesOfGrid = exports.getCateCoordinateOfLine = exports.getCateCoordinateOfBar = exports.getBaseValueOfBar = exports.getBarSizeList = exports.getBarPosition = exports.getBandSizeOfAxis = exports.findPositionOfBar = exports.combineEventHandlers = exports.checkDomainOfScale = exports.calculateActiveTickIndex = exports.appendOffsetOfLegend = exports.MIN_VALUE_REG = exports.MAX_VALUE_REG = void 0;
exports.getDomainOfDataByKey = getDomainOfDataByKey;
exports.truncateByDomain = exports.parseSpecifiedDomain = exports.parseScale = exports.parseErrorBarsOfAxis = exports.parseDomainOfCategoryAxis = exports.offsetSign = exports.offsetPositive = exports.isLayoutVertical = exports.isLayoutHorizontal = exports.isLayoutCentric = exports.isCategoricalAxis = exports.getValueByDataKey = exports.getTooltipItem = exports.getTicksOfScale = exports.getTicksOfAxis = exports.getStackedDataOfItem = exports.getStackedData = exports.getStackGroupsByAxisId = exports.getMainColorOfGraphicItem = exports.getLegendProps = exports.getDomainOfStackGroups = exports.getDomainOfItemsWithSameAxis = exports.getDomainOfErrorBars = void 0;
var _extends7 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Scale = require("../d3Scale");
var _d3Shape = require("../d3Shape");
var _FnUtils = require("./FnUtils");
var _scale = require("../scale");
var _ErrorBar = require("../cartesian/ErrorBar");
var _Legend = require("../component/Legend");
var _DataUtils = require("./DataUtils");
var _ReactUtils = require("./ReactUtils");
var _getObjectKeys = Object.keys;
var _getAxisDomain = function _getAxisDomain(axis) {
  return (((axis || {}).type || {}).defaultProps || {}).domain;
};
var isLayoutHorizontal = function isLayoutHorizontal(layout) {
  return layout === 'horizontal';
};
exports.isLayoutHorizontal = isLayoutHorizontal;
var isLayoutVertical = function isLayoutVertical(layout) {
  return layout === 'vertical';
};
exports.isLayoutVertical = isLayoutVertical;
var isLayoutCentric = function isLayoutCentric(layout) {
  return layout === 'centric';
};
exports.isLayoutCentric = isLayoutCentric;
var getValueByDataKey = function getValueByDataKey(obj, dataKey, defaultValue) {
  return (0, _FnUtils._isNil)(obj) || (0, _FnUtils._isNil)(dataKey) ? defaultValue : (0, _DataUtils.isNumOrStr)(dataKey) ? (0, _FnUtils._getByPropName)(obj, dataKey, defaultValue) : (0, _FnUtils._isFn)(dataKey) ? dataKey(obj) : defaultValue;
};
/**
 * Get domain of data by key
 * @param  {Array}   data      The data displayed in the chart
 * @param  {String}  key       The unique key of a group of data
 * @param  {String}  type      The type of axis
 * @param  {Boolean} filterNil Whether or not filter nil values
 * @return {Array} Domain of data
 */
exports.getValueByDataKey = getValueByDataKey;
function getDomainOfDataByKey(data, key, type, filterNil) {
  //const flattenData = _flatMap(data, entry => getValueByDataKey(entry, key));
  var flattenData = data.flatMap(function (entry) {
    return getValueByDataKey(entry, key);
  });
  if (type === 'number') {
    var domain = flattenData.filter(function (entry) {
      return (0, _DataUtils.isNumber)(entry) || parseFloat(entry);
    });
    return domain.length ? [(0, _FnUtils._min)(domain), (0, _FnUtils._max)(domain)] : [Infinity, -Infinity];
  }
  var validateData = filterNil ? flattenData.filter(function (entry) {
    return !(0, _FnUtils._isNil)(entry);
  }) : flattenData;
  return validateData.map(function (entry) {
    return (0, _DataUtils.isNumOrStr)(entry) || entry instanceof Date ? entry : '';
  });
}
var calculateActiveTickIndex = function calculateActiveTickIndex(coordinate, ticks, unsortedTicks, axis) {
  var _ticks$length, _ticks;
  if (ticks === void 0) {
    ticks = [];
  }
  var index = -1;
  var len = (_ticks$length = (_ticks = ticks) == null ? void 0 : _ticks.length) != null ? _ticks$length : 0;
  // if there are 1 or less ticks ticks then the active tick is at index 0
  if (len <= 1) {
    return 0;
  }
  if (axis && axis.axisType === 'angleAxis' && Math.abs(Math.abs(axis.range[1] - axis.range[0]) - 360) <= 1e-6) {
    var range = axis.range;
    // ticks are distributed in a circle
    for (var i = 0; i < len; i++) {
      var before = i > 0 ? unsortedTicks[i - 1].coordinate : unsortedTicks[len - 1].coordinate,
        cur = unsortedTicks[i].coordinate,
        after = i >= len - 1 ? unsortedTicks[0].coordinate : unsortedTicks[i + 1].coordinate;
      var sameDirectionCoord = void 0;
      if ((0, _DataUtils.mathSign)(cur - before) !== (0, _DataUtils.mathSign)(after - cur)) {
        var diffInterval = [];
        if ((0, _DataUtils.mathSign)(after - cur) === (0, _DataUtils.mathSign)(range[1] - range[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range[1] - range[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range[1] - range[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
          index = unsortedTicks[i].index;
          break;
        }
      } else {
        var min = Math.min(before, after),
          max = Math.max(before, after);
        if (coordinate > (min + cur) / 2 && coordinate <= (max + cur) / 2) {
          index = unsortedTicks[i].index;
          break;
        }
      }
    }
  } else {
    // ticks are distributed in a single direction
    for (var _i = 0; _i < len; _i++) {
      if (_i === 0 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i > 0 && _i < len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i === len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2) {
        index = ticks[_i].index;
        break;
      }
    }
  }
  return index;
};

/**
 * Get the main color of each graphic item
 * @param  {ReactElement} item A graphic item
 * @return {String}            Color
 */
exports.calculateActiveTickIndex = calculateActiveTickIndex;
var getMainColorOfGraphicItem = function getMainColorOfGraphicItem(item) {
  var displayName = item.type.displayName,
    _item$props = item.props,
    stroke = _item$props.stroke,
    fill = _item$props.fill;
  var result;
  switch (displayName) {
    case 'Line':
      result = stroke;
      break;
    case 'Area':
    case 'Radar':
      result = stroke && stroke !== 'none' ? stroke : fill;
      break;
    default:
      result = fill;
      break;
  }
  return result;
};
exports.getMainColorOfGraphicItem = getMainColorOfGraphicItem;
var getLegendProps = function getLegendProps(_ref) {
  var children = _ref.children,
    formattedGraphicalItems = _ref.formattedGraphicalItems,
    legendWidth = _ref.legendWidth,
    legendContent = _ref.legendContent;
  var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend.Legend);
  if (!legendItem) {
    return null;
  }
  var legendData;
  if (legendItem.props && legendItem.props.payload) {
    legendData = legendItem.props && legendItem.props.payload;
  } else if (legendContent === 'children') {
    legendData = (formattedGraphicalItems || []).reduce(function (result, _ref2) {
      var item = _ref2.item,
        props = _ref2.props;
      var data = props.sectors || props.data || [];
      return result.concat(data.map(function (entry) {
        return {
          type: legendItem.props.iconType || item.props.legendType,
          value: entry.name,
          color: entry.fill,
          payload: entry
        };
      }));
    }, []);
  } else {
    legendData = (formattedGraphicalItems || []).map(function (_ref3) {
      var item = _ref3.item;
      var _item$props2 = item.props,
        dataKey = _item$props2.dataKey,
        name = _item$props2.name,
        legendType = _item$props2.legendType,
        hide = _item$props2.hide;
      return {
        inactive: hide,
        dataKey: dataKey,
        type: legendItem.props.iconType || legendType || 'square',
        color: getMainColorOfGraphicItem(item),
        value: name || dataKey,
        payload: item.props
      };
    });
  }
  return (0, _extends7["default"])({}, legendItem.props, _Legend.Legend.getWithHeight(legendItem, legendWidth), {
    payload: legendData,
    item: legendItem
  });
};

/**
 * Calculate the size of all groups for stacked bar graph
 * @param  {Object} stackGroups The items grouped by axisId and stackId
 * @return {Object} The size of all groups
 */
exports.getLegendProps = getLegendProps;
var getBarSizeList = function getBarSizeList(_ref4) {
  var globalSize = _ref4.barSize,
    _ref4$stackGroups = _ref4.stackGroups,
    stackGroups = _ref4$stackGroups === void 0 ? {} : _ref4$stackGroups;
  if (!stackGroups) {
    return {};
  }
  var result = {},
    numericAxisIds = _getObjectKeys(stackGroups);
  for (var i = 0, len = numericAxisIds.length; i < len; i++) {
    var sgs = stackGroups[numericAxisIds[i]].stackGroups,
      stackIds = _getObjectKeys(sgs);
    for (var j = 0, sLen = stackIds.length; j < sLen; j++) {
      var _sgs$stackIds$j = sgs[stackIds[j]],
        items = _sgs$stackIds$j.items,
        cateAxisId = _sgs$stackIds$j.cateAxisId,
        barItems = items.filter(function (item) {
          return (0, _ReactUtils.getDisplayName)(item.type).indexOf('Bar') >= 0;
        });
      if (barItems && barItems.length) {
        var selfSize = barItems[0].props.barSize,
          cateId = barItems[0].props[cateAxisId];
        if (!result[cateId]) {
          result[cateId] = [];
        }
        result[cateId].push({
          item: barItems[0],
          stackList: barItems.slice(1),
          barSize: (0, _FnUtils._isNil)(selfSize) ? globalSize : selfSize
        });
      }
    }
  }
  return result;
};

/**
 * Calculate the size of each bar and the gap between two bars
 * @param  {Number} bandSize  The size of each category
 * @param  {sizeList} sizeList  The size of all groups
 * @param  {maxBarSize} maxBarSize The maximum size of bar
 * @return {Number} The size of each bar and the gap between two bars
 */
exports.getBarSizeList = getBarSizeList;
var getBarPosition = function getBarPosition(_ref5) {
  var barGap = _ref5.barGap,
    barCategoryGap = _ref5.barCategoryGap,
    bandSize = _ref5.bandSize,
    _ref5$sizeList = _ref5.sizeList,
    sizeList = _ref5$sizeList === void 0 ? [] : _ref5$sizeList,
    maxBarSize = _ref5.maxBarSize;
  var len = sizeList.length;
  if (len < 1) {
    return null;
  }
  var realBarGap = (0, _DataUtils.getPercentValue)(barGap, bandSize, 0, true);
  var result;
  // whether or not is barSize setted by user
  if (sizeList[0].barSize === +sizeList[0].barSize) {
    var useFull = false;
    var fullBarSize = bandSize / len;
    var sum = sizeList.reduce(function (res, entry) {
      return res + entry.barSize || 0;
    }, 0);
    sum += (len - 1) * realBarGap;
    if (sum >= bandSize) {
      sum -= (len - 1) * realBarGap;
      realBarGap = 0;
    }
    if (sum >= bandSize && fullBarSize > 0) {
      useFull = true;
      fullBarSize *= 0.9;
      sum = len * fullBarSize;
    }
    var offset = (bandSize - sum) / 2 >> 0;
    var prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce(function (res, entry) {
      var newRes = [].concat(res, [{
        item: entry.item,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          size: useFull ? fullBarSize : entry.barSize
        }
      }]);
      prev = newRes[newRes.length - 1].position;
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(function (item) {
          newRes.push({
            item: item,
            position: prev
          });
        });
      }
      return newRes;
    }, []);
  } else {
    var _offset = (0, _DataUtils.getPercentValue)(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize >>= 0;
    }
    var size = maxBarSize === +maxBarSize ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce(function (res, entry, i) {
      var newRes = [].concat(res, [{
        item: entry.item,
        position: {
          offset: _offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
          size: size
        }
      }]);
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(function (item) {
          newRes.push({
            item: item,
            position: newRes[newRes.length - 1].position
          });
        });
      }
      return newRes;
    }, []);
  }
  return result;
};
exports.getBarPosition = getBarPosition;
var appendOffsetOfLegend = function appendOffsetOfLegend(offset, items, props, legendBox) {
  var children = props.children,
    width = props.width,
    margin = props.margin,
    legendWidth = width - (margin.left || 0) - (margin.right || 0),
    legendProps = getLegendProps({
      children: children,
      legendWidth: legendWidth
    });
  var newOffset = offset;
  if (legendProps) {
    var box = legendBox || {},
      align = legendProps.align,
      verticalAlign = legendProps.verticalAlign,
      layout = legendProps.layout;
    if ((isLayoutVertical(layout) || isLayoutHorizontal(layout) && verticalAlign === 'middle') && (0, _DataUtils.isNumber)(offset[align])) {
      var _extends2;
      newOffset = (0, _extends7["default"])({}, offset, (_extends2 = {}, _extends2[align] = newOffset[align] + (box.width || 0), _extends2));
    }
    if ((isLayoutHorizontal(layout) || isLayoutVertical(layout) && align === 'center') && (0, _DataUtils.isNumber)(offset[verticalAlign])) {
      var _extends3;
      newOffset = (0, _extends7["default"])({}, offset, (_extends3 = {}, _extends3[verticalAlign] = newOffset[verticalAlign] + (box.height || 0), _extends3));
    }
  }
  return newOffset;
};
exports.appendOffsetOfLegend = appendOffsetOfLegend;
var isErrorBarRelevantForAxis = function isErrorBarRelevantForAxis(layout, axisType, direction) {
  if ((0, _FnUtils._isNil)(axisType)) {
    return true;
  }
  if (isLayoutHorizontal(layout)) {
    return axisType === 'yAxis';
  }
  if (isLayoutVertical(layout)) {
    return axisType === 'xAxis';
  }
  if (direction === 'x') {
    return axisType === 'xAxis';
  }
  if (direction === 'y') {
    return axisType === 'yAxis';
  }
  return true;
};
var getDomainOfErrorBars = function getDomainOfErrorBars(data, item, dataKey, layout, axisType) {
  var children = item.props.children,
    errorBars = (0, _ReactUtils.findAllByType)(children, _ErrorBar.ErrorBar).filter(function (errorBarChild) {
      return isErrorBarRelevantForAxis(layout, axisType, errorBarChild.props.direction);
    });
  if (errorBars && errorBars.length) {
    var keys = errorBars.map(function (errorBarChild) {
      return errorBarChild.props.dataKey;
    });
    return data.reduce(function (result, entry) {
      var entryValue = getValueByDataKey(entry, dataKey, 0),
        mainValue = (0, _FnUtils._isArr)(entryValue) ? [(0, _FnUtils._min)(entryValue), (0, _FnUtils._max)(entryValue)] : [entryValue, entryValue],
        errorDomain = keys.reduce(function (prevErrorArr, k) {
          var errorValue = getValueByDataKey(entry, k, 0),
            lowerValue = mainValue[0] - Math.abs((0, _FnUtils._isArr)(errorValue) ? errorValue[0] : errorValue),
            upperValue = mainValue[1] + Math.abs((0, _FnUtils._isArr)(errorValue) ? errorValue[1] : errorValue);
          return [Math.min(lowerValue, prevErrorArr[0]), Math.max(upperValue, prevErrorArr[1])];
        }, [Infinity, -Infinity]);
      return [Math.min(errorDomain[0], result[0]), Math.max(errorDomain[1], result[1])];
    }, [Infinity, -Infinity]);
  }
  return null;
};
exports.getDomainOfErrorBars = getDomainOfErrorBars;
var parseErrorBarsOfAxis = function parseErrorBarsOfAxis(data, items, dataKey, axisType, layout) {
  var domains = items.map(function (item) {
    return getDomainOfErrorBars(data, item, dataKey, layout, axisType);
  }).filter(function (entry) {
    return !(0, _FnUtils._isNil)(entry);
  });
  return domains && domains.length ? domains.reduce(function (result, entry) {
    return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
  }, [Infinity, -Infinity]) : null;
};

/**
 * Get domain of data by the configuration of item element
 * @param  {Array}   data      The data displayed in the chart
 * @param  {Array}   items     The instances of item
 * @param  {String}  type      The type of axis, number - Number Axis, category - Category Axis
 * @param  {LayoutType} layout The type of layout
 * @param  {Boolean} filterNil Whether or not filter nil values
 * @return {Array}        Domain
 */
exports.parseErrorBarsOfAxis = parseErrorBarsOfAxis;
var getDomainOfItemsWithSameAxis = function getDomainOfItemsWithSameAxis(data, items, type, layout, filterNil) {
  var domains = items.map(function (item) {
    var dataKey = item.props.dataKey;
    if (type === 'number' && dataKey) {
      return getDomainOfErrorBars(data, item, dataKey, layout) || getDomainOfDataByKey(data, dataKey, type, filterNil);
    }
    return getDomainOfDataByKey(data, dataKey, type, filterNil);
  });
  if (type === 'number') {
    // Calculate the domain of number axis
    return domains.reduce(function (result, entry) {
      return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
    }, [Infinity, -Infinity]);
  }
  var tag = {};
  // Get the union set of category axis
  return domains.reduce(function (result, entry) {
    for (var i = 0, len = entry.length; i < len; i++) {
      if (!tag[entry[i]]) {
        tag[entry[i]] = true;
        result.push(entry[i]);
      }
    }
    return result;
  }, []);
};
exports.getDomainOfItemsWithSameAxis = getDomainOfItemsWithSameAxis;
var isCategoricalAxis = function isCategoricalAxis(layout, axisType) {
  return isLayoutHorizontal(layout) && axisType === 'xAxis' || isLayoutVertical(layout) && axisType === 'yAxis' || isLayoutCentric(layout) && axisType === 'angleAxis' || layout === 'radial' && axisType === 'radiusAxis';
};

/**
 * Calculate the Coordinates of grid
 * @param  {Array} ticks The ticks in axis
 * @param {Number} min   The minimun value of axis
 * @param {Number} max   The maximun value of axis
 * @return {Array}       Coordinates
 */
exports.isCategoricalAxis = isCategoricalAxis;
var getCoordinatesOfGrid = function getCoordinatesOfGrid(ticks, min, max) {
  var hasMin, hasMax;
  var values = ticks.map(function (entry) {
    if (entry.coordinate === min) {
      hasMin = true;
    }
    if (entry.coordinate === max) {
      hasMax = true;
    }
    return entry.coordinate;
  });
  if (!hasMin) {
    values.push(min);
  }
  if (!hasMax) {
    values.push(max);
  }
  return values;
};

/**
 * Get the ticks of an axis
 * @param  {Object}  axis The configuration of an axis
 * @param {Boolean} isGrid Whether or not are the ticks in grid
 * @param {Boolean} isAll Return the ticks of all the points or not
 * @return {Array}  Ticks
 */
exports.getCoordinatesOfGrid = getCoordinatesOfGrid;
var getTicksOfAxis = function getTicksOfAxis(axis, isGrid, isAll) {
  if (!axis) {
    return null;
  }
  var scale = axis.scale,
    duplicateDomain = axis.duplicateDomain,
    type = axis.type,
    range = axis.range,
    offsetForBand = axis.realScaleType === 'scaleBand' ? scale.bandwidth() / 2 : 2;
  var offset = (isGrid || isAll) && type === 'category' && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axis.axisType === 'angleAxis' && (range == null ? void 0 : range.length) >= 2 ? (0, _DataUtils.mathSign)(range[0] - range[1]) * 2 * offset : offset;
  // The ticks set by user should only affect the ticks adjacent to axis line
  if (isGrid && (axis.ticks || axis.niceTicks)) {
    var result = (axis.ticks || axis.niceTicks).map(function (entry) {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset: offset
      };
    });
    return result.filter(function (row) {
      return !(0, _FnUtils._isNaN)(row.coordinate);
    });
  }
  // When axis is a categorial axis, but the type of axis is number or the scale of axis is not "auto"
  if (axis.isCategorical && axis.categoricalDomain) {
    return axis.categoricalDomain.map(function (entry, index) {
      return {
        coordinate: scale(entry) + offset,
        value: entry,
        index: index,
        offset: offset
      };
    });
  }
  if (scale.ticks && !isAll) {
    return scale.ticks(axis.tickCount).map(function (entry) {
      return {
        coordinate: scale(entry) + offset,
        value: entry,
        offset: offset
      };
    });
  }
  // When axis has duplicated text, serial numbers are used to generate scale
  return scale.domain().map(function (entry, index) {
    return {
      coordinate: scale(entry) + offset,
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index: index,
      offset: offset
    };
  });
};

/**
 * combine the handlers
 * @param  {Function} defaultHandler Internal private handler
 * @param  {Function} parentHandler  Handler function specified in parent component
 * @param  {Function} childHandler   Handler function specified in child component
 * @return {Function}                The combined handler
 */
exports.getTicksOfAxis = getTicksOfAxis;
var combineEventHandlers = function combineEventHandlers(defaultHandler, parentHandler, childHandler) {
  var customizedHandler;
  if ((0, _FnUtils._isFn)(childHandler)) {
    customizedHandler = childHandler;
  } else if ((0, _FnUtils._isFn)(parentHandler)) {
    customizedHandler = parentHandler;
  }
  if ((0, _FnUtils._isFn)(defaultHandler) || customizedHandler) {
    return function (arg1, arg2, arg3, arg4) {
      if ((0, _FnUtils._isFn)(defaultHandler)) {
        defaultHandler(arg1, arg2, arg3, arg4);
      }
      if ((0, _FnUtils._isFn)(customizedHandler)) {
        customizedHandler(arg1, arg2, arg3, arg4);
      }
    };
  }
  return null;
};
exports.combineEventHandlers = combineEventHandlers;
var _crScaleBand = function _crScaleBand() {
  return {
    scale: (0, _d3Scale.scaleBand)(),
    realScaleType: 'band'
  };
};
var _crScaleLinear = function _crScaleLinear() {
  return {
    scale: (0, _d3Scale.scaleLinear)(),
    realScaleType: 'linear'
  };
};
var _crScalePoint = function _crScalePoint() {
  return {
    scale: (0, _d3Scale.scalePoint)(),
    realScaleType: 'point'
  };
};

/**
 * Parse the scale function of axis
 * @param  {Object}   axis          The option of axis
 * @param  {String}   chartType     The displayName of chart
 * @param  {Boolean}  hasBar        if it has a bar
 * @return {Function}               The scale function
 */
var parseScale = function parseScale(axis, chartType, hasBar) {
  var scale = axis.scale,
    type = axis.type,
    layout = axis.layout,
    axisType = axis.axisType;
  if (scale === 'auto') {
    if (layout === 'radial' && axisType === 'radiusAxis') {
      return _crScaleBand();
    }
    if (layout === 'radial' && axisType === 'angleAxis') {
      return _crScaleLinear();
    }
    if (type === 'category' && chartType && (chartType.indexOf('LineChart') >= 0 || chartType.indexOf('AreaChart') >= 0 || chartType.indexOf('ComposedChart') >= 0 && !hasBar)) {
      return _crScalePoint();
    }
    if (type === 'category') {
      return _crScaleBand();
    }
    return _crScaleLinear();
  }
  /*
  if (_isStr(scale)) {
    const name = `scale${_upperFirst(scale)}`;
    return {
      scale: (d3Scales[name] || d3Scales.scalePoint)(),
      realScaleType: d3Scales[name] ? name : 'point',
    };
  }
  */
  return (0, _FnUtils._isFn)(scale) ? {
    scale: scale
  } : _crScalePoint();
};
exports.parseScale = parseScale;
var EPS = 1e-4;
var checkDomainOfScale = function checkDomainOfScale(scale) {
  var domain = scale.domain();
  if (!domain || domain.length <= 2) {
    return;
  }
  var len = domain.length,
    range = scale.range(),
    min = Math.min(range[0], range[1]) - EPS,
    max = Math.max(range[0], range[1]) + EPS,
    first = scale(domain[0]),
    last = scale(domain[len - 1]);
  if (first < min || first > max || last < min || last > max) {
    scale.domain([domain[0], domain[len - 1]]);
  }
};
exports.checkDomainOfScale = checkDomainOfScale;
var findPositionOfBar = function findPositionOfBar(barPosition, child) {
  if (!barPosition) {
    return null;
  }
  for (var i = 0, len = barPosition.length; i < len; i++) {
    if (barPosition[i].item === child) {
      return barPosition[i].position;
    }
  }
  return null;
};
exports.findPositionOfBar = findPositionOfBar;
var truncateByDomain = function truncateByDomain(value, domain) {
  if (!domain || domain.length !== 2 || !(0, _DataUtils.isNumber)(domain[0]) || !(0, _DataUtils.isNumber)(domain[1])) {
    return value;
  }
  var min = Math.min(domain[0], domain[1]),
    max = Math.max(domain[0], domain[1]),
    result = [value[0], value[1]];
  if (!(0, _DataUtils.isNumber)(value[0]) || value[0] < min) {
    result[0] = min;
  }
  if (!(0, _DataUtils.isNumber)(value[1]) || value[1] > max) {
    result[1] = max;
  }
  if (result[0] > max) {
    result[0] = max;
  }
  if (result[1] < min) {
    result[1] = min;
  }
  return result;
};
exports.truncateByDomain = truncateByDomain;
var offsetSign = function offsetSign(series) {
  var n = series.length;
  if (n <= 0) {
    return;
  }
  for (var j = 0, m = series[0].length; j < m; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n; ++i) {
      var value = (0, _FnUtils._isNaN)(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = negative;
        series[i][j][1] = negative + value;
        negative = series[i][j][1];
      }
    }
  }
};
exports.offsetSign = offsetSign;
var offsetPositive = function offsetPositive(series) {
  var n = series.length;
  if (n <= 0) {
    return;
  }
  for (var j = 0, m = series[0].length; j < m; ++j) {
    var positive = 0;
    for (var i = 0; i < n; ++i) {
      var value = (0, _FnUtils._isNaN)(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = 0;
        series[i][j][1] = 0;
      }
    }
  }
};
exports.offsetPositive = offsetPositive;
var STACK_OFFSET_MAP = {
  sign: offsetSign,
  expand: _d3Shape.stackOffsetExpand,
  none: _d3Shape.stackOffsetNone,
  silhouette: _d3Shape.stackOffsetSilhouette,
  wiggle: _d3Shape.stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = function getStackedData(data, stackItems, offsetType) {
  var dataKeys = stackItems.map(function (item) {
      return item.props.dataKey;
    }),
    stack = (0, _d3Shape.stack)().keys(dataKeys).value(function (d, key) {
      return +getValueByDataKey(d, key, 0);
    }).order(_d3Shape.stackOrderNone).offset(STACK_OFFSET_MAP[offsetType]);
  return stack(data);
};
exports.getStackedData = getStackedData;
var getStackGroupsByAxisId = function getStackGroupsByAxisId(data, _items, numericAxisId, cateAxisId, offsetType, reverseStackOrder) {
  if (!data) {
    return null;
  }
  // reversing items to affect render order (for layering)
  var items = reverseStackOrder ? _items.reverse() : _items,
    stackGroups = items.reduce(function (result, item) {
      var _extends4;
      var _item$props3 = item.props,
        stackId = _item$props3.stackId,
        hide = _item$props3.hide;
      if (hide) {
        return result;
      }
      var axisId = item.props[numericAxisId];
      var parentGroup = result[axisId] || {
        hasStack: false,
        stackGroups: {}
      };
      if ((0, _DataUtils.isNumOrStr)(stackId)) {
        var childGroup = parentGroup.stackGroups[stackId] || {
          numericAxisId: numericAxisId,
          cateAxisId: cateAxisId,
          items: []
        };
        childGroup.items.push(item);
        parentGroup.hasStack = true;
        parentGroup.stackGroups[stackId] = childGroup;
      } else {
        parentGroup.stackGroups[(0, _DataUtils.uniqueId)('_stackId_')] = {
          numericAxisId: numericAxisId,
          cateAxisId: cateAxisId,
          items: [item]
        };
      }
      return (0, _extends7["default"])({}, result, (_extends4 = {}, _extends4[axisId] = parentGroup, _extends4));
    }, {});
  return _getObjectKeys(stackGroups).reduce(function (result, axisId) {
    var _extends6;
    var group = stackGroups[axisId];
    if (group.hasStack) {
      group.stackGroups = _getObjectKeys(group.stackGroups).reduce(function (res, stackId) {
        var _extends5;
        var g = group.stackGroups[stackId];
        return (0, _extends7["default"])({}, res, (_extends5 = {}, _extends5[stackId] = {
          numericAxisId: numericAxisId,
          cateAxisId: cateAxisId,
          items: g.items,
          stackedData: getStackedData(data, g.items, offsetType)
        }, _extends5));
      }, {});
    }
    return (0, _extends7["default"])({}, result, (_extends6 = {}, _extends6[axisId] = group, _extends6));
  }, {});
};

/**
 * Configure the scale function of axis
 * @param {Object} scale The scale function
 * @param {Object} opts  The configuration of axis
 * @return {Object}      null
 */
exports.getStackGroupsByAxisId = getStackGroupsByAxisId;
var getTicksOfScale = function getTicksOfScale(scale, opts) {
  var realScaleType = opts.realScaleType,
    type = opts.type,
    tickCount = opts.tickCount,
    originalDomain = opts.originalDomain,
    allowDecimals = opts.allowDecimals,
    scaleType = realScaleType || opts.scale;
  if (scaleType !== 'auto' && scaleType !== 'linear') {
    return null;
  }
  if (tickCount && type === 'number' && originalDomain && (originalDomain[0] === 'auto' || originalDomain[1] === 'auto')) {
    // Calculate the ticks by the number of grid when the axis is a number axis
    var domain = scale.domain();
    if (!domain.length) {
      return null;
    }
    var tickValues = (0, _scale.getNiceTickValues)(domain, tickCount, allowDecimals);
    scale.domain([(0, _FnUtils._min)(tickValues), (0, _FnUtils._max)(tickValues)]);
    return {
      niceTicks: tickValues
    };
  }
  if (tickCount && type === 'number') {
    var _domain = scale.domain(),
      _tickValues = (0, _scale.getTickValuesFixedDomain)(_domain, tickCount, allowDecimals);
    return {
      niceTicks: _tickValues
    };
  }
  return null;
};
exports.getTicksOfScale = getTicksOfScale;
var getCateCoordinateOfLine = function getCateCoordinateOfLine(_ref6) {
  var axis = _ref6.axis,
    ticks = _ref6.ticks,
    bandSize = _ref6.bandSize,
    entry = _ref6.entry,
    index = _ref6.index,
    dataKey = _ref6.dataKey;
  if (axis.type === 'category') {
    // find coordinate of category axis by the value of category
    if (!axis.allowDuplicatedCategory && axis.dataKey && !(0, _FnUtils._isNil)(entry[axis.dataKey])) {
      var matchedTick = (0, _DataUtils.findEntryInArray)(ticks, 'value', entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
  }
  var value = getValueByDataKey(entry, !(0, _FnUtils._isNil)(dataKey) ? dataKey : axis.dataKey);
  return !(0, _FnUtils._isNil)(value) ? axis.scale(value) : null;
};
exports.getCateCoordinateOfLine = getCateCoordinateOfLine;
var getCateCoordinateOfBar = function getCateCoordinateOfBar(_ref7) {
  var axis = _ref7.axis,
    ticks = _ref7.ticks,
    offset = _ref7.offset,
    bandSize = _ref7.bandSize,
    entry = _ref7.entry,
    index = _ref7.index;
  if (axis.type === 'category') {
    return ticks[index] ? ticks[index].coordinate + offset : null;
  }
  var value = getValueByDataKey(entry, axis.dataKey, axis.domain[index]);
  return !(0, _FnUtils._isNil)(value) ? axis.scale(value) - bandSize / 2 + offset : null;
};
exports.getCateCoordinateOfBar = getCateCoordinateOfBar;
var getBaseValueOfBar = function getBaseValueOfBar(_ref8) {
  var numericAxis = _ref8.numericAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === 'number') {
    var min = Math.min(domain[0], domain[1]),
      max = Math.max(domain[0], domain[1]);
    if (min <= 0 && max >= 0) {
      return 0;
    }
    if (max < 0) {
      return max;
    }
    return min;
  }
  return domain[0];
};
exports.getBaseValueOfBar = getBaseValueOfBar;
var getStackedDataOfItem = function getStackedDataOfItem(item, stackGroups) {
  var stackId = item.props.stackId;
  if ((0, _DataUtils.isNumOrStr)(stackId)) {
    var group = stackGroups[stackId];
    if (group && group.items.length) {
      var itemIndex = -1;
      for (var i = 0, len = group.items.length; i < len; i++) {
        if (group.items[i] === item) {
          itemIndex = i;
          break;
        }
      }
      return itemIndex >= 0 ? group.stackedData[itemIndex] : null;
    }
  }
  return null;
};
exports.getStackedDataOfItem = getStackedDataOfItem;
var getDomainOfSingle = function getDomainOfSingle(data) {
  return data.reduce(function (result, entry) {
    return [(0, _FnUtils._min)(entry.concat([result[0]]).filter(_DataUtils.isNumber)), (0, _FnUtils._max)(entry.concat([result[1]]).filter(_DataUtils.isNumber))];
  }, [Infinity, -Infinity]);
};
var getDomainOfStackGroups = function getDomainOfStackGroups(stackGroups, startIndex, endIndex) {
  return _getObjectKeys(stackGroups).reduce(function (result, stackId) {
    var group = stackGroups[stackId],
      stackedData = group.stackedData,
      domain = stackedData.reduce(function (res, entry) {
        var s = getDomainOfSingle(entry.slice(startIndex, endIndex + 1));
        return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
      }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]).map(function (result) {
    return result === Infinity || result === -Infinity ? 0 : result;
  });
};
exports.getDomainOfStackGroups = getDomainOfStackGroups;
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
exports.MIN_VALUE_REG = MIN_VALUE_REG;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
exports.MAX_VALUE_REG = MAX_VALUE_REG;
var parseSpecifiedDomain = function parseSpecifiedDomain(specifiedDomain, dataDomain, allowDataOverflow) {
  if ((0, _FnUtils._isFn)(specifiedDomain)) {
    return specifiedDomain(dataDomain, allowDataOverflow);
  }
  if (!(0, _FnUtils._isArr)(specifiedDomain)) {
    return dataDomain;
  }
  var domain = [];
  if ((0, _DataUtils.isNumber)(specifiedDomain[0])) {
    domain[0] = allowDataOverflow ? specifiedDomain[0] : Math.min(specifiedDomain[0], dataDomain[0]);
  } else if (MIN_VALUE_REG.test(specifiedDomain[0])) {
    var value = +MIN_VALUE_REG.exec(specifiedDomain[0])[1];
    domain[0] = dataDomain[0] - value;
  } else if ((0, _FnUtils._isFn)(specifiedDomain[0])) {
    domain[0] = specifiedDomain[0](dataDomain[0]);
  } else {
    domain[0] = dataDomain[0];
  }
  if ((0, _DataUtils.isNumber)(specifiedDomain[1])) {
    domain[1] = allowDataOverflow ? specifiedDomain[1] : Math.max(specifiedDomain[1], dataDomain[1]);
  } else if (MAX_VALUE_REG.test(specifiedDomain[1])) {
    var _value = +MAX_VALUE_REG.exec(specifiedDomain[1])[1];
    domain[1] = dataDomain[1] + _value;
  } else if ((0, _FnUtils._isFn)(specifiedDomain[1])) {
    domain[1] = specifiedDomain[1](dataDomain[1]);
  } else {
    domain[1] = dataDomain[1];
  }
  return domain;
};

/**
 * Calculate the size between two category
 * @param  {Object} axis  The options of axis
 * @param  {Array}  ticks The ticks of axis
 * @param  {Boolean} isBar if items in axis are bars
 * @return {Number} Size
 */
exports.parseSpecifiedDomain = parseSpecifiedDomain;
var getBandSizeOfAxis = function getBandSizeOfAxis(axis, ticks, isBar) {
  if (axis && axis.scale && axis.scale.bandwidth) {
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks && ticks.length >= 2) {
    //const orderedTicks = _sortBy(ticks, o => o.coordinate);
    var orderedTicks = ticks.sort(function (o) {
      return o.coordinate;
    });
    var bandSize = Infinity;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var cur = orderedTicks[i],
        prev = orderedTicks[i - 1];
      bandSize = Math.min((cur.coordinate || 0) - (prev.coordinate || 0), bandSize);
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? undefined : 0;
};

/**
 * parse the domain of a category axis when a domain is specified
 * @param   {Array}        specifiedDomain  The domain specified by users
 * @param   {Array}        calculatedDomain The domain calculated by dateKey
 * @param   {ReactElement} axisChild        The axis element
 * @returns {Array}        domains
 */
exports.getBandSizeOfAxis = getBandSizeOfAxis;
var parseDomainOfCategoryAxis = function parseDomainOfCategoryAxis(specifiedDomain, calculatedDomain, axisChild) {
  return !specifiedDomain || !specifiedDomain.length ? calculatedDomain : (0, _FnUtils._isEqual)(specifiedDomain, _getAxisDomain(axisChild)) ? calculatedDomain : specifiedDomain;
};
exports.parseDomainOfCategoryAxis = parseDomainOfCategoryAxis;
var getTooltipItem = function getTooltipItem(graphicalItem, payload) {
  var _graphicalItem$props = graphicalItem.props,
    dataKey = _graphicalItem$props.dataKey,
    name = _graphicalItem$props.name,
    unit = _graphicalItem$props.unit,
    formatter = _graphicalItem$props.formatter,
    tooltipType = _graphicalItem$props.tooltipType,
    chartType = _graphicalItem$props.chartType;
  return (0, _extends7["default"])({}, (0, _ReactUtils.filterProps)(graphicalItem), {
    dataKey: dataKey,
    unit: unit,
    formatter: formatter,
    name: name || dataKey,
    color: getMainColorOfGraphicItem(graphicalItem),
    value: getValueByDataKey(payload, dataKey),
    type: tooltipType,
    payload: payload,
    chartType: chartType
  });
};
exports.getTooltipItem = getTooltipItem;
//# sourceMappingURL=ChartUtils.js.map