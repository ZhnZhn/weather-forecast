import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

import crCn from '../zhn-utils/crCn';

const CL_SHOW_POPUP = 'show-popup'


const ShowHide = ({
  isShow,
  className,
  style,
  children
}) => {
  const _className = crCn(
    className, [isShow, CL_SHOW_POPUP]
  )
  , _styleShow = isShow ? S_BLOCK : S_NONE;

  return (
    <div
      className={_className}
      style={{...style, ..._styleShow}}
    >
      {children}
    </div>
  );
};

export default ShowHide
