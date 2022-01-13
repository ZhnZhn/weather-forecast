"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _jsxRuntime = require("react/jsx-runtime");

var CL_BT_CIRCLE = "bt-circle not-selected",
    S_ROOT = {
  display: 'inline-block',
  color: '#80c040',
  width: 22,
  height: 22,
  border: '2px solid #80c040',
  borderRadius: '50%',
  verticalAlign: 'middle',
  fontWeight: 'bold'
},
    S_NOT_ACTIVE = {
  color: '#5b5b5b'
};

var ButtonCircle = function ButtonCircle(_ref) {
  var style = _ref.style,
      caption = _ref.caption,
      title = _ref.title,
      storeKey = _ref.storeKey,
      onClick = _ref.onClick;

  var isActive = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  }),
      _hClick = (0, _uiApi.useCallback)(function () {
    onClick(storeKey);
  }, [storeKey, onClick]),
      _styleRoot = (0, _extends2["default"])({}, S_ROOT, style),
      _style = isActive ? _styleRoot : (0, _extends2["default"])({}, _styleRoot, S_NOT_ACTIVE);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_BT_CIRCLE,
    style: _style,
    title: title,
    onClick: _hClick,
    children: caption
  });
};

var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map