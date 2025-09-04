import {
  isFn
} from '../../../utils/isTypeFn';

import {
  memo,
  useRef,
  useState,
  useEffect,
  crProps,
  getRefValue
} from '../../uiApi';

import { crCn } from '../../styleFn';
import { Animate } from '../../zhn-animate';

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
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}

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

  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }

  const layerClass = crCn(CL_RESTANGLE, className);
  return isUpdateAnimationActive
   ? (
      <Animate
        isActive={isUpdateAnimationActive}
        canBegin={totalLength > 0}
        from={{ width, height, x, y }}
        to={{ width, height, x, y }}
        duration={animationDuration}
        animationEasing={animationEasing}
      >
       {({
           width: currWidth,
           height: currHeight,
           x: currX,
           y: currY
         }) => (
           <Animate
             isActive={isAnimationActive}
             canBegin={totalLength > 0}
             from={`0px ${totalLength === -1 ? 1 : totalLength}px`}
             to={`${totalLength}px 0px`}
             attributeName="strokeDasharray"
             begin={animationBegin}
             duration={animationDuration}
             easing={animationEasing}
            >
              <path
                 {...filterProps(_props, true)}
                 className={layerClass}
                 d={getRectanglePath(currX, currY, currWidth, currHeight, radius)}
                 ref={_refNode}
              />
            </Animate>
        )}
      </Animate>
    )
  : (
      <path
        {...filterProps(_props, true)}
        className={layerClass}
        d={getRectanglePath(x, y, width, height, radius)}
      />
    );
})
