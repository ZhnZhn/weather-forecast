"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../uiApi");
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
var RENDER_CHILDREN = 'children';
var _isNativeDomElement = function _isNativeDomElement(element) {
  return element && typeof element.type === 'string';
};
var ResizeDetector = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(ResizeDetector, _PureComponent);
  // To access the current size in the ResizeObserver without having to recreate it each time size updates.

  function ResizeDetector(props) {
    var _this;
    _this = _PureComponent.call(this, props) || this;
    _this.skipOnMount = void 0;
    _this.targetRef = void 0;
    _this.observableElement = void 0;
    _this.resizeHandler = void 0;
    _this.resizeObserver = void 0;
    _this.sizeRef = void 0;
    _this.cancelHandler = function () {
      if (_this.resizeHandler && _this.resizeHandler.cancel) {
        // cancel debounced handler
        _this.resizeHandler.cancel();
        _this.resizeHandler = null;
      }
    };
    _this.attachObserver = function () {
      var _this$props = _this.props,
        targetRef = _this$props.targetRef,
        observerOptions = _this$props.observerOptions;
      if ((0, _utils.isSSR)()) {
        return;
      }
      if (targetRef && targetRef.current) {
        _this.targetRef.current = targetRef.current;
      }
      var element = _this.getElement();
      if (!element) {
        // can't find element to observe
        return;
      }
      if (_this.observableElement && _this.observableElement === element) {
        // element is already observed
        return;
      }
      _this.observableElement = element;
      _this.resizeObserver.observe(element, observerOptions);
    };
    _this.getElement = function () {
      var _this$props2 = _this.props,
        querySelector = _this$props2.querySelector,
        targetDomEl = _this$props2.targetDomEl;
      if ((0, _utils.isSSR)()) return null;

      // in case we pass a querySelector
      if (querySelector) return document.querySelector(querySelector);
      // in case we pass a DOM element
      if (targetDomEl && (0, _utils.isDOMElement)(targetDomEl)) return targetDomEl;
      // in case we pass a React ref using React.createRef()
      if (_this.targetRef && (0, _utils.isDOMElement)(_this.targetRef.current)) return _this.targetRef.current;

      // the worse case when we don't receive any information from the parent and the library doesn't add any wrappers
      // we have to use a deprecated `findDOMNode` method in order to find a DOM element to attach to
      var currentElement = (0, _uiApi.findDOMNode)((0, _assertThisInitialized2["default"])(_this));
      if (!currentElement) return null;
      var renderType = _this.getRenderType();
      switch (renderType) {
        case RENDER_CHILDREN:
          return currentElement;
        default:
          return currentElement.parentElement;
      }
    };
    _this.createResizeHandler = function (entries) {
      var _this$props3 = _this.props,
        _this$props3$handleWi = _this$props3.handleWidth,
        handleWidth = _this$props3$handleWi === void 0 ? true : _this$props3$handleWi,
        _this$props3$handleHe = _this$props3.handleHeight,
        handleHeight = _this$props3$handleHe === void 0 ? true : _this$props3$handleHe,
        onResize = _this$props3.onResize;
      if (!handleWidth && !handleHeight) return;
      var notifyResize = function notifyResize(_ref) {
        var width = _ref.width,
          height = _ref.height;
        if (_this.state.width === width && _this.state.height === height) {
          // skip if dimensions haven't changed
          return;
        }
        if (_this.state.width === width && !handleHeight || _this.state.height === height && !handleWidth) {
          // process `handleHeight/handleWidth` props
          return;
        }
        if ((0, _utils.isFunction)(onResize)) {
          onResize(width, height);
        }
        _this.setState({
          width: width,
          height: height
        });
      };
      entries.forEach(function (entry) {
        var _ref2 = entry && entry.contentRect || {},
          width = _ref2.width,
          height = _ref2.height,
          shouldSetSize = !_this.skipOnMount && !(0, _utils.isSSR)();
        if (shouldSetSize) {
          notifyResize({
            width: width,
            height: height
          });
        }
        _this.skipOnMount = false;
      });
    };
    _this.getRenderType = function () {
      return (0, _uiApi.isValidElement)(_this.props.children) ? RENDER_CHILDREN : void 0;
    };
    var skipOnMount = props.skipOnMount,
      refreshMode = props.refreshMode,
      _props$refreshRate = props.refreshRate,
      refreshRate = _props$refreshRate === void 0 ? 1000 : _props$refreshRate,
      refreshOptions = props.refreshOptions;
    _this.state = {
      width: void 0,
      height: void 0
    };
    _this.sizeRef = {
      current: _this.state
    };
    _this.skipOnMount = skipOnMount;
    _this.targetRef = (0, _uiApi.createRef)();
    _this.observableElement = null;
    if ((0, _utils.isSSR)()) {
      return (0, _assertThisInitialized2["default"])(_this);
    }
    _this.resizeHandler = (0, _utils.patchResizeCallback)(_this.createResizeHandler, refreshMode, refreshRate, refreshOptions);
    _this.resizeObserver = new window.ResizeObserver(_this.resizeHandler);
    return _this;
  }
  var _proto = ResizeDetector.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.attachObserver();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.attachObserver();
    this.sizeRef.current = this.state;
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if ((0, _utils.isSSR)()) {
      return;
    }
    this.observableElement = null;
    this.resizeObserver.disconnect();
    this.cancelHandler();
  };
  _proto.render = function render() {
    var _this$props4 = this.props,
      children = _this$props4.children,
      _this$props4$nodeType = _this$props4.nodeType,
      WrapperTag = _this$props4$nodeType === void 0 ? 'div' : _this$props4$nodeType,
      _this$state = this.state,
      width = _this$state.width,
      height = _this$state.height,
      _nativeDomElementProps = {
        width: width,
        height: height
      };
    return this.getRenderType() === RENDER_CHILDREN ? (0, _uiApi.cloneElement)(children, _isNativeDomElement(children) ? _nativeDomElementProps : (0, _extends2["default"])({}, _nativeDomElementProps, {
      targetRef: this.targetRef
    })) : /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapperTag, {});
  };
  return ResizeDetector;
}(_uiApi.PureComponent);
var _default = ResizeDetector;
exports["default"] = _default;
//# sourceMappingURL=ResizeDetector.js.map