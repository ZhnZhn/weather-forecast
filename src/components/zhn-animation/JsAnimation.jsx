import {
  memo,
  crProps,
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import usePrevValue from '../hooks/usePrevValue';

import createAnimationManager from './JsAnimationManager';
import {
  stopJsAnimation,
  runAnimation
} from './JsAnimationFn';

const FN_NOOP = () => {}

const DF_PROPS = {
  begin: 0,
  duration: 1000,
  from: 0,
  to: 1,
  easing: 'ease',
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};

const _setNextStateIf = (
  state,
  value,
  setState
) => {
  if (state !== value) {
    setState(value);
  }
}

export const JsAnimation = memo(props => {
  const _props = useMemo(
    () => crProps(DF_PROPS, props),
    [props]
  )
  , _prevProps = usePrevValue(_props)

  , _refStopJsAnimation = useRef()
  , _refIsMounted = useRef(!1)
  , _refAnimateManager = useRef()
  , _refUnSubscribe = useRef()

  , [
    state,
    setState
  ] = useState(() => _props.isActive ? _props.from : _props.to)

  , changeStyle = useMemo(() => style => {
    if (getRefValue(_refIsMounted)) {
      setState(style.t);
    }
  }, [])
  , getAnimationManager = useMemo(() => () => {
    if (!getRefValue(_refAnimateManager)) {
      setRefValue(
        _refAnimateManager,
        createAnimationManager()
      )
    }
    return getRefValue(_refAnimateManager);
  }, [])

  /*eslint-disable no-unused-vars*/
  , {
    children,
    isActive,
    canBegin
  } = _props
  /*eslint-enable no-unused-vars*/

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setRefValue(_refIsMounted, !0)

    if (isActive && canBegin) {
      runAnimation(
        _props,
        changeStyle,
        getAnimationManager(),
        _refStopJsAnimation,
        _refUnSubscribe
      )
    }
    return () => {
      setRefValue(_refIsMounted, !1)

      const _unSubscribe = getRefValue(_refUnSubscribe);
      if (_unSubscribe) {
        _unSubscribe();
      }

      const _animateManager = getRefValue(_refAnimateManager)
      if (_animateManager) {
        _animateManager.stop();
        setRefValue(_refAnimateManager, null)
      }

      stopJsAnimation(_refStopJsAnimation)
    }
  }, [])
  //changeStyle, _props, isActive, canBegin
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (_prevProps) {
      if (!canBegin) {
        return;
      }

      if (!isActive) {
        _setNextStateIf(
          state,
          _props.to,
          setState
        )
        return;
      }

      if (_prevProps.to === _props.to
        && _prevProps.canBegin
        && _prevProps.isActive
      ) {
        return;
      }

      const _animateManager = getRefValue(_refAnimateManager);
      if (_animateManager) {
        _animateManager.stop();
      }
      stopJsAnimation(_refStopJsAnimation)

      const from = !_prevProps.canBegin || !_prevProps.isActive
        ? _props.from
        : _prevProps.to;

      _setNextStateIf(
        state,
        from,
        setState
      )

      runAnimation(
        {
          ..._props,
          from,
          begin: 0
        },
        changeStyle,
        getAnimationManager(),
        _refStopJsAnimation,
        _refUnSubscribe
      )
    }
  }, [_props, state])
  //changeStyle
  //isActive, canBegin
  //_prevProps.isActivem, _prevProps.canBegin, _prevProps.to
  /*eslint-enable react-hooks/exhaustive-deps */

  return children(state);
})

/*
static propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  // animation duration
  duration: PropTypes.number,
  begin: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.func,
  isActive: PropTypes.bool,
  canBegin: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  // decide if it should reanimate with initial from style when props change
  onAnimationStart: PropTypes.func,
};
*/
