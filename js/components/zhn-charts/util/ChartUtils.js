"use strict";

exports.__esModule = true;
exports.getCoordinatesOfGrid = exports.getCateCoordinateOfLine = exports.getCateCoordinateOfBar = exports.getBaseValueOfBar = exports.getBarSizeList = exports.getBarPosition = exports.getBandSizeOfAxis = exports.findPositionOfBar = exports.combineEventHandlers = exports.checkDomainOfScale = exports.calculateActiveTickIndex = exports.appendOffsetOfLegend = exports.MIN_VALUE_REG = exports.MAX_VALUE_REG = void 0;
exports.getDomainOfDataByKey = getDomainOfDataByKey;
exports.truncateByDomain = exports.parseSpecifiedDomain = exports.parseScale = exports.parseDomainOfCategoryAxis = exports.offsetSign = exports.offsetPositive = exports.isLayoutVertical = exports.isLayoutHorizontal = exports.isLayoutCentric = exports.isCategoricalAxis = exports.isAxisTypeY = exports.isAxisTypeX = exports.getValueByDataKey = exports.getTooltipItem = exports.getTicksOfScale = exports.getTicksOfAxis = exports.getStackedDataOfItem = exports.getStackedData = exports.getStackGroupsByAxisId = exports.getMainColorOfGraphicItem = exports.getLegendProps = exports.getDomainOfStackGroups = exports.getDomainOfItemsWithSameAxis = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _d3Scale = require("../d3Scale");
var _d3Shape = require("../d3Shape");
var _FnUtils = require("./FnUtils");
var _scale = require("../scale");
var _Legend = require("../component/Legend");
var _DataUtils = require("./DataUtils");
var _ReactUtils = require("./ReactUtils");
const _getObjectKeys = Object.keys;
const _getAxisDomain = axis => (((axis || {}).type || {}).defaultProps || {}).domain;
const _fIs = str => v => v === str;
const isLayoutHorizontal = exports.isLayoutHorizontal = _fIs("horizontal");
const isLayoutVertical = exports.isLayoutVertical = _fIs("vertical");
const isLayoutCentric = exports.isLayoutCentric = _fIs("centric");
const isAxisTypeX = exports.isAxisTypeX = _fIs("xAxis");
const isAxisTypeY = exports.isAxisTypeY = _fIs("yAxis");
const getValueByDataKey = (obj, dataKey, defaultValue) => (0, _isTypeFn.isNullOrUndef)(obj) || (0, _isTypeFn.isNullOrUndef)(dataKey) ? defaultValue : (0, _isTypeFn.isNumOrStr)(dataKey) ? (0, _FnUtils._getByPropName)(obj, dataKey, defaultValue) : (0, _isTypeFn.isFn)(dataKey) ? dataKey(obj) : defaultValue;
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
  const flattenData = data.flatMap(entry => getValueByDataKey(entry, key));
  if (type === 'number') {
    const domain = flattenData.filter(entry => (0, _isTypeFn.isNumber)(entry) || parseFloat(entry));
    return domain.length ? [(0, _FnUtils._min)(domain), (0, _FnUtils._max)(domain)] : [Infinity, -Infinity];
  }
  const validateData = filterNil ? flattenData.filter(entry => !(0, _isTypeFn.isNullOrUndef)(entry)) : flattenData;
  return validateData.map(entry => (0, _isTypeFn.isNumOrStr)(entry) || entry instanceof Date ? entry : '');
}
const _getMinMax = (a, b) => a > b ? [b, a] : [a, b];
const _getTickCoordinate = tick => tick.coordinate;
const _calcAverageTicksCoordinate = (tickA, tickB) => tickA && tickB ? (_getTickCoordinate(tickA) + _getTickCoordinate(tickB)) / 2 : NaN;
const calculateActiveTickIndex = function (coordinate, ticks, unsortedTicks, axis) {
  var _ticks$length, _ticks;
  if (ticks === void 0) {
    ticks = [];
  }
  const len = (_ticks$length = (_ticks = ticks) == null ? void 0 : _ticks.length) != null ? _ticks$length : 0;
  // if there are 1 or less ticks ticks then the active tick is at index 0
  if (len <= 1) {
    return 0;
  }
  const endIndex = len - 1;
  if (axis && axis.axisType === 'angleAxis' && Math.abs(Math.abs(axis.range[1] - axis.range[0]) - 360) <= 1e-6) {
    const {
      range
    } = axis;
    // ticks are distributed in a circle
    for (let i = 0; i < len; i++) {
      const beforeTick = i > 0 ? unsortedTicks[i - 1] : unsortedTicks[endIndex],
        before = _getTickCoordinate(beforeTick),
        cur = _getTickCoordinate(unsortedTicks[i]),
        afterTick = i >= len - 1 ? unsortedTicks[0] : unsortedTicks[i + 1],
        after = _getTickCoordinate(afterTick);
      let sameDirectionCoord;
      if ((0, _DataUtils.mathSign)(cur - before) !== (0, _DataUtils.mathSign)(after - cur)) {
        let diffInterval = [];
        if ((0, _DataUtils.mathSign)(after - cur) === (0, _DataUtils.mathSign)(range[1] - range[0])) {
          sameDirectionCoord = after;
          const curInRange = cur + range[1] - range[0];
          diffInterval = _getMinMax(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          const afterInRange = after + range[1] - range[0];
          diffInterval = _getMinMax(cur, (afterInRange + cur) / 2);
        }
        const sameInterval = _getMinMax(cur, (sameDirectionCoord + cur) / 2);
        if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
          return unsortedTicks[i].index;
        }
      } else {
        const [min, max] = _getMinMax(before, after);
        if (coordinate > (min + cur) / 2 && coordinate <= (max + cur) / 2) {
          return unsortedTicks[i].index;
        }
      }
    }
  }
  for (let i = 0; i < len; i++) {
    const _averageUp = _calcAverageTicksCoordinate(ticks[i], ticks[i + 1]),
      _averageDown = _calcAverageTicksCoordinate(ticks[i], ticks[i - 1]);
    if (i === 0 && coordinate <= _averageUp || i > 0 && i < endIndex && coordinate > _averageDown && coordinate <= _averageUp || i === endIndex && coordinate > _averageDown) {
      return ticks[i].index;
    }
  }
  return -1;
};

