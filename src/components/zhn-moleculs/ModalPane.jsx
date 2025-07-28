import {
  crStyle2,
  S_NONE
} from '../styleFn';

import useClickOutside from '../hooks/useClickOutside';
import { useKeyEscape } from '../hooks/fUseKey';

const ModalPane = ({
  isShow,
  className,
  style,
  children,
  onClose,
  onKeyDown,
  ...restProps
}) => {
  const _refEl = useClickOutside(isShow, onClose)
  , _hKeyEscape = useKeyEscape(onClose);
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
      {...restProps}
      ref={_refEl}
      className={className}
      style={crStyle2(style, isShow ? void 0 : S_NONE)}
      onKeyDown={isShow ? onKeyDown || _hKeyEscape : void 0}
    >
      {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default ModalPane
