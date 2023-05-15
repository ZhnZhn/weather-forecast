import {
  memo,
  useState,
  useMemo,
  useEffect
} from '../../uiApi';
import classNames from 'classnames';

import {
  _isArr,
  _isNil
} from '../util/FnUtils';

import { Layer } from '../container/Layer';
import { Cell } from '../component/Cell';
import { LabelList } from '../component/LabelList';

import { Global } from '../util/Global';
import {
  uniqueId,
  mathSign
} from '../util/DataUtils';
import {
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

import useAnimationHandle from './useAnimationHandle';

const CL_BAR = "recharts-bar"
, CL_BAR_RECTANGLES = `${CL_BAR}-rectangles`;

const _isNeedClip = ({
 xAxis,
 yAxis
}) => (xAxis && xAxis.allowDataOverflow)
  || (yAxis && yAxis.allowDataOverflow);

export const Bar = memo((props) => {
  const {
    hide,
    data,
    className,
    left,
    top,
    width,
    height,
    isAnimationActive,
    background,
    id,
    animationId
  } = props
  , [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ] = useAnimationHandle(props)
  , [curData, setCurDate] = useState([])
  , [prevData, setPrevData] = useState([])
  , clipPathId = useMemo(() => _isNil(id)
      ? uniqueId(`${CL_BAR}-`)
      : id
    , [id]);
  
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setCurDate(data)
    setPrevData(curData)
  }, [animationId])
  //curData, data
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    setCurDate(data)
  }, [data])

  if (hide || !data || !data.length) {
    return null;
  }

  const layerClass = classNames(CL_BAR, className)
  , needClip = _isNeedClip(props);

  return (
    <Layer className={layerClass}>
       {needClip
         ? (
            <defs>
               <clipPath id={`clipPath-${clipPathId}`}>
                  <rect x={left} y={top} width={width} height={height}/>
               </clipPath>
            </defs>
          )
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
          ? renderBackground(props)
          : null
        }
        {renderRectangles(
           props,
           prevData,
           handleAnimationStart,
           handleAnimationEnd
        )}
      </Layer>
      {renderErrorBar(
         needClip,
         clipPathId,
         isAnimationFinished,
         props
       )}
      {(!isAnimationActive || isAnimationFinished)
         && LabelList.renderCallByParent(props, data)
      }
  </Layer>
 );
})

Bar.displayName = 'Bar';
Bar.defaultProps = {
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
