import {
  isObj,
  isFn
} from '../../../utils/isTypeFn';

const _getObjectKeys = Object.keys;

const isLikelyOnEventProperty = (
  propName
) => (propName || '').slice(0, 2) === 'on'
  && /^[A-Z]/.test((propName || '')[2])

const getEventHandlerOfChild = (
  originalHandler,
  data,
  index
) => (evt) => {
  originalHandler(data, index, evt);
  return null;
};

export const adaptEventsOfChild = (
  props,
  data,
  index
) => isObj(props) ? _getObjectKeys(props)
  .reduce((eventProps, propName) => {
     const originalHandler = props[propName];
     if (isLikelyOnEventProperty(propName) && isFn(originalHandler)) {
       if (!eventProps) {
         eventProps = {};
       }
       eventProps[propName] = getEventHandlerOfChild(
         originalHandler,
         data,
         index
       );
     }
     return eventProps;
  }, null) : null;
