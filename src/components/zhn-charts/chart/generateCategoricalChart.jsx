import { Component } from '../../uiApi';

import crCn from '../../zhn-utils/crCn';

import {
  _throttle,
  _isBool,
  _isNil,
  _isFn,
  _getByPropName
} from '../util/FnUtils';

import { getTicks } from '../cartesian/getTicks';
import { CartesianAxis } from '../cartesian/CartesianAxis';
import { Surface } from '../container/Surface';
import { Tooltip } from '../component/Tooltip';
import { isInRectangle } from '../shape/RectangleFn';

import {
  validateWidthHeight,
  renderByMap,
  getDisplayName,
  getReactEventByType,
  findChildByType,
  filterProps
} from '../util/ReactUtils';
import {
  calculateChartCoordinate,
  getOffset
} from '../util/DOMUtils';
import {
  uniqueId,
  getAnyElementOfObject,
} from '../util/DataUtils';
import {
  isLayoutHorizontal,
  isLayoutVertical,
  getTicksOfAxis,
  getCoordinatesOfGrid
} from '../util/ChartUtils';
import {
  eventCenter,
  SYNC_EVENT
} from '../util/Events';
import {
  adaptEventHandlers
} from '../util/types';

import { originCoordinate } from './chartFn';
import { AccessibilityManager } from './AccessibilityManager';
import { getTooltipContent } from './getTooltipContent';
import {
  fUpdateStateOfAxisMapsOffsetAndStackGroups
} from './fUpdateStateOfAxisOffsetAndStackGroups';

import {
  defer,
  deferClear,
  getTooltipData
} from './generateCategoricalChartFn';

import { fGetDerivedStateFromProps } from './fGetDerivedStateFromProps';
import { renderMap } from './renderFn';
import { renderLegend } from './renderLegend';
import { renderTooltip } from './renderTooltip';
import { renderClipPath } from './renderClipPath';

import {
  CL_WRAPPER,
  crAxisCl
} from '../CL';

const _inRange = (
  x,
  y,
  props,
  state
) =>  {
  const { layout } = props;
  if (isLayoutHorizontal(layout) || isLayoutVertical(layout)) {
    const { offset } = state
    , isInRange = x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
    return isInRange
      ? { x, y }
      : null;
  }
  return null;
}

