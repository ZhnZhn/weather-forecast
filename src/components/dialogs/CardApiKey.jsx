import React from '../_react'

import useBool from '../hooks/useBool'

import SecretField from '../zhn-m-input/SecretField'
import RowCheckBox from './RowCheckBox'
import RaisedButton from '../zhn-atoms/RaisedButton'

const { useRef, useCallback } = React;

const CAPTION_ALLOW = "Allow Remember Enter of API Key by Browser Password Manager";

const S_SECRET = { width: 280 }
, S_CHECK_BOX = { padding: '16px 24px 0 24px'}
, S_CHECK_CAPTION = { display: 'inline' }
, IS_ALLOW = false;

const CardApiKey = ({
  style,
  buttonsStyle,
  onClose,
  onSet
}) => {
  const _refInput = useRef()
  , [isAllow, _checkAllow, _uncheckAllow] = useBool(IS_ALLOW)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _onSet = useCallback(() => {
    onSet(_refInput.current.getValue())
    onClose()
  }, [])
  // onSet, onClose
  /*eslint-enable react-hooks/exhaustive-deps */
  return (
    <div style={style}>
      <SecretField
        ref={_refInput}
        style={S_SECRET}
        isAllowRemember={isAllow}
        caption="OpenWeatherMap API Key"
        name="openweathermap"
      />
      <RowCheckBox
        style={S_CHECK_BOX}
        initValue={IS_ALLOW}
        caption={CAPTION_ALLOW}
        captionStyle={S_CHECK_CAPTION}
        onCheck={_checkAllow}
        onUnCheck={_uncheckAllow}
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
