"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _OptionsPane = _interopRequireDefault(require("./OptionsPane"));
var _OptionFn = require("./OptionFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SELECT = 'm-select',
  CL_CAPTION = `${CL_SELECT}__caption`,
  CL_VALUE = `${CL_SELECT}__value`,
  CL_DIV = `${CL_SELECT}__div`,
  CL_INPUT_SVG = `${CL_SELECT}__svg`,
  CL_INPUT_LINE = `${CL_SELECT}__line`,
  CL_SELECT_OPTIONS = `${CL_SELECT}__options with-scroll`,
  CL_ITEM = `${CL_SELECT}__item`,
  DF_CAPTION = 'Item',
  DF_INIT_ITEM = {
    caption: void 0,
    value: void 0
  };
const InputSelect = _ref => {
  let {
    id,
    initItem,
    caption,
    options,
    style,
    onSelect
  } = _ref;
  const _listboxId = (0, _uiApi.useId)(),
    _captionId = (0, _uiApi.useId)(),
    _refBtCombobox = (0, _uiApi.useRef)(),
    [item, setItem] = (0, _uiApi.useState)(initItem || DF_INIT_ITEM),
    [isShowTuple, setIsShowTuple] = (0, _uiApi.useState)([!1]),
    [showOptions, hideOptions] = (0, _uiApi.useMemo)(() => [focusOption => setIsShowTuple([!0, focusOption]), () => setIsShowTuple([!1])], []),
    [isShowOptions, focusOption] = isShowTuple
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hCloseOptions = (0, _uiApi.useMemo)(() => () => {
      hideOptions();
      (0, _uiApi.focusRefElement)(_refBtCombobox);
    }, [])
    // hideOptions
    ,
    [_hSelect, _hTabSelect, _hKeyDown] = (0, _uiApi.useMemo)(() => [(item, evt) => {
      (0, _uiApi.stopDefaultFor)(evt);
      onSelect(item, id);
      _hCloseOptions();
      setItem(item);
    },
    // id, onSelect, _closeOptions
    item => {
      onSelect(item, id);
      setItem(item);
    },
    // id, onSelect
    evt => {
      if (evt.key === _uiApi.KEY_ARROW_DOWN) {
        (0, _uiApi.stopDefaultFor)(evt);
        showOptions(_OptionFn.FOCUS_NEXT_OPTION);
      } else if (evt.key === _uiApi.KEY_ARROW_UP) {
        (0, _uiApi.stopDefaultFor)(evt);
        showOptions(_OptionFn.FOCUS_PREV_OPTION);
      }
    }
    // showOptions
    ], []);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    ref: _refBtCombobox,
    type: "button",
    role: "combobox",
    "aria-expanded": isShowOptions,
    "aria-controls": _listboxId,
    "aria-labelledby": _captionId,
    className: CL_SELECT,
    style: style,
    onClick: showOptions,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      id: _captionId,
      className: CL_CAPTION,
      children: caption || DF_CAPTION
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL_VALUE,
      children: (0, _OptionFn.getItemCaption)(item)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsPane.default, {
      id: _listboxId,
      isShow: isShowOptions,
      focusOption: focusOption,
      className: CL_SELECT_OPTIONS,
      item: item,
      options: options,
      clItem: CL_ITEM,
      onSelect: _hSelect,
      onTabSelect: _hTabSelect,
      onClose: _hCloseOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      "aria-hidden": "true",
      className: CL_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_SVG,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_LINE
      })]
    })]
  });
};
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map