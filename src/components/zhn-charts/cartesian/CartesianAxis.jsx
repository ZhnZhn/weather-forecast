import {
  memo,
  useState,
  useRef,
  useEffect,
  getRefValue
} from '../../uiApi';

import crCn from '../../zhn-utils/crCn';
import { shallowEqual } from '../util/ShallowEqual';
import { crProps } from '../util/ReactUtils';

import { Layer } from '../container/Layer';
import { Label } from '../component/Label';

import {
  crFinalTicks,
  renderTicks
} from './CartesianAxisRenderFn';

import { CartesianAxisLine } from './CartesianAxisLine';

import {
  CL_AXIS,
  CL_AXIS_TICK_VALUE,
  CL_AXIS_LINE
} from '../CL';

const CARTESIAN_AXIS_DF_PROPS = {
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

const _arePropsEqual = (
  prevProps,
  nextProps
) => {
  const _prevProps = crProps(CARTESIAN_AXIS_DF_PROPS, prevProps)
  , _nextProps = crProps(CARTESIAN_AXIS_DF_PROPS, nextProps)
  , {
    viewBox,
    ...restProps
  } = _nextProps
  , {
    viewBox: viewBoxPrev,
    ...restPropsPrev
  } = _prevProps;
  return shallowEqual(viewBox, viewBoxPrev)
    && shallowEqual(restProps, restPropsPrev);
};

export const CartesianAxis = memo(props => {
  const _props = crProps(
    CARTESIAN_AXIS_DF_PROPS,
    props
  )
  , [
    state,
    setState
  ] = useState({
    fontSize: '',
    letterSpacing: ''
  })
  , {
    fontSize,
    letterSpacing
  } = state
  , _refLayer = useRef();

  useEffect(() => {
    const htmlLayer = getRefValue(_refLayer);
    if (!htmlLayer) {
      return;
    }
    const tick = htmlLayer.getElementsByClassName(CL_AXIS_TICK_VALUE)[0];
    if (tick) {
      const _tickComputedStyle = window.getComputedStyle(tick);
      setState({
        fontSize: _tickComputedStyle.fontSize,
        letterSpacing: _tickComputedStyle.letterSpacing
      })
    }
  }, [])

  const {
    axisLine,
    width,
    height,
    className,
    hide
  } = _props;
  if (hide) {
    return null;
  }

  const finalTicks = crFinalTicks(_props);
  if (width <= 0
    || height <= 0
    || !finalTicks
    || !finalTicks.length
  ) {
    return null;
  }

  return (
    <Layer
       refEl={_refLayer}
       className={crCn(CL_AXIS, className)}
    >
       {axisLine && <CartesianAxisLine
         className={CL_AXIS_LINE}
         props={props}
       />}
       {renderTicks(props, finalTicks, fontSize, letterSpacing)}
       {Label.renderCallByParent(props)}
    </Layer>
  );
}, _arePropsEqual)

CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = CARTESIAN_AXIS_DF_PROPS
