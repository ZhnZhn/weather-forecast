"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _PasswordField = _interopRequireDefault(require("../zhn-m-input/PasswordField"));
var _RaisedButton = _interopRequireDefault(require("../zhn/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_SECRET = {
    width: 280
  },
  FN_TEST = v => !v || v.length === 32;
const CardApiKey = _ref => {
  let {
    style,
    buttonsStyle,
    onClose,
    onSet
  } = _ref;
  const _refInput = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _onSet = (0, _uiApi.useCallback)(() => {
      onSet(_refInput.current.getValue());
      onClose();
    }, []);
  // onSet, onClose
  /*eslint-enable react-hooks/exhaustive-deps */
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PasswordField.default, {
      refEl: _refInput,
      style: S_SECRET,
      caption: "OpenWeatherMap API Key (32)",
      name: "openweathermap",
      onEnter: _onSet,
      onTest: FN_TEST
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: buttonsStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton.default, {
        caption: "Set & Close",
        onClick: _onSet
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton.default, {
        isPrimary: true,
        caption: "Close",
        onClick: onClose
      })]
    })]
  });
};
var _default = exports.default = CardApiKey;
//# sourceMappingURL=CardApiKey.js.map