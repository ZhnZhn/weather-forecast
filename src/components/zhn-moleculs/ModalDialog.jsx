//import PropTypes from 'prop-types'
import {
  useRef,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

import useRerender from '../hooks/useRerender';

import BtSvgClose from '../zhn-atoms/BtSvgClose';
import RaisedButton from '../zhn-atoms/RaisedButton';

const CL_SHOWING = 'show-popup'
, CL_HIDING = 'hide-popup'
, S_HIDE_POPUP = {
    opacity: 0,
    transform : 'scaleY(0)'
  }
, S_ROOT_DIV = {
    zIndex: 10,
    position: 'absolute',
    top: '15%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4d4d4d',
    border: 'solid 2px #3f5178',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
  }
, S_CAPTON_DIV = {
    padding: 5,
    color: '#9e9e9e',
    backgroundColor: '#3f5178',
    textAlign: 'center',
    fontSize: '18px'
  }
, S_COMMAND_DIV = {
    textAlign: 'right',
    margin: '8px 4px 10px 0',
    cursor: 'default'
 };

const DialogCaption = ({
  caption,
  captionStyle,
  onClose
}) => (
  <div style={S_CAPTON_DIV}>
     <span style={captionStyle}>{caption}</span>
     <BtSvgClose onClose={onClose} />
  </div>
);

const CommandButtons = ({
  style,
  buttons,
  withoutClose,
  onClose
}) => (
  <div style={{...S_COMMAND_DIV, ...style}}>
    {buttons}
    {!withoutClose &&
        <RaisedButton
          isPrimary={true}
          caption="Close"
          onClick={onClose}
        />
    }
  </div>
);

const _hClickDialog = evt => {
  evt.stopPropagation()
};

const ModalDialog = ({
  isShow,
  style,
  caption,
  captionStyle,
  isWithButton=true,
  withoutClose,
  commandButtons,
  commandStyle,
  timeout=450,
  childrenStyle,
  children,
  onClose
}) => {
  const _refClosing = useRef(false)
  , rerender = useRerender();

  useEffect(() => {
    if (getRefValue(_refClosing)){
      setTimeout(rerender, timeout)
    }
  })

  let _className, _style;
  if (getRefValue(_refClosing)){
    _style = S_NONE
    setRefValue(_refClosing, false)
  } else {
    _className = isShow ? CL_SHOWING : CL_HIDING
    _style = isShow ? S_BLOCK : S_HIDE_POPUP
    if (!isShow){
      setRefValue(_refClosing, true)
    }
  }

  return (
    <div
       className={_className}
       style={{...S_ROOT_DIV, ...style, ..._style}}
       onClick={_hClickDialog}
    >
        <DialogCaption
          caption={caption}
          captionStyle={captionStyle}
          onClose={onClose}
        />
        <div style={childrenStyle}>
          {children}
        </div>
       {isWithButton && <CommandButtons
          style={commandStyle}
          buttons={commandButtons}
          withoutClose={withoutClose}
          onClose={onClose}
        />
       }
   </div>
  );
};

/*
ModalDialog.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  isWithButton: PropTypes.bool,
  withoutClose: PropTypes.bool,
  commandButtons: PropTypes.arrayOf(PropTypes.element),
  commandStyle: PropTypes.object,
  timeout: PropTypes.number,
  caption: PropTypes.string,
  childrenStyle: PropTypes.object,
  onClose: PropTypes.func
}
*/

export default ModalDialog
