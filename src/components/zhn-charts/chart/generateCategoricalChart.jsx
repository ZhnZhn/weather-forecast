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
, _createDefaultState = (
  props
) => ({
  chartX: 0,
  chartY: 0,
  dataStartIndex: 0,
  dataEndIndex: (props.data && props.data.length - 1) || 0,
  activeTooltipIndex: -1,
  isTooltipActive: !!props.defaultShowTooltip
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
    , [state, setState] = useState(() => ({
        ..._createDefaultState(_props),
        updateId: 0,
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevChildren: children
      }))
      , {
        isTooltipActive,
        activeCoordinate,
        activePayload,
        activeLabel,
        activeTooltipIndex,

        dataStartIndex,
        dataEndIndex,
        legendBBox,
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
      , handleLegendBBoxUpdate = (legendBBox) => {
         if (legendBBox) {
           setState(prevState => ({
             ...prevState,
             legendBBox
           }));
        }
      }
      , getMouseInfo = (evt) => {
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
            ? {
                chartX: rangeObj.x,
                chartY: rangeObj.y,
                ...tooltipData
              }
            : null;
      }
      , handleMouseEnter = (evt) => {
        const mouse = getMouseInfo(evt);
        if (mouse) {
          const nextState = {
            ...mouse,
            isTooltipActive: true
          };
          setState(prevState => ({
            ...prevState,
            ...nextState
          }));
          if (isFn(onMouseEnter)) {
            onMouseEnter(nextState, evt);
          }
        }
      }
      , handleMouseMove = (evt) => {
        const mouse = getMouseInfo(evt)
        , nextState = mouse
           ? { ...mouse, isTooltipActive: true }
           : { isTooltipActive: false };
        setState(prevState => ({
          ...prevState,
          ...nextState
        }));
        if (isFn(onMouseMove)) {
          onMouseMove(nextState, evt);
        }
      }
      , handleMouseLeave = (evt) => {
        const nextState = { isTooltipActive: false };
        setState(prevState => ({
          ...prevState,
          ...nextState
        }));
        if (isFn(onMouseLeave)) {
          onMouseLeave(nextState, evt);
        }
      }
      , handleCloseTooltip = () => {
        setState(prevState => ({
          ...prevState,
          isTooltipActive: false
        }))
      }

      , handleClick = (evt) => {
        const mouse = getMouseInfo(evt);
        if (mouse) {
          const nextState = {
            ...mouse,
            isTooltipActive: true
          };
          setState(prevState => ({
            ...prevState,
            ...nextState
          }));
          if (isFn(onClick)) {
            onClick(nextState, evt);
          }
        }
      }

      , handleMouseDown = (evt) => {
        if (isFn(onMouseDown)) {
          const nextState = getMouseInfo(evt);
          onMouseDown(nextState, evt);
        }
      }

      , handleMouseUp = (evt) => {
        if (isFn(onMouseUp)) {
          const nextState = getMouseInfo(evt);
          onMouseUp(nextState, evt);
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
          const defaultState = _createDefaultState(_props)
          , keepFromPrevState = {
            chartX: state.chartX,
            chartY: state.chartY,
            isTooltipActive: state.isTooltipActive
          }
          , updatesToState = {
            //...getTooltipData(state, _props.data, layout),
            ...getTooltipData({
                orderedTooltipTicks,
                tooltipAxis,
                tooltipTicks,
                graphicalItems,

                dataStartIndex,
                dataEndIndex
            }, _props.data, layout),
            updateId: state.updateId + 1
          }
          , newState = {
            ...defaultState,
            ...keepFromPrevState,
            ...updatesToState
          };
          setState(prevState => ({
            ...prevState,
            ...newState,
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
      }, renderMap);

      // The "compact" mode is mainly used as the panorama within Brush
      if (compact) {
        return (
          <Surface {...SURFACE_ATTRS} width={width} height={height} title={title} desc={desc}>
             <ClipPath id={clipPathId} offset={offset} />
             {_graphicItems}
          </Surface>
        );
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
