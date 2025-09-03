import {
  PureComponent,
  Children,
  createRef,
  getRefValue,
  setRefValue,
  cloneUiElement
} from '../uiApi';

import {
  translateStyle,
  shallowEqual
} from './util';

import {
  stopJsAnimation,
  runAnimation
} from './AnimateFn';

const _isFn = v => typeof v === 'function';

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
    return _isFn(children)
      ? { style: to }
      : { style: {} };
  } else if (steps && steps.length) {
    return {
      style: steps[0].style
    };
  } else if (from) {
    return _isFn(children)
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

export class Animate extends PureComponent {
  static displayName = 'Animate';

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

  static defaultProps = {
    begin: 0,
    duration: 1000,
    from: '',
    to: '',
    attributeName: '',
    easing: 'ease',
    isActive: true,
    canBegin: true,
    steps: [],
    onAnimationEnd: FN_NOOP,
    onAnimationStart: FN_NOOP
  };

  constructor(props, context) {
    super(props, context);
    this._refStopJsAnimation = createRef()
    this._refIsMounted = createRef(!1)
    this._refAnimateManager = createRef()
    this._refUnSubscribe = createRef()
    this.state = _crInitialState(props)
  }

  componentDidMount() {
    const {
      isActive,
      canBegin
    } = this.props;

    setRefValue(this._refIsMounted, !0)

    if (!isActive || !canBegin) {
      return;
    }

    runAnimation(
      this.props,
      this.changeStyle,
      this._refStopJsAnimation,
      this._refAnimateManager,
      this._refUnSubscribe
    )
  }

  componentDidUpdate(prevProps) {
    const {
      isActive,
      canBegin,
      attributeName,
      shouldReAnimate
    } = this.props;

    if (!canBegin) {
      return;
    }

    if (!isActive) {
      const newState = {
        style: attributeName
          ? { [attributeName]: this.props.to }
          : this.props.to
      };
      if (this.state && this.state.style) {
        if ((attributeName && this.state.style[attributeName] !== this.props.to)
          || (!attributeName && this.state.style !== this.props.to)
        ) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState(newState);
        }
      }
      return;
    }

    if (shallowEqual(prevProps.to, this.props.to)
      && prevProps.canBegin
      && prevProps.isActive
    ) {
      return;
    }

    const _animateManager = getRefValue(this._refAnimateManager);
    if (_animateManager) {
      _animateManager.stop();
    }
    stopJsAnimation(this._refStopJsAnimation)

    const isTriggered = !prevProps.canBegin
      || !prevProps.isActive
    , from = isTriggered || shouldReAnimate
       ? this.props.from
       : prevProps.to;

    if (this.state && this.state.style) {
      const newState = {
        style: attributeName
          ? { [attributeName]: from }
          : from
      };
      if ((attributeName && this.state.style[attributeName] !== from)
        || (!attributeName && this.state.style !== from)
      ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(newState);
      }
    }

    runAnimation(
      {
        ...this.props,
        from,
        begin: 0
      },
      this.changeStyle,
      this._refStopJsAnimation,
      this._refAnimateManager,
      this._refUnSubscribe
    )
  }

  componentWillUnmount() {
    setRefValue(this._refIsMounted, !1)

    const _unSubscribe = getRefValue(this._refUnSubscribe);
    if (_unSubscribe) {
      _unSubscribe();
    }

    const _animateManager = getRefValue(this._refAnimateManager)
    if (_animateManager) {
      _animateManager.stop();
      setRefValue(this._refAnimateManager, null)
    }

    stopJsAnimation(this._refStopJsAnimation)
  }

  changeStyle = (style) => {
    if (getRefValue(this._refIsMounted)) {
      this.setState({ style });
    }
  }

  render() {
    /*eslint-disable no-unused-vars*/
    const {
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
    } = this.props
    /*eslint-enable no-unused-vars*/
    , count = Children.count(children)
    , stateStyle = translateStyle(this.state.style);

    if (_isFn(children)) {
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
  }
}