export const generateCategoricalChart = ({
  chartName,
  GraphicalChild,
  defaultTooltipEventType = 'axis',
  validateTooltipEventTypes = ['axis'],
  axisComponents,
  legendContent,
  formatAxisMap,
  defaultProps
}) => {
    const updateStateOfAxisMapsOffsetAndStackGroups = fUpdateStateOfAxisMapsOffsetAndStackGroups(
      chartName,
      GraphicalChild,
      axisComponents,
      formatAxisMap
    );
    return class CategoricalChartWrapper extends Component {

            static displayName = chartName
            // todo join specific chart propTypes
            static defaultProps = {
              layout: 'horizontal',
              stackOffset: 'none',
              barCategoryGap: '10%',
              barGap: 4,
              margin: { top: 5, right: 5, bottom: 5, left: 5 },
              reverseStackOrder: false,
              syncMethod: 'index',
              ...defaultProps
            }
            static getDerivedStateFromProps = fGetDerivedStateFromProps(updateStateOfAxisMapsOffsetAndStackGroups)

            _chartName = chartName;
            accessibilityManager = new AccessibilityManager();

            constructor(props) {
              super(props);

              this.uniqueChartId = _isNil(props.id)
                ? uniqueId('recharts')
                : props.id;
              this.clipPathId = `${this.uniqueChartId}-clip`;

              if (props.throttleDelay) {
                this.triggeredAfterMouseMove = _throttle(
                  this.triggeredAfterMouseMove,
                  props.throttleDelay
                );
              }

              this.state = {};
            }

            clearDeferId = () => {
              if (!_isNil(this.deferId) && deferClear) {
                deferClear(this.deferId);
              }
              this.deferId = null;
            }

            axesTicksGenerator = (axis) => getTicksOfAxis(axis, true)

            verticalCoordinatesGenerator = ({ xAxis, width, height, offset }) => getCoordinatesOfGrid(getTicks({
                ...CartesianAxis.defaultProps,
                ...xAxis,
                ticks: getTicksOfAxis(xAxis, true),
                viewBox: { x: 0, y: 0, width, height },
            }), offset.left, offset.left + offset.width)

            horizontalCoordinatesGenerator = ({ yAxis, width, height, offset }) => getCoordinatesOfGrid(getTicks({
                ...CartesianAxis.defaultProps,
                ...yAxis,
                ticks: getTicksOfAxis(yAxis, true),
                viewBox: { x: 0, y: 0, width, height },
            }), offset.top, offset.top + offset.height)

            handleLegendBBoxUpdate = (box) => {
              if (box) {
                const {
                  dataStartIndex,
                  dataEndIndex,
                  updateId
                } = this.state;
                this.setState({
                  legendBBox: box,
                  ...updateStateOfAxisMapsOffsetAndStackGroups({
                    props: this.props,
                    dataStartIndex,
                    dataEndIndex,
                    updateId
                  }, { ...this.state, legendBBox: box })
                });
              }
            }

            handleReceiveSyncEvent = (cId, chartId, data) => {
              const { syncId } = this.props;
              if (syncId === cId && chartId !== this.uniqueChartId) {
                this.clearDeferId();
                this.deferId = defer && defer(this.applySyncEvent.bind(this, data));
              }
            }

            handleBrushChange = ({ startIndex, endIndex }) => {
              // Only trigger changes if the extents of the brush have actually changed
              if (startIndex !== this.state.dataStartIndex || endIndex !== this.state.dataEndIndex) {
                const { updateId } = this.state;
                this.setState(() => ({
                  dataStartIndex: startIndex,
                  dataEndIndex: endIndex,
                  ...updateStateOfAxisMapsOffsetAndStackGroups({
                    props: this.props,
                    dataStartIndex: startIndex,
                    dataEndIndex: endIndex,
                    updateId,
                  }, this.state)
                }));
                this.triggerSyncEvent({
                  dataStartIndex: startIndex,
                  dataEndIndex: endIndex
                });
              }
            }

            handleMouseEnter = (e) => {
              const { onMouseEnter } = this.props
              , mouse = this.getMouseInfo(e);
              if (mouse) {
                const nextState = { ...mouse, isTooltipActive: true };
                this.setState(nextState);
                this.triggerSyncEvent(nextState);
                if (_isFn(onMouseEnter)) {
                  onMouseEnter(nextState, e);
                }
              }
            }

            triggeredAfterMouseMove = (e) => {
              const { onMouseMove } = this.props
              , mouse = this.getMouseInfo(e)
              , nextState = mouse
                 ? { ...mouse, isTooltipActive: true }
                 : { isTooltipActive: false };
              this.setState(nextState);
              this.triggerSyncEvent(nextState);
              if (_isFn(onMouseMove)) {
                onMouseMove(nextState, e);
              }
            };

            handleItemMouseEnter = (el) => {
              this.setState(() => ({
                isTooltipActive: true,
                activeItem: el,
                activePayload: el.tooltipPayload,
                activeCoordinate: el.tooltipPosition || { x: el.cx, y: el.cy }
              }));
            }

            handleItemMouseLeave = () => {
              this.setState(() => ({
                isTooltipActive: false
              }));
            }

            handleMouseMove = (e) => {
              if (e && _isFn(e.persist)) {
                e.persist();
              }
              this.triggeredAfterMouseMove(e);
            }

            handleMouseLeave = (e) => {
              const { onMouseLeave } = this.props
              , nextState = { isTooltipActive: false };
              this.setState(nextState);
              this.triggerSyncEvent(nextState);
              if (_isFn(onMouseLeave)) {
                onMouseLeave(nextState, e);
              }
              this.cancelThrottledTriggerAfterMouseMove();
            }

            handleOuterEvent = (e) => {
              const eventName = getReactEventByType(e)
              , event = _getByPropName(this.props, `${eventName}`);
              if (eventName && _isFn(event)) {
                const mouse = /.*touch.*/i.test(eventName)
                  ? this.getMouseInfo(e.changedTouches[0])
                  : this.getMouseInfo(e);
                // handler event case;
                event(mouse, e);
              }
            }

            handleClick = (e) => {
              const { onClick } = this.props
              , mouse = this.getMouseInfo(e);
              if (mouse) {
                const nextState = {
                  ...mouse,
                  isTooltipActive: true
                };
                this.setState(nextState);
                this.triggerSyncEvent(nextState);
                if (_isFn(onClick)) {
                  onClick(nextState, e);
                }
              }
            }

            handleMouseDown = (e) => {
              const { onMouseDown } = this.props;
              if (_isFn(onMouseDown)) {
                const nextState = this.getMouseInfo(e);
                onMouseDown(nextState, e);
              }
            }

            handleMouseUp = (e) => {
              const { onMouseUp } = this.props;
              if (_isFn(onMouseUp)) {
                const nextState = this.getMouseInfo(e);
                onMouseUp(nextState, e);
              }
            }

            handleTouchMove = (e) => {
              if (e.changedTouches != null && e.changedTouches.length > 0) {
                this.handleMouseMove(e.changedTouches[0]);
              }
            }

            handleTouchStart = (e) => {
              if (e.changedTouches != null && e.changedTouches.length > 0) {
                this.handleMouseDown(e.changedTouches[0]);
              }
            }

            handleTouchEnd = (e) => {
              if (e.changedTouches != null && e.changedTouches.length > 0) {
                this.handleMouseUp(e.changedTouches[0]);
              }
            }

            _refLegend = (legend) => {
              this.legendInstance = legend;
            }

            componentDidMount() {
              if (!_isNil(this.props.syncId)) {
                this.addListener();
              }
              this.accessibilityManager.setDetails({
                container: this.container,
                offset: {
                  left: this.props.margin.left ?? 0,
                  top: this.props.margin.top ?? 0
                },
                coordinateList: this.state.tooltipTicks,
                mouseHandlerCallback: this.handleMouseMove,
                layout: this.props.layout
              });
            }

            getSnapshotBeforeUpdate(prevProps, prevState) {
                if (!this.props.accessibilityLayer) {
                    return null;
                }
                if (this.state.tooltipTicks !== prevState.tooltipTicks) {
                    this.accessibilityManager.setDetails({
                        coordinateList: this.state.tooltipTicks,
                    });
                }
                if (this.props.layout !== prevProps.layout) {
                    this.accessibilityManager.setDetails({
                        layout: this.props.layout,
                    });
                }
                if (this.props.margin !== prevProps.margin) {
                    this.accessibilityManager.setDetails({
                        offset: {
                            left: this.props.margin.left ?? 0,
                            top: this.props.margin.top ?? 0,
                        },
                    });
                }
                // Something has to be returned for getSnapshotBeforeUpdate
                return null;
            }
            componentDidUpdate(prevProps) {
                // add syncId
                if (_isNil(prevProps.syncId) && !_isNil(this.props.syncId)) {
                    this.addListener();
                }
                // remove syncId
                if (!_isNil(prevProps.syncId) && _isNil(this.props.syncId)) {
                    this.removeListener();
                }
            }
            componentWillUnmount() {
                this.clearDeferId();
                if (!_isNil(this.props.syncId)) {
                    this.removeListener();
                }
                this.cancelThrottledTriggerAfterMouseMove();
            }
            cancelThrottledTriggerAfterMouseMove() {
                if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
                    this.triggeredAfterMouseMove.cancel();
                }
            }
            getTooltipEventType() {
                const tooltipItem = findChildByType(this.props.children, Tooltip);
                if (tooltipItem && _isBool(tooltipItem.props.shared)) {
                    const eventType = tooltipItem.props.shared ? 'axis' : 'item';
                    return validateTooltipEventTypes.indexOf(eventType) >= 0 ? eventType : defaultTooltipEventType;
                }
                return defaultTooltipEventType;
            }

            /**
             * Get the information of mouse in chart, return null when the mouse is not in the chart
             * @param  {Object} event    The event object
             * @return {Object}          Mouse data
             */
            getMouseInfo(event) {
                if (!this.container) {
                  return null;
                }
                const containerOffset = getOffset(this.container)
                , e = calculateChartCoordinate(event, containerOffset)
                , rangeObj = _inRange(
                   e.chartX,
                   e.chartY,
                   this.props,
                   this.state
                );
                if (!rangeObj) {
                    return null;
                }

                const { xAxisMap, yAxisMap } = this.state;
                const tooltipEventType = this.getTooltipEventType();
                if (tooltipEventType !== 'axis' && xAxisMap && yAxisMap) {
                    const xScale = getAnyElementOfObject(xAxisMap).scale;
                    const yScale = getAnyElementOfObject(yAxisMap).scale;
                    const xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
                    const yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
                    return { ...e, xValue, yValue };
                }
                const toolTipData = getTooltipData(this.state, this.props.data, this.props.layout, rangeObj);
                if (toolTipData) {
                    return {
                        ...e,
                        ...toolTipData,
                    };
                }
                return null;
            }

            getCursorRectangle() {
              const { layout } = this.props
              , {
                activeCoordinate,
                offset,
                tooltipAxisBandSize
              } = this.state
              , halfSize = tooltipAxisBandSize / 2
              , _isLayoutHorizontal = isLayoutHorizontal(layout);
              return {
                stroke: 'none',
                fill: '#ccc',
                x: _isLayoutHorizontal
                  ? activeCoordinate.x - halfSize
                  : offset.left + 0.5,
                y: _isLayoutHorizontal
                  ? offset.top + 0.5
                  : activeCoordinate.y - halfSize,
                width: _isLayoutHorizontal
                  ? tooltipAxisBandSize
                  : offset.width - 1,
                height: _isLayoutHorizontal
                  ? offset.height - 1
                  : tooltipAxisBandSize
              };
            }

            getCursorPoints() {
                const { layout } = this.props;
                const { activeCoordinate, offset } = this.state;
                let x1, y1, x2, y2;
                if (isLayoutHorizontal(layout)) {
                    x1 = activeCoordinate.x;
                    x2 = x1;
                    y1 = offset.top;
                    y2 = offset.top + offset.height;
                } else if (isLayoutVertical(layout)) {
                    y1 = activeCoordinate.y;
                    y2 = y1;
                    x1 = offset.left;
                    x2 = offset.left + offset.width;
                }
                return [
                    { x: x1, y: y1 },
                    { x: x2, y: y2 },
                ];
            }

            parseEventsOfWrapper() {
              const {
                children
              } = this.props
              , tooltipEventType = this.getTooltipEventType()
              , tooltipItem = findChildByType(children, Tooltip)
              , tooltipEvents = tooltipItem && tooltipEventType === 'axis'
                 ? tooltipItem.props.trigger === 'click'
                     ? { onClick: this.handleClick }
                     : {
                         onMouseEnter: this.handleMouseEnter,
                         onMouseMove: this.handleMouseMove,
                         onMouseLeave: this.handleMouseLeave,
                         onTouchMove: this.handleTouchMove,
                         onTouchStart: this.handleTouchStart,
                         onTouchEnd: this.handleTouchEnd,
                       }
                  : {}
              , outerEvents = adaptEventHandlers(
                 this.props,
                 this.handleOuterEvent
              );
              return {
                  ...outerEvents,
                  ...tooltipEvents,
              };
            }

            addListener() {
              eventCenter.on(SYNC_EVENT, this.handleReceiveSyncEvent);
              if (eventCenter.setMaxListeners && eventCenter._maxListeners) {
                eventCenter.setMaxListeners(eventCenter._maxListeners + 1);
              }
            }

            removeListener() {
              eventCenter.removeListener(SYNC_EVENT, this.handleReceiveSyncEvent);
              if (eventCenter.setMaxListeners && eventCenter._maxListeners) {
                eventCenter.setMaxListeners(eventCenter._maxListeners - 1);
              }
            }

            triggerSyncEvent(data) {
              const { syncId } = this.props;
              if (!_isNil(syncId)) {
                eventCenter.emit(SYNC_EVENT, syncId, this.uniqueChartId, data);
              }
            }

            applySyncEvent(data) {
                const { layout, syncMethod } = this.props;
                const { updateId } = this.state;
                const { dataStartIndex, dataEndIndex } = data;
                if (!_isNil(data.dataStartIndex) || !_isNil(data.dataEndIndex)) {
                    this.setState({
                        dataStartIndex,
                        dataEndIndex,
                        ...updateStateOfAxisMapsOffsetAndStackGroups({
                            props: this.props,
                            dataStartIndex,
                            dataEndIndex,
                            updateId,
                        }, this.state),
                    });
                }
                else if (!_isNil(data.activeTooltipIndex)) {
                    const { chartX, chartY } = data;
                    let { activeTooltipIndex } = data;
                    const { offset, tooltipTicks } = this.state;
                    if (!offset) {
                        return;
                    }
                    if (typeof syncMethod === 'function') {
                        // Call a callback function. If there is an application specific algorithm
                        activeTooltipIndex = syncMethod(tooltipTicks, data);
                    }
                    else if (syncMethod === 'value') {
                        // Set activeTooltipIndex to the index with the same value as data.activeLabel
                        // For loop instead of findIndex because the latter is very slow in some browsers
                        activeTooltipIndex = -1; // in case we cannot find the element
                        for (let i = 0; i < tooltipTicks.length; i++) {
                            if (tooltipTicks[i].value === data.activeLabel) {
                                activeTooltipIndex = i;
                                break;
                            }
                        }
                    }
                    const viewBox = { ...offset, x: offset.left, y: offset.top };
                    // When a categorical chart is combined with another chart, the value of chartX
                    // and chartY may beyond the boundaries.
                    const validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
                    const validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
                    const activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
                    const activePayload = getTooltipContent(this.state, this.props.data, activeTooltipIndex);
                    const activeCoordinate = tooltipTicks[activeTooltipIndex]
                        ? {
                            x: isLayoutHorizontal(layout)
                              ? tooltipTicks[activeTooltipIndex].coordinate
                              : validateChartX,
                            y: isLayoutHorizontal(layout)
                              ? validateChartY
                              : tooltipTicks[activeTooltipIndex].coordinate,
                        }
                        : originCoordinate;
                    this.setState({
                        ...data,
                        activeLabel,
                        activeCoordinate,
                        activePayload,
                        activeTooltipIndex,
                    });
                }
                else {
                    this.setState(data);
                }
            }

            /**
             * Draw axis
             * @param {Object} axisOptions The options of axis
             * @param {Object} element      The axis element
             * @param {String} displayName  The display name of axis
             * @param {Number} index        The index of element
             * @return {ReactElement}       The instance of x-axes
             */
            renderAxis(axisOptions, element, displayName, index) {
              const {
                width,
                height
              } = this.props
              , {
                axisType,
                className
              } = axisOptions;
              return (
                <CartesianAxis
                   {...axisOptions}
                   key={element.key || `${displayName}-${index}`}
                   className={crCn(crAxisCl(axisType), className)}
                   viewBox={{ x: 0, y: 0, width, height }}
                   ticksGenerator={this.axesTicksGenerator}
                />
              );
            }

            getXScales() {
              const { xAxisMap } = this.state;
              return xAxisMap
                ? Object.entries(xAxisMap).reduce((res, [axisId, axisProps]) => {
                    return { ...res, [axisId]: axisProps.scale };
                  }, {})
                : null;
            }

            getYScales() {
              const { yAxisMap } = this.state;
              return yAxisMap
                ? Object.entries(yAxisMap).reduce((res, [axisId, axisProps]) => {
                    return { ...res, [axisId]: axisProps.scale };
                  }, {})
                : null;
            }

            getXScaleByAxisId(axisId) {
              return this.state.xAxisMap?.[axisId]?.scale;
            }

            getYScaleByAxisId(axisId) {
              return this.state.yAxisMap?.[axisId]?.scale;
            }

            getItemByXY(chartXY) {
              const {
                formattedGraphicalItems
              } = this.state;
              if (formattedGraphicalItems && formattedGraphicalItems.length) {
                for (let i = 0, len = formattedGraphicalItems.length; i < len; i++) {
                  const graphicalItem = formattedGraphicalItems[i]
                  , { props, item } = graphicalItem
                  , itemDisplayName = getDisplayName(item.type);
                  if (itemDisplayName === 'Bar') {
                    const activeBarItem = (props.data || [])
                     .find(entry => isInRectangle(chartXY, entry));
                    if (activeBarItem) {
                      return { graphicalItem, payload: activeBarItem };
                    }
                  }
                }
              }
              return null;
            }

            render() {
              if (!validateWidthHeight(this)) {
                return null;
              }

              const {
                className,
                width,
                height,
                style,
                compact,
                title,
                desc,
                ...others
              } = this.props
              , attrs = filterProps(others);

              // The "compact" mode is mainly used as the panorama within Brush
              if (compact) {
                return (
                  <Surface {...attrs} width={width} height={height} title={title} desc={desc}>
                     {renderClipPath(this)}
                     {renderByMap(this, renderMap)}
                  </Surface>
                );
              }

              if (this.props.accessibilityLayer) {
                // Set tabIndex to 0 by default (can be overwritten)
                attrs.tabIndex = 0 ?? this.props.tabIndex;
                // Set role to img by default (can be overwritten)
                attrs.role = 'img' ?? this.props.role;
                attrs.onKeyDown = (e) => {
                  this.accessibilityManager.keyboardEvent(e);
                  // 'onKeyDown' is not currently a supported prop that can be passed through
                  // if it's added, this should be added: this.props.onKeyDown(e);
                };
                attrs.onFocus = () => {
                  this.accessibilityManager.focus();
                  // 'onFocus' is not currently a supported prop that can be passed through
                  // if it's added, the focus event should be forwarded to the prop
                };
              }
              const events = this.parseEventsOfWrapper();
              return (
                <div
                   className={crCn(CL_WRAPPER, className)}
                   style={{ position: 'relative', cursor: 'default', width, height, ...style }}
                   {...events}
                   ref={node => { this.container = node;}}
                   role="region"
                >
                  <Surface
                     {...attrs}
                     width={width}
                     height={height}
                     title={title}
                     desc={desc}
                  >
                    {renderClipPath(this)}
                    {renderByMap(this, renderMap)}
                  </Surface>
                  {renderLegend(this, legendContent)}
                  {renderTooltip(this)}
               </div>
              );
            }
        };
};
