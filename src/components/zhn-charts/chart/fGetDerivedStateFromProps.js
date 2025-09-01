import { isNullOrUndef } from '../../../utils/isTypeFn';

import { isChildrenEqual } from '../util/ReactUtils';
import { shallowEqual } from '../util/ShallowEqual';
import { getTooltipData } from './generateCategoricalChartFn';

//[startIndex, endIndex]
const _crDataStartEndIndex = (
  props
) => [
  0,
  (props.data && props.data.length - 1) || 0
];

const _createDefaultState = (
  props
) => {
  const {
    defaultShowTooltip
  } = props
  , [
    startIndex,
    endIndex
  ] = _crDataStartEndIndex(props);

  return {
    chartX: 0,
    chartY: 0,
    dataStartIndex: startIndex,
    dataEndIndex: endIndex,
    activeTooltipIndex: -1,
    isTooltipActive: isNullOrUndef(defaultShowTooltip)
      ? !1: defaultShowTooltip
  };
};

export const fGetDerivedStateFromProps = (
  updateStateOfAxisMapsOffsetAndStackGroups
) => (
  nextProps,
  prevState
) => {
  const {
    data,
    children,
    width,
    height,
    layout,
    stackOffset,
    margin
  } = nextProps;
  if (isNullOrUndef(prevState.updateId)) {
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

  if (data !== prevState.prevData
    || width !== prevState.prevWidth
    || height !== prevState.prevHeight
    || layout !== prevState.prevLayout
    || stackOffset !== prevState.prevStackOffset
    || !shallowEqual(margin, prevState.prevMargin)
  ) {
    const defaultState = _createDefaultState(nextProps)
    , keepFromPrevState = {
      chartX: prevState.chartX,
      chartY: prevState.chartY,
      isTooltipActive: prevState.isTooltipActive
    }
    , updatesToState = {
      ...getTooltipData(prevState, data, layout),
      updateId: prevState.updateId + 1
    }
    , newState = {
      ...defaultState,
      ...keepFromPrevState,
      ...updatesToState,
    };
    return {
      ...newState,
      ...updateStateOfAxisMapsOffsetAndStackGroups({
          props: nextProps,
          ...newState,
      }, prevState),
      prevData: data,
      prevWidth: width,
      prevHeight: height,
      prevLayout: layout,
      prevStackOffset: stackOffset,
      prevMargin: margin,
      prevChildren: children,
    };
  }

  if (!isChildrenEqual(children, prevState.prevChildren)) {
    // update configuration in children
    const hasGlobalData = !isNullOrUndef(data)
    , newUpdateId = hasGlobalData
       ? prevState.updateId
       : prevState.updateId + 1;
    return {
      updateId: newUpdateId,
      ...updateStateOfAxisMapsOffsetAndStackGroups({
          props: nextProps,
          ...prevState,
          updateId: newUpdateId,
      }, prevState),
      prevChildren: children,
    };
  }

  return null;
}
