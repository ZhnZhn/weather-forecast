//import PropTypes from 'prop-types'
import { crDialogRole } from '../a11yFn';
import { crShowHide } from '../styleFn';

import { useKeyEscape } from '../hooks/fUseKey';

import BtSvgClose from '../zhn-atoms/BtSvgClose';
import RaisedButton from '../zhn-atoms/RaisedButton';

const S_ROOT_DIV = {
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
  margin: '8px 4px 10px 0'
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
  isWithButton=!0,
  withoutClose,
  commandButtons,
  commandStyle,
  timeout=450,
  childrenStyle,
  children,
  onClose
}) => {
  const _hKeyDown = useKeyEscape(onClose)
  , [
    _className,
    _showHideStyle
  ] = crShowHide(
    isShow
  );

  return (
    /*eslint-disable jsx-a11y/no-static-element-interactions*/
    <div
       {...crDialogRole(isShow, caption)}
       aria-modal="true"
       className={_className}
       style={{...S_ROOT_DIV, ...style, ..._showHideStyle}}
       //style={{...S_ROOT_DIV, ...style, ..._style}}
       onClick={_hClickDialog}
       onKeyDown={_hKeyDown}
    >
    {/*eslint-enable jsx-a11y/no-static-element-interactions*/}
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
