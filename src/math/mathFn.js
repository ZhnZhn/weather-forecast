import { isNumber } from '../utils/isTypeFn';

const NUMBER_EPSILON = Number.EPSILON;
const _mathRound = Math.round;

export const roundSafeByOneDigitsOrEmpty = value => isNumber(value)
  ? _mathRound((value + NUMBER_EPSILON)*10)/10
  : ''
export const roundSafeOrEmpty = value => isNumber(value)
  ? _mathRound(value)
  : ''
