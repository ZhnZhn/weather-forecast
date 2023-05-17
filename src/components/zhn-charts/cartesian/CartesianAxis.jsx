import {
  isValidElement,
  cloneElement,
  Component
} from '../../uiApi';

import classNames from 'classnames';

import _get from 'lodash/get';
import { _isFn } from '../util/FnUtils';

import { shallowEqual } from '../util/ShallowEqual';
import { Layer } from '../container/Layer';
import { Text } from '../component/Text';
import { Label } from '../component/Label';
import { isNumber } from '../util/DataUtils';
import { adaptEventsOfChild, } from '../util/types';
import { filterProps } from '../util/ReactUtils';
import { getTicks } from './getTicks';

export class CartesianAxis extends Component {
    constructor(props) {
        super(props);
        this.state = { fontSize: '', letterSpacing: '' };
    }
    shouldComponentUpdate({ viewBox, ...restProps }, nextState) {
        // props.viewBox is sometimes generated every time -
        // check that specially as object equality is likely to fail
        const { viewBox: viewBoxOld, ...restPropsOld } = this.props;
        return (!shallowEqual(viewBox, viewBoxOld) ||
            !shallowEqual(restProps, restPropsOld) ||
            !shallowEqual(nextState, this.state));
    }
    componentDidMount() {
        const htmlLayer = this.layerReference;
        if (!htmlLayer)
            return;
        const tick = htmlLayer.getElementsByClassName('recharts-cartesian-axis-tick-value')[0];
        if (tick) {
            this.setState({
                fontSize: window.getComputedStyle(tick).fontSize,
                letterSpacing: window.getComputedStyle(tick).letterSpacing,
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
        const { x, y, width, height, orientation, tickSize, mirror, tickMargin } = this.props;
        let x1, x2, y1, y2, tx, ty;
        const sign = mirror ? -1 : 1;
        const finalTickSize = data.tickSize || tickSize;
        const tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
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
        return { line: { x1, y1, x2, y2 }, tick: { x: tx, y: ty } };
    }
    getTickTextAnchor() {
        const { orientation, mirror } = this.props;
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
        const { orientation, mirror } = this.props;
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
        const { x, y, width, height, orientation, mirror, axisLine } = this.props;
        let props = {
            ...filterProps(this.props),
            ...filterProps(axisLine),
            fill: 'none',
        };
        if (orientation === 'top' || orientation === 'bottom') {
            const needHeight = +((orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror));
            props = {
                ...props,
                x1: x,
                y1: y + needHeight * height,
                x2: x + width,
                y2: y + needHeight * height,
            };
        }
        else {
            const needWidth = +((orientation === 'left' && !mirror) || (orientation === 'right' && mirror));
            props = {
                ...props,
                x1: x + needWidth * width,
                y1: y,
                x2: x + needWidth * width,
                y2: y + height,
            };
        }
        return <line {...props} className={classNames('recharts-cartesian-axis-line', _get(axisLine, 'className'))}/>;
    }
    static renderTickItem(option, props, value) {
        let tickItem;
        if (isValidElement(option)) {
            tickItem = cloneElement(option, props);
        }
        else if (_isFn(option)) {
            tickItem = option(props);
        }
        else {
            tickItem = (<Text {...props} className="recharts-cartesian-axis-tick-value">
          {value}
        </Text>);
        }
        return tickItem;
    }
    /**
     * render the ticks
     * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
     * @param {string} fontSize Fontsize to consider for tick spacing
     * @param {string} letterSpacing Letterspacing to consider for tick spacing
     * @return {ReactComponent} renderedTicks
     */
    renderTicks(ticks, fontSize, letterSpacing) {
        const { tickLine, stroke, tick, tickFormatter, unit } = this.props;
        const finalTicks = getTicks({ ...this.props, ticks }, fontSize, letterSpacing);
        const textAnchor = this.getTickTextAnchor();
        const verticalAnchor = this.getTickVerticalAnchor();
        const axisProps = filterProps(this.props);
        const customTickProps = filterProps(tick);
        const tickLineProps = {
            ...axisProps,
            fill: 'none',
            ...filterProps(tickLine),
        };
        const items = finalTicks.map((entry, i) => {
            const { line: lineCoord, tick: tickCoord } = this.getTickLineCoord(entry);
            const tickProps = {
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
                tickFormatter,
            };
            return (<Layer className="recharts-cartesian-axis-tick" key={`tick-${i}`} // eslint-disable-line react/no-array-index-key
             {...adaptEventsOfChild(this.props, entry, i)}>
          {tickLine && (<line {...tickLineProps} {...lineCoord} className={classNames('recharts-cartesian-axis-tick-line', _get(tickLine, 'className'))}/>)}
          {tick &&
                    CartesianAxis.renderTickItem(tick, tickProps, `${_isFn(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`)}
        </Layer>);
        });
        return <g className="recharts-cartesian-axis-ticks">{items}</g>;
    }
    render() {
        const { axisLine, width, height, ticksGenerator, className, hide } = this.props;
        if (hide) {
            return null;
        }
        const { ticks, ...noTicksProps } = this.props;
        let finalTicks = ticks;
        if (_isFn(ticksGenerator)) {
            finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
        }
        if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
            return null;
        }
        return (<Layer className={classNames('recharts-cartesian-axis', className)} ref={ref => {
                this.layerReference = ref;
            }}>
        {axisLine && this.renderAxisLine()}
        {this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing)}
        {Label.renderCallByParent(this.props)}
      </Layer>);
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
    interval: 'preserveEnd',
};
