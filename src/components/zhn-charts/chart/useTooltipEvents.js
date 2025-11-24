import {
  isFn,
  isNotEmptyArr
} from '../../../utils/isTypeFn';

import { HAS_TOUCH_EVENTS } from '../../has';

import { Tooltip } from '../component/Tooltip';
import { findChildByType } from '../util/ReactUtils';

const _getEvtTouch = ({
  changedTouches
}) => isNotEmptyArr(changedTouches)
  ? changedTouches[0]
  : void 0;

const _fHandleTouch = (handleMouse) => (evt) => {
  const evtTouch = _getEvtTouch(evt);
  if (evtTouch) {
    handleMouse(evtTouch);
  }
};

const CLOSE_TOOLTIP_STATE = {
  isTooltipActive: false,
  activeTooltipIndex: null
};

const useTooltipEvents = (
  props,
  getMouseTooltipData,
  _setTooltipState
) => {
  const {
    onMouseEnter,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseLeave,
    onClick
  } = props

  , handleMouseEnter = (evt) => {
      const tooltipData = getMouseTooltipData(evt);
      if (tooltipData) {
        const nextState = {
          ...tooltipData,
          isTooltipActive: true
        };
        _setTooltipState(nextState)
        if (isFn(onMouseEnter)) {
          onMouseEnter(nextState, evt);
        }
      }
  }
  , handleMouseMove = (evt) => {
      const tooltipData = getMouseTooltipData(evt)
      , nextState = tooltipData
         ? { ...tooltipData, isTooltipActive: true }
         : { isTooltipActive: false };
      _setTooltipState(nextState)
      if (isFn(onMouseMove)) {
        onMouseMove(nextState, evt);
      }
  }
  , handleMouseLeave = (evt) => {
      const nextState = {...CLOSE_TOOLTIP_STATE};
      _setTooltipState(nextState)
      if (isFn(onMouseLeave)) {
        onMouseLeave(nextState, evt);
      }
  }
  , handleCloseTooltip = () => {
      _setTooltipState({
        ...CLOSE_TOOLTIP_STATE
      })
  }

  , handleClick = (evt) => {
      const tooltipData = getMouseTooltipData(evt);
      if (tooltipData) {
        const nextState = {
          ...tooltipData,
          isTooltipActive: true
        };
        _setTooltipState(nextState)
        if (isFn(onClick)) {
          onClick(nextState, evt);
        }
      }
  }

  , handleMouseDown = (evt) => {
      if (isFn(onMouseDown)) {
        const tooltipData = getMouseTooltipData(evt);
        onMouseDown(tooltipData, evt);
      }
  }

  , handleMouseUp = (evt) => {
      if (isFn(onMouseUp)) {
        const tooltipData = getMouseTooltipData(evt);
        onMouseUp(tooltipData, evt);
      }
  }

  , tooltipItem = findChildByType(props.children, Tooltip)
  , events = tooltipItem
     ? tooltipItem.props.trigger === 'click'
        ? { onClick: handleClick }
        : {
           onMouseEnter: handleMouseEnter,
           onMouseMove: handleMouseMove,
           onMouseLeave: handleMouseLeave,
           ...HAS_TOUCH_EVENTS ? {
             onTouchMove: _fHandleTouch(handleMouseMove),
             onTouchStart: _fHandleTouch(handleMouseDown),
             onTouchEnd: _fHandleTouch(handleMouseUp)
           } : void 0
         }
     : {};

  return [
    tooltipItem,
    events,
    handleCloseTooltip
  ];
};

export default useTooltipEvents
