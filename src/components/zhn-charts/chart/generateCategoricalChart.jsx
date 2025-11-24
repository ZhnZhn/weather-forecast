import {
  crProps,
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefValue,
  setRefValue
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { useLocalStateTuple } from '../context/localState';
import { TooltipProvider } from '../context/TooltipContext';

import { Surface } from '../container/Surface';
import { ClipPath } from '../container/ClipPath';

import {
  validateWidthHeight,
  renderByMap
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
import useTooltipEvents from './useTooltipEvents';

import { getTooltipData } from './generateCategoricalChartFn';

import { renderMap } from './renderFn';
import { renderLegend } from './renderLegend';
import { renderTooltip } from './renderTooltip';

import { CL_WRAPPER } from '../CL';

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
) => data == null
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
      children
    } = _props
    , [
      _useTooltipState,
      _setTooltipState
    ] = useLocalStateTuple({ isTooltipActive: false })
    , _refHasDataBeenUpdated = useRef(false)
    , _refClipPathId = useRef(`${_props.id || uniqueId('recharts')}-clip`)
    , _refContainer = useRef()
    , [
      legendBBox,
      handleLegendBBoxUpdate
    ] = useLegendBox()
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
      , [
        tooltipItem,
        events,
        handleCloseTooltip
      ] = useTooltipEvents(
        _props,
        getMouseTooltipData,
        _setTooltipState
      );

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
          handleCloseTooltip()
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
        formattedGraphicalItems
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
      return compact ? _graphicItemsEl : (
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
            <TooltipProvider value={_useTooltipState}>
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
                 offset,
                 handleCloseTooltip
               )}
             </TooltipProvider>
         </div>
       );
  };

  ChartWrapper.displayName = chartName
  return ChartWrapper;
}
