import {
  isNullOrUndef,
  isBool,
  isFn
} from '../../../utils/isTypeFn';

import { Component } from '../../uiApi';
import { crCn } from '../../styleFn';

import { _throttle } from '../util/FnUtils';

import { Surface } from '../container/Surface';
import { ClipPath } from '../container/ClipPath';
import { Tooltip } from '../component/Tooltip';

import {
  validateWidthHeight,
  renderByMap,
  findChildByType
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
  isLayoutVertical
} from '../util/ChartUtils';

import { getTooltipData } from './generateCategoricalChartFn';

import { fGetDerivedStateFromProps } from './fGetDerivedStateFromProps';
import { renderMap } from './renderFn';
import { renderLegend } from './renderLegend';
import { renderTooltip } from './renderTooltip';

import { CL_WRAPPER } from '../CL';

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
};

export const generateCategoricalChart = (
  chartName,
  updateStateOfAxisMapsOffsetAndStackGroups,
  defaultTooltipEventType = 'axis',
  validateTooltipEventTypes = ['axis']
) => class CategoricalChartWrapper extends Component {

            static displayName = chartName
            // todo join specific chart propTypes
            static defaultProps = {
              layout: 'horizontal',
              stackOffset: 'none',
              barCategoryGap: '10%',
              barGap: 4,
              margin: { top: 5, right: 5, bottom: 5, left: 5 },
              reverseStackOrder: false,
              syncMethod: 'index'
            }
            static getDerivedStateFromProps = fGetDerivedStateFromProps(updateStateOfAxisMapsOffsetAndStackGroups)

            _chartName = chartName;

            constructor(props) {
              super(props);

              this.uniqueChartId = isNullOrUndef(props.id)
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

            handleMouseEnter = (e) => {
              const { onMouseEnter } = this.props
              , mouse = this.getMouseInfo(e);
              if (mouse) {
                const nextState = { ...mouse, isTooltipActive: true };
                this.setState(nextState);
                if (isFn(onMouseEnter)) {
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
              if (isFn(onMouseMove)) {
                onMouseMove(nextState, e);
              }
            };

            handleMouseMove = (e) => {
              if (e && isFn(e.persist)) {
                e.persist();
              }
              this.triggeredAfterMouseMove(e);
            }

            handleMouseLeave = (e) => {
              const { onMouseLeave } = this.props
              , nextState = { isTooltipActive: false };
              this.setState(nextState);
              if (isFn(onMouseLeave)) {
                onMouseLeave(nextState, e);
              }
              this.cancelThrottledTriggerAfterMouseMove();
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
                if (isFn(onClick)) {
                  onClick(nextState, e);
                }
              }
            }

            handleMouseDown = (e) => {
              const { onMouseDown } = this.props;
              if (isFn(onMouseDown)) {
                const nextState = this.getMouseInfo(e);
                onMouseDown(nextState, e);
              }
            }

            handleMouseUp = (e) => {
              const { onMouseUp } = this.props;
              if (isFn(onMouseUp)) {
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

            _refContainer = (node) => {
              this.container = node;
            }

            componentWillUnmount() {
                this.cancelThrottledTriggerAfterMouseMove();
            }
            cancelThrottledTriggerAfterMouseMove() {
                if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
                    this.triggeredAfterMouseMove.cancel();
                }
            }
            getTooltipEventType() {
                const tooltipItem = findChildByType(this.props.children, Tooltip);
                if (tooltipItem && isBool(tooltipItem.props.shared)) {
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
                  : {};
              return tooltipEvents;
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
                //...others
              } = this.props
              , { offset } = this.state
              , attrs = {};


              // The "compact" mode is mainly used as the panorama within Brush
              if (compact) {
                return (
                  <Surface {...attrs} width={width} height={height} title={title} desc={desc}>
                     <ClipPath id={this.clipPathId} offset={offset} />
                     {renderByMap(this, renderMap)}
                  </Surface>
                );
              }

              if (this.props.accessibilityLayer) {
                // Set tabIndex to 0 by default (can be overwritten)
                attrs.tabIndex = 0 ?? this.props.tabIndex;
                // Set role to img by default (can be overwritten)
                attrs.role = 'img' ?? this.props.role;
              }
              const events = this.parseEventsOfWrapper();
              return (
                <div
                   role="region"
                   ref={this._refContainer}
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
                     {...attrs}
                     width={width}
                     height={height}
                     title={title}
                     desc={desc}
                  >
                    <ClipPath id={this.clipPathId} offset={offset} />
                    {renderByMap(this, renderMap)}
                  </Surface>
                  {renderLegend(this)}
                  {renderTooltip(this)}
               </div>
              );
            }
        };
