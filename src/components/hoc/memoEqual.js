import { memo } from '../uiApi';

const _areEqual = () => true
, memoEqual = Comp => memo(Comp, _areEqual);

export default memoEqual
