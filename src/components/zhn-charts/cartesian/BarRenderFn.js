import { cloneElement } from '../../uiApi';
import { Animate } from '../../zhn-animate';

import {
  filterProps,
  findAllByType
} from '../util/ReactUtils';
import {
  interpolateNumber
} from '../util/DataUtils';
import {
  getValueByDataKey
} from '../util/ChartUtils';
import { adaptEventsOfChild } from '../util/types';

import { Rectangle } from '../shape/Rectangle';
import { Layer } from '../container/Layer';
import { ErrorBar } from './ErrorBar';

import { fCreateElement } from './cartesianFn';

const CL_BAR_RECTANGLES = "recharts-bar-rectangle"
, CL_BAR_BACKGROUND_RECTANGLES = "recharts-bar-background-rectangle"

const _crElementRectangle = (
  props
) => (
  <Rectangle {...props} />
);
const _renderRectangle = fCreateElement(_crElementRectangle);

const _renderRectanglesStatically = (
  data,
  props
) => {
  const { shape } = props
  , baseProps = filterProps(props);
  return (data && data.map((entry, i) => {
    const props = {
      ...baseProps,
      ...entry,
      index: i
    };
    return (
      <Layer
        className={CL_BAR_RECTANGLES}
        {...adaptEventsOfChild(props, entry, i)}
        key={`rectangle-${i}`}
        role="img"
      >
        {_renderRectangle(shape, props)}
      </Layer>
    );
  }));
};

export const renderBackground = (
  props
) => {
  const { data } = props
  , backgroundProps = filterProps(props.background);
  return data.map((entry, i) => {
    /*eslint-disable no-unused-vars*/
    const {
      value,
      background,
      ...rest
    } = entry;
    //value
    /*eslint-enable no-unused-vars*/
    if (!background) {
      return null;
    }
    const _props = {
      ...rest,
      fill: '#eee',
      ...background,
      ...backgroundProps,
      ...adaptEventsOfChild(props, entry, i),
      index: i,
      key: `background-bar-${i}`,
      className: CL_BAR_BACKGROUND_RECTANGLES
    };
    return _renderRectangle(props.background, _props);
  });
}

export const renderErrorBar = (
  needClip,
  clipPathId,
  isAnimationFinished,
  props
) => {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }

  const {
    data,
    xAxis,
    yAxis,
    layout,
    children
  } = props
  , errorBarItems = findAllByType(
    children,
    ErrorBar
  );

  if (!errorBarItems) {
    return null;
  }

  const offset = layout === 'vertical'
    ? data[0].height / 2
    : data[0].width / 2;
  function dataPointFormatter(dataPoint, dataKey) {
    return {
      x: dataPoint.x,
      y: dataPoint.y,
      value: dataPoint.value,
      errorVal: getValueByDataKey(dataPoint, dataKey)
    };
  }
  const errorBarProps = {
    clipPath: needClip
      ? `url(#clipPath-${clipPathId})`
      : null
  };
  return (
    <Layer {...errorBarProps}>
       {errorBarItems.map((item, i) => cloneElement(item, {
          key: `error-bar-${i}`,
          data,
          xAxis,
          yAxis,
          layout,
          offset,
          dataPointFormatter
       }))}
    </Layer>
  );
}

const ANIMATE_RECT_FROM = { t: 0 };
const ANIMATE_RECT_TO = { t: 1 };
const _renderRectanglesWithAnimation = (
  props,
  prevData,
  handleAnimationStart,
  handleAnimationEnd
) => {
    const {
      data,
      layout,
      isAnimationActive,
      animationBegin,
      animationDuration,
      animationEasing,
      animationId
    } = props;
    return (
      <Animate
         begin={animationBegin}
         duration={animationDuration}
         isActive={isAnimationActive}
         easing={animationEasing}
         from={ANIMATE_RECT_FROM}
         to={ANIMATE_RECT_TO}
         key={`bar-${animationId}`}
         onAnimationEnd={handleAnimationEnd}
         onAnimationStart={handleAnimationStart}
      >
       {({ t }) => {
         const stepData = data.map((entry, index) => {
            const prev = prevData && prevData[index];
            if (prev) {
              const interpolatorX = interpolateNumber(prev.x, entry.x)
              , interpolatorY = interpolateNumber(prev.y, entry.y)
              , interpolatorWidth = interpolateNumber(prev.width, entry.width)
              , interpolatorHeight = interpolateNumber(prev.height, entry.height);
              return {
                ...entry,
                x: interpolatorX(t),
                y: interpolatorY(t),
                width: interpolatorWidth(t),
                height: interpolatorHeight(t)
              };
            }
            if (layout === 'horizontal') {
              const interpolatorHeight = interpolateNumber(0, entry.height)
              , h = interpolatorHeight(t);
              return {
                ...entry,
                y: entry.y + entry.height - h,
                height: h,
              };
            }
            const interpolator = interpolateNumber(0, entry.width)
            , w = interpolator(t);
            return { ...entry, width: w };
         });
         return (
           <Layer>
             {_renderRectanglesStatically(stepData, props)}
           </Layer>
         );
        }}
     </Animate>
   );
}

export const renderRectangles = (
  props,
  prevData,
  handleAnimationStart,
  handleAnimationEnd
) => {
  const {
    data,
    isAnimationActive
  } = props;
  return isAnimationActive
   && data
   && data.length
   //&& (!prevData || !_isEqual(prevData, data))
   && (!prevData || prevData !== data)
    ? _renderRectanglesWithAnimation(props, prevData, handleAnimationStart, handleAnimationEnd)
    : _renderRectanglesStatically(data, props);
}
