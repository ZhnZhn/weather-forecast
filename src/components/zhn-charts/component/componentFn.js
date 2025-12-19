import { 
  isStr,
  isFn
} from '../../../utils/isTypeFn';

const _uniqBy = (
  arr,
  iteratee
) => {
  if (isStr(iteratee)) {
    const prop = iteratee
    iteratee = item => item[prop]
  }

  return arr.filter(
    (x, i, arrSelf) => i === arrSelf
      .findIndex(y => iteratee(x) === iteratee(y))
  )
};

export const getUniqPayload = (
  option,
  payload,
  getUniqBy
) => option === !0
  ? _uniqBy(payload, getUniqBy)
  : isFn(option)
    ? _uniqBy(payload, option)
    : payload
