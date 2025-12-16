"use strict";

exports.__esModule = true;
exports.getStringSize = exports.getOffset = exports.calculateChartCoordinate = void 0;
var _Global = require("./Global");
var _LRUCache = require("./LRUCache");
const _assign = Object.assign,
  _mathRandom = Math.round;
const defaultConfig = {
    cacheSize: 2000,
    enableCache: true
  },
  currentConfig = Object.assign({}, defaultConfig),
  stringCache = (0, _LRUCache.crLRUCache)(currentConfig.cacheSize),
  SPAN_STYLE = {
    position: 'absolute',
    top: '-20000px',
    left: 0,
    padding: 0,
    margin: 0,
    border: 'none',
    whiteSpace: 'pre'
  },
  MEASUREMENT_SPAN_ID = 'recharts_measurement_span';
const _crCacheKey = (text, style) => [text, style.fontSize || '', style.fontFamily || '', style.fontWeight || '', style.fontStyle || '', style.letterSpacing || '', style.textTransform || ''].join('|');
const _crWidthHeightSize = (width, height) => ({
  width,
  height
});

/**
 * Measure text using DOM (accurate but slower)
 * @param text - The text to measure
 * @param style - CSS style properties to apply
 * @returns The size of the text
 */
const _measureTextWithDOM = (text, style) => {
  try {
    let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement('span');
      measurementSpan.setAttribute('id', MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute('aria-hidden', 'true');
      document.body.appendChild(measurementSpan);
    }

    // Apply styles directly without unnecessary object creation
    _assign(measurementSpan.style, SPAN_STYLE, style);
    measurementSpan.textContent = "" + text;
    const rect = measurementSpan.getBoundingClientRect();
    return _crWidthHeightSize(rect.width, rect.height);
  } catch (_unused) {
    return _crWidthHeightSize(0, 0);
  }
};
const getStringSize = function (text, style) {
  if (style === void 0) {
    style = {};
  }
  if (text == null || _Global.IS_SSR) {
    return _crWidthHeightSize(0, 0);
  }

  // If caching is disabled, measure directly
  if (!currentConfig.enableCache) {
    return _measureTextWithDOM(text, style);
  }
  const cacheKey = _crCacheKey(text, style),
    cachedResult = stringCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  // Measure using DOM
  const result = _measureTextWithDOM(text, style);

  // Store in LRU cache
  stringCache.set(cacheKey, result);
  return result;
};
exports.getStringSize = getStringSize;
const getOffset = el => {
  const html = el.ownerDocument.documentElement
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    ,
    box = typeof el.getBoundingClientRect === 'undefined' ? {
      top: 0,
      left: 0
    } : el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft
  };
};

/**
 * Calculate coordinate of cursor in chart
 * @param  {Object} event  Event object
 * @param  {Object} offset The offset of main part in the svg element
 * @return {Object}        {chartX, chartY}
 */
exports.getOffset = getOffset;
const calculateChartCoordinate = (event, offset) => ({
  chartX: _mathRandom(event.pageX - offset.left),
  chartY: _mathRandom(event.pageY - offset.top)
});
exports.calculateChartCoordinate = calculateChartCoordinate;
//# sourceMappingURL=DOMUtils.js.map