import {
  isFn,
  isNotEmptyArr
} from '../../../utils/isTypeFn';

import { Component } from '../../uiApi';
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

import { fGetDerivedStateFromProps } from './fGetDerivedStateFromProps';
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
) => isLayoutHorizontal(layout) || isLayoutVertical(layout)
  ? x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height
    ? { x, y }
    : null
  : null;

export const generateCategoricalChart = (
  chartName,
  updateStateOfAxisMapsOffsetAndStackGroups,
  validateTooltipEventTypes = ['axis']
) => class CategoricalChartWrapper extends Component {
            static displayName = chartName
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

            constructor(props) {
              super(props);

              this.clipPathId = `${props.id || uniqueId('recharts')}-clip`;
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

            handleMouseMove = (e) => {
              const { onMouseMove } = this.props
              , mouse = this.getMouseInfo(e)
              , nextState = mouse
                 ? { ...mouse, isTooltipActive: true }
                 : { isTooltipActive: false };
              this.setState(nextState);
              if (isFn(onMouseMove)) {
                onMouseMove(nextState, e);
              }
            }

            handleMouseLeave = (e) => {
              const { onMouseLeave } = this.props
              , nextState = { isTooltipActive: false };
              this.setState(nextState);
              if (isFn(onMouseLeave)) {
                onMouseLeave(nextState, e);
              }
            }

            handleCloseTooltip = () => {
              this.setState({ isTooltipActive: false });
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

            handleTouchMove = (evt) => {
              const evtTouch = _getEvtTouch(evt);
              if (evtTouch) {
                this.handleMouseMove(evtTouch);
              }
            }

            handleTouchStart = (evt) => {
              const evtTouch = _getEvtTouch(evt);
              if (evtTouch) {
                this.handleMouseDown(evtTouch);
              }
            }

            handleTouchEnd = (evt) => {
              const evtTouch = _getEvtTouch(evt);
              if (evtTouch) {
                this.handleMouseUp(evtTouch);
              }
            }

            _refLegend = (legend) => {
              this.legendInstance = legend;
            }

            _refContainer = (node) => {
              this.container = node;
            }

            /**
             * Get the information of mouse in chart, return null when the mouse is not in the chart
             * @param  {Object} evt    The event object
             * @return {Object}          Mouse data
             */
            getMouseInfo(evt) {
                if (!this.container) {
                  return null;
                }
                const containerOffset = getOffset(this.container)
                , e = calculateChartCoordinate(evt, containerOffset)
                , rangeObj = _inRange(
                   e.chartX,
                   e.chartY,
                   this.props.layout,
                   this.state.offset
                );
                if (!rangeObj) {
                  return null;
                }

                const tooltipData = getTooltipData(
                  this.state,
                  this.props.data,
                  this.props.layout,
                  rangeObj
                );
                return tooltipData
                  ? {
                      ...e,
                      ...tooltipData
                    }
                  : null;
            }

            parseEventsOfWrapper() {
              const {
                children
              } = this.props
              , tooltipItem = findChildByType(children, Tooltip)
              return tooltipItem
                ? tooltipItem.props.trigger === 'click'
                   ? { onClick: this.handleClick }
                   : {
                       onMouseEnter: this.handleMouseEnter,
                       onMouseMove: this.handleMouseMove,
                       onMouseLeave: this.handleMouseLeave,
                       ...HAS_TOUCH_EVENTS ? {
                         onTouchMove: this.handleTouchMove,
                         onTouchStart: this.handleTouchStart,
                         onTouchEnd: this.handleTouchEnd
                       } : void 0
                     }
                : {};
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
