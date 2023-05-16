"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Legend = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DefaultLegendContent = require("./DefaultLegendContent");
var _DataUtils = require("../util/DataUtils");
var _componentFn = require("./componentFn");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["ref"];
var CL_LEGEND_WRAPPER = "recharts-legend-wrapper";
var _defaultUniqBy = function _defaultUniqBy(entry) {
  return entry.value;
};
var _renderContent = function _renderContent(content, props) {
  if ((0, _uiApi.isValidElement)(content)) {
    return (0, _uiApi.cloneElement)(content, props);
  }
  if ((0, _FnUtils._isFn)(content)) {
    return (0, _uiApi.createElement)(content, props);
  }
  /*eslint-disable no-unused-vars*/
  var ref = props.ref,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  //ref
  /*eslint-enable no-unused-vars*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefaultLegendContent.DefaultLegendContent, (0, _extends2["default"])({}, restProps));
};
var EPS = 1;
var Legend = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Legend, _PureComponent);
  function Legend() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      boxWidth: -1,
      boxHeight: -1
    };
    _this._refWrapperNode = function (node) {
      _this.wrapperNode = node;
    };
    return _this;
  }
  Legend.getWithHeight = function getWithHeight(item, chartWidth) {
    var layout = item.props.layout;
    return layout === 'vertical' && (0, _DataUtils.isNumber)(item.props.height) ? {
      height: item.props.height
    } : layout === 'horizontal' ? {
      width: item.props.width || chartWidth
    } : null;
  };
  var _proto = Legend.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateBBox();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateBBox();
  };
  _proto.getBBox = function getBBox() {
    return this.wrapperNode && this.wrapperNode.getBoundingClientRect ? this.wrapperNode.getBoundingClientRect() : null;
  };
  _proto.getBBoxSnapshot = function getBBoxSnapshot() {
    var _this$state = this.state,
      boxWidth = _this$state.boxWidth,
      boxHeight = _this$state.boxHeight;
    return boxWidth >= 0 && boxHeight >= 0 ? {
      width: boxWidth,
      height: boxHeight
    } : null;
  };
  _proto.getDefaultPosition = function getDefaultPosition(style) {
    var _this$props = this.props,
      layout = _this$props.layout,
      align = _this$props.align,
      verticalAlign = _this$props.verticalAlign,
      margin = _this$props.margin,
      chartWidth = _this$props.chartWidth,
      chartHeight = _this$props.chartHeight;
    var hPos, vPos;
    if (!style || (style.left === undefined || style.left === null) && (style.right === undefined || style.right === null)) {
      if (align === 'center' && layout === 'vertical') {
        var box = this.getBBoxSnapshot() || {
          width: 0
        };
        hPos = {
          left: ((chartWidth || 0) - box.width) / 2
        };
      } else {
        hPos = align === 'right' ? {
          right: margin && margin.right || 0
        } : {
          left: margin && margin.left || 0
        };
      }
    }
    if (!style || (style.top === undefined || style.top === null) && (style.bottom === undefined || style.bottom === null)) {
      if (verticalAlign === 'middle') {
        var _box = this.getBBoxSnapshot() || {
          height: 0
        };
        vPos = {
          top: ((chartHeight || 0) - _box.height) / 2
        };
      } else {
        vPos = verticalAlign === 'bottom' ? {
          bottom: margin && margin.bottom || 0
        } : {
          top: margin && margin.top || 0
        };
      }
    }
    return (0, _extends2["default"])({}, hPos, vPos);
  };
  _proto.updateBBox = function updateBBox() {
    var _this$state2 = this.state,
      boxWidth = _this$state2.boxWidth,
      boxHeight = _this$state2.boxHeight,
      onBBoxUpdate = this.props.onBBoxUpdate;
    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      var box = this.wrapperNode.getBoundingClientRect();
      if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
        this.setState({
          boxWidth: box.width,
          boxHeight: box.height
        }, function () {
          if (onBBoxUpdate) {
            onBBoxUpdate(box);
          }
        });
      }
    } else if (boxWidth !== -1 || boxHeight !== -1) {
      this.setState({
        boxWidth: -1,
        boxHeight: -1
      }, function () {
        if (onBBoxUpdate) {
          onBBoxUpdate(null);
        }
      });
    }
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      content = _this$props2.content,
      width = _this$props2.width,
      height = _this$props2.height,
      wrapperStyle = _this$props2.wrapperStyle,
      payloadUniqBy = _this$props2.payloadUniqBy,
      payload = _this$props2.payload,
      outerStyle = (0, _extends2["default"])({
        position: 'absolute',
        width: width || 'auto',
        height: height || 'auto'
      }, this.getDefaultPosition(wrapperStyle), wrapperStyle);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL_LEGEND_WRAPPER,
      style: outerStyle,
      ref: this._refWrapperNode,
      children: _renderContent(content, (0, _extends2["default"])({}, this.props, {
        payload: (0, _componentFn.getUniqPayload)(payloadUniqBy, payload, _defaultUniqBy)
      }))
    });
  };
  return Legend;
}(_uiApi.PureComponent);
exports.Legend = Legend;
Legend.displayName = 'Legend';
Legend.defaultProps = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom'
};
//# sourceMappingURL=Legend.js.map