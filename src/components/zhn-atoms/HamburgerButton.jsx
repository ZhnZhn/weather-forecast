import React from '../_react'
import { useSelector } from 'react-redux'

const { useCallback } = React
const S = {
  HAMBURGER: {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  }
};


const HamburgerButton = ({
  storeKey,
  onClick
}) => {
  const isOpen = useSelector(state => state.layout[storeKey])
  , _hClick = useCallback(()=>{
    onClick(storeKey)
  }, [storeKey])
  , btClass = isOpen
     ? "bt-hamburger opened"
     : "bt-hamburger";

  return (
    <button
       className={btClass}
       style={S.HAMBURGER}
       onClick={_hClick}
    >
      <span />
    </button>
  );
}

export default HamburgerButton
