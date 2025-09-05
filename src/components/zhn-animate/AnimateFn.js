import {
  getRefValue,
  setRefValue
} from '../uiApi';

import createAnimateManager from './AnimateManager';
import { configEasing } from './easing';
import configUpdate from './configUpdate';

import { getTransitionVal } from './util';

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
    children,
  } = props;

  setRefValue(
    _refUnSubscribe,
    _animateManager.subscribe(changeStyle)
  )

  const _runAnimation = _isFn(easing) || _isFn(children) || easing === 'spring'
    ? _runJSAnimation
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
