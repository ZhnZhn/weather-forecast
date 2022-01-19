"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _useBool2 = _interopRequireDefault(require("../hooks/useBool"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var _OptionsPane = _interopRequireDefault(require("./OptionsPane"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_SELECT = 'm-select',
    CL_LABEL = 'm-select__label',
    CL_DIV = 'm-select__div',
    CL_DIV_VALUE = 'm-select__div__value',
    CL_DIV_BT = 'm-select__div__bt',
    CL_INPUT_LINE = 'm-select__line',
    CL_ITEM = 'm-select__item',
    DF_INIT_ITEM = {
  caption: '',
  value: ''
},
    DF_TS = {};

var InputSelect = function InputSelect(_ref) {
  var caption = _ref.caption,
      options = _ref.options,
      _ref$styleConfig = _ref.styleConfig,
      TS = _ref$styleConfig === void 0 ? DF_TS : _ref$styleConfig,
      selectedItem = _ref.selectedItem,
      _ref$initItem = _ref.initItem,
      initItem = _ref$initItem === void 0 ? DF_INIT_ITEM : _ref$initItem,
      onSelect = _ref.onSelect;

  var _useBool = (0, _useBool2["default"])(false),
      isShow = _useBool[0],
      _handleOpen = _useBool[1],
      _handleClose = _useBool[2],
      _useState = (0, _uiApi.useState)(initItem),
      item = _useState[0],
      setItem = _useState[1],
      _handleSelect = (0, _uiApi.useCallback)(function (item, event) {
    event.stopPropagation();
    onSelect(item);

    _handleClose();

    setItem(item);
  }, []),
      _item = selectedItem || item;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_SELECT,
    style: TS.ROOT,
    onClick: _handleOpen,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsPane["default"], {
      style: TS.MODAL_PANE,
      isShow: isShow,
      item: _item,
      options: options,
      clItem: TS.CL_ITEM || CL_ITEM,
      onSelect: _handleSelect,
      onClose: _handleClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      className: CL_LABEL,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_DIV_VALUE,
        children: _item.caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: CL_DIV_BT,
        tabIndex: "0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell["default"], {})
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_LINE
      })]
    })]
  });
};

var _default = InputSelect;
exports["default"] = _default;
//# sourceMappingURL=InputSelect.js.map