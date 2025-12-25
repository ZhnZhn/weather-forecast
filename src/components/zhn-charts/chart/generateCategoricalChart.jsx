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

import { validateWidthHeight } from '../util/ChartUtils';
import { uniqueId } from '../util/DataUtils';

import useLegendBox from './useLegendBox';
import useTooltipEvents from './useTooltipEvents';

import {
  crMouseRange,
  getTooltipData
} from './generateCategoricalChartFn';
import { CL_WRAPPER } from '../CL';


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

          const _mouseRange = crMouseRange(
            _containerElement,
            evt,
            offset
          );
          if (!_mouseRange) {
            return null;
          }

          const tooltipData = getTooltipData(
            orderedTooltipTicks,
            graphicalItems,

            data,
            layout,
            _mouseRange
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
