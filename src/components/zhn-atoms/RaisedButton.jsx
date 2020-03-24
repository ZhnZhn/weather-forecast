import React from '../_react'
//import React from 'react'

const CL = {
  BT: 'bt-raised',
  BT_DIV: 'bt-raised__div',
  BT_SPAN: 'bt-raised__span'
};

const S = {
  PRIMARY_SPAN: {
    color: 'greenyellow'
  }
};

const RaisedButton = ({
  rootStyle,
  clDiv=CL.BT_DIV,
  caption,
  isPrimary,
  onClick
}) => {
  const _spanStyle = isPrimary
    ? S.PRIMARY_SPAN
    : void 0;
  return (
    <button
      tabIndex={0}
      className={CL.BT}
      style={rootStyle}
      onClick={onClick}
    >
      <div className={clDiv}>
        <span
           className={CL.BT_SPAN}
           style={_spanStyle}
        >
          {caption}
        </span>
      </div>
    </button>
  );
}

export default RaisedButton
