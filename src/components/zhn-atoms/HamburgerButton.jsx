import useLayoutButton from './useLayoutButton';
import crCn from '../zhn-utils/crCn';

const CL_BT_HAMBURGER = "bt-hamburger"
, CL_OPENED = "opened"

, S_HAMBURGER = {
  width: '2.2rem',
  height: '2.2rem',
  verticalAlign: 'middle',
  marginBottom: '0.5rem',
  marginLeft: '0.8rem',
  borderRadius: '0.4rem'
};

const HamburgerButton = ({
  storeKey,
  onClick
}) => {
  const [
    isOpen,
    _hClick
  ] = useLayoutButton(
    storeKey,
    onClick
  )
  , btClass = crCn(
    CL_BT_HAMBURGER,
    [isOpen, CL_OPENED]
  );

  return (
    <button
       type="button"
       className={btClass}
       style={S_HAMBURGER}
       onClick={_hClick}
    >
      <span />
    </button>
  );
};

export default HamburgerButton
