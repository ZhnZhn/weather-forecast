import {
  _isFn,
  _uniqBy
} from '../util/FnUtils';

export const getUniqPayload = (
  option,
  payload,
  getUniqBy
) => option === true
  ? _uniqBy(payload, getUniqBy)
  : _isFn(option)
      ? _uniqBy(payload, option)
      : payload;
