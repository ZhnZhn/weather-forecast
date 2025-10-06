import {
  isArr,
  isNaN
} from '../../../utils/isTypeFn';
import {
  memo,
  crProps
} from '../../uiApi';
import { crCn } from '../../styleFn';

import { IS_SSR } from '../util/Global';
import {
  mathAbs,
  mathSign
} from '../util/DataUtils';
import { findAllByType } from '../util/ReactUtils';
import {
  isLayoutHorizontal,
  getCateCoordinateOfBar,
  getValueByDataKey,
  truncateByDomain,
  getBaseValueOfBar,
  findPositionOfBar,
  getTooltipItem
} from '../util/ChartUtils';

import { Layer } from '../container/Layer';
import { Cell } from '../component/Cell';
import { LabelList } from '../component/LabelList';

import {
  renderBackground,
  renderRectangles
} from './BarRenderFn';

import {
  isHideOrNoData,
  isNeedClip,
  crClipPath
} from './cartesianFn';

import useAnimationHandle from './useAnimationHandle';
import usePrevCurData from './usePrevCurData';
import useClipPathId from './useClipPathId';

import ClipPathRect  from './ClipPathRect';
import {
  CL_BAR,
  CL_BAR_RECTANGLES
} from '../CL';

const DF_PROPS = {
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  hide: false,
  // data of bar
  data: [],
  layout: 'vertical',
  isAnimationActive: !IS_SSR,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'ease'
};

export const Bar = memo((props) => {
  const _props = crProps(DF_PROPS, props)
  , {
    data,
    className,
    isAnimationActive,
    //background,
    id,
    animationId
  } = _props
  , [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ] = useAnimationHandle(_props)
  , [
    prevData
  ] = usePrevCurData(
     data,
     animationId
   )
  , clipPathId = useClipPathId(
     CL_BAR,
     id
  );

  if (isHideOrNoData(_props, data)) {
    return null;
  }

  const layerClass = crCn(CL_BAR, className)
  , needClip = isNeedClip(_props);

  return (
    <Layer className={layerClass}>
      <ClipPathRect
         is={needClip}
         id={clipPathId}
         props={_props}
      />
      <Layer
        className={CL_BAR_RECTANGLES}
        clipPath={crClipPath(needClip, clipPathId)}
      >
        {renderBackground(_props)}
        {renderRectangles(
           _props,
           prevData,
           handleAnimationStart,
           handleAnimationEnd
        )}
      </Layer>
      {(!isAnimationActive || isAnimationFinished)
         && LabelList.renderCallByParent(_props, data)
      }
  </Layer>
 );
})

Bar.displayName = 'Bar';


const _getValueArr = (
  arrOrValue,
  baseValue
) => isArr(arrOrValue)
  ? arrOrValue
  : [baseValue, arrOrValue];

const _fCrDisplayedDataValue = (
  stackedData,
  dataStartIndex,
  stackedDomain,
  dataKey,
  baseValue
) => stackedData
  ? (entry, index) => truncateByDomain(
      stackedData[dataStartIndex + index],
      stackedDomain
    )
  : (entry, index) => _getValueArr(
      getValueByDataKey(entry, dataKey),
      baseValue
    )

const _isMinPointSizeCase = (
  minPointSize,
  value
) => mathAbs(minPointSize) > 0
  && mathAbs(value) < mathAbs(minPointSize)
, _calcMinPointSizeDelta = (
  minPointSize,
  value
) => mathSign(value || minPointSize) * (mathAbs(minPointSize) - mathAbs(value))

, _crValueScaleTuple = (
  xyAxis,
  value
) => [
  xyAxis.scale(value[0]),
  xyAxis.scale(value[1])
]

/**
 * Compose the data of each group
 * @param {Object} props Props for the component
 * @param {Object} item        An instance of Bar
 * @param {Array} barPosition  The offset and size of each bar
 * @param {Object} xAxis       The configuration of x-axis
 * @param {Object} yAxis       The configuration of y-axis
 * @param {Array} stackedData  The stacked data of a bar item
 * @return{Array} Composed data
 */
Bar.getComposedData = ({
  props,
  item,
  barPosition,
  bandSize,
  xAxis,
  yAxis,
  xAxisTicks,
  yAxisTicks,
  stackedData,
  dataStartIndex,
  displayedData,
  offset
}) => {
  const pos = findPositionOfBar(barPosition, item);
  if (!pos) {
    return null;
  }

  const {
    layout
  } = props
  , {
    dataKey,
    children,
    minPointSize
  } = item.props
  , numericAxis = isLayoutHorizontal(layout)
     ? yAxis
     : xAxis
  , stackedDomain = stackedData
     ? numericAxis.scale.domain()
     : null
  , baseValue = getBaseValueOfBar({ numericAxis })
  , cells = findAllByType(children, Cell)
  , _crDisplayedDataValue = _fCrDisplayedDataValue(
     stackedData,
     dataStartIndex,
     stackedDomain,
     dataKey,
     baseValue
  );
  const rects = displayedData.map((entry, index) => {

    let value = _crDisplayedDataValue(entry, index)
    , x
    , y
    , width
    , height
    , background;

    if (isLayoutHorizontal(layout)) {
      const [
        baseValueScale,
        currentValueScale
      ] = _crValueScaleTuple(yAxis, value);
      x = getCateCoordinateOfBar({
        axis: xAxis,
        ticks: xAxisTicks,
        offset: pos.offset,
        bandSize,
        entry,
        index,
      });
      y = currentValueScale ?? baseValueScale ?? void 0;
      width = pos.size;

      const computedHeight = baseValueScale - currentValueScale;
      height = isNaN(computedHeight)
        ? 0
        : computedHeight;
      background = {
        y: yAxis.y,
        height: yAxis.height,
        x,
        width
      };
      if (_isMinPointSizeCase(minPointSize, height)) {
        const delta = _calcMinPointSizeDelta(minPointSize, height);
        y -= delta;
        height += delta;
      }
    } else {
      const [
        baseValueScale,
        currentValueScale
      ] = _crValueScaleTuple(xAxis, value);
      x = baseValueScale;
      y = getCateCoordinateOfBar({
        axis: yAxis,
        ticks: yAxisTicks,
        offset: pos.offset,
        bandSize,
        entry,
        index
      });
      width = currentValueScale - baseValueScale;
      height = pos.size;
      background = {
        x: xAxis.x,
        width: xAxis.width,
        y,
        height
      };
      if (_isMinPointSizeCase(minPointSize, width)) {
        width += _calcMinPointSizeDelta(minPointSize, width);
      }
    }
    return {
      ...entry,
      x,
      y,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      ...(cells && cells[index] && cells[index].props),
      tooltipPayload: [getTooltipItem(item, entry)],
      tooltipPosition: {
        x: x + width / 2,
        y: y + height / 2
      }
    };
  });
  return {
    data: rects,
    layout,
    ...offset
  };
};
