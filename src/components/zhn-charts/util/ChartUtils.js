import {
  isArr,
  isNaN,
  isNullOrUndef,
  isFn,
  isNumber,
  isNumOrStr
} from '../../../utils/isTypeFn';

import {
  scaleBand,
  scalePoint,
  scaleLinear
} from '../d3Scale';

/*
import {
  stack as shapeStack,
  stackOffsetExpand,
  stackOffsetNone,
  stackOffsetSilhouette,
  stackOffsetWiggle,
  stackOrderNone
} from '../d3Shape';
*/

import {
  _getByPropName,
  _min,
  _max,
  _isEqual
} from './FnUtils';

import {
  getNiceTickValues,
  getTickValuesFixedDomain
} from '../scale';

import { Legend } from '../component/Legend';
import {
  findEntryInArray,
  getPercentValue,
  uniqueId
} from './DataUtils';
import {
  findChildByType,
  getDisplayName
} from './ReactUtils';

const _getObjectKeys = Object.keys;

const _getAxisDomain = (
  axis
) => (((axis || {})
  .type || {})
  .defaultProps || {})
  .domain;

const _fIs = (str) => v => v === str;
export const isLayoutHorizontal = _fIs("horizontal")
export const isLayoutVertical = _fIs("vertical")
export const isLayoutCentric = _fIs("centric")

export const isAxisTypeX = _fIs("xAxis")
export const isAxisTypeY = _fIs("yAxis")

export const getValueByDataKey = (
  obj,
  dataKey,
  defaultValue
) => isNullOrUndef(obj) || isNullOrUndef(dataKey)
  ? defaultValue
  : isNumOrStr(dataKey)
      ? _getByPropName(obj, dataKey, defaultValue)
      : isFn(dataKey)
          ? dataKey(obj)
          : defaultValue;
/**
 * Get domain of data by key
 * @param  {Array}   data      The data displayed in the chart
 * @param  {String}  key       The unique key of a group of data
 * @param  {String}  type      The type of axis
 * @param  {Boolean} filterNil Whether or not filter nil values
 * @return {Array} Domain of data
 */
export function getDomainOfDataByKey(
  data,
  key,
  type,
  filterNil
) {
  //const flattenData = _flatMap(data, entry => getValueByDataKey(entry, key));
  const flattenData = data.flatMap(entry => getValueByDataKey(entry, key));
  if (type === 'number') {
    const domain = flattenData.filter(entry => isNumber(entry) || parseFloat(entry));
    return domain.length ? [_min(domain), _max(domain)] : [Infinity, -Infinity];
  }
  const validateData = filterNil ? flattenData.filter(entry => !isNullOrUndef(entry)) : flattenData;
  return validateData
   .map(entry => (isNumOrStr(entry) || entry instanceof Date ? entry : ''));
}

const _getTickCoordinate = tick => tick.coordinate;
const _calcAverageTicksCoordinate = (
  tickA,
  tickB
) => tickA && tickB
  ? (_getTickCoordinate(tickA) + _getTickCoordinate(tickB)) / 2
  : NaN;

