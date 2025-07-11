import {
  crCn,
  S_BLOCK,
  S_NONE
} from '../styleFn';

const CL_SHOW_POPUP = 'show-popup';

const ShowHide = ({
  isShow,
  className,
  style,
  children,
  ...restProps
}) => {
  const _className = crCn(
    className, [isShow, CL_SHOW_POPUP]
  )
  , _styleShow = isShow ? S_BLOCK : S_NONE;

  return (
    <div
      className={_className}
      style={{...style, ..._styleShow}}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default ShowHide
