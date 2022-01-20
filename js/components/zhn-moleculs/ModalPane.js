"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _jsxRuntime = require("react/jsx-runtime");

var _removeClickListener = function _removeClickListener(listener, ref) {
  if (ref.current) {
    document.removeEventListener('click', listener, true);
    ref.current = null;
  }
};

var ModalPane = function ModalPane(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      children = _ref.children;

  var _refNode = (0, _uiApi.useRef)(null),
      _refIs = (0, _uiApi.useRef)(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _hClickOutside = (0, _uiApi.useCallback)(function (event) {
    var _refNode$current;

    if (_refNode != null && (_refNode$current = _refNode.current) != null && _refNode$current.contains && !_refNode.current.contains(event.target)) {
      event.stopPropagation();
      onClose(event);
    }
  }, []); // onClose


  (0, _uiApi.useEffect)(function () {
    if (isShow && !_refIs.current) {
      document.addEventListener('click', _hClickOutside, true);
      _refIs.current = true;
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs);
    }
  });
  (0, _uiApi.useEffect)(function () {
    return function () {
      return _removeClickListener(_hClickOutside, _refIs);
    };
  }, []); // _hClickOutside

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: _refNode,
    style: style,
    children: children
  });
};

var _default = ModalPane;
exports["default"] = _default;
//# sourceMappingURL=ModalPane.js.map