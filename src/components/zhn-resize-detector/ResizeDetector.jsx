import {
  findDOMNode,
  PureComponent,
  isValidElement,
  cloneElement,
  createRef,
} from '../uiApi';

import {
  patchResizeCallback,
  isFunction,
  isSSR,
  isDOMElement
} from './utils';

const RENDER_CHILDREN = 'children';

const _isNativeDomElement = (
  element
) => element && typeof element.type === 'string';

class ResizeDetector extends PureComponent {
  skipOnMount;
  targetRef;
  observableElement;
  resizeHandler;
  resizeObserver;
  // To access the current size in the ResizeObserver without having to recreate it each time size updates.
  sizeRef;

  constructor(props) {
    super(props);

    const {
      skipOnMount,
      refreshMode,
      refreshRate = 1000,
      refreshOptions
    } = props;

    this.state = {
      width: void 0,
      height: void 0
    };

    this.sizeRef = {
      current: this.state
    };

    this.skipOnMount = skipOnMount;
    this.targetRef = createRef();
    this.observableElement = null;

    if (isSSR()) {
      return;
    }

    this.resizeHandler = patchResizeCallback(
      this.createResizeHandler,
      refreshMode,
      refreshRate,
      refreshOptions
    );

    this.resizeObserver = new window.ResizeObserver(this.resizeHandler);
  }

  componentDidMount() {
    this.attachObserver();
  }

  componentDidUpdate() {
    this.attachObserver();
    this.sizeRef.current = this.state;
  }

  componentWillUnmount() {
    if (isSSR()) { return; }

    this.observableElement = null;
    this.resizeObserver.disconnect();
    this.cancelHandler();
  }

  cancelHandler = () => {
    if (this.resizeHandler && this.resizeHandler.cancel) {
      // cancel debounced handler
      this.resizeHandler.cancel();
      this.resizeHandler = null;
    }
  };

  attachObserver = () => {
    const {
      targetRef,
      observerOptions
    } = this.props;

    if (isSSR()) {
      return;
    }

    if (targetRef && targetRef.current) {
      this.targetRef.current = targetRef.current;
    }

    const element = this.getElement();
    if (!element) {
      // can't find element to observe
      return;
    }

    if (this.observableElement && this.observableElement === element) {
      // element is already observed
      return;
    }

    this.observableElement = element;
    this.resizeObserver.observe(element, observerOptions);
  };

  getElement = () => {
    const {
      querySelector,
      targetDomEl
    } = this.props;

    if (isSSR()) return null;

    // in case we pass a querySelector
    if (querySelector) return document.querySelector(querySelector);
    // in case we pass a DOM element
    if (targetDomEl && isDOMElement(targetDomEl)) return targetDomEl;
    // in case we pass a React ref using React.createRef()
    if (this.targetRef && isDOMElement(this.targetRef.current)) return this.targetRef.current;

    // the worse case when we don't receive any information from the parent and the library doesn't add any wrappers
    // we have to use a deprecated `findDOMNode` method in order to find a DOM element to attach to
    const currentElement = findDOMNode(this);

    if (!currentElement) return null;

    const renderType = this.getRenderType();
    switch (renderType) {
      case RENDER_CHILDREN:
        return currentElement;
      default:
        return currentElement.parentElement;
    }
  };

  createResizeHandler = (entries) => {
    const {
      handleWidth = true,
      handleHeight = true,
      onResize
    } = this.props;

    if (!handleWidth && !handleHeight) return;

    const notifyResize = ({ width, height }) => {
      if (this.state.width === width && this.state.height === height) {
        // skip if dimensions haven't changed
        return;
      }

      if ((this.state.width === width && !handleHeight) || (this.state.height === height && !handleWidth)) {
        // process `handleHeight/handleWidth` props
        return;
      }

      if (isFunction(onResize)) {
        onResize(width, height);
      }
      this.setState({ width, height });
    };

    entries.forEach(entry => {
      const {
        width,
        height
      } = (entry && entry.contentRect) || {}
      , shouldSetSize = !this.skipOnMount && !isSSR();

      if (shouldSetSize) {
        notifyResize({ width, height });
      }
      this.skipOnMount = false;
    });
  };

  getRenderType = () => isValidElement(this.props.children)
    ? RENDER_CHILDREN
    : void 0

  render() {
    const {
      children,
      nodeType: WrapperTag = 'div'
    } = this.props
    , {
      width,
      height
    } = this.state
    , _nativeDomElementProps = {
      width,
      height
    };

    return this.getRenderType() === RENDER_CHILDREN
      ? cloneElement(
          children,
          _isNativeDomElement(children)
             ? _nativeDomElementProps
             : {
                 ..._nativeDomElementProps,
                 targetRef: this.targetRef
               }
        )
      : <WrapperTag />;
  }
}

export default ResizeDetector;
