"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var _PasswordField = _interopRequireDefault(require("../zhn-m-input/PasswordField"));
var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
var S_SECRET = {
    width: 280
  },
  FN_TEST = function FN_TEST(v) {
    return !v || v.length === 32;
  };
var CardApiKey = function CardApiKey(_ref) {
  var style = _ref.style,
    buttonsStyle = _ref.buttonsStyle,
    onClose = _ref.onClose,
    onSet = _ref.onSet;
  var _refInput = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _onSet = (0, _uiApi.useCallback)(function () {
      onSet(_refInput.current.getValue());
      onClose();
    }, []);
  // onSet, onClose
  /*eslint-enable react-hooks/exhaustive-deps */
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PasswordField["default"], {
      ref: _refInput,
      style: S_SECRET,
      caption: "OpenWeatherMap API Key (32)",
      name: "openweathermap",
      onEnter: _onSet,
      onTest: FN_TEST
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: buttonsStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton["default"], {
        caption: "Set & Close",
        onClick: _onSet
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton["default"], {
        isPrimary: true,
        caption: "Close",
        onClick: onClose
      })]
    })]
  });
};
var _default = CardApiKey;
exports["default"] = _default;
//# sourceMappingURL=CardApiKey.js.map