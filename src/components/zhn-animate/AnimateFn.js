import {
  getRefValue,
  setRefValue
} from '../uiApi';

import createAnimateManager from './AnimateManager';
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

  setRefValue(
    _refUnSubscribe,
    getRefValue(_refAnimateManager).subscribe(changeStyle)
  )

  _runJSAnimation(
    props,
    changeStyle,
    _refStopJsAnimation,
    _refAnimateManager
  )
}
