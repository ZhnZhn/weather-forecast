"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _OptionsPane = _interopRequireDefault(require("./OptionsPane"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SELECT = 'm-select',
  CL_LABEL = `${CL_SELECT}__label`,
  CL_DIV = `${CL_SELECT}__div`,
  CL_DIV_VALUE = `${CL_SELECT}__div__value`,
  CL_DIV_BT = `${CL_SELECT}__div__bt`,
  CL_INPUT_LINE = `${CL_SELECT}__line`,
  CL_ITEM = `${CL_SELECT}__item`,
  DF_INIT_ITEM = {
    caption: '',
    value: ''
  };
const InputSelect = _ref => {
  let {
    caption,
    options,
    style,
    selectedItem,
    initItem = DF_INIT_ITEM,
    onSelect
  } = _ref;
  const [isShow, _hOpen, _hClose] = (0, _useBool.default)(!1),
    [item, setItem] = (0, _uiApi.useState)(initItem)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelect = (0, _uiApi.useCallback)((item, evt) => {
      evt.stopPropagation();
      onSelect(item);
      _hClose();
      setItem(item);
    }, [])
    // _handleClose, onSelect
    /*eslint-enable react-hooks/exhaustive-deps */,
    _item = selectedItem || item;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_SELECT,
    style: style,
    onClick: _hOpen,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsPane.default, {
      isShow: isShow,
      item: _item,
      options: options,
      clItem: CL_ITEM,
      onSelect: _hSelect,
      onClose: _hClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      className: CL_LABEL,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_DIV_VALUE,
        children: _item.caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "button",
        className: CL_DIV_BT,
        tabIndex: "0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {})
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_LINE
      })]
    })]
  });
};
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map