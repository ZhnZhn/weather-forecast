"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _has = require("../../has");
var _Tooltip = require("../component/Tooltip");
var _ReactUtils = require("../util/ReactUtils");
const _getEvtTouch = _ref => {
  let {
    changedTouches
  } = _ref;
  return (0, _isTypeFn.isNotEmptyArr)(changedTouches) ? changedTouches[0] : void 0;
};
const _fHandleTouch = handleMouse => evt => {
  const evtTouch = _getEvtTouch(evt);
  if (evtTouch) {
    handleMouse(evtTouch);
  }
};
const CLOSE_TOOLTIP_STATE = {
  isTooltipActive: false,
  activeTooltipIndex: null
};
const useTooltipEvents = (props, getMouseTooltipData, _setTooltipState) => {
  const {
      onMouseEnter,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave,
      onClick
    } = props,
    handleMouseEnter = evt => {
      const tooltipData = getMouseTooltipData(evt);
      if (tooltipData) {
        const nextState = Object.assign({}, tooltipData, {
          isTooltipActive: true
        });
        _setTooltipState(nextState);
        if ((0, _isTypeFn.isFn)(onMouseEnter)) {
          onMouseEnter(nextState, evt);
        }
      }
    },
    handleMouseMove = evt => {
      const tooltipData = getMouseTooltipData(evt),
        nextState = tooltipData ? Object.assign({}, tooltipData, {
          isTooltipActive: true
        }) : {
          isTooltipActive: false
        };
      _setTooltipState(nextState);
      if ((0, _isTypeFn.isFn)(onMouseMove)) {
        onMouseMove(nextState, evt);
      }
    },
    handleMouseLeave = evt => {
      const nextState = Object.assign({}, CLOSE_TOOLTIP_STATE);
      _setTooltipState(nextState);
      if ((0, _isTypeFn.isFn)(onMouseLeave)) {
        onMouseLeave(nextState, evt);
      }
    },
    handleCloseTooltip = () => {
      _setTooltipState(Object.assign({}, CLOSE_TOOLTIP_STATE));
    },
    handleClick = evt => {
      const tooltipData = getMouseTooltipData(evt);
      if (tooltipData) {
        const nextState = Object.assign({}, tooltipData, {
          isTooltipActive: true
        });
        _setTooltipState(nextState);
        if ((0, _isTypeFn.isFn)(onClick)) {
          onClick(nextState, evt);
        }
      }
    },
    handleMouseDown = evt => {
      if ((0, _isTypeFn.isFn)(onMouseDown)) {
        const tooltipData = getMouseTooltipData(evt);
        onMouseDown(tooltipData, evt);
      }
    },
    handleMouseUp = evt => {
      if ((0, _isTypeFn.isFn)(onMouseUp)) {
        const tooltipData = getMouseTooltipData(evt);
        onMouseUp(tooltipData, evt);
      }
    },
    tooltipItem = (0, _ReactUtils.findChildByType)(props.children, _Tooltip.Tooltip),
    events = tooltipItem ? tooltipItem.props.trigger === 'click' ? {
      onClick: handleClick
    } : Object.assign({
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave
    }, _has.HAS_TOUCH_EVENTS ? {
      onTouchMove: _fHandleTouch(handleMouseMove),
      onTouchStart: _fHandleTouch(handleMouseDown),
      onTouchEnd: _fHandleTouch(handleMouseUp)
    } : void 0) : {};
  return [tooltipItem, events, handleCloseTooltip];
};
var _default = exports.default = useTooltipEvents;
//# sourceMappingURL=useTooltipEvents.js.map