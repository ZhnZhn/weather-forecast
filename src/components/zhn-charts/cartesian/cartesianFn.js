import {
  isValidElement,
  cloneElement
} from '../../uiApi';

import { _isFn } from '../util/FnUtils';

export const fCreateElement = (
  crElement
) => (
  option,
  props
) => isValidElement(option)
  ? cloneElement(option, props)
  : _isFn(option)
     ? option(props)
     : crElement(props)
