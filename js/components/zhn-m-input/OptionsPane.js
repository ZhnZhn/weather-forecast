"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));

var _ShowHide = _interopRequireDefault(require("../zhn-atoms/ShowHide"));

var _jsxRuntime = require("react/jsx-runtime");

var S_PANE = {
  position: 'absolute',
  top: 12,
  zIndex: 20,
  width: '100%',
  padding: '12px 0',
  backgroundColor: 'rgb(77, 77, 77)',
  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px'
},
    S_ITEM = {
  color: 'greenyellow'
};

var _renderOptions = function _renderOptions(options, currentItem, clItem, onSelect, isShow) {
  return options.map(function (item, index) {
    var _style = item.value === currentItem.value ? S_ITEM : void 0;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _style,
      className: clItem,
      onClick: onSelect.bind(null, item),
      children: item.caption
    }, index);
  });
};

var OptionsPane = function OptionsPane(_ref) {
  var isShow = _ref.isShow,
      options = _ref.options,
      item = _ref.item,
      style = _ref.style,
      clItem = _ref.clItem,
      onSelect = _ref.onSelect,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane["default"], {
    style: style,
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      isShow: isShow,
      style: (0, _extends2["default"])({}, S_PANE, style),
      children: _renderOptions(options, item, clItem, onSelect, isShow)
    })
  });
};

var _default = OptionsPane;
exports["default"] = _default;
//# sourceMappingURL=OptionsPane.js.map