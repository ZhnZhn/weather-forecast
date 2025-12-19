import {
  memo,
  useRef,
  crProps,
  setDisplayNameTo
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { Layer } from '../container/Layer';
import {
  isLayoutHorizontal,
  getValueByDataKey
} from '../util/ChartUtils';

import {
  isHideOrNoData,
  isNeedClip,
  crClipPath
} from './cartesianFn';

import useClipPathId from './useClipPathId';

import ClipPathRect  from './ClipPathRect';
import { LineDots } from './LineDots';
import { LineCurveStatically } from './LineCurveStatically';


import { CL_LINE } from '../CL';

const DF_PROPS = {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: 'line',
  stroke: '#3182bd',
  strokeWidth: 1,
  fill: '#fff',
  points: [],
  hide: false,
  label: false
}

export const Line = memo((props) => {
  const _props = crProps(DF_PROPS, props)
  , {
    dot,
    points,
    className,
    id
  } = _props
  , _refPath = useRef()
  , clipPathId = useClipPathId(
     CL_LINE,
     id
   )

  if (isHideOrNoData(_props, points)) {
    return null;
  }

  const _needClip = isNeedClip(_props)
  , _clipPath = crClipPath(_needClip, clipPathId)
  , _isLineDots = (points.length === 1 || dot);

  return (
    <Layer className={crCn(CL_LINE, className)}>
      <ClipPathRect
         is={_needClip}
         id={clipPathId}
         props={_props}
      />
      <LineCurveStatically
        clipPath={_clipPath}
        points={points}
        props={_props}
        refPath={_refPath}
      />)
      {_isLineDots && (<LineDots
          clipPath={_clipPath}
          props={_props}
      />)}
  </Layer>
 );
})

setDisplayNameTo(Line, 'Line')

const _getAxisScaleValue = (
  axis,
  value
) => value == null
  ? value
  : axis.scale(value);

const _getCateCoordinateOfLine = ({
  axis,
  ticks,
  bandSize,
  entry,
  index,
  dataKey
}) => {
  if (axis.type === 'category') {    
    return ticks[index]
      ? ticks[index].coordinate + bandSize / 2
      : null;
  }

  const value = getValueByDataKey(
    entry,
    dataKey == null
      ? axis.dataKey
      : dataKey
  );
  return _getAxisScaleValue(axis, value);
};

/**
 * Compose the data of each group
 * @param {Object} props The props from the component
 * @param  {Object} xAxis   The configuration of x-axis
 * @param  {Object} yAxis   The configuration of y-axis
 * @param  {String} dataKey The unique key of a group
 * @return {Array}  Composed data
 */
export const getLineComposedData = ({
  layout,
  xAxis,
  yAxis,
  xAxisTicks,
  yAxisTicks,
  bandSize,
  dataKey,
  displayedData,
  offset
}) => {
  const [
    _crX,
    _crY
  ] = isLayoutHorizontal(layout)
    ? [
      (value, entry, index) => _getCateCoordinateOfLine({ axis: xAxis, ticks: xAxisTicks, bandSize, entry, index }),
      (value) => _getAxisScaleValue(yAxis, value)
    ] : [
      (value) => _getAxisScaleValue(xAxis, value),
      (value, entry, index) => _getCateCoordinateOfLine({ axis: yAxis, ticks: yAxisTicks, bandSize, entry, index })
    ];
  return {
    points: displayedData.map((entry, index) => {
        const value = getValueByDataKey(
          entry,
          dataKey
        );
        return {
          x: _crX(value, entry, index),
          y: _crY(value, entry, index),
          value,
          payload: entry
        };
    }),
    layout,
    ...offset
  };
};
