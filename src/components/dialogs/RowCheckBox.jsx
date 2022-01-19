import { useCallback } from '../uiApi';

import useBool from '../hooks/useBool';
import useTheme from '../hooks/useTheme';
import styleConfig from './Dialog.Style';

import SvgCheckBox from '../zhn-atoms/SvgCheckBox';

const CHB_COLOR = 'black'
, S_ROOT = { padding: '6px 0 0 16px' }
, S_CAPTION = {
  display: 'inline-block',
  color: 'grey',
  paddingLeft: 8,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none',
  cursor: 'pointer'
}
, S_CHECKED = { color: 'black' }
, DF_NOOP = () => {};

const RowCheckBox = ({
  style,
  initValue,
  caption,
  captionStyle,
  onCheck=DF_NOOP,
  onUnCheck=DF_NOOP
}) => {
  const [isChecked, setChecked, setUnChecked] = useBool(initValue)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hCheck = useCallback(() => {
    onCheck()
    setChecked()
  }, [])
  // onCheck, setChecked
  , _hUnCheck = useCallback(() => {
    onUnCheck()
    setUnChecked()
  }, [])
  // onUnCheck, setUnChecked
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hToggle = () => {
       if (isChecked) {
         _hUnCheck()
       } else {
         _hCheck()
       }
    }
  , TS = useTheme(styleConfig)
  , _style = isChecked
       ? S_CHECKED
       : null;
  return (
    <div style={{...S_ROOT, ...style}}>
      <SvgCheckBox
        color={CHB_COLOR}
        checkedColor={TS.R_DIALOG.backgroundColor}
        value={isChecked}
        onCheck={_hCheck}
        onUnCheck={_hUnCheck}
      />
      {
        caption && (
          <span
            style={{...S_CAPTION, ...captionStyle, ..._style }}
            onClick={_hToggle}
          >
            {caption}
          </span>
        )
      }
    </div>
  );
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.bool,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/

export default RowCheckBox
