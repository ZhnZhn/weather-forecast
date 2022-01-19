import { useCallback } from '../uiApi';

import InputSelect from '../zhn-m-input/InputSelect';
import RowCheckBox from './RowCheckBox';
import RaisedButton from '../zhn-atoms/RaisedButton';

const S_SELECT = {
  ROOT: { width: 280 }
}
, _themeOptions = [
  { caption: 'Grey', value: 'GREY' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'White', value: 'WHITE' }
]
, DF_THEME = _themeOptions[0]
, CAPTION_AIR = "Air Quality"
, S_CHECK_BOX = { padding: '24px 24px 0 24px'}
, S_CHECK_CAPTION = { display: 'inline' }
, IS_AIR = false;

const CardUi = ({
  style,
  buttonsStyle,
  onSetTheme,
  onAir,
  onClose
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _checkAir = useCallback(() => {
    onAir(true)
  }, [])
  , _uncheckAir = useCallback(() => {
    onAir(false)
  }, [])
  // onAir
  /*eslint-enable react-hooks/exhaustive-deps */
  return(
   <div style={style}>
     <InputSelect
       styleConfig={S_SELECT}
       caption="Theme (Default: Grey)"
       initItem={DF_THEME}
       options={_themeOptions}
       onSelect={onSetTheme}
     />
     <RowCheckBox
       style={S_CHECK_BOX}
       initValue={IS_AIR}
       caption={CAPTION_AIR}
       captionStyle={S_CHECK_CAPTION}
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
