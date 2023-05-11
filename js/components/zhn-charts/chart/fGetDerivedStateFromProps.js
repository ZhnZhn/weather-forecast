"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fGetDerivedStateFromProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _ShallowEqual = require("../util/ShallowEqual");
var _Brush = require("../cartesian/Brush");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _createDefaultState = function _createDefaultState(props) {
  var _brushItem$props, _brushItem$props2;
  var children = props.children,
    defaultShowTooltip = props.defaultShowTooltip,
    brushItem = (0, _ReactUtils.findChildByType)(children, _Brush.Brush),
    startIndex = brushItem && brushItem.props && brushItem.props.startIndex || 0,
    endIndex = (brushItem == null ? void 0 : (_brushItem$props = brushItem.props) == null ? void 0 : _brushItem$props.endIndex) !== void 0 ? brushItem == null ? void 0 : (_brushItem$props2 = brushItem.props) == null ? void 0 : _brushItem$props2.endIndex : props.data && props.data.length - 1 || 0;
  return {
    chartX: 0,
    chartY: 0,
    dataStartIndex: startIndex,
    dataEndIndex: endIndex,
    activeTooltipIndex: -1,
    isTooltipActive: !(0, _FnUtils._isNil)(defaultShowTooltip) ? defaultShowTooltip : false
  };
};
var fGetDerivedStateFromProps = function fGetDerivedStateFromProps(updateStateOfAxisMapsOffsetAndStackGroups) {
  return function (nextProps, prevState) {
    var data = nextProps.data,
      children = nextProps.children,
      width = nextProps.width,
      height = nextProps.height,
      layout = nextProps.layout,
      stackOffset = nextProps.stackOffset,
      margin = nextProps.margin;
    if ((0, _FnUtils._isNil)(prevState.updateId)) {
      var defaultState = _createDefaultState(nextProps);
      return (0, _extends2["default"])({}, defaultState, {
        updateId: 0
      }, updateStateOfAxisMapsOffsetAndStackGroups((0, _extends2["default"])({
        props: nextProps
      }, defaultState, {
        updateId: 0
      }), prevState), {
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevLayout: layout,
        prevStackOffset: stackOffset,
        prevMargin: margin,
        prevChildren: children
      });
    }
    if (data !== prevState.prevData || width !== prevState.prevWidth || height !== prevState.prevHeight || layout !== prevState.prevLayout || stackOffset !== prevState.prevStackOffset || !(0, _ShallowEqual.shallowEqual)(margin, prevState.prevMargin)) {
      var _defaultState = _createDefaultState(nextProps),
        keepFromPrevState = {
          chartX: prevState.chartX,
          chartY: prevState.chartY,
          isTooltipActive: prevState.isTooltipActive
        },
        updatesToState = (0, _extends2["default"])({}, (0, _generateCategoricalChartFn.getTooltipData)(prevState, data, layout), {
          updateId: prevState.updateId + 1
        }),
        newState = (0, _extends2["default"])({}, _defaultState, keepFromPrevState, updatesToState);
      return (0, _extends2["default"])({}, newState, updateStateOfAxisMapsOffsetAndStackGroups((0, _extends2["default"])({
        props: nextProps
      }, newState), prevState), {
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevLayout: layout,
        prevStackOffset: stackOffset,
        prevMargin: margin,
        prevChildren: children
      });
    }
    if (!(0, _ReactUtils.isChildrenEqual)(children, prevState.prevChildren)) {
      // update configuration in children
      var hasGlobalData = !(0, _FnUtils._isNil)(data),
        newUpdateId = hasGlobalData ? prevState.updateId : prevState.updateId + 1;
      return (0, _extends2["default"])({
        updateId: newUpdateId
      }, updateStateOfAxisMapsOffsetAndStackGroups((0, _extends2["default"])({
        props: nextProps
      }, prevState, {
        updateId: newUpdateId
      }), prevState), {
        prevChildren: children
      });
    }
    return null;
  };
};
exports.fGetDerivedStateFromProps = fGetDerivedStateFromProps;
//# sourceMappingURL=fGetDerivedStateFromProps.js.map