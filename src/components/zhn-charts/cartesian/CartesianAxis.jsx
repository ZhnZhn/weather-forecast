import { Component } from '../../uiApi';

import crCn from '../../zhn-utils/crCn';
import { shallowEqual } from '../util/ShallowEqual';

import { Layer } from '../container/Layer';
import { Label } from '../component/Label';

import {
  crFinalTicks,
  renderAxisLine,
  renderTicks
} from './CartesianAxisRenderFn';

import {
  CL_AXIS,
  CL_AXIS_TICK_VALUE
} from '../CL';

export class CartesianAxis extends Component {
  state = {
    fontSize: '',
    letterSpacing: ''
  }

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

  _refLayerReference = layerEl => {
    this.layerReference = layerEl;
  }

  render() {
    const {
      props,
      state
    } = this
    , {
      axisLine,
      width,
      height,
      className,
      hide
    } = props;
    if (hide) {
      return null;
    }

    const finalTicks = crFinalTicks(props);
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
    } = state;

    return (
      <Layer
         refEl={this._refLayerReference}
         className={crCn(CL_AXIS, className)}
      >
         {axisLine && renderAxisLine(props)}
         {renderTicks(props, finalTicks, fontSize, letterSpacing)}
         {Label.renderCallByParent(props)}
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
