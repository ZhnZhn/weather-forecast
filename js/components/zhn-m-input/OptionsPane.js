"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));
var _OptionFn = require("./OptionFn");
var _jsxRuntime = require("react/jsx-runtime");
const SCROLL_OPTIONS = {
  block: 'center',
  behavior: 'smooth'
};
const _setItemFocus = (elItem, ref) => elItem ? (elItem.scrollIntoView(SCROLL_OPTIONS), elItem.focus(), (0, _uiApi.setRefValue)(ref, elItem), !0) : !1;
const _fFocusItem = propName => ref => {
  const _elItem = ((0, _uiApi.getRefValue)(ref) || {})[propName];
  return _setItemFocus(_elItem, ref);
};
const _focusNextItem = _fFocusItem('nextSibling');
const _focusPrevItem = _fFocusItem('previousSibling');
const _fFocusParentItem = propName => ref => {
  const _elItem = (((0, _uiApi.getRefValue)(ref) || {}).parentNode || {})[propName];
  _setItemFocus(_elItem, ref);
};
const _focusFirstItem = _fFocusParentItem('firstChild');
const _focusLastItem = _fFocusParentItem('lastChild');
const _crItem = (item, index, _ref2) => {
  let {
    refItem,
    currentItem,
    clItem,
    onSelect,
    onTabSelect
  } = _ref2;
  const caption = (0, _OptionFn.getItemCaption)(item),
    value = (0, _OptionFn.getItemValue)(item),
    currentItemCaption = (0, _OptionFn.getItemCaption)(currentItem),
    [_tabIndex, _ref, _ariaSelected] = currentItemCaption !== void 0 && caption === currentItemCaption ? ["0", refItem, "true"] : currentItemCaption === void 0 && index === 0 ? ["0", refItem] : ["-1"],
    _hKeyDown = evt => {
      if (evt.key === _uiApi.KEY_ENTER || evt.key === _uiApi.KEY_SPACE) {
        onSelect(item, evt);
      }
      if (evt.key === _uiApi.KEY_TAB) {
        onTabSelect(item);
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "option",
    ref: _ref,
    "aria-selected": _ariaSelected,
    tabIndex: _tabIndex,
    className: clItem,
    onClick: evt => onSelect(item, evt),
    onKeyDown: _hKeyDown,
    children: caption
  }, value);
};
const OptionsPane = _ref3 => {
  let {
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
  } = _ref3;
  const _refItem = (0, _uiApi.useRef)(null),
    _refItemFocused = (0, _uiApi.useRef)(null)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hKeyDown = (0, _uiApi.useCallback)(evt => {
      if (evt.key === _uiApi.KEY_ARROW_DOWN) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusNextItem(_refItemFocused);
      } else if (evt.key === _uiApi.KEY_ARROW_UP) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusPrevItem(_refItemFocused);
      } else if (evt.key === _uiApi.KEY_HOME) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusFirstItem(_refItemFocused);
      } else if (evt.key === _uiApi.KEY_END) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusLastItem(_refItemFocused);
      } else if (evt.key === _uiApi.KEY_TAB) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusNextItem(_refItemFocused);
      } else if (evt.key === _uiApi.KEY_ESCAPE) {
        (0, _uiApi.stopDefaultFor)(evt);
        onClose();
      }
    }, []);
  //onClose
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (isShow) {
      const _elItem = (0, _uiApi.getRefValue)(_refItem);
      if (!(0, _uiApi.getRefValue)(_refItemFocused) && focusOption) {
        (0, _uiApi.setRefValue)(_refItemFocused, _elItem);
      }
      const _hasBeenItemFocused = focusOption === _OptionFn.FOCUS_NEXT_OPTION ? _focusNextItem(_refItemFocused) : focusOption === _OptionFn.FOCUS_PREV_OPTION ? _focusPrevItem(_refItemFocused) : !1;
      if (!_hasBeenItemFocused) {
        _setItemFocus(_elItem, _refItemFocused);
      }
    }
  }, [isShow, focusOption]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    id: id,
    role: "listbox",
    "data-scrollable": "true",
    isShow: isShow,
    className: className,
    onClose: onClose,
    onKeyDown: _hKeyDown,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: options,
      crItem: _crItem,
      refItem: _refItem,
      currentItem: item,
      clItem: clItem,
      onSelect: onSelect,
      onTabSelect: onTabSelect
    })
  });
};
var _default = exports.default = OptionsPane;
//# sourceMappingURL=OptionsPane.js.map