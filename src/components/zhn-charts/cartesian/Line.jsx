import { isNullOrUndef } from '../../../utils/isTypeFn';

import {
  memo,
  useRef,
  useState,
  useEffect,
  crProps
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { Layer } from '../container/Layer';
import { LabelList } from '../component/LabelList';

import { IS_SSR } from '../util/Global';
import {
  getCateCoordinateOfLine,
  getValueByDataKey
} from '../util/ChartUtils';

import {
  isHideOrNoData,
  isNeedClip,
  crClipPathProps
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
  try {
    return (curveDom
      && curveDom.getTotalLength
      && curveDom.getTotalLength()
    ) || DF_TOTAL_LENGTH;
  }
  catch (err) {
    return DF_TOTAL_LENGTH;
  }
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
    id,
    animationId
  } = _props
  , _refPath = useRef()
  , [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ] = useAnimationHandle(_props)
  , [
    prevPoints
  ] = usePrevCurData(
     points,
     animationId
   )
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
  , _clipPathProps = crClipPathProps(needClip, clipPathId)
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
              clipPathProps={_clipPathProps}
              prevPoints={prevPoints}
              totalLength={totalLength}
              props={_props}
              refPath={_refPath}
              handleAnimationStart={handleAnimationStart}
              handleAnimationEnd={handleAnimationEnd}
          />)
        : (<LineCurveStatically
              clipPathProps={_clipPathProps}
              points={points}
              props={_props}
              refPath={_refPath}
          />)
      }
      {_isLineDots && (<LineDots
          clipPathProps={_clipPathProps}
          props={_props}
      />)}
      {_isAnimationNotActiveOrFinished
        && LabelList.renderCallByParent(
              _props,
              points
      )}
  </Layer>
 );
})

Line.displayName = 'Line';

/**
 * Compose the data of each group
 * @param {Object} props The props from the component
 * @param  {Object} xAxis   The configuration of x-axis
 * @param  {Object} yAxis   The configuration of y-axis
 * @param  {String} dataKey The unique key of a group
 * @return {Array}  Composed data
 */
Line.getComposedData = ({
  props,
  xAxis,
  yAxis,
  xAxisTicks,
  yAxisTicks,
  dataKey,
  bandSize,
  displayedData,
  offset
}) => {
  const { layout } = props
  , points = displayedData.map((entry, index) => {
      const value = getValueByDataKey(
        entry,
        dataKey
      );
      return layout === 'horizontal'
        ? {
            x: getCateCoordinateOfLine({ axis: xAxis, ticks: xAxisTicks, bandSize, entry, index }),
            y: isNullOrUndef(value) ? null : yAxis.scale(value),
            value,
            payload: entry
          }
        : {
            x: isNullOrUndef(value) ? null : xAxis.scale(value),
            y: getCateCoordinateOfLine({ axis: yAxis, ticks: yAxisTicks, bandSize, entry, index }),
            value,
            payload: entry
         };
  });
  return {
    points,
    layout,
    ...offset
  };
};
