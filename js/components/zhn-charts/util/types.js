"use strict";

exports.__esModule = true;
exports.adaptEventsOfChild = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
const _getObjectKeys = Object.keys;
const isLikelyOnEventProperty = propName => (propName || '').slice(0, 2) === 'on' && /^[A-Z]/.test((propName || '')[2]);
const getEventHandlerOfChild = (originalHandler, data, index) => evt => {
  originalHandler(data, index, evt);
  return null;
};
const adaptEventsOfChild = (props, data, index) => (0, _isTypeFn.isObj)(props) ? _getObjectKeys(props).reduce((eventProps, propName) => {
  const originalHandler = props[propName];
  if (isLikelyOnEventProperty(propName) && (0, _isTypeFn.isFn)(originalHandler)) {
    if (!eventProps) {
      eventProps = {};
    }
    eventProps[propName] = getEventHandlerOfChild(originalHandler, data, index);
  }
  return eventProps;
}, null) : null;
exports.adaptEventsOfChild = adaptEventsOfChild;
//# sourceMappingURL=types.js.map