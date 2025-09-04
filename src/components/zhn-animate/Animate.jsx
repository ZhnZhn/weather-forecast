import {
  isFn
} from '../../utils/isTypeFn';

import {
  memo,
  crProps,
  useRef,
  useState,
  useMemo,
  useEffect,
  Children,
  getRefValue,
  setRefValue,
  cloneUiElement
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

const _fCloneContainer = (
  restProps,
  stateStyle
) => (container) => {
  const {
    style = {},
    className
  } = container.props;

  return cloneUiElement(container, {
    ...restProps,
    style: {
      ...style,
      ...stateStyle
    },
    className
  });
};

const FN_NOOP = () => {}

const _crInitialState = props => {
  const {
    isActive,
    attributeName,
    from,
    to,
    steps,
    children
  } = props;

  if (!isActive) {
    // if children is a function and animation is not active, set style to 'to'
    return isFn(children)
      ? { style: to }
      : { style: {} };
  } else if (steps && steps.length) {
    return {
      style: steps[0].style
    };
  } else if (from) {
    return isFn(children)
      ? { style: from }
      : {
          style: attributeName
           ? { [attributeName]: from }
           : from
        };
  } else {
    return { style: {} };
  }
};

const DF_PROPS = {
  begin: 0,
  duration: 1000,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: true,
  canBegin: true,
  //steps: [],
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};

export const Animate = memo(props => {
  const _props = useMemo(() => crProps({
    ...DF_PROPS,
    steps: []
  }, props), [props])
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
    begin,
    duration,
    attributeName,
    easing,
    isActive,
    steps,
    from,
    to,
    canBegin,
    onAnimationEnd,
    shouldReAnimate,
    onAnimationReStart,
    ...restProps
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
        const newState = {
          style: attributeName
            ? { [attributeName]: _props.to }
            : _props.to
        };
        if (state && state.style) {
          if ((attributeName && state.style[attributeName] !== _props.to)
            || (!attributeName && state.style !== _props.to)
          ) {
            setState(newState);
          }
        }
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

      const isTriggered = !_prevProps.canBegin
        || !_prevProps.isActive
      , from = isTriggered || shouldReAnimate
         ? _props.from
         : _prevProps.to;

      if (state && state.style) {
        const newState = {
          style: attributeName
            ? { [attributeName]: from }
            : from
        };
        if ((attributeName && state.style[attributeName] !== from)
          || (!attributeName && state.style !== from)
        ) {
          setState(newState);
        }
      }

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
  //attributeName, isActive, canBegin, shouldReAnimate
  //_prevProps.isActivem, _prevProps.canBegin, _prevProps.to
  /*eslint-enable react-hooks/exhaustive-deps */

  const count = Children.count(children)
  , stateStyle = translateStyle(state.style);

  if (isFn(children)) {
    return children(stateStyle);
  }

  if (!isActive || count === 0) {
    return children;
  }

  const cloneContainer = _fCloneContainer(
    restProps,
    stateStyle
  );

  return count === 1
    ? cloneContainer(Children.only(children))
    : (
       <div>
         {Children.map(children, child => cloneContainer(child))}
       </div>
     );
})

/*
static propTypes = {
  from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  attributeName: PropTypes.string,
  // animation duration
  duration: PropTypes.number,
  begin: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  steps: PropTypes.arrayOf(PropTypes.shape({
    duration: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    easing: PropTypes.oneOfType([
      PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
      PropTypes.func,
    ]),
    // transition css properties(dash case), optional
    properties: PropTypes.arrayOf('string'),
    onAnimationEnd: PropTypes.func,
  })),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool,
  canBegin: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: PropTypes.bool,
  onAnimationStart: PropTypes.func,
  onAnimationReStart: PropTypes.func,
};
*/
