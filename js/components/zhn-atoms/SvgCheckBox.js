"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));
var _Color = require("../styles/Color");
var _Svg = _interopRequireDefault(require("./svg/Svg100"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_CHB = 'chb',
  S_SVG = {
    display: 'inline-block'
  };
const SvgChecked = _ref => {
  let {
    stroke
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 2,5 L 8,14 14,1",
    strokeWidth: "2",
    strokeLinecap: "round",
    stroke: stroke,
    fill: _Color.COLOR_BLANK
  });
};
const FN_NOOP = () => {};
const SvgCheckBox = _ref2 => {
  let {
    initialValue,
    value,
    style,
    color,
    checkedColor = _Color.COLOR_YELLOW,
    onCheck = FN_NOOP,
    onUnCheck = FN_NOOP
  } = _ref2;
  const [valueState, setValueState] = (0, _uiApi.useState)(() => (0, _isTypeFn.isBool)(value) ? void 0 : !!initialValue),
    _isValueState = (0, _useRefInit.default)(() => (0, _isTypeFn.isBool)(valueState)),
    _value = _isValueState ? valueState : value,
    _comp = (0, _uiApi.useMemo)(() => ({
      setUnchecked: () => setValueState(false)
    }), [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hToggle = (0, _uiApi.useCallback)(evt => {
      evt.preventDefault();
      const _toggle = _value ? onUnCheck : onCheck;
      _toggle(_comp);
      if (_isValueState) {
        setValueState(!_value);
      }
    }, [_value, onCheck, onUnCheck])
    //_comp, _isValueState
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hKeyDown = (0, _useKeyEnter.default)(_hToggle, [_hToggle]),
    _restStroke = _value ? color || _Color.COLOR_GREY : _Color.COLOR_GREY,
    _restFill = _value ? color || _Color.COLOR_BLANK : _Color.COLOR_BLANK;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "checkbox",
    tabIndex: "0",
    "aria-checked": _value
    //aria-labelledby
    ,
    className: CL_CHB,
    style: style,
    onClick: _hToggle,
    onKeyDown: _hKeyDown,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
      w: "16",
      style: S_SVG,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "1",
        y: "1",
        height: "14",
        width: "14",
        strokeWidth: "2",
        rx: "3",
        stroke: _restStroke,
        fill: _restFill
      }), _value ? /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgChecked, {
        stroke: checkedColor
      }) : null]
    })
  });
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
var _default = exports.default = SvgCheckBox;
//# sourceMappingURL=SvgCheckBox.js.map