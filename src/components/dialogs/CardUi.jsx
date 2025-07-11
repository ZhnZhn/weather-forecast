import { useCallback } from '../uiApi';

import { UI_THEME_OPTIONS } from '../styles/uiTheme';

import InputSelect from '../zhn-m-input/InputSelect';
import InputSwitch from '../zhn/InputSwitch';
import RaisedButton from '../zhn/RaisedButton';

const S_INPUT_SELECT = {
  width: 280
}
, DF_THEME = UI_THEME_OPTIONS[0]
, CAPTION_AIR = "Air Quality"
, S_CHECK_BOX = { padding: '24px 24px 0 24px'}
, IS_AIR = !1;

const CardUi = ({
  style,
  buttonsStyle,
  onUiTheme,
  onAir,
  onClose
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _checkAir = useCallback(() => {
    onAir(!0)
  }, [])
  , _uncheckAir = useCallback(() => {
    onAir(!1)
  }, [])
  // onAir
  /*eslint-enable react-hooks/exhaustive-deps */
  return(
   <div style={style}>
     <InputSelect
       style={S_INPUT_SELECT}
       caption="Theme (Default: Grey)"
       ariaLabel="UI themes list"
       initItem={DF_THEME}
       options={UI_THEME_OPTIONS}
       onSelect={onUiTheme}
     />
     <InputSwitch
        style={S_CHECK_BOX}
        initialValue={IS_AIR}
        caption={CAPTION_AIR}
        onCheck={_checkAir}
        onUnCheck={_uncheckAir}
     />
     <div style={buttonsStyle}>
       <RaisedButton
         isPrimary={true}
         caption="Close"
         onClick={onClose}
       />
     </div>
   </div>
  );
};


export default CardUi
