import { Animate } from '../../zhn-animate';

import { filterProps } from '../util/ReactUtils';
import { interpolateNumber } from '../util/DataUtils';
import { adaptEventsOfChild } from '../util/types';

import { Rectangle } from '../shape/Rectangle';
import { Layer } from '../container/Layer';

import { fCreateElement } from './cartesianFn';

import {
  CL_BAR_RECTANGLE,
  CL_BAR_BACKGROUND_RECTANGLE
} from '../CL';

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
    const rectangleProps = {
      ...baseProps,
      ...entry,
      index: i
    };
    return (
      <Layer
        className={CL_BAR_RECTANGLE}
        {...adaptEventsOfChild(rectangleProps, entry, i)}
        key={`rectangle-${i}`}
      >
        {_renderRectangle(shape, rectangleProps)}
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
      className: CL_BAR_BACKGROUND_RECTANGLE
    };
    return _renderRectangle(props.background, _props);
  });
}

const ANIMATE_RECT_FROM = { t: 0 };
const ANIMATE_RECT_TO = { t: 1 };
const _crStepData = (
  data,
  prevData,
  layout,
  t
) => data.map((entry, index) => {
   const prev = prevData && prevData[index];
   if (prev) {
     return {
       ...entry,
       x: interpolateNumber(prev.x, entry.x)(t),
       y: interpolateNumber(prev.y, entry.y)(t),
       width: interpolateNumber(prev.width, entry.width)(t),
       height: interpolateNumber(prev.height, entry.height)(t)
     };
   }
   if (layout === 'horizontal') {
     const h = interpolateNumber(0, entry.height)(t);
     return {
       ...entry,
       y: entry.y + entry.height - h,
       height: h
     };
   }
   return {
     ...entry,
     width: interpolateNumber(0, entry.width)(t)
   };
});

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
       {({ t }) => (
          <Layer>
           {_renderRectanglesStatically(
              _crStepData(data, prevData, layout, t),
              props
            )}
          </Layer>
        )}
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
