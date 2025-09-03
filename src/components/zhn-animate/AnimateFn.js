import {
  getRefValue,
  setRefValue
} from '../uiApi';

import createAnimateManager from './AnimateManager';
import { configEasing } from './easing';
import configUpdate from './configUpdate';

import {
  getTransitionVal,
  identity
} from './util';

const _isFn = v => typeof v === 'function';
const _getObjectKeys = Object.keys;

export const stopJsAnimation = (
  refStopJsAnimation
) => {
  const _stopAnimation = getRefValue(refStopJsAnimation);
  if (_stopAnimation) {
    _stopAnimation();
  }
}

const _runJSAnimation = (
  props,
  _changeStyle,
  _refStopJsAnimation,
  _refAnimateManager
) =>  {
  const {
    from,
    to,
    duration,
    easing,
    begin,
    onAnimationEnd,
    onAnimationStart
  } = props
  , startAnimation = configUpdate(
     from,
     to,
     configEasing(easing),
     duration,
     _changeStyle
   )
  , finalStartAnimation = () => {
     setRefValue(_refStopJsAnimation, startAnimation());
  };

  getRefValue(_refAnimateManager).start([
    onAnimationStart,
    begin,
    finalStartAnimation,
    duration,
    onAnimationEnd,
  ]);
};

const _runStepAnimation = (
  props,
  changeStyle,
  _refStopJsAnimation,
  _refAnimateManager
) => {
  const {
    steps,
    begin,
    onAnimationStart
  } = props
  , {
    style: initialStyle,
    duration: initialTime = 0
  } = steps[0];

  const addStyle = (sequence, nextItem, index) => {
    if (index === 0) {
      return sequence;
    }

    const {
      duration,
      easing = 'ease',
      style,
      properties: nextProperties,
      onAnimationEnd,
    } = nextItem;

    const preItem = index > 0
      ? steps[index - 1]
      : nextItem
    , properties = nextProperties
       || _getObjectKeys(style);

    if (_isFn(easing) || easing === 'spring') {
      return [
        ...sequence,
        _runJSAnimation(
          {
            from: preItem.style,
            to: style,
            duration,
            easing,
          },
          changeStyle,
          _refStopJsAnimation,
          _refAnimateManager
        ),
        duration
      ];
    }

    const transition = getTransitionVal(
      properties,
      duration,
      easing
    )
    , newStyle = {
       ...preItem.style,
       ...style,
       transition
    };

    return [
      ...sequence,
      newStyle,
      duration,
      onAnimationEnd
    ].filter(identity);
  };

  return getRefValue(_refAnimateManager).start([
    onAnimationStart,
    ...steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)]),
    props.onAnimationEnd
  ]);
}

export const runAnimation = (
  props,
  changeStyle,
  _refStopJsAnimation,
  _refAnimateManager,
  _refUnSubscribe
) => {
  if (!getRefValue(_refAnimateManager)) {
    setRefValue(
      _refAnimateManager,
      createAnimateManager()
    )
  }
  const _animateManager = getRefValue(_refAnimateManager)
  , {
    begin,
    duration,
    attributeName,
    to: propsTo,
    easing,
    onAnimationStart,
    onAnimationEnd,
    steps,
    children,
  } = props;

  setRefValue(
    _refUnSubscribe,
    _animateManager.subscribe(changeStyle)
  )

  const _runAnimation = _isFn(easing) || _isFn(children) || easing === 'spring'
    ? _runJSAnimation
    : steps.length > 1
    ? _runStepAnimation
    : void 0;
  if (_runAnimation) {
    _runAnimation(
      props,
      changeStyle,
      _refStopJsAnimation,
      _refAnimateManager
    )
    return;
  }
  
  const to = attributeName
     ? { [attributeName]: propsTo }
     : propsTo
  , transition = getTransitionVal(
      _getObjectKeys(to),
      duration,
      easing
  );

  _animateManager.start([
    onAnimationStart,
    begin,
    { ...to, transition },
    duration,
    onAnimationEnd
  ]);
}
