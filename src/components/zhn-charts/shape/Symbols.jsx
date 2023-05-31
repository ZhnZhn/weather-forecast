import { memo } from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { _isNumber } from '../util/FnUtils';
import { filterProps } from '../util/ReactUtils';

import {
  getSymbolPath,
  registerSymbol
} from './SymbolsFn';

const CL_SYMBOLS = 'recharts-symbols';

export const Symbols = memo((
  props
) => {
  const {
    className,
    cx,
    cy,
    size
  } = props;
  return _isNumber(cx) && _isNumber(cy) && _isNumber(size)
    ? (<path
          {...filterProps(props, true)}
          className={crCn(CL_SYMBOLS, className)}
          transform={`translate(${cx}, ${cy})`}
          d={getSymbolPath(props)}
      />)
    : null;
})

Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};

Symbols.registerSymbol = registerSymbol
