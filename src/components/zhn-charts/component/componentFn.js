import { isFn } from '../../../utils/isTypeFn';
import { _uniqBy } from '../util/FnUtils';

export const getUniqPayload = (
  option,
  payload,
  getUniqBy
) => option === !0
  ? _uniqBy(payload, getUniqBy)
  : isFn(option)
    ? _uniqBy(payload, option)
    : payload