export const calculateActiveTickIndex = (
  coordinate,
  ticks = []
) => {
  const len = ticks?.length ?? 0;
  // if there are 1 or less ticks ticks then the active tick is at index 0
  if (len <= 1) {
    return 0;
  }
  const endIndex = len - 1;

  for (let i = 0; i < len; i++) {
    const _averageUp = _calcAverageTicksCoordinate(ticks[i], ticks[i + 1])
    , _averageDown = _calcAverageTicksCoordinate(ticks[i], ticks[i - 1]);
    if ((i === 0 && coordinate <= _averageUp)
      || (i > 0 && i < endIndex && coordinate > _averageDown && coordinate <= _averageUp)
      || (i === endIndex && coordinate > _averageDown)
    ) {
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
const getMainColorOfGraphicItem = (
  item
) => {
  const {
    type: { displayName }
   } = item
  , {
    stroke,
    fill
  } = item.props;

  return  displayName === 'Line'
    ? stroke
    : displayName === 'Area'
    ? stroke && stroke !== 'none' ? stroke : fill
    : fill;
};

const _getLegendWidthOrHeight = (
  props,
  chartWidth
) => {
  const {
    layout,
    height
  } = props;
  return isLayoutVertical(layout) && isNumber(height)
    ? { height }
    : isLayoutHorizontal(layout)
    ? { width: props.width || chartWidth }
    : null;
}


export const getLegendProps = ({
  children,
  formattedGraphicalItems,
  legendWidth
}) => {
  const legendItem = findChildByType(children, Legend);
  if (!legendItem) {
    return [];
  }
  const legendItemProps = legendItem.props
  , legendData = legendItemProps && legendItemProps.payload
    ? legendItemProps.payload
    : (formattedGraphicalItems || []).map(({ item }) => {
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

  return [{
    ...legendItemProps,
    ..._getLegendWidthOrHeight(legendItemProps, legendWidth),
    payload: legendData,
  }, legendItem];
};

/**
 * Calculate the size of all groups for stacked bar graph
 * @param  {Object} stackGroups The items grouped by axisId and stackId
 * @return {Object} The size of all groups
 */
export const getBarSizeList = ({
  barSize: globalSize,
  stackGroups = {}
}) => {
  if (!stackGroups) {
    return {};
  }
  const result = {}
  , numericAxisIds = _getObjectKeys(stackGroups)
  for (let i = 0, len = numericAxisIds.length; i < len; i++) {
    const sgs = stackGroups[numericAxisIds[i]].stackGroups
    , stackIds = _getObjectKeys(sgs);
    for (let j = 0, sLen = stackIds.length; j < sLen; j++) {
      const {
        items,
        cateAxisId
      } = sgs[stackIds[j]]
      , barItems = items
         .filter((item) => getDisplayName(item.type).indexOf('Bar') >= 0);
      if (barItems && barItems.length) {
        const {
          barSize: selfSize
        } = barItems[0].props
        , cateId = barItems[0].props[cateAxisId];
        if (!result[cateId]) {
          result[cateId] = [];
        }
        result[cateId].push({
          item: barItems[0],
          stackList: barItems.slice(1),
          barSize: isNullOrUndef(selfSize) ? globalSize : selfSize,
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
export const getBarPosition = ({
  barGap,
  barCategoryGap,
  bandSize,
  sizeList = [],
  maxBarSize
}) => {
  const len = sizeList.length;
  if (len < 1) {
    return null;
  }
  let realBarGap = getPercentValue(barGap, bandSize, 0, true);
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
    const offset = ((bandSize - sum) / 2) >> 0;
    let prev = { offset: offset - realBarGap, size: 0 };
    result = sizeList.reduce((res, entry) => {
      const newRes = [
        ...res,
        {
          item: entry.item,
          position: {
            offset: prev.offset + prev.size + realBarGap,
            size: useFull ? fullBarSize : entry.barSize,
          }
        }
      ];
      prev = newRes[newRes.length - 1].position;
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach((item) => {
          newRes.push({ item, position: prev });
        });
      }
      return newRes;
    }, []);
  } else {
    const offset = getPercentValue(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    let originalSize = (bandSize - 2 * offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize >>= 0;
    }
    const size = maxBarSize === +maxBarSize
      ? Math.min(originalSize, maxBarSize)
      : originalSize;
    result = sizeList.reduce((res, entry, i) => {
      const newRes = [
        ...res,
        {
          item: entry.item,
          position: {
            offset: offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
            size
          }
        }
      ];
      if (entry.stackList && entry.stackList.length) {
        entry.stackList.forEach((item) => {
          newRes.push({ item, position: newRes[newRes.length - 1].position });
        });
      }
      return newRes;
    }, []);
  }
  return result;
};

export const appendOffsetOfLegend = (
  offset,
  items,
  props,
  legendBox
) => {
  const { children, width, margin } = props
  , legendWidth = width - (margin.left || 0) - (margin.right || 0)
  , legendProps = getLegendProps({ children, legendWidth })[0];
  let newOffset = offset;
  if (legendProps) {
    const box = legendBox || {}
    , { align, verticalAlign, layout } = legendProps;
    if ((isLayoutVertical(layout) || (isLayoutHorizontal(layout) && verticalAlign === 'middle'))
      && isNumber(offset[align])
    ) {
      newOffset = {
        ...offset,
        [align]: newOffset[align] + (box.width || 0)
      };
    }
    if ((isLayoutHorizontal(layout) || (isLayoutVertical(layout) && align === 'center'))
       && isNumber(offset[verticalAlign])
     ) {
      newOffset = {
        ...offset,
        [verticalAlign]: newOffset[verticalAlign] + (box.height || 0)
      };
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
export const getDomainOfItemsWithSameAxis = (
  data,
  items,
  type,
  layout,
  filterNil
) => {
  const domains = items.map(item => {
    const { dataKey } = item.props;
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

export const isCategoricalAxis = (
  layout,
  axisType
) => (isLayoutHorizontal(layout) && axisType === 'xAxis')
  || (isLayoutVertical(layout) && axisType === 'yAxis')
  || (isLayoutCentric(layout) && axisType === 'angleAxis')
  || (layout === 'radial' && axisType === 'radiusAxis');

/**
 * Calculate the Coordinates of grid
 * @param  {Array} ticks The ticks in axis
 * @param {Number} min   The minimun value of axis
 * @param {Number} max   The maximun value of axis
 * @return {Array}       Coordinates
 */
export const getCoordinatesOfGrid = (
  ticks,
  min,
  max
) => {
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
export const getTicksOfAxis = (
  axis,
  isGrid,
  isAll
) => {
  if (!axis) {
    return null;
  }
  const { scale } = axis
  , {
    duplicateDomain,
    type
  } = axis
  , offsetForBand = axis.realScaleType === 'scaleBand'
     ? scale.bandwidth() / 2
     : 2
  , offset = (isGrid || isAll) && type === 'category' && scale.bandwidth
     ? scale.bandwidth() / offsetForBand
     : 0;

  // The ticks set by user should only affect the ticks adjacent to axis line
  if (isGrid && (axis.ticks || axis.niceTicks)) {
    const result = (axis.ticks || axis.niceTicks).map((entry) => {
      const scaleContent = duplicateDomain
        ? duplicateDomain.indexOf(entry)
        : entry;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset
      };
    });
    return result.filter((row) => !isNaN(row.coordinate));
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
    return scale
      .ticks(axis.tickCount)
      .map((entry) => ({ coordinate: scale(entry) + offset, value: entry, offset }));
  }
  // When axis has duplicated text, serial numbers are used to generate scale
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain
      ? duplicateDomain[entry]
      : entry,
    index,
    offset
  }));
};

const _crScaleBand = () => ({
  scale: scaleBand(),
  realScaleType: 'band'
});
const _crScaleLinear = () => ({
  scale: scaleLinear(),
  realScaleType: 'linear'
});
const _crScalePoint = () => ({
  scale: scalePoint(),
  realScaleType: 'point'
});

/**
 * Parse the scale function of axis
 * @param  {Object}   axis          The option of axis
 * @param  {String}   chartType     The displayName of chart
 * @param  {Boolean}  hasBar        if it has a bar
 * @return {Function}               The scale function
 */
export const parseScale = (
  axis,
  chartType,
  hasBar
) => {
  const {
    scale,
    type,
    layout,
    axisType
  } = axis;
  if (scale === 'auto') {
    if (layout === 'radial' && axisType === 'radiusAxis') {
      return _crScaleBand()
    }
    if (layout === 'radial' && axisType === 'angleAxis') {
      return _crScaleLinear();
    }
    if (type === 'category'
       && chartType
       && (chartType.indexOf('LineChart') >= 0
       || chartType.indexOf('AreaChart') >= 0
       || (chartType.indexOf('ComposedChart') >= 0 && !hasBar))
    ) {
      return _crScalePoint();
    }
    if (type === 'category') {
      return _crScaleBand()
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
  return isFn(scale)
    ? { scale }
    : _crScalePoint();
};

const EPS = 1e-4;
export const checkDomainOfScale = (
  scale
) => {
  const domain = scale.domain();
  if (!domain || domain.length <= 2) {
    return;
  }
  const len = domain.length
  , range = scale.range()
  , min = Math.min(range[0], range[1]) - EPS
  , max = Math.max(range[0], range[1]) + EPS
  , first = scale(domain[0])
  , last = scale(domain[len - 1]);
  if (first < min || first > max || last < min || last > max) {
    scale.domain([domain[0], domain[len - 1]]);
  }
};

export const findPositionOfBar = (
  barPosition,
  child
) => {
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

export const truncateByDomain = (
  value,
  domain
) => {
  if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) {
    return value;
  }
  const min = Math.min(domain[0], domain[1])
  , max = Math.max(domain[0], domain[1])
  , result = [value[0], value[1]];
  if (!isNumber(value[0]) || value[0] < min) {
    result[0] = min;
  }
  if (!isNumber(value[1]) || value[1] > max) {
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

export const offsetSign = (
  series
) => {
  const n = series.length;
  if (n <= 0) {
      return;
  }
  for (let j = 0, m = series[0].length; j < m; ++j) {
    let positive = 0;
    let negative = 0;
    for (let i = 0; i < n; ++i) {
      const value = isNaN(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
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

export const offsetPositive = (
  series
) => {
  const n = series.length;
  if (n <= 0) {
    return;
  }
  for (let j = 0, m = series[0].length; j < m; ++j) {
    let positive = 0;
    for (let i = 0; i < n; ++i) {
      const value = isNaN(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
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

/*
const STACK_OFFSET_MAP = {
    sign: offsetSign,
    expand: stackOffsetExpand,
    none: stackOffsetNone,
    silhouette: stackOffsetSilhouette,
    wiggle: stackOffsetWiggle,
    positive: offsetPositive
};
*/

export const getStackGroupsByAxisId = (
  data,
  _items,
  numericAxisId,
  cateAxisId,
  offsetType,
  reverseStackOrder
) => {
  if (!data) {
    return null;
  }
  // reversing items to affect render order (for layering)
  const items = reverseStackOrder
    ? _items.reverse()
    : _items
  return items.reduce((result, item) => {
    if (item.props.hide) {
      return result;
    }
    const axisId = item.props[numericAxisId]
    , parentGroup = result[axisId] || {
      hasStack: false,
      stackGroups: {}
    };
    parentGroup.stackGroups[uniqueId('_stackId_')] = {
      numericAxisId,
      cateAxisId,
      items: [item]
    }
    return {
      ...result,
      [axisId]: parentGroup
    };
  }, {});
};

/**
 * Configure the scale function of axis
 * @param {Object} scale The scale function
 * @param {Object} opts  The configuration of axis
 * @return {Object}      null
 */
export const getTicksOfScale = (
  scale,
  opts
) => {
  const {
    realScaleType,
    type,
    tickCount,
    originalDomain,
    allowDecimals
  } = opts
  , scaleType = realScaleType || opts.scale;
  if (scaleType !== 'auto' && scaleType !== 'linear') {
    return null;
  }
  if (tickCount
    && type === 'number'
    && originalDomain
    && (originalDomain[0] === 'auto' || originalDomain[1] === 'auto')
  ) {
    // Calculate the ticks by the number of grid when the axis is a number axis
    const domain = scale.domain();
    if (!domain.length) {
      return null;
    }
    const tickValues = getNiceTickValues(domain, tickCount, allowDecimals);
    scale.domain([_min(tickValues), _max(tickValues)]);
    return { niceTicks: tickValues };
  }
  if (tickCount && type === 'number') {
    const domain = scale.domain()
    , tickValues = getTickValuesFixedDomain(domain, tickCount, allowDecimals);
    return { niceTicks: tickValues };
  }
  return null;
};

export const getCateCoordinateOfLine = ({
  axis,
  ticks,
  bandSize,
  entry,
  index,
  dataKey
}) => {
  if (axis.type === 'category') {
    // find coordinate of category axis by the value of category
    if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullOrUndef(entry[axis.dataKey])) {
      const matchedTick = findEntryInArray(ticks, 'value', entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks[index]
      ? ticks[index].coordinate + bandSize / 2
      : null;
  }
  const value = getValueByDataKey(entry, !isNullOrUndef(dataKey)
    ? dataKey
    : axis.dataKey);
  return !isNullOrUndef(value)
    ? axis.scale(value)
    : null;
};

export const getCateCoordinateOfBar = ({
  axis,
  ticks,
  offset,
  bandSize,
  entry,
  index
}) => {
  if (axis.type === 'category') {
    return ticks[index]
      ? ticks[index].coordinate + offset
      : null;
  }
  const value = getValueByDataKey(entry, axis.dataKey, axis.domain[index]);
  return !isNullOrUndef(value)
    ? axis.scale(value) - bandSize / 2 + offset
    : null;
};

export const getBaseValueOfBar = ({
  numericAxis
}) => {
  const domain = numericAxis.scale.domain();
  if (numericAxis.type === 'number') {
    const min = Math.min(domain[0], domain[1])
    , max = Math.max(domain[0], domain[1]);
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

export const getStackedDataOfItem = (
  item,
  stackGroups
) => {
  const {
    stackId
  } = item.props;
  if (isNumOrStr(stackId)) {
    const group = stackGroups[stackId];
    if (group && group.items.length) {
      let itemIndex = -1;
      for (let i = 0, len = group.items.length; i < len; i++) {
        if (group.items[i] === item) {
          itemIndex = i;
          break;
        }
      }
      return itemIndex >= 0
        ? group.stackedData[itemIndex]
        : null;
    }
  }
  return null;
};

const getDomainOfSingle = (
  data
) => data.reduce((result, entry) => [
    _min(entry.concat([result[0]]).filter(isNumber)),
    _max(entry.concat([result[1]]).filter(isNumber)),
], [Infinity, -Infinity]);

export const getDomainOfStackGroups = (
  stackGroups,
  startIndex,
  endIndex
) => _getObjectKeys(stackGroups)
  .reduce((result, stackId) => {
      const group = stackGroups[stackId]
      , { stackedData } = group
      , domain = stackedData.reduce((res, entry) => {
          const s = getDomainOfSingle(entry.slice(startIndex, endIndex + 1));
          return [
            Math.min(res[0], s[0]),
            Math.max(res[1], s[1])
          ];
      }, [Infinity, -Infinity]);
      return [
        Math.min(domain[0], result[0]),
        Math.max(domain[1], result[1])
      ];
   }, [Infinity, -Infinity])
   .map(result => (result === Infinity || result === -Infinity ? 0 : result));

export const MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
export const MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;

export const parseSpecifiedDomain = (
  specifiedDomain,
  dataDomain,
  allowDataOverflow
) => {
  if (isFn(specifiedDomain)) {
    return specifiedDomain(dataDomain, allowDataOverflow);
  }
  if (!isArr(specifiedDomain)) {
    return dataDomain;
  }
  const domain = [];
  if (isNumber(specifiedDomain[0])) {
    domain[0] = allowDataOverflow
      ? specifiedDomain[0]
      : Math.min(specifiedDomain[0], dataDomain[0]);
  } else if (MIN_VALUE_REG.test(specifiedDomain[0])) {
    const value = +MIN_VALUE_REG.exec(specifiedDomain[0])[1];
    domain[0] = dataDomain[0] - value;
  } else if (isFn(specifiedDomain[0])) {
    domain[0] = specifiedDomain[0](dataDomain[0]);
  } else {
    domain[0] = dataDomain[0];
  }
  if (isNumber(specifiedDomain[1])) {
    domain[1] = allowDataOverflow ? specifiedDomain[1] : Math.max(specifiedDomain[1], dataDomain[1]);
  } else if (MAX_VALUE_REG.test(specifiedDomain[1])) {
    const value = +MAX_VALUE_REG.exec(specifiedDomain[1])[1];
    domain[1] = dataDomain[1] + value;
  } else if (isFn(specifiedDomain[1])) {
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
export const getBandSizeOfAxis = (
  axis,
  ticks,
  isBar
) => {
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
      const cur = orderedTicks[i]
      , prev = orderedTicks[i - 1];
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
export const parseDomainOfCategoryAxis = (
  specifiedDomain,
  calculatedDomain,
  axisChild
) => !specifiedDomain || !specifiedDomain.length
  ? calculatedDomain
  : _isEqual(specifiedDomain, _getAxisDomain(axisChild))
     ? calculatedDomain
     : specifiedDomain

export const getTooltipItem = (
  graphicalItem,
  payload
) => {
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
