import { isUndef } from '../../../utils/isTypeFn';
import throttleFn from '../../../utils/throttleFn';

export const _throttle = throttleFn;


export const _range = (
  startValue,
  endValue
) => {
  const isEndDef = !isUndef(endValue)
  endValue = isEndDef ? endValue : startValue
  startValue = isEndDef ? startValue : 0

  const _diff = endValue - startValue
  , increment = Math.sign(_diff) || 1
  , length = Math.abs(_diff / increment)
  , { result } = Array.from({ length })
   .reduce(
     ({ result, current }) => ({
       result: [...result, current],
       current: current + increment
     }),
     { current: startValue, result: [] }
  );

  return result;
}
