import {
  useRef,
  useCallback,
  useEffect,

  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_HOME,
  KEY_END,
  KEY_ENTER,
  KEY_SPACE,
  KEY_ESCAPE,
  KEY_TAB,

  getRefValue,
  setRefValue,
  stopDefaultFor
} from '../uiApi';

import ItemStack from '../zhn/ItemStack';
import ModalPane from '../zhn-moleculs/ModalPane';
import {
  FOCUS_NEXT_OPTION,
  FOCUS_PREV_OPTION,
  getItemCaption,
  getItemValue
} from './OptionFn';

const SCROLL_OPTIONS = {
  block: 'center',
  behavior: 'smooth'
};

const _setItemFocus = (
  elItem,
  ref
) => elItem
  ? (
  elItem.scrollIntoView(SCROLL_OPTIONS),
  elItem.focus(),
  setRefValue(ref, elItem),
  !0
) : !1;

const _fFocusItem = propName => ref => {
  const _elItem = (getRefValue(ref) || {})[propName];
  return _setItemFocus(_elItem, ref);
};

const _focusNextItem = _fFocusItem('nextSibling');
const _focusPrevItem = _fFocusItem('previousSibling');

const _fFocusParentItem = propName => ref => {
  const _elItem = ((getRefValue(ref) || {}).parentNode || {})[propName];
  _setItemFocus(_elItem, ref)
}

const _focusFirstItem = _fFocusParentItem('firstChild');
const _focusLastItem = _fFocusParentItem('lastChild');

const _crItem = (
  item,
  index, {
  refItem,
  currentItem,
  clItem,
  onSelect,
  onTabSelect
}) => {
  const caption = getItemCaption(item)
  , value = getItemValue(item)
  , currentItemCaption = getItemCaption(currentItem)
  , [
    _tabIndex,
    _ref,
    _ariaSelected,
  ] = currentItemCaption !== void 0 && caption === currentItemCaption
      ? ["0", refItem, "true"]
      : currentItemCaption === void 0 && index === 0
         ? ["0", refItem]
         : ["-1"]
  , _hKeyDown = evt => {
    if (evt.key === KEY_ENTER || evt.key === KEY_SPACE) {
      onSelect(item, evt)
    } if (evt.key === KEY_TAB) {
      onTabSelect(item)
    }
  };

  return (
    <div
      key={value}
      role="option"
      ref={_ref}
      aria-selected={_ariaSelected}
      tabIndex={_tabIndex}
      className={clItem}
      onClick={evt => onSelect(item, evt)}
      onKeyDown={_hKeyDown}
    >
      {caption}
    </div>
  );
};

const OptionsPane = ({
  id,
  isShow,
  focusOption,
  className,
  options,
  item,
  clItem,
  onSelect,
  onTabSelect,
  onClose
}) => {
  const _refItem = useRef(null)
  , _refItemFocused = useRef(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hKeyDown = useCallback(evt => {
    if (evt.key === KEY_ARROW_DOWN) {
      stopDefaultFor(evt)
      _focusNextItem(_refItemFocused)
    } else if (evt.key === KEY_ARROW_UP) {
      stopDefaultFor(evt)
      _focusPrevItem(_refItemFocused)
    } else if (evt.key === KEY_HOME) {
      stopDefaultFor(evt)
      _focusFirstItem(_refItemFocused)
    } else if (evt.key === KEY_END) {
      stopDefaultFor(evt)
      _focusLastItem(_refItemFocused)
    } else if (evt.key === KEY_TAB) {
      stopDefaultFor(evt)
      _focusNextItem(_refItemFocused)
    } else if (evt.key === KEY_ESCAPE) {
      stopDefaultFor(evt)
      onClose()
    }
  }, []);
  //onClose
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (isShow) {
      const _elItem = getRefValue(_refItem);
      if (!getRefValue(_refItemFocused) && focusOption) {
        setRefValue(_refItemFocused, _elItem)
      }

      const _hasBeenItemFocused = focusOption === FOCUS_NEXT_OPTION
        ? _focusNextItem(_refItemFocused)
        : focusOption === FOCUS_PREV_OPTION
        ? _focusPrevItem(_refItemFocused)
        : !1;

      if (!_hasBeenItemFocused) {
        _setItemFocus(_elItem, _refItemFocused)
      }
    }
  }, [isShow, focusOption])
  return (
   <ModalPane
     id={id}
     role="listbox"
     data-scrollable="true"
     isShow={isShow}
     className={className}
     onClose={onClose}
     onKeyDown={_hKeyDown}
   >
     <ItemStack
       items={options}
       crItem={_crItem}
       refItem={_refItem}
       currentItem={item}
       clItem={clItem}
       onSelect={onSelect}
       onTabSelect={onTabSelect}
     />
   </ModalPane>
 );
};

export default OptionsPane
