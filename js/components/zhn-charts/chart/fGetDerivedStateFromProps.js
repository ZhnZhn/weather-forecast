"use strict";

exports.__esModule = true;
exports.fGetDerivedStateFromProps = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _ReactUtils = require("../util/ReactUtils");
var _ShallowEqual = require("../util/ShallowEqual");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
//[startIndex, endIndex]
const _crDataStartEndIndex = props => [0, props.data && props.data.length - 1 || 0];
const _createDefaultState = props => {
  const {
      defaultShowTooltip
    } = props,
    [startIndex, endIndex] = _crDataStartEndIndex(props);
  return {
    chartX: 0,
    chartY: 0,
    dataStartIndex: startIndex,
    dataEndIndex: endIndex,
    activeTooltipIndex: -1,
    isTooltipActive: (0, _isTypeFn.isNullOrUndef)(defaultShowTooltip) ? !1 : defaultShowTooltip
  };
};
const fGetDerivedStateFromProps = updateStateOfAxisMapsOffsetAndStackGroups => (nextProps, prevState) => {
  const {
    data,
    children,
    width,
    height,
    layout,
    stackOffset,
    margin
  } = nextProps;
  if ((0, _isTypeFn.isNullOrUndef)(prevState.updateId)) {
    const defaultState = _createDefaultState(nextProps);
    return {
      ...defaultState,
      updateId: 0,
      ...updateStateOfAxisMapsOffsetAndStackGroups({
        props: nextProps,
        ...defaultState,
        updateId: 0
      }, prevState),
      prevData: data,
      prevWidth: width,
      prevHeight: height,
      prevLayout: layout,
      prevStackOffset: stackOffset,
      prevMargin: margin,
      prevChildren: children
    };
  }
  if (data !== prevState.prevData || width !== prevState.prevWidth || height !== prevState.prevHeight || layout !== prevState.prevLayout || stackOffset !== prevState.prevStackOffset || !(0, _ShallowEqual.shallowEqual)(margin, prevState.prevMargin)) {
    const defaultState = _createDefaultState(nextProps),
      keepFromPrevState = {
        chartX: prevState.chartX,
        chartY: prevState.chartY,
        isTooltipActive: prevState.isTooltipActive
      },
      updatesToState = {
        ...(0, _generateCategoricalChartFn.getTooltipData)(prevState, data, layout),
        updateId: prevState.updateId + 1
      },
      newState = {
        ...defaultState,
        ...keepFromPrevState,
        ...updatesToState
      };
    return {
      ...newState,
      ...updateStateOfAxisMapsOffsetAndStackGroups({
        props: nextProps,
        ...newState
      }, prevState),
      prevData: data,
      prevWidth: width,
      prevHeight: height,
      prevLayout: layout,
      prevStackOffset: stackOffset,
      prevMargin: margin,
      prevChildren: children
    };
  }
  if (!(0, _ReactUtils.isChildrenEqual)(children, prevState.prevChildren)) {
    // update configuration in children
    const hasGlobalData = !(0, _isTypeFn.isNullOrUndef)(data),
      newUpdateId = hasGlobalData ? prevState.updateId : prevState.updateId + 1;
    return {
      updateId: newUpdateId,
      ...updateStateOfAxisMapsOffsetAndStackGroups({
        props: nextProps,
        ...prevState,
        updateId: newUpdateId
      }, prevState),
      prevChildren: children
    };
  }
  return null;
};
exports.fGetDerivedStateFromProps = fGetDerivedStateFromProps;
//# sourceMappingURL=fGetDerivedStateFromProps.js.map