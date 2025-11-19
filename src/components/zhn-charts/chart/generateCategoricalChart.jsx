import {
  isFn,
  isNotEmptyArr,
  isNullOrUndef
} from '../../../utils/isTypeFn';

import {
  crProps,
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefValue,
  setRefValue
} from '../../uiApi';
import { HAS_TOUCH_EVENTS } from '../../has';
import { crCn } from '../../styleFn';

import { Surface } from '../container/Surface';
import { ClipPath } from '../container/ClipPath';
import { Tooltip } from '../component/Tooltip';

import {
  validateWidthHeight,
  renderByMap,
  findChildByType
} from '../util/ReactUtils';
import { isChildrenEqual } from '../util/ReactUtils';
import {
  calculateChartCoordinate,
  getOffset
} from '../util/DOMUtils';
import {
  uniqueId
} from '../util/DataUtils';
import {
  isLayoutHorizontal,
  isLayoutVertical
} from '../util/ChartUtils';

import useLegendBox from './useLegendBox';

import { getTooltipData } from './generateCategoricalChartFn';

import { renderMap } from './renderFn';
import { renderLegend } from './renderLegend';
import { renderTooltip } from './renderTooltip';

import { CL_WRAPPER } from '../CL';

const _getEvtTouch = ({
  changedTouches
}) => isNotEmptyArr(changedTouches)
  ? changedTouches[0]
  : void 0

const _inRange = (
  x,
  y,
  layout,
  offset
) => (isLayoutHorizontal(layout) || isLayoutVertical(layout))
  && (x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height)
  ? { x, y }
  : null;

const _crMouseRange = (
  containerElement,
  evt,
  layout,
  offset
) => {
  const _containerOffset = getOffset(containerElement)
  , _e = calculateChartCoordinate(evt, _containerOffset);
  return _inRange(
     _e.chartX,
     _e.chartY,
     layout,
     offset
  );
}

const _crNextUpdateId = (
  data,
  updateId
) => isNullOrUndef(data)
  ? updateId + 1
  : updateId;

const DF_PROPS = {
  layout: 'horizontal',
  stackOffset: 'none',
  barCategoryGap: '10%',
  barGap: 4,
  margin: { top: 5, right: 5, bottom: 5, left: 5 },
  reverseStackOrder: false,
  syncMethod: 'index'
}
, _crDfTooltipState = (props) => ({
  isTooltipActive: !!props.defaultShowTooltip
})
, _crDfState = (
  props
) => ({
  dataStartIndex: 0,
  dataEndIndex: (props.data && props.data.length - 1) || 0
})
, SURFACE_ATTRS = {
  tabIndex: 0,
  role: 'img'
};


export const generateCategoricalChart = (
  chartName,
  updateStateOfAxisMapsOffsetAndStackGroups,
  validateTooltipEventTypes = ['axis']
) => {
  const ChartWrapper = (props) => {
    const _props = crProps(DF_PROPS, props)
    , {
      className,
      width,
      height,
      margin,
      style,
      compact,
      title,
      desc,
      layout,
      data,
      children,

      onMouseEnter,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave,
      onClick
    } = _props
    , _refHasDataBeenUpdated = useRef(false)
    , _refClipPathId = useRef(`${_props.id || uniqueId('recharts')}-clip`)
    , _refContainer = useRef()
    , [
      legendBBox,
      handleLegendBBoxUpdate
    ] = useLegendBox()
    , [
      tooltipState,
      setTooltipState
    ] = useState(() => _crDfTooltipState(_props))
    , {
      isTooltipActive,
      activeCoordinate,
      activePayload,
      activeLabel,
      activeTooltipIndex
    } = tooltipState
    , [
      state,
      setState
    ] = useState(() => ({
        ..._crDfState(_props),
        updateId: 0,
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevChildren: children
      }))
      , {
        dataStartIndex,
        dataEndIndex,
        updateId
      } = state
      , {
        offset,
        formattedGraphicalItems,

        tooltipAxis,

        xAxisMap,
        yAxisMap,

        orderedTooltipTicks,
        tooltipTicks,
        graphicalItems
      } = useMemo(() => updateStateOfAxisMapsOffsetAndStackGroups({
        props: _props,
        dataStartIndex,
        dataEndIndex,
        updateId
      }, legendBBox), [
        _props,
        dataStartIndex,
        dataEndIndex,
        updateId,
        legendBBox
      ])
      , getMouseTooltipData = (evt) => {
          const _containerElement = getRefValue(_refContainer)
          if (!_containerElement) {
            return null;
          }

          const rangeObj = _crMouseRange(
            _containerElement,
            evt,
            layout,
            offset
          );
          if (!rangeObj) {
            return null;
          }

          const tooltipData = getTooltipData(
            {
              orderedTooltipTicks,
              tooltipAxis,
              tooltipTicks,
              graphicalItems,

              dataStartIndex,
              dataEndIndex
            },
            data,
            layout,
            rangeObj
          );
          return tooltipData
            ? tooltipData
            : null;
      }
      , handleMouseEnter = (evt) => {
        const tooltipData = getMouseTooltipData(evt);
        if (tooltipData) {
          const nextState = {
            ...tooltipData,
            isTooltipActive: true
          };
          setTooltipState(nextState)
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
        setTooltipState(nextState)
        if (isFn(onMouseMove)) {
          onMouseMove(nextState, evt);
        }
      }
      , handleMouseLeave = (evt) => {
        const nextState = { isTooltipActive: false };
        setTooltipState(nextState)
        if (isFn(onMouseLeave)) {
          onMouseLeave(nextState, evt);
        }
      }
      , handleCloseTooltip = () => {
        setTooltipState({ isTooltipActive: false })
      }

      , handleClick = (evt) => {
        const tooltipData = getMouseTooltipData(evt);
        if (tooltipData) {
          const nextState = {
            ...tooltipData,
            isTooltipActive: true
          };
          setTooltipState(nextState)
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
      , handleTouchMove = (evt) => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseMove(evtTouch);
        }
      }

      , handleTouchStart = (evt) => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseDown(evtTouch);
        }
      }

      , handleTouchEnd = (evt) => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseUp(evtTouch);
        }
      }

      /*eslint-disable react-hooks/exhaustive-deps*/
      useEffect(() => {
        if (data !== state.prevData
          || width !== state.prevWidth
          || height !== state.prevHeight
          //|| layout !== prevState.prevLayout
          //|| stackOffset !== prevState.prevStackOffset
          //|| !shallowEqual(margin, prevState.prevMargin)
        ) {
          setRefValue(_refHasDataBeenUpdated, true)
          const nextState = {
            ..._crDfState(_props),
            updateId: state.updateId + 1
          };
          setTooltipState({ isTooltipActive: false })
          setState(prevState => ({
            ...prevState,
            ...nextState,
            prevData: data,
            prevWidth: width,
            prevHeight: height,
            //prevLayout: layout,
            //prevStackOffset: stackOffset,
            //prevMargin: margin,
            prevChildren: children
          }))

        } else if (!isChildrenEqual(_props.children, state.prevChildren) && !getRefValue(_refHasDataBeenUpdated)) {
          setState(prevState => ({
            ...prevState,
            updateId: _crNextUpdateId(_props.data, state.updateId),
            prevChildren: children
          }))
        } else {
          setRefValue(_refHasDataBeenUpdated, false)
        }
      })
      /*eslint-enable react-hooks/exhaustive-deps*/

      if (!validateWidthHeight(width, height)) {
        return null;
      }

      const clipPathId = getRefValue(_refClipPathId)
      , _graphicItems = renderByMap(children, {
        clipPathId,
        width,
        height,
        layout,
        children,

        offset,
        xAxisMap,
        yAxisMap,

        formattedGraphicalItems,
        isTooltipActive,
        tooltipAxis,
        activeTooltipIndex,
        activeLabel
      }, renderMap)
      , _graphicItemsEl = (
        <Surface
          {...SURFACE_ATTRS}
          width={width}
          height={height}
          title={title}
          desc={desc}
        >
          <ClipPath id={clipPathId} offset={offset} />
          {_graphicItems}
        </Surface>
      );

      // The "compact" mode is mainly used as the panorama within Brush
      if (compact) {
        return _graphicItemsEl;
      }

      const tooltipItem = findChildByType(children, Tooltip)
      , events = tooltipItem
        ? tooltipItem.props.trigger === 'click'
           ? { onClick: handleClick }
           : {
               onMouseEnter: handleMouseEnter,
               onMouseMove: handleMouseMove,
               onMouseLeave: handleMouseLeave,
               ...HAS_TOUCH_EVENTS ? {
                 onTouchMove: handleTouchMove,
                 onTouchStart: handleTouchStart,
                 onTouchEnd: handleTouchEnd
               } : void 0
             }
        : {};
        return (
          <div
             role="region"
             ref={_refContainer}
             className={crCn(CL_WRAPPER, className)}
             style={{
               position: 'relative',
               cursor: 'default',
               width,
               height,
               ...style
             }}
             {...events}
          >
            {_graphicItemsEl}
            {renderLegend(
               width,
               height,
               margin,
               children,
               formattedGraphicalItems,
               handleLegendBBoxUpdate
            )}
            {renderTooltip(
               tooltipItem,
               isTooltipActive,
               activeCoordinate,
               activePayload,
               activeLabel,
               offset,
               handleCloseTooltip
             )}
         </div>
       );
  };

  ChartWrapper.displayName = chartName
  return ChartWrapper;
}
