import React from '../_react'

import InputSelect from '../zhn-m-input/InputSelect'
import RaisedButton from '../zhn-atoms/RaisedButton'

const S_SELECT = {
  ROOT: { width: 280 }
}
, _themeOptions = [
  { caption: 'Grey', value: 'GREY' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'White', value: 'WHITE' }
]
, DF_THEME = _themeOptions[0];

const CardUi = ({
  style,
  buttonsStyle,
  onSetTheme,
  onClose
}) => (
   <div style={style}>
     <InputSelect
       styleConfig={S_SELECT}
       caption="Theme (Default: Grey)"
       initItem={DF_THEME}
       options={_themeOptions}
       onSelect={onSetTheme}
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



export default CardUi
