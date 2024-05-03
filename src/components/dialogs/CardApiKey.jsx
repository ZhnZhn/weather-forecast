import {
  useRef,
  useCallback
} from '../uiApi';

import PasswordField from '../zhn-m-input/PasswordField';
import RaisedButton from '../zhn-atoms/RaisedButton';

const S_SECRET = { width: 280 }
, FN_TEST = v => !v || v.length === 32;

const CardApiKey = ({
  style,
  buttonsStyle,
  onClose,
  onSet
}) => {
  const _refInput = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _onSet = useCallback(() => {
    onSet(_refInput.current.getValue())
    onClose()
  }, [])
  // onSet, onClose
  /*eslint-enable react-hooks/exhaustive-deps */
  return (
    <div style={style}>
      <PasswordField
        refEl={_refInput}
        style={S_SECRET}
        caption="OpenWeatherMap API Key (32)"
        name="openweathermap"
        onEnter={_onSet}
        onTest={FN_TEST}
      />
      <div style={buttonsStyle}>
        <RaisedButton
          caption="Set & Close"
          onClick={_onSet}
        />
        <RaisedButton
          isPrimary={true}
          caption="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default CardApiKey
