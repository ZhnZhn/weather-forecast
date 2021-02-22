import React from '../_react'
import { useSelector } from 'react-redux'

const CL_NOT_SELECTED = "not-selected";

const { useCallback } = React;
const S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    width: 22,
    height: 22,
    border: '2px solid #80c040',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  NOT_ACTIVE: {
    color: '#5b5b5b'
  }
};


const ButtonCircle = ({
  caption, title, style,
  storeKey,
  onClick
}) => {
  const isActive = useSelector(state => state.layout[storeKey])
  , _hClick = useCallback(() => {
     onClick(storeKey)
  }, [storeKey])
  , _style = isActive
       ? { ...S.ROOT, ...style }
       : { ...S.ROOT, ...style, ...S.NOT_ACTIVE };

  return (
    <span
       className={CL_NOT_SELECTED}
       style={_style}
       title={title}
       onClick={_hClick}
    >
       {caption}
    </span>
  );
}

export default ButtonCircle
