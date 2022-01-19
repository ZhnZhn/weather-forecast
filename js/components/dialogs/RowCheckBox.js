"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _useBool2 = _interopRequireDefault(require("../hooks/useBool"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

var _SvgCheckBox = _interopRequireDefault(require("../zhn-atoms/SvgCheckBox"));

var _jsxRuntime = require("react/jsx-runtime");

var CHB_COLOR = 'black',
    S_ROOT = {
  padding: '6px 0 0 16px'
},
    S_CAPTION = {
  display: 'inline-block',
  color: 'grey',
  paddingLeft: 8,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none',
  cursor: 'pointer'
},
    S_CHECKED = {
  color: 'black'
},
    DF_NOOP = function DF_NOOP() {};

var RowCheckBox = function RowCheckBox(_ref) {
  var style = _ref.style,
      initValue = _ref.initValue,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle,
      _ref$onCheck = _ref.onCheck,
      onCheck = _ref$onCheck === void 0 ? DF_NOOP : _ref$onCheck,
      _ref$onUnCheck = _ref.onUnCheck,
      onUnCheck = _ref$onUnCheck === void 0 ? DF_NOOP : _ref$onUnCheck;

  var _useBool = (0, _useBool2["default"])(initValue),
      isChecked = _useBool[0],
      setChecked = _useBool[1],
      setUnChecked = _useBool[2],
      _hCheck = (0, _uiApi.useCallback)(function () {
    onCheck();
    setChecked();
  }, []),
      _hUnCheck = (0, _uiApi.useCallback)(function () {
    onUnCheck();
    setUnChecked();
  }, []),
      _hToggle = function _hToggle() {
    if (isChecked) {
      _hUnCheck();
    } else {
      _hCheck();
    }
  },
      TS = (0, _useTheme["default"])(_Dialog["default"]),
      _style = isChecked ? S_CHECKED : null;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S_ROOT, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], {
      color: CHB_COLOR,
      checkedColor: TS.R_DIALOG.backgroundColor,
      value: isChecked,
      onCheck: _hCheck,
      onUnCheck: _hUnCheck
    }), caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: (0, _extends2["default"])({}, S_CAPTION, captionStyle, _style),
      onClick: _hToggle,
      children: caption
    })]
  });
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


var _default = RowCheckBox;
exports["default"] = _default;
//# sourceMappingURL=RowCheckBox.js.map