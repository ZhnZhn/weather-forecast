import { isObj } from '../../../utils/isTypeFn';
import { shallowEqual } from '../../../utils/shallowEqual';

import {
  memo,
  useRef,
  crProps,
  useDefaultProps,
  setDisplayNameTo
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { Layer } from '../container/Layer';
import { Label } from '../component/Label';

import useFontSizeByClassName from './useFontSizeByClassName';
import { getCartesianAxisTicks } from './CartesianAxisRenderFn';

import { CartesianAxisLine } from './CartesianAxisLine';
import { CartesianAxisTicks } from './CartesianAxisTicks';

import {
  CL_AXIS,
  CL_AXIS_TICK_VALUE,
  CL_AXIS_LINE
} from '../CL';

export const CARTESIAN_AXIS_DF_PROPS = {
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
  const _props = useDefaultProps(
    CARTESIAN_AXIS_DF_PROPS,
    props
  )
  , {
    x,
    y,
    width,
    height
  } = _props
  , _refLayer = useRef()
  , {
    fontSize,
    letterSpacing
  } = useFontSizeByClassName(
    _refLayer,
    CL_AXIS_TICK_VALUE
  );


  if (_props.hide || width <= 0 || height <= 0) {
    return null;
  }

  const _ticks = getCartesianAxisTicks(
    _props,
    fontSize,
    letterSpacing
  );
  return _ticks ? (
    <Layer
       refEl={_refLayer}
       className={crCn(CL_AXIS, _props.className)}
    >
       {_props.axisLine && <CartesianAxisLine
          className={CL_AXIS_LINE}
          props={_props}
       />}
       <CartesianAxisTicks
          props={_props}
          ticks={_ticks}
       />
       {isObj(_props.label) && <Label
          viewBox={{x, y, width, height}}
          {..._props.label}
        />}
    </Layer>
  ) : null;
}, _arePropsEqual)

setDisplayNameTo(CartesianAxis, 'CartesianAxis')
