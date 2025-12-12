import {
  memo,
  useRef,
  useState,
  useEffect,
  crProps,
  setDisplayNameTo
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { Layer } from '../container/Layer';
import { IS_SSR } from '../util/Global';
import {
  isLayoutHorizontal,
  getValueByDataKey
} from '../util/ChartUtils';
import {
  findEntryInArray
} from '../util/DataUtils';

import {
  isHideOrNoData,
  isNeedClip,
  crClipPath
} from './cartesianFn';

import useAnimationHandle from './useAnimationHandle';
import usePrevCurData from './usePrevCurData';
import useClipPathId from './useClipPathId';

import ClipPathRect  from './ClipPathRect';
import { LineDots } from './LineDots';
import { LineCurveStatically } from './LineCurveStatically';
import { LineCurveWithAnimation } from './LineCurveWithAnimation';

import { CL_LINE } from '../CL';

const DF_TOTAL_LENGTH = 0;
const _getTotalLength = (
  curveDom
) => {
  let _totalLength;
  try {
   _totalLength = (curveDom
      && curveDom.getTotalLength
      && curveDom.getTotalLength())
      || DF_TOTAL_LENGTH
  } catch (err) {
    _totalLength = DF_TOTAL_LENGTH
  }
  return _totalLength;
};

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
  isAnimationActive: !IS_SSR,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: false,
  label: false
}

export const Line = memo((props) => {
  const _props = crProps(DF_PROPS, props)
  , {
    dot,
    points,
    className,
    isAnimationActive,
    id
  } = _props
  , _refPath = useRef()
  , [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ] = useAnimationHandle(_props)
  , [
    prevPoints
  ] = usePrevCurData(points)
  , clipPathId = useClipPathId(
     CL_LINE,
     id
   )
  , [
    totalLength,
    setTotalLength
  ] = useState(0)

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!isAnimationActive) {
      return;
    }
    setTotalLength(_getTotalLength(_refPath.current))
  }, [])
  //isAnimationActive
  /*eslint-enable react-hooks/exhaustive-deps */


  if (isHideOrNoData(_props, points)) {
    return null;
  }

  const hasSinglePoint = points.length === 1
  , layerClass = crCn(CL_LINE, className)
  , needClip = isNeedClip(_props)
  , _clipPath = crClipPath(needClip, clipPathId)
  , _isAnimationNotActiveOrFinished = !isAnimationActive
    || isAnimationFinished
  , _isLineDots = (hasSinglePoint || dot)
     && _isAnimationNotActiveOrFinished
  , _isLineCurveWithAnimaton = !hasSinglePoint
     && isAnimationActive
     //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
     && ((!prevPoints && totalLength > 0) || prevPoints !== points);

  return (
    <Layer className={layerClass}>
      <ClipPathRect
         is={needClip}
         id={clipPathId}
         props={_props}
      />
      {_isLineCurveWithAnimaton
         ? (<LineCurveWithAnimation
              clipPath={_clipPath}
              prevPoints={prevPoints}
              totalLength={totalLength}
              props={_props}
              refPath={_refPath}
              handleAnimationStart={handleAnimationStart}
              handleAnimationEnd={handleAnimationEnd}
          />)
        : (<LineCurveStatically
              clipPath={_clipPath}
              points={points}
              props={_props}
              refPath={_refPath}
          />)
      }
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
    // find coordinate of category axis by the value of category
    if (!axis.allowDuplicatedCategory && axis.dataKey && !(entry[axis.dataKey] == null) ) {
      const matchedTick = findEntryInArray(ticks, 'value', entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
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
