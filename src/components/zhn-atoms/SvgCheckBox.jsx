import {
  isBool
} from '../../utils/isTypeFn';

import {
  useState,
  useMemo,
  useCallback
} from '../uiApi';

import useRefInit from '../hooks/useRefInit';
import useKeyEnter from '../hooks/useKeyEnter';

import {
  COLOR_GREY,
  COLOR_YELLOW,
  COLOR_BLANK
} from '../styles/Color';
import Svg100 from './svg/Svg100';

const CL_CHB = 'chb'
, S_SVG = { display: 'inline-block' }

const SvgChecked = ({ stroke }) => (
  <path
      d="M 2,5 L 8,14 14,1"
      strokeWidth="2"
      strokeLinecap="round"
      stroke={stroke}
      fill={COLOR_BLANK}
  />
);

const FN_NOOP = () => {};

const SvgCheckBox = ({
  initialValue,
  value,
  style,
  color,
  checkedColor=COLOR_YELLOW,
  onCheck=FN_NOOP,
  onUnCheck=FN_NOOP
}) => {
  const [
    valueState,
    setValueState
  ] = useState(() => isBool(value) ? void 0: !!initialValue)
  , _isValueState = useRefInit(() => isBool(valueState))
  , _value = _isValueState ? valueState : value
  , _comp = useMemo(() => ({
     setUnchecked: () => setValueState(false)
  }), [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hToggle = useCallback((evt) => {
    evt.preventDefault()
    const _toggle = _value
      ? onUnCheck : onCheck;
    _toggle(_comp)

    if (_isValueState) {
      setValueState(!_value)
    }
  }, [_value, onCheck, onUnCheck])
  //_comp, _isValueState
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEnter(_hToggle, [_hToggle])
  , _restStroke = _value
       ? color || COLOR_GREY
       : COLOR_GREY
  , _restFill = _value
       ? color || COLOR_BLANK
       : COLOR_BLANK;

  return (
    <div
       role="checkbox"
       tabIndex="0"
       aria-checked={_value}
       //aria-labelledby
       className={CL_CHB}
       style={style}
       onClick={_hToggle}
       onKeyDown={_hKeyDown}
    >
      <Svg100
        w="16"
        style={S_SVG}
      >
        <rect
           x="1" y="1"
           height="14" width="14"
           strokeWidth="2" rx="3"
           stroke={_restStroke}
           fill={_restFill}
        />
        { _value
           ? <SvgChecked stroke={checkedColor} />
           : null
        }
      </Svg100>
    </div>
  );
};

/*
SvgCheckBox.propTypes = {
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.string,
  checkedColor: PropTypes.string,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/

export default SvgCheckBox
