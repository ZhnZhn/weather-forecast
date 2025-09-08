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

import {
  translateStyle,
  shallowEqual
} from './util';

import {
  stopJsAnimation,
  runAnimation
} from './AnimateFn';

const FN_NOOP = () => {}

const _crStyleState = (
  value
) => ({
  style: value
});

const _crInitialState = ({
  isActive,
  from,
  to
}) => isActive
 ? _crStyleState(from)
 : _crStyleState(to);

const DF_PROPS = {
  begin: 0,
  duration: 1000,
  //from: {t: 0},
  //to:  {t: 1},
  easing: 'ease',
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};

const _isStyleChanged = (
  style,
  value
) => style !== value;

const _setNextStateIf = (
  state,
  value,
  setState
) => {
  const { style } = state || {};
  if (style && _isStyleChanged(style, value)) {
    setState(_crStyleState(value));
  }
}

export const Animate = memo(props => {
  const _props = useMemo(
    () => crProps({
      ...DF_PROPS,
      from: {t: 0},
      to:  {t: 1}
    }, props),
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
  ] = useState(() => _crInitialState(_props))

  , changeStyle = useMemo(() => style => {
    if (getRefValue(_refIsMounted)) {
      setState({ style });
    }
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
        _refStopJsAnimation,
        _refAnimateManager,
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

      if (shallowEqual(_prevProps.to, _props.to)
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
        _refStopJsAnimation,
        _refAnimateManager,
        _refUnSubscribe
      )
    }
  }, [_props, state])
  //changeStyle
  //isActive, canBegin
  //_prevProps.isActivem, _prevProps.canBegin, _prevProps.to
  /*eslint-enable react-hooks/exhaustive-deps */

  return children(translateStyle(state.style));
})

/*
static propTypes = {
  from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
