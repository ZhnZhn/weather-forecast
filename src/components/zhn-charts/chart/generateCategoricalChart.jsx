import {
  crProps,
  useRef,
  useMemo,
  getRefValue,
  cloneUiElement
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { useLocalStateTuple } from '../context/localState';
import { TooltipProvider } from '../context/TooltipContext';

import { Surface } from '../container/Surface';
import { ClipPath } from '../container/ClipPath';

import {
  validateWidthHeight
} from '../util/ReactUtils';
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

const DF_PROPS = {
  layout: 'horizontal',
  stackOffset: 'none',
  barCategoryGap: '10%',
  barGap: 4,
  margin: { top: 5, right: 5, bottom: 5, left: 5 },
  reverseStackOrder: false,
  syncMethod: 'index'
}
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
      data
    } = _props
    , [
      _useTooltipState,
      _setTooltipState
    ] = useLocalStateTuple({ isTooltipActive: false })
    , _refClipPathId = useRef(`${_props.id || uniqueId('recharts')}-clip`)
    , _refContainer = useRef()
    , [
      legendBBox,
      handleLegendBBoxUpdate
    ] = useLegendBox()
      , clipPathId = getRefValue(_refClipPathId)
      , [
        offset,
        orderedTooltipTicks,
        graphicalItems,
        _graphicItems,
        _legendProps,
        _legendItem
      ] = useMemo(() => updateStateOfAxisMapsOffsetAndStackGroups({
        props: _props
      }, legendBBox, clipPathId), [
        _props,
        legendBBox,
        clipPathId
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
            orderedTooltipTicks,
            graphicalItems,

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

      if (!validateWidthHeight(width, height)) {
        return null;
      }

      const _graphicItemsEl = (
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
              {_legendProps ? cloneUiElement(_legendItem, {
                ..._legendProps,
                chartWidth: width || 0,
                chartHeight: height || 0,
                margin,
                onBBoxUpdate: handleLegendBBoxUpdate
              }) : null}
              {tooltipItem ? cloneUiElement(tooltipItem, {
                viewBox: {
                  ...offset,
                  x: offset.left,
                  y: offset.top
                },
                onClose: handleCloseTooltip
              }) : null}
             </TooltipProvider>
         </div>
       );
  };

  ChartWrapper.displayName = chartName
  return ChartWrapper;
}
