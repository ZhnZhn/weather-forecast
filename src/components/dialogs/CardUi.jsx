import { useCallback } from '../uiApi';

import InputSelect from '../zhn-m-input/InputSelect';
import InputSwitch from '../zhn-atoms/InputSwitch';
import RaisedButton from '../zhn-atoms/RaisedButton';

const S_INPUT_SELECT = {
  width: 280
}
, _themeOptions = [
  { caption: 'Grey', value: 'GREY' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'White', value: 'WHITE' }
]
, DF_THEME = _themeOptions[0]
, CAPTION_AIR = "Air Quality"
, S_CHECK_BOX = { padding: '24px 24px 0 24px'}
, IS_AIR = !1;

const CardUi = ({
  style,
  buttonsStyle,
  onSetTheme,
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
       initItem={DF_THEME}
       options={_themeOptions}
       onSelect={onSetTheme}
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
