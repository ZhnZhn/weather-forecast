import {
  getRefValue,
  setRefValue
} from '../uiApi';

import { configEasing } from './easing';
import configUpdate from './configUpdate';

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
  changeStyle,
  animateManager,
  _refStopJsAnimation
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
     changeStyle
   )
  , finalStartAnimation = () => {
     setRefValue(_refStopJsAnimation, startAnimation());
  };

  animateManager.start([
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
  animateManager,
  _refStopJsAnimation,
  _refUnSubscribe
) => {

  setRefValue(
    _refUnSubscribe,
    animateManager.subscribe(changeStyle)
  )

  _runJSAnimation(
    props,
    changeStyle,
    animateManager,
    _refStopJsAnimation
  )
}
