import {
  PureComponent,
  Children,
  cloneUiElement
} from '../uiApi';

import createAnimateManager from './AnimateManager';
import { configEasing } from './easing';
import configUpdate from './configUpdate';

import {
  getTransitionVal,
  identity,
  translateStyle,
  shallowEqual
} from './util';

const _isFn = v => typeof v === 'function';
const _getObjectKeys = Object.keys;

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
    this.state = _crInitialState(props)
  }

  componentDidMount() {
    const {
      isActive,
      canBegin
    } = this.props;

    this.mounted = true;

    if (!isActive || !canBegin) {
      return;
    }

    this.runAnimation(this.props);
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

    if (this.manager) {
      this.manager.stop();
    }
    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }

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

    this.runAnimation({
      ...this.props,
      from,
      begin: 0
    });
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.unSubscribe) {
      this.unSubscribe();
    }

    if (this.manager) {
      this.manager.stop();
      this.manager = null;
    }

    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }
  }

  runJSAnimation(props) {
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
       this.changeStyle
     )
    , finalStartAnimation = () => {
       this.stopJSAnimation = startAnimation();
    };

    this.manager.start([
      onAnimationStart,
      begin,
      finalStartAnimation,
      duration,
      onAnimationEnd,
    ]);
  }

  runStepAnimation(props) {
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
          this.runJSAnimation.bind(this, {
            from: preItem.style,
            to: style,
            duration,
            easing,
          }),
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

    return this.manager.start([
      onAnimationStart,
      ...steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)]),
      props.onAnimationEnd
    ]);
  }

  runAnimation(props) {
    if (!this.manager) {
      this.manager = createAnimateManager();
    }
    const manager = this.manager
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
    
    this.unSubscribe = manager.subscribe(this.changeStyle);

    if (_isFn(easing)
      || _isFn(children)
      || easing === 'spring'
    ) {
      this.runJSAnimation(props);
      return;
    }

    if (steps.length > 1) {
      this.runStepAnimation(props);
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

    manager.start([
      onAnimationStart,
      begin,
      { ...to, transition },
      duration,
      onAnimationEnd
    ]);
  }

  changeStyle = (style) => {
    if (this.mounted) {
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
