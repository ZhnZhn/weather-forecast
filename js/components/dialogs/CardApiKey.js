"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _useBool2 = _interopRequireDefault(require("../hooks/useBool"));

var _SecretField = _interopRequireDefault(require("../zhn-m-input/SecretField"));

var _RowCheckBox = _interopRequireDefault(require("./RowCheckBox"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var _jsxRuntime = require("react/jsx-runtime");

var CAPTION_ALLOW = "Allow Remember Enter of API Key by Browser Password Manager",
    S_SECRET = {
  width: 280
},
    S_CHECK_BOX = {
  padding: '16px 24px 0 24px'
},
    S_CHECK_CAPTION = {
  display: 'inline'
},
    IS_ALLOW = false;

var CardApiKey = function CardApiKey(_ref) {
  var style = _ref.style,
      buttonsStyle = _ref.buttonsStyle,
      onClose = _ref.onClose,
      onSet = _ref.onSet;

  var _refInput = (0, _uiApi.useRef)(),
      _useBool = (0, _useBool2["default"])(IS_ALLOW),
      isAllow = _useBool[0],
      _checkAllow = _useBool[1],
      _uncheckAllow = _useBool[2],
      _onSet = (0, _uiApi.useCallback)(function () {
    onSet(_refInput.current.getValue());
    onClose();
  }, []); // onSet, onClose

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SecretField["default"], {
      ref: _refInput,
      style: S_SECRET,
      isAllowRemember: isAllow,
      caption: "OpenWeatherMap API Key",
      name: "openweathermap"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      style: S_CHECK_BOX,
      initValue: IS_ALLOW,
      caption: CAPTION_ALLOW,
      captionStyle: S_CHECK_CAPTION,
      onCheck: _checkAllow,
      onUnCheck: _uncheckAllow
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