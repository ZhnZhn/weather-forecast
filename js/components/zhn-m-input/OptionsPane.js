"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));
var _OptionFn = require("./OptionFn");
var _useKeyDownArrow = _interopRequireDefault(require("./useKeyDownArrow"));
var _a11yListboxFn = require("./a11yListboxFn");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _crItem = (item, index, _ref2) => {
  let {
    refFirstItem,
    refItem,
    currentItem,
    clItem,
    onSelect
  } = _ref2;
  const caption = (0, _OptionFn.getItemCaption)(item),
    value = (0, _OptionFn.getItemValue)(item),
    [_tabIndex, _ref, _ariaSelected] = value === (currentItem && (0, _OptionFn.getItemValue)(currentItem)) ? ["0", refItem, "true"] : ["-1"],
    _refOption = index === 0 ? _ref || refFirstItem : _ref,
    _refOptionFn = el => {
      if (_refOption) {
        (0, _uiApi.setRefValue)(_refOption, el);
      }
    },
    _hKeyDown = evt => {
      if (evt.key === _uiApi.KEY_ENTER) {
        onSelect(item, evt);
      }
    };

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _react.createElement)("div", {
    ...(0, _a11yListboxFn.crAriaOptionProps)(_ariaSelected, _tabIndex),
    key: value,
    ref: _refOptionFn,
    className: clItem,
    onClick: evt => onSelect(item, evt),
    onKeyDown: _hKeyDown
  }, caption);
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};
const OptionsPane = _ref3 => {
  let {
    refOp,
    id,
    ariaLabel,
    isShow,
    isFocusItem = true,
    className,
    style,
    options,
    item,
    clItem,
    onSelect,
    onClose
  } = _ref3;
  const _refFirstItem = (0, _uiApi.useRef)(null),
    _refItem = (0, _uiApi.useRef)(null),
    [_refFocus, _hKeyDownArrow] = (0, _useKeyDownArrow.default)(onClose);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useImperativeHandle)(refOp, () => ({
    hKeyDown: _hKeyDownArrow
  }), []);
  // _hKeyDown
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (isShow && isFocusItem) {
      (0, _uiApi.setRefValue)(_refFocus, (0, _uiApi.focusRefElement)(_refItem, _refFirstItem));
    }
  }, [isShow, isFocusItem]);
  // _refFocus
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      ...(0, _a11yListboxFn.crAriaListboxProps)(id, ariaLabel),
      //isScrollable={true}
      isShow: isShow,
      className: className,
      style: style,
      onKeyDown: _hKeyDownArrow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: options,
        crItem: _crItem,
        refFirstItem: _refFirstItem,
        refItem: _refItem,
        currentItem: item,
        clItem: clItem,
        onSelect: onSelect
      })
    })
  });
};
var _default = exports.default = OptionsPane;
//# sourceMappingURL=OptionsPane.js.map