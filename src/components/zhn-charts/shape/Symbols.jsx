import { memo } from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { _isNumber } from '../util/FnUtils';
import {
  crProps,
  filterProps
} from '../util/ReactUtils';

import {
  getSymbolPath,
  registerSymbol
} from './SymbolsFn';

import { CL_SYMBOLS } from '../CL';

const DF_PROPS = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};

export const Symbols = memo((
  props
) => {
  const _props = crProps(DF_PROPS, props)
  , {
    className,
    cx,
    cy,
    size
  } = _props;
  return _isNumber(cx) && _isNumber(cy) && _isNumber(size)
    ? (<path
          {...filterProps(_props, true)}
          className={crCn(CL_SYMBOLS, className)}
          transform={`translate(${cx}, ${cy})`}
          d={getSymbolPath(_props)}
      />)
    : null;
})

Symbols.registerSymbol = registerSymbol
