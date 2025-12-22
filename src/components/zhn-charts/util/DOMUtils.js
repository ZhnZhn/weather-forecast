import { IS_SSR } from './Global';
import { crLRUCache } from './LRUCache';

const _assign = Object.assign;

const defaultConfig = {
  cacheSize: 2000,
  enableCache: true
}
, currentConfig = {
  ...defaultConfig
}
, stringCache = crLRUCache(currentConfig.cacheSize)

, SPAN_STYLE = {
  position: 'absolute',
  top: '-20000px',
  left: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  whiteSpace: 'pre',
}
, MEASUREMENT_SPAN_ID = 'recharts_measurement_span';

const _crCacheKey = (
  text,
  style
) => [
  text,
  style.fontSize || '',
  style.fontFamily || '',
  style.fontWeight || '',
  style.fontStyle || '',
  style.letterSpacing || '',
  style.textTransform || ''
].join('|');

const _crWidthHeightSize = (width, height) => ({
  width,
  height
})

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
    measurementSpan.textContent = `${text}`;

    const rect = measurementSpan.getBoundingClientRect();
    return _crWidthHeightSize(rect.width, rect.height);
  } catch {
    return _crWidthHeightSize(0, 0);
  }
};

export const getStringSize = (text, style = {}) => {
  if (text == null || IS_SSR) {
    return _crWidthHeightSize(0, 0);
  }

  // If caching is disabled, measure directly
  if (!currentConfig.enableCache) {
    return _measureTextWithDOM(text, style);
  }

  const cacheKey = _crCacheKey(text, style)
  , cachedResult = stringCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  // Measure using DOM
  const result = _measureTextWithDOM(text, style);

  // Store in LRU cache
  stringCache.set(cacheKey, result);

  return result;
}
