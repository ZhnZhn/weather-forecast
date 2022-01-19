import { memo } from '../uiApi';

const  _isNotShouldUpdate = (prevProps, nextProps) =>
  prevProps.isShow === nextProps.isShow
, memoIsShow = Comp => memo(Comp, _isNotShouldUpdate);

export default memoIsShow
