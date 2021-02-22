"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var CL_NOT_SELECTED = "not-selected";
var useCallback = _react["default"].useCallback;
var S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    width: 22,
    height: 22,
    border: '2px solid #80c040',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  NOT_ACTIVE: {
    color: '#5b5b5b'
  }
};

var ButtonCircle = function ButtonCircle(_ref) {
  var caption = _ref.caption,
      title = _ref.title,
      style = _ref.style,
      storeKey = _ref.storeKey,
      onClick = _ref.onClick;

  var isActive = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  }),
      _hClick = useCallback(function () {
    onClick(storeKey);
  }, [storeKey]),
      _style = isActive ? (0, _extends2["default"])({}, S.ROOT, style) : (0, _extends2["default"])({}, S.ROOT, style, S.NOT_ACTIVE);

  return /*#__PURE__*/_react["default"].createElement("span", {
    className: CL_NOT_SELECTED,
    style: _style,
    title: title,
    onClick: _hClick
  }, caption);
};

var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map