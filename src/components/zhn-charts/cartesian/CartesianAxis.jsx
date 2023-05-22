import { Component } from '../../uiApi';

import classNames from 'classnames';

import { _isFn } from '../util/FnUtils';
import { shallowEqual } from '../util/ShallowEqual';
import { isNumber } from '../util/DataUtils';
import { adaptEventsOfChild, } from '../util/types';
import { filterProps } from '../util/ReactUtils';

import { Layer } from '../container/Layer';
import { Text } from '../component/Text';
import { Label } from '../component/Label';

import { getTicks } from './getTicks';
import { fCreateElement } from './cartesianFn';

const CL_AXIS = "recharts-cartesian-axis"
, CL_AXIS_LINE = `${CL_AXIS}-line`
, CL_AXIS_TICK = `${CL_AXIS}-tick`
, CL_AXIS_TICKS = `${CL_AXIS_TICK}s`
, CL_AXIS_TICK_LINE = `${CL_AXIS_TICK}-line`
, CL_AXIS_TICK_VALUE = `${CL_AXIS_TICK}-value`;

const _crTextElement = (
  props,
  option,
  value
) => (
  <Text {...props} className={CL_AXIS_TICK_VALUE}>
    {value}
  </Text>
);

const _getClassName = (
  obj
) => obj
  ? obj.className
  : void 0;

const _crFinalTicks = (
  props
) => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;

  return _isFn(ticksGenerator)
    ? ticks && ticks.length > 0
       ? ticksGenerator(props)
       : ticksGenerator(noTicksProps)
    : ticks;
};

const _renderTickItem = fCreateElement(_crTextElement);

export class CartesianAxis extends Component {
  state = { fontSize: '', letterSpacing: '' }

  shouldComponentUpdate({ viewBox, ...restProps }, nextState) {
    // props.viewBox is sometimes generated every time -
    // check that specially as object equality is likely to fail
    const {
      viewBox: viewBoxOld,
      ...restPropsOld
    } = this.props;
    return !shallowEqual(viewBox, viewBoxOld)
      || !shallowEqual(restProps, restPropsOld)
      || !shallowEqual(nextState, this.state);
  }

  componentDidMount() {
    const htmlLayer = this.layerReference;
    if (!htmlLayer) {
      return;
    }
    const tick = htmlLayer.getElementsByClassName(CL_AXIS_TICK_VALUE)[0];
    if (tick) {
      const _tickComputedStyle = window.getComputedStyle(tick);
      this.setState({
        fontSize: _tickComputedStyle.fontSize,
        letterSpacing: _tickComputedStyle.letterSpacing,
      });
    }
  }

  /**
   * Calculate the coordinates of endpoints in ticks
   * @param  {Object} data The data of a simple tick
   * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
   *  (x2, y2): The coordinate of endpoint close to axis
   */
  getTickLineCoord(data) {
    const {
      x,
      y,
      width,
      height,
      orientation,
      tickSize,
      mirror,
      tickMargin
    } = this.props
    , sign = mirror ? -1 : 1
    , finalTickSize = data.tickSize || tickSize
    , tickCoord = isNumber(data.tickCoord)
       ? data.tickCoord
       : data.coordinate;
    let x1, x2, y1, y2, tx, ty;
    switch (orientation) {
      case 'top':
        x1 = x2 = data.coordinate;
        y2 = y + +!mirror * height;
        y1 = y2 - sign * finalTickSize;
        ty = y1 - sign * tickMargin;
        tx = tickCoord;
        break;
      case 'left':
        y1 = y2 = data.coordinate;
        x2 = x + +!mirror * width;
        x1 = x2 - sign * finalTickSize;
        tx = x1 - sign * tickMargin;
        ty = tickCoord;
        break;
      case 'right':
        y1 = y2 = data.coordinate;
        x2 = x + +mirror * width;
        x1 = x2 + sign * finalTickSize;
        tx = x1 + sign * tickMargin;
        ty = tickCoord;
        break;
      default:
        x1 = x2 = data.coordinate;
        y2 = y + +mirror * height;
        y1 = y2 + sign * finalTickSize;
        ty = y1 + sign * tickMargin;
        tx = tickCoord;
        break;
    }
    return {
      line: { x1, y1, x2, y2 },
      tick: { x: tx, y: ty }
    };
  }

  getTickTextAnchor() {
    const {
      orientation,
      mirror
    } = this.props;
    let textAnchor;
    switch (orientation) {
      case 'left':
        textAnchor = mirror ? 'start' : 'end';
        break;
      case 'right':
        textAnchor = mirror ? 'end' : 'start';
        break;
      default:
        textAnchor = 'middle';
        break;
    }
    return textAnchor;
  }

  getTickVerticalAnchor() {
    const {
      orientation,
      mirror
    } = this.props;
    let verticalAnchor = 'end';
    switch (orientation) {
      case 'left':
      case 'right':
        verticalAnchor = 'middle';
        break;
      case 'top':
        verticalAnchor = mirror ? 'start' : 'end';
        break;
      default:
        verticalAnchor = mirror ? 'end' : 'start';
        break;
    }
    return verticalAnchor;
  }

  renderAxisLine() {
    const {
      x,
      y,
      width,
      height,
      orientation,
      mirror,
      axisLine
    } = this.props;
    let props = {
      ...filterProps(this.props),
      ...filterProps(axisLine),
      fill: 'none'
    };
    if (orientation === 'top' || orientation === 'bottom') {
      const needHeight = +((orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror));
      props = {
        ...props,
        x1: x,
        y1: y + needHeight * height,
        x2: x + width,
        y2: y + needHeight * height
      };
    } else {
       const needWidth = +((orientation === 'left' && !mirror) || (orientation === 'right' && mirror));
       props = {
         ...props,
         x1: x + needWidth * width,
         y1: y,
         x2: x + needWidth * width,
         y2: y + height
       };
    }
    const _axisLineClassName = _getClassName(axisLine);
    return (
      <line
        {...props}
        className={classNames(CL_AXIS_LINE, _axisLineClassName)}
      />
    );
  }

  /**
   * render the ticks
   * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
   * @param {string} fontSize Fontsize to consider for tick spacing
   * @param {string} letterSpacing Letterspacing to consider for tick spacing
   * @return {ReactComponent} renderedTicks
   */
  renderTicks(ticks, fontSize, letterSpacing) {
    const {
      tickLine,
      stroke,
      tick,
      tickFormatter,
      unit
    } = this.props
    , finalTicks = getTicks({ ...this.props, ticks }, fontSize, letterSpacing)
    , textAnchor = this.getTickTextAnchor()
    , verticalAnchor = this.getTickVerticalAnchor()
    , axisProps = filterProps(this.props)
    , customTickProps = filterProps(tick)
    , tickLineProps = {
        ...axisProps,
        fill: 'none',
        ...filterProps(tickLine),
    }
    , items = finalTicks.map((entry, i) => {
        const {
          line: lineCoord,
          tick: tickCoord
        } = this.getTickLineCoord(entry)
        , tickProps = {
            textAnchor,
            verticalAnchor,
            ...axisProps,
            stroke: 'none',
            fill: stroke,
            ...customTickProps,
            ...tickCoord,
            index: i,
            payload: entry,
            visibleTicksCount: finalTicks.length,
            tickFormatter
        };
        const _tickLineClassName = _getClassName(tickLine);
        return (
          <Layer className={CL_AXIS_TICK} key={`tick-${i}`}
            {...adaptEventsOfChild(this.props, entry, i)}>
            {tickLine && (
               <line
                  {...tickLineProps}
                  {...lineCoord}
                  className={classNames(CL_AXIS_TICK_LINE, _tickLineClassName)}
               />
             )}
            {tick && _renderTickItem(tick, tickProps, `${_isFn(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`)}
          </Layer>
        );
    });
    return (
      <g className={CL_AXIS_TICKS}>
        {items}
      </g>
    );
  }

  _refLayerReference = ref => {
    this.layerReference = ref;
  }

  render() {
    const {
      axisLine,
      width,
      height,
      className,
      hide
    } = this.props;
    if (hide) {
      return null;
    }

    const finalTicks = _crFinalTicks(this.props);
    if (width <= 0
      || height <= 0
      || !finalTicks
      || !finalTicks.length
    ) {
      return null;
    }

    const {
      fontSize,
      letterSpacing
    } = this.state;
    return (
      <Layer
         className={classNames(CL_AXIS, className)}
         ref={this._refLayerReference}
      >
         {axisLine && this.renderAxisLine()}
         {this.renderTicks(finalTicks, fontSize, letterSpacing)}
         {Label.renderCallByParent(this.props)}
      </Layer>
    );
  }
}

CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
  // The orientation of axis
  orientation: 'bottom',
  // The ticks
  ticks: [],
  stroke: '#666',
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: 'preserveEnd'
};
