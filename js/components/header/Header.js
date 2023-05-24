"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _useLayoutButton3 = _interopRequireDefault(require("../hooks/useLayoutButton"));
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _hotkeys = require("../hotkeys/hotkeys");
var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));
var _HamburgerButton = _interopRequireDefault(require("../zhn-atoms/HamburgerButton"));
var _ButtonCircle = _interopRequireDefault(require("../zhn-atoms/ButtonCircle"));
var _ProviderLink = _interopRequireDefault(require("../elements/ProviderLink"));
var _GitHubLink = _interopRequireDefault(require("./GitHubLink"));
var _Header = _interopRequireDefault(require("./Header.Style"));
var _handlers = require("../../flux/handlers");
var _jsxRuntime = require("react/jsx-runtime");
var TITLE = "Weather v0.3.0";
var CL_TITLE = 'header__title',
  CL_LINK_PREF = 'header__link-pref',
  CL_LINK = 'header__link-provider',
  CL_GITHUB = 'header__github-link',
  S_BT_CIRCLE = {
    position: 'relative',
    top: '-2px',
    width: '1.8rem',
    height: '1.8rem',
    marginLeft: '1rem'
  };
var Header = function Header(_ref) {
  var style = _ref.style;
  var TS = (0, _useTheme["default"])(_Header["default"]),
    _useLayoutButton = (0, _useLayoutButton3["default"])("isPopupForecast", _handlers.toggleLayout),
    isActiveForecats = _useLayoutButton[0],
    hForecast = _useLayoutButton[1],
    _useLayoutButton2 = (0, _useLayoutButton3["default"])("isSettings", _handlers.showSettings),
    isActiveSettings = _useLayoutButton2[0],
    hSettings = _useLayoutButton2[1];
  (0, _useHotKey["default"])(_hotkeys.HK_FORECAST, hForecast);
  (0, _useHotKey["default"])(_hotkeys.HK_SETTINGS, hSettings);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
    role: "banner",
    style: (0, _extends2["default"])({}, style, TS.HEADER),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLoading["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HamburgerButton["default"], {
      storeKey: "isPushMenu",
      onClick: _handlers.toggleLayout
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_TITLE,
      children: TITLE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
      isActive: isActiveForecats,
      style: S_BT_CIRCLE,
      caption: "F",
      title: "Toggle Forecast Popup",
      onClick: hForecast
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
      isActive: isActiveSettings,
      style: S_BT_CIRCLE,
      caption: "S",
      title: "Open Settings Dialog",
      onClick: hSettings
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLink["default"], {
      className: CL_LINK,
      prefixCL: CL_LINK_PREF
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GitHubLink["default"], {
      className: CL_GITHUB,
      title: "GitHub Repository",
      href: "https://github.com/zhnzhn/weather-forecast"
    })]
  });
};
var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=Header.js.map