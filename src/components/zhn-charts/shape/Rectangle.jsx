import {
  isFn,
  isStr
} from '../../../utils/isTypeFn';

import {
  memo,
  useRef,
  useState,
  useEffect,
  crProps,
  getRefValue,
  setRefValue
} from '../../uiApi';

import { crCn } from '../../styleFn';
import { JsAnimation } from '../../zhn-animation/JsAnimation';
import { getTransitionVal } from '../../zhn-animation/utils';

import { getInterpolatedNumber as interpolate } from '../util/DataUtils';
import { filterProps } from '../util/ReactUtils';

import { CL_RESTANGLE } from '../CL';

import { getRectanglePath } from './RectangleFn';

const DF_PROPS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,

  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}

const _crAnimationStyle = (
  isAnimationActive,
  to,
  t,
  transition,
  from
) => !isAnimationActive
  ? { strokeDasharray: to }
  : t > 0
  ? { strokeDasharray: to, transition }
  : { strokeDasharray: from }


export const Rectangle = memo((props) => {
  const _refNode = useRef()
  , [
    totalLength,
    setTotalLength
  ] = useState(-1);

  useEffect(() => {
    const _el = getRefValue(_refNode);
    if (_el && isFn(_el.getTotalLength)) {
      try {
        const totalLength = _el.getTotalLength();
        if (totalLength) {
          setTotalLength(totalLength)
        }
      }
      catch (err) {
        // calculate total length error
      }
    }
  }, [])

  const _props = crProps(DF_PROPS, props)
  , {
    x,
    y,
    width,
    height,
    radius,
    className,

    animationEasing,
    animationDuration,
    animationBegin,
    isAnimationActive,
    isUpdateAnimationActive
  } = _props;

  const prevWidthRef = useRef(width)
  , prevHeightRef = useRef(height)
  , prevXRef = useRef(x)
  , prevYRef = useRef(y);

  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }

  const layerClass = crCn(CL_RESTANGLE, className)
  , _canBegin = totalLength > 0;

  const prevWidth = getRefValue(prevWidthRef)
  , prevHeight = getRefValue(prevHeightRef)
  , prevX = getRefValue(prevXRef)
  , prevY = getRefValue(prevYRef);

  const from = `0px ${totalLength === -1 ? 1 : totalLength}px`
  , to = `${totalLength}px 0px`
  , transition = getTransitionVal(
    ['strokeDasharray'],
    animationDuration,
    isStr(animationEasing) ? animationEasing : void 0
  );

  return isUpdateAnimationActive
   ? (
      <JsAnimation
        isActive={isUpdateAnimationActive}
        canBegin={_canBegin}
        duration={animationDuration}
        easing={animationEasing}
        begin={animationBegin}
      >
       {(t) => {
         const currWidth = interpolate(prevWidth, width, t)
         , currHeight = interpolate(prevHeight, height, t)
         , currX = interpolate(prevX, x, t)
         , currY = interpolate(prevY, y, t);

         if (getRefValue(_refNode)) {
           setRefValue(prevWidthRef, currWidth);
           setRefValue(prevHeightRef, currHeight);
           setRefValue(prevXRef, currX);
           setRefValue(prevYRef, currY);
         }

         const animationStyle = _crAnimationStyle(
           isAnimationActive,
           to,
           t,
           transition,
           from
         );

         return (
           <path
             {...filterProps(_props, !0)}
             className={layerClass}
             d={getRectanglePath(currX, currY, currWidth, currHeight, radius)}
             ref={_refNode}
             style={{
               ...animationStyle,
               ...props.style,
             }}
           />
        )}}
      </JsAnimation>
    )
  : (
      <path
        {...filterProps(_props, !0)}
        className={layerClass}
        d={getRectanglePath(x, y, width, height, radius)}
      />
    );
})
