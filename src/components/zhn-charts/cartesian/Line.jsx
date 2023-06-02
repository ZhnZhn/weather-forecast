import {
  memo,
  useRef,
  useState,
  useEffect
} from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { _isNil } from '../util/FnUtils';

import { Layer } from '../container/Layer';
import { LabelList } from '../component/LabelList';

import { Global } from '../util/Global';
import {
  getCateCoordinateOfLine,
  getValueByDataKey
} from '../util/ChartUtils';

import {
  renderDots,
  renderErrorBar,
  renderCurve
} from './LineRenderFn';

import { isNeedClip } from './cartesianFn';

import useAnimationHandle from './useAnimationHandle';
import usePrevCurData from './usePrevCurData';
import useClipPathId from './useClipPathId';

import ClipPathRect  from './ClipPathRect';
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

export const Line = memo((props) => {
  const {
    hide,
    dot,
    points,
    className,
    isAnimationActive,
    id,
    animationId
  } = props
  , _refPath = useRef()
  , [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ] = useAnimationHandle(props)
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


  if (hide || !points || !points.length) {
    return null;
  }

  const hasSinglePoint = points.length === 1
  , layerClass = crCn(CL_LINE, className)
  , needClip = isNeedClip(props);

  return (
    <Layer className={layerClass}>
      {needClip
        ? <ClipPathRect
             id={clipPathId}
             props={props}
           />
        : null
      }
      {!hasSinglePoint && renderCurve(
          needClip,
          clipPathId,
          prevPoints,
          totalLength,
          props,
          _refPath,
          handleAnimationStart,
          handleAnimationEnd
        )}
      {renderErrorBar(
         needClip,
         clipPathId,
         isAnimationFinished,
         props
      )}
      {(hasSinglePoint || dot)
         && renderDots(
              needClip,
              clipPathId,
              isAnimationFinished,
              props
      )}
      {(!isAnimationActive || isAnimationFinished)
         && LabelList.renderCallByParent(
              props,
              points
      )}
  </Layer>
 );
})

Line.displayName = 'Line';
Line.defaultProps = {
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
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: false,
  label: false
};


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
            y: _isNil(value) ? null : yAxis.scale(value),
            value,
            payload: entry
          }
        : {
            x: _isNil(value) ? null : xAxis.scale(value),
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
