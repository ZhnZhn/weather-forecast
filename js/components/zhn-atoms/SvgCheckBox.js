"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Svg = _interopRequireDefault(require("./svg/Svg100"));

//import PropTypes from "prop-types";
var useState = _react["default"].useState,
    useMemo = _react["default"].useMemo,
    useCallback = _react["default"].useCallback;
var CL_CHB = 'chb',
    S_SVG = {
  display: 'inline-block'
},
    C_GREY = "#777777";

var SvgChecked = function SvgChecked(_ref) {
  var stroke = _ref.stroke;
  return /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 2,5 L 8,14 14,1",
    strokeWidth: "2",
    strokeLinecap: "round",
    stroke: stroke,
    fill: _Color["default"].BLANK
  });
};

var _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var _noopFn = function _noopFn() {};

var SvgCheckBox = function SvgCheckBox(_ref2) {
  var initialValue = _ref2.initialValue,
      value = _ref2.value,
      style = _ref2.style,
      color = _ref2.color,
      _ref2$checkedColor = _ref2.checkedColor,
      checkedColor = _ref2$checkedColor === void 0 ? _Color["default"].YELLOW : _ref2$checkedColor,
      _ref2$onCheck = _ref2.onCheck,
      onCheck = _ref2$onCheck === void 0 ? _noopFn : _ref2$onCheck,
      _ref2$onUnCheck = _ref2.onUnCheck,
      onUnCheck = _ref2$onUnCheck === void 0 ? _noopFn : _ref2$onUnCheck;

  var _useState = useState(function () {
    return _isBool(value) ? void 0 : !!initialValue;
  }),
      valueState = _useState[0],
      setValueState = _useState[1],
      _isValueState = (0, _useRefInit["default"])(function () {
    return _isBool(valueState);
  }),
      _value = _isValueState ? valueState : value,
      _comp = useMemo(function () {
    return {
      setUnchecked: function setUnchecked() {
        return setValueState(false);
      }
    };
  }, []),
      _hToggle = useCallback(function (evt) {
    evt.preventDefault();

    var _toggle = _value ? onUnCheck : onCheck;

    _toggle(_comp);

    if (_isValueState) {
      setValueState(!_value);
    }
  }, [_value, onCheck, onUnCheck]),
      _hKeyDown = (0, _useKeyEnter["default"])(_hToggle, [_hToggle]),
      _restStroke = _value ? color || C_GREY : C_GREY,
      _restFill = _value ? color || _Color["default"].BLANK : _Color["default"].BLANK;

  return /*#__PURE__*/_react["default"].createElement("div", {
    role: "checkbox",
    tabIndex: "0",
    "aria-checked": _value //aria-labelledby
    ,
    className: CL_CHB,
    style: style,
    onClick: _hToggle,
    onKeyDown: _hKeyDown
  }, /*#__PURE__*/_react["default"].createElement(_Svg["default"], {
    w: "16",
    style: S_SVG
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    x: "1",
    y: "1",
    height: "14",
    width: "14",
    strokeWidth: "2",
    rx: "3",
    stroke: _restStroke,
    fill: _restFill
  }), _value ? /*#__PURE__*/_react["default"].createElement(SvgChecked, {
    stroke: checkedColor
  }) : null));
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


var _default = SvgCheckBox;
exports["default"] = _default;
//# sourceMappingURL=SvgCheckBox.js.map