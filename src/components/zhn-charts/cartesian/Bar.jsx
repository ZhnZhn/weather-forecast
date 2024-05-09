import { memo } from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { _isArr } from '../util/FnUtils';

import { Layer } from '../container/Layer';
import { Cell } from '../component/Cell';
import { LabelList } from '../component/LabelList';

import { Global } from '../util/Global';
import { mathSign } from '../util/DataUtils';
import {
  crProps,
  findAllByType
} from '../util/ReactUtils';
import {
  getCateCoordinateOfBar,
  getValueByDataKey,
  truncateByDomain,
  getBaseValueOfBar,
  findPositionOfBar,
  getTooltipItem
} from '../util/ChartUtils';
import {
  renderBackground,
  renderErrorBar,
  renderRectangles
} from './BarRenderFn';

import {
  isHideOrNoData,
  isNeedClip
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
  isAnimationActive: !Global.isSsr,
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
    background,
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
       {needClip
         ? <ClipPathRect
             id={clipPathId}
             props={_props}
           />
        : null
      }
      <Layer
        className={CL_BAR_RECTANGLES}
        clipPath={needClip
          ? `url(#clipPath-${clipPathId})`
          : null
        }
      >
        {background
          ? renderBackground(_props)
          : null
        }
        {renderRectangles(
           _props,
           prevData,
           handleAnimationStart,
           handleAnimationEnd
        )}
      </Layer>
      {renderErrorBar(
         needClip,
         clipPathId,
         isAnimationFinished,
         _props
       )}
      {(!isAnimationActive || isAnimationFinished)
         && LabelList.renderCallByParent(_props, data)
      }
  </Layer>
 );
})

Bar.displayName = 'Bar';

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
  , numericAxis = layout === 'horizontal'
     ? yAxis
     : xAxis
  , stackedDomain = stackedData
     ? numericAxis.scale.domain()
     : null
  , baseValue = getBaseValueOfBar({ numericAxis })
  , cells = findAllByType(children, Cell)
  const rects = displayedData.map((entry, index) => {
    let value
    , x
    , y
    , width
    , height
    , background;
    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!_isArr(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === 'horizontal') {
      const [
        baseValueScale,
        currentValueScale
      ] = [
        yAxis.scale(value[0]),
        yAxis.scale(value[1])
      ];
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
      height = Number.isNaN(computedHeight)
        ? 0 : computedHeight;
      background = {
        y: yAxis.y,
        height: yAxis.height,
        x,
        width
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        const delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y -= delta;
        height += delta;
      }
    } else {
      const [
        baseValueScale,
        currentValueScale
      ] = [
        xAxis.scale(value[0]),
        xAxis.scale(value[1])
      ];
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
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        const delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += delta;
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
