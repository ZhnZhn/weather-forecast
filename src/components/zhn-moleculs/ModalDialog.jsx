//import PropTypes from 'prop-types'
import { useRef, useEffect } from '../uiApi';
import useForceUpdate from '../hooks/useForceUpdate';

import SvgClose from '../zhn-atoms/SvgClose';
import RaisedButton from '../zhn-atoms/RaisedButton';

const CL_SHOWING = 'show-popup'
, CL_HIDING = 'hide-popup'
, S_SHOW = { display: 'block' }
, S_HIDE = { display: 'none' }
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
    float: 'right',
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
     <SvgClose onClose={onClose} />
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

const _getCurrent = ref => ref.current
, _setCurrent = (ref, value) => {
  ref.current = value
}
, _hClickDialog = event => {
  event.stopPropagation()
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
  , forceUpdate = useForceUpdate();

  useEffect(() => {
    if (_getCurrent(_refClosing)){
      setTimeout(forceUpdate, timeout)
    }
  })

  let _className, _style;
  if (_getCurrent(_refClosing)){
    _style = S_HIDE
    _setCurrent(_refClosing, false)
  } else {
    _className = isShow ? CL_SHOWING : CL_HIDING
    _style = isShow ? S_SHOW : S_HIDE_POPUP
    if (!isShow){
      _setCurrent(_refClosing, true)
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