/**
 * Get the main color of each graphic item
 * @param  {ReactElement} item A graphic item
 * @return {String}            Color
 */
exports.calculateActiveTickIndex = calculateActiveTickIndex;
const getMainColorOfGraphicItem = item => {
  const {
      type: {
        displayName
      }
    } = item,
    {
      stroke,
      fill
    } = item.props;
  let result;
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
const _getLegendWidthOrHeight = (props, chartWidth) => {
  const {
    layout,
    height
  } = props;
  return isLayoutVertical(layout) && (0, _isTypeFn.isNumber)(height) ? {
    height
  } : isLayoutHorizontal(layout) ? {
    width: props.width || chartWidth
  } : null;
};
const getLegendProps = _ref => {
  let {
    children,
    formattedGraphicalItems,
    legendWidth,
    legendContent
  } = _ref;
  const legendItem = (0, _ReactUtils.findChildByType)(children, _Legend.Legend);
  if (!legendItem) {
    return null;
  }
  const legendItemProps = legendItem.props;
  let legendData;
  if (legendItemProps && legendItemProps.payload) {
    legendData = legendItemProps.payload;
  } else if (legendContent === 'children') {
    legendData = (formattedGraphicalItems || []).reduce((result, _ref2) => {
      let {
        item,
        props
      } = _ref2;
      const data = props.sectors || props.data || [];
      return result.concat(data.map(entry => ({
        type: legendItemProps.iconType || item.props.legendType,
        color: entry.fill,
        value: entry.name,
        payload: entry
      })));
    }, []);
  } else {
    legendData = (formattedGraphicalItems || []).map(_ref3 => {
      let {
        item
      } = _ref3;
      const {
        dataKey,
        name,
        legendType,
        hide
      } = item.props;
      return {
        inactive: hide,
        dataKey,
        type: legendItemProps.iconType || legendType || 'square',
        color: getMainColorOfGraphicItem(item),
        value: name || dataKey,
        payload: item.props
      };
    });
  }
  return Object.assign({}, legendItemProps, _getLegendWidthOrHeight(legendItemProps, legendWidth), {
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
const getBarSizeList = _ref4 => {
  let {
    barSize: globalSize,
    stackGroups = {}
  } = _ref4;
  if (!stackGroups) {
    return {};
  }
  const result = {},
    numericAxisIds = _getObjectKeys(stackGroups);
  for (let i = 0, len = numericAxisIds.length; i < len; i++) {
    const sgs = stackGroups[numericAxisIds[i]].stackGroups,
      stackIds = _getObjectKeys(sgs);
    for (let j = 0, sLen = stackIds.length; j < sLen; j++) {
      const {
          items,
          cateAxisId
        } = sgs[stackIds[j]],
        barItems = items.filter(item => (0, _ReactUtils.getDisplayName)(item.type).indexOf('Bar') >= 0);
      if (barItems && barItems.length) {
        const {
            barSize: selfSize
          } = barItems[0].props,
          cateId = barItems[0].props[cateAxisId];
        if (!result[cateId]) {
          result[cateId] = [];
        }
        result[cateId].push({
          item: barItems[0],
          stackList: barItems.slice(1),
          barSize: (0, _isTypeFn.isNullOrUndef)(selfSize) ? globalSize : selfSize
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
const getBarPosition = _ref5 => {
  let {
    barGap,
    barCategoryGap,
    bandSize,
    sizeList = [],
    maxBarSize
  } = _ref5;
  const len = sizeList.length;
  if (len < 1) {
    return null;
  }
  let realBarGap = (0, _DataUtils.getPercentValue)(barGap, bandSize, 0, true);
  let result;
  // whether or not is barSize setted by user
  if (sizeList[0].barSize === +sizeList[0].barSize) {
    let useFull = false;
    let fullBarSize = bandSize / len;
    let sum = sizeList.reduce((res, entry) => res + entry.barSize || 0, 0);
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
    const offset = (bandSize - sum) / 2 >> 0;
    let prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce((res, entry) => {
      const newRes = [...res, {
        item: entry.item,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          size: useFull ? fullBarSize : entry.barSize
        }
      }];
      prev = newRes[newRes.length - 1].position;
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(item => {
          newRes.push({
            item,
            position: prev
          });
        });
      }
      return newRes;
    }, []);
  } else {
    const offset = (0, _DataUtils.getPercentValue)(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    let originalSize = (bandSize - 2 * offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize >>= 0;
    }
    const size = maxBarSize === +maxBarSize ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce((res, entry, i) => {
      const newRes = [...res, {
        item: entry.item,
        position: {
          offset: offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
          size
        }
      }];
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach(item => {
          newRes.push({
            item,
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
const appendOffsetOfLegend = (offset, items, props, legendBox) => {
  const {
      children,
      width,
      margin
    } = props,
    legendWidth = width - (margin.left || 0) - (margin.right || 0),
    legendProps = getLegendProps({
      children,
      legendWidth
    });
  let newOffset = offset;
  if (legendProps) {
    const box = legendBox || {},
      {
        align,
        verticalAlign,
        layout
      } = legendProps;
    if ((isLayoutVertical(layout) || isLayoutHorizontal(layout) && verticalAlign === 'middle') && (0, _isTypeFn.isNumber)(offset[align])) {
      newOffset = Object.assign({}, offset, {
        [align]: newOffset[align] + (box.width || 0)
      });
    }
    if ((isLayoutHorizontal(layout) || isLayoutVertical(layout) && align === 'center') && (0, _isTypeFn.isNumber)(offset[verticalAlign])) {
      newOffset = Object.assign({}, offset, {
        [verticalAlign]: newOffset[verticalAlign] + (box.height || 0)
      });
    }
  }
  return newOffset;
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
exports.appendOffsetOfLegend = appendOffsetOfLegend;
const getDomainOfItemsWithSameAxis = (data, items, type, layout, filterNil) => {
  const domains = items.map(item => {
    const {
      dataKey
    } = item.props;
    return getDomainOfDataByKey(data, dataKey, type, filterNil);
  });
  if (type === 'number') {
    // Calculate the domain of number axis
    return domains.reduce((result, entry) => [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])], [Infinity, -Infinity]);
  }
  const tag = {};
  // Get the union set of category axis
  return domains.reduce((result, entry) => {
    for (let i = 0, len = entry.length; i < len; i++) {
      if (!tag[entry[i]]) {
        tag[entry[i]] = true;
        result.push(entry[i]);
      }
    }
    return result;
  }, []);
};
exports.getDomainOfItemsWithSameAxis = getDomainOfItemsWithSameAxis;
const isCategoricalAxis = (layout, axisType) => isLayoutHorizontal(layout) && axisType === 'xAxis' || isLayoutVertical(layout) && axisType === 'yAxis' || isLayoutCentric(layout) && axisType === 'angleAxis' || layout === 'radial' && axisType === 'radiusAxis';

/**
 * Calculate the Coordinates of grid
 * @param  {Array} ticks The ticks in axis
 * @param {Number} min   The minimun value of axis
 * @param {Number} max   The maximun value of axis
 * @return {Array}       Coordinates
 */
exports.isCategoricalAxis = isCategoricalAxis;
const getCoordinatesOfGrid = (ticks, min, max) => {
  let hasMin, hasMax;
  const values = ticks.map(entry => {
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
const getTicksOfAxis = (axis, isGrid, isAll) => {
  if (!axis) {
    return null;
  }
  const {
      scale
    } = axis,
    {
      duplicateDomain,
      type,
      range
    } = axis,
    offsetForBand = axis.realScaleType === 'scaleBand' ? scale.bandwidth() / 2 : 2;
  let offset = (isGrid || isAll) && type === 'category' && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axis.axisType === 'angleAxis' && (range == null ? void 0 : range.length) >= 2 ? (0, _DataUtils.mathSign)(range[0] - range[1]) * 2 * offset : offset;
  // The ticks set by user should only affect the ticks adjacent to axis line
  if (isGrid && (axis.ticks || axis.niceTicks)) {
    const result = (axis.ticks || axis.niceTicks).map(entry => {
      const scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset
      };
    });
    return result.filter(row => !(0, _isTypeFn.isNaN)(row.coordinate));
  }
  // When axis is a categorial axis, but the type of axis is number or the scale of axis is not "auto"
  if (axis.isCategorical && axis.categoricalDomain) {
    return axis.categoricalDomain.map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      index,
      offset
    }));
  }
  if (scale.ticks && !isAll) {
    return scale.ticks(axis.tickCount).map(entry => ({
      coordinate: scale(entry) + offset,
      value: entry,
      offset
    }));
  }
  // When axis has duplicated text, serial numbers are used to generate scale
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain ? duplicateDomain[entry] : entry,
    index,
    offset
  }));
};

/**
 * combine the handlers
 * @param  {Function} defaultHandler Internal private handler
 * @param  {Function} parentHandler  Handler function specified in parent component
 * @param  {Function} childHandler   Handler function specified in child component
 * @return {Function}                The combined handler
 */
exports.getTicksOfAxis = getTicksOfAxis;
const combineEventHandlers = (defaultHandler, parentHandler, childHandler) => {
  let customizedHandler;
  if ((0, _isTypeFn.isFn)(childHandler)) {
    customizedHandler = childHandler;
  } else if ((0, _isTypeFn.isFn)(parentHandler)) {
    customizedHandler = parentHandler;
  }
  if ((0, _isTypeFn.isFn)(defaultHandler) || customizedHandler) {
    return (arg1, arg2, arg3, arg4) => {
      if ((0, _isTypeFn.isFn)(defaultHandler)) {
        defaultHandler(arg1, arg2, arg3, arg4);
      }
      if ((0, _isTypeFn.isFn)(customizedHandler)) {
        customizedHandler(arg1, arg2, arg3, arg4);
      }
    };
  }
  return null;
};
exports.combineEventHandlers = combineEventHandlers;
const _crScaleBand = () => ({
  scale: (0, _d3Scale.scaleBand)(),
  realScaleType: 'band'
});
const _crScaleLinear = () => ({
  scale: (0, _d3Scale.scaleLinear)(),
  realScaleType: 'linear'
});
const _crScalePoint = () => ({
  scale: (0, _d3Scale.scalePoint)(),
  realScaleType: 'point'
});

/**
 * Parse the scale function of axis
 * @param  {Object}   axis          The option of axis
 * @param  {String}   chartType     The displayName of chart
 * @param  {Boolean}  hasBar        if it has a bar
 * @return {Function}               The scale function
 */
const parseScale = (axis, chartType, hasBar) => {
  const {
    scale,
    type,
    layout,
    axisType
  } = axis;
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
  return (0, _isTypeFn.isFn)(scale) ? {
    scale
  } : _crScalePoint();
};
exports.parseScale = parseScale;
const EPS = 1e-4;
const checkDomainOfScale = scale => {
  const domain = scale.domain();
  if (!domain || domain.length <= 2) {
    return;
  }
  const len = domain.length,
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
const findPositionOfBar = (barPosition, child) => {
  if (!barPosition) {
    return null;
  }
  for (let i = 0, len = barPosition.length; i < len; i++) {
    if (barPosition[i].item === child) {
      return barPosition[i].position;
    }
  }
  return null;
};
exports.findPositionOfBar = findPositionOfBar;
const truncateByDomain = (value, domain) => {
  if (!domain || domain.length !== 2 || !(0, _isTypeFn.isNumber)(domain[0]) || !(0, _isTypeFn.isNumber)(domain[1])) {
    return value;
  }
  const min = Math.min(domain[0], domain[1]),
    max = Math.max(domain[0], domain[1]),
    result = [value[0], value[1]];
  if (!(0, _isTypeFn.isNumber)(value[0]) || value[0] < min) {
    result[0] = min;
  }
  if (!(0, _isTypeFn.isNumber)(value[1]) || value[1] > max) {
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
const offsetSign = series => {
  const n = series.length;
  if (n <= 0) {
    return;
  }
  for (let j = 0, m = series[0].length; j < m; ++j) {
    let positive = 0;
    let negative = 0;
    for (let i = 0; i < n; ++i) {
      const value = (0, _isTypeFn.isNaN)(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
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
const offsetPositive = series => {
  const n = series.length;
  if (n <= 0) {
    return;
  }
  for (let j = 0, m = series[0].length; j < m; ++j) {
    let positive = 0;
    for (let i = 0; i < n; ++i) {
      const value = (0, _isTypeFn.isNaN)(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
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
const STACK_OFFSET_MAP = {
  sign: offsetSign,
  expand: _d3Shape.stackOffsetExpand,
  none: _d3Shape.stackOffsetNone,
  silhouette: _d3Shape.stackOffsetSilhouette,
  wiggle: _d3Shape.stackOffsetWiggle,
  positive: offsetPositive
};
const getStackedData = (data, stackItems, offsetType) => {
  const dataKeys = stackItems.map(item => item.props.dataKey),
    stack = (0, _d3Shape.stack)().keys(dataKeys).value((d, key) => +getValueByDataKey(d, key, 0)).order(_d3Shape.stackOrderNone).offset(STACK_OFFSET_MAP[offsetType]);
  return stack(data);
};
exports.getStackedData = getStackedData;
const getStackGroupsByAxisId = (data, _items, numericAxisId, cateAxisId, offsetType, reverseStackOrder) => {
  if (!data) {
    return null;
  }
  // reversing items to affect render order (for layering)
  const items = reverseStackOrder ? _items.reverse() : _items,
    stackGroups = items.reduce((result, item) => {
      const {
        stackId,
        hide
      } = item.props;
      if (hide) {
        return result;
      }
      const axisId = item.props[numericAxisId];
      const parentGroup = result[axisId] || {
        hasStack: false,
        stackGroups: {}
      };
      if ((0, _isTypeFn.isNumOrStr)(stackId)) {
        const childGroup = parentGroup.stackGroups[stackId] || {
          numericAxisId,
          cateAxisId,
          items: []
        };
        childGroup.items.push(item);
        parentGroup.hasStack = true;
        parentGroup.stackGroups[stackId] = childGroup;
      } else {
        parentGroup.stackGroups[(0, _DataUtils.uniqueId)('_stackId_')] = {
          numericAxisId,
          cateAxisId,
          items: [item]
        };
      }
      return Object.assign({}, result, {
        [axisId]: parentGroup
      });
    }, {});
  return _getObjectKeys(stackGroups).reduce((result, axisId) => {
    const group = stackGroups[axisId];
    if (group.hasStack) {
      group.stackGroups = _getObjectKeys(group.stackGroups).reduce((res, stackId) => {
        const g = group.stackGroups[stackId];
        return Object.assign({}, res, {
          [stackId]: {
            numericAxisId,
            cateAxisId,
            items: g.items,
            stackedData: getStackedData(data, g.items, offsetType)
          }
        });
      }, {});
    }
    return Object.assign({}, result, {
      [axisId]: group
    });
  }, {});
};

/**
 * Configure the scale function of axis
 * @param {Object} scale The scale function
 * @param {Object} opts  The configuration of axis
 * @return {Object}      null
 */
exports.getStackGroupsByAxisId = getStackGroupsByAxisId;
const getTicksOfScale = (scale, opts) => {
  const {
      realScaleType,
      type,
      tickCount,
      originalDomain,
      allowDecimals
    } = opts,
    scaleType = realScaleType || opts.scale;
  if (scaleType !== 'auto' && scaleType !== 'linear') {
    return null;
  }
  if (tickCount && type === 'number' && originalDomain && (originalDomain[0] === 'auto' || originalDomain[1] === 'auto')) {
    // Calculate the ticks by the number of grid when the axis is a number axis
    const domain = scale.domain();
    if (!domain.length) {
      return null;
    }
    const tickValues = (0, _scale.getNiceTickValues)(domain, tickCount, allowDecimals);
    scale.domain([(0, _FnUtils._min)(tickValues), (0, _FnUtils._max)(tickValues)]);
    return {
      niceTicks: tickValues
    };
  }
  if (tickCount && type === 'number') {
    const domain = scale.domain(),
      tickValues = (0, _scale.getTickValuesFixedDomain)(domain, tickCount, allowDecimals);
    return {
      niceTicks: tickValues
    };
  }
  return null;
};
exports.getTicksOfScale = getTicksOfScale;
const getCateCoordinateOfLine = _ref6 => {
  let {
    axis,
    ticks,
    bandSize,
    entry,
    index,
    dataKey
  } = _ref6;
  if (axis.type === 'category') {
    // find coordinate of category axis by the value of category
    if (!axis.allowDuplicatedCategory && axis.dataKey && !(0, _isTypeFn.isNullOrUndef)(entry[axis.dataKey])) {
      const matchedTick = (0, _DataUtils.findEntryInArray)(ticks, 'value', entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
  }
  const value = getValueByDataKey(entry, !(0, _isTypeFn.isNullOrUndef)(dataKey) ? dataKey : axis.dataKey);
  return !(0, _isTypeFn.isNullOrUndef)(value) ? axis.scale(value) : null;
};
exports.getCateCoordinateOfLine = getCateCoordinateOfLine;
const getCateCoordinateOfBar = _ref7 => {
  let {
    axis,
    ticks,
    offset,
    bandSize,
    entry,
    index
  } = _ref7;
  if (axis.type === 'category') {
    return ticks[index] ? ticks[index].coordinate + offset : null;
  }
  const value = getValueByDataKey(entry, axis.dataKey, axis.domain[index]);
  return !(0, _isTypeFn.isNullOrUndef)(value) ? axis.scale(value) - bandSize / 2 + offset : null;
};
exports.getCateCoordinateOfBar = getCateCoordinateOfBar;
const getBaseValueOfBar = _ref8 => {
  let {
    numericAxis
  } = _ref8;
  const domain = numericAxis.scale.domain();
  if (numericAxis.type === 'number') {
    const min = Math.min(domain[0], domain[1]),
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
const getStackedDataOfItem = (item, stackGroups) => {
  const {
    stackId
  } = item.props;
  if ((0, _isTypeFn.isNumOrStr)(stackId)) {
    const group = stackGroups[stackId];
    if (group && group.items.length) {
      let itemIndex = -1;
      for (let i = 0, len = group.items.length; i < len; i++) {
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
const getDomainOfSingle = data => data.reduce((result, entry) => [(0, _FnUtils._min)(entry.concat([result[0]]).filter(_isTypeFn.isNumber)), (0, _FnUtils._max)(entry.concat([result[1]]).filter(_isTypeFn.isNumber))], [Infinity, -Infinity]);
const getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => _getObjectKeys(stackGroups).reduce((result, stackId) => {
  const group = stackGroups[stackId],
    {
      stackedData
    } = group,
    domain = stackedData.reduce((res, entry) => {
      const s = getDomainOfSingle(entry.slice(startIndex, endIndex + 1));
      return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
    }, [Infinity, -Infinity]);
  return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
}, [Infinity, -Infinity]).map(result => result === Infinity || result === -Infinity ? 0 : result);
exports.getDomainOfStackGroups = getDomainOfStackGroups;
const MIN_VALUE_REG = exports.MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
const MAX_VALUE_REG = exports.MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
const parseSpecifiedDomain = (specifiedDomain, dataDomain, allowDataOverflow) => {
  if ((0, _isTypeFn.isFn)(specifiedDomain)) {
    return specifiedDomain(dataDomain, allowDataOverflow);
  }
  if (!(0, _isTypeFn.isArr)(specifiedDomain)) {
    return dataDomain;
  }
  const domain = [];
  if ((0, _isTypeFn.isNumber)(specifiedDomain[0])) {
    domain[0] = allowDataOverflow ? specifiedDomain[0] : Math.min(specifiedDomain[0], dataDomain[0]);
  } else if (MIN_VALUE_REG.test(specifiedDomain[0])) {
    const value = +MIN_VALUE_REG.exec(specifiedDomain[0])[1];
    domain[0] = dataDomain[0] - value;
  } else if ((0, _isTypeFn.isFn)(specifiedDomain[0])) {
    domain[0] = specifiedDomain[0](dataDomain[0]);
  } else {
    domain[0] = dataDomain[0];
  }
  if ((0, _isTypeFn.isNumber)(specifiedDomain[1])) {
    domain[1] = allowDataOverflow ? specifiedDomain[1] : Math.max(specifiedDomain[1], dataDomain[1]);
  } else if (MAX_VALUE_REG.test(specifiedDomain[1])) {
    const value = +MAX_VALUE_REG.exec(specifiedDomain[1])[1];
    domain[1] = dataDomain[1] + value;
  } else if ((0, _isTypeFn.isFn)(specifiedDomain[1])) {
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
const getBandSizeOfAxis = (axis, ticks, isBar) => {
  if (axis && axis.scale && axis.scale.bandwidth) {
    const bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks && ticks.length >= 2) {
    //const orderedTicks = _sortBy(ticks, o => o.coordinate);
    const orderedTicks = ticks.sort(o => o.coordinate);
    let bandSize = Infinity;
    for (let i = 1, len = orderedTicks.length; i < len; i++) {
      const cur = orderedTicks[i],
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
const parseDomainOfCategoryAxis = (specifiedDomain, calculatedDomain, axisChild) => !specifiedDomain || !specifiedDomain.length ? calculatedDomain : (0, _FnUtils._isEqual)(specifiedDomain, _getAxisDomain(axisChild)) ? calculatedDomain : specifiedDomain;
exports.parseDomainOfCategoryAxis = parseDomainOfCategoryAxis;
const getTooltipItem = (graphicalItem, payload) => {
  const {
    dataKey,
    name,
    unit,
    formatter,
    tooltipType,
    chartType
  } = graphicalItem.props;
  return {
    fill: graphicalItem.fill,
    radius: graphicalItem.radius,
    stroke: graphicalItem.stroke,
    strokeWidth: graphicalItem.strokeWidth,
    strokeDasharray: graphicalItem.strokeDasharray,
    dataKey,
    unit,
    formatter,
    name: name || dataKey,
    color: getMainColorOfGraphicItem(graphicalItem),
    value: getValueByDataKey(payload, dataKey),
    type: tooltipType,
    payload,
    chartType
  };
};
exports.getTooltipItem = getTooltipItem;
//# sourceMappingURL=ChartUtils.js.map