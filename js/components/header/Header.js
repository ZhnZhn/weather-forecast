"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _HamburgerButton = _interopRequireDefault(require("../zhn-atoms/HamburgerButton"));

var _ButtonCircle = _interopRequireDefault(require("../zhn-atoms/ButtonCircle"));

var _ProviderLink = _interopRequireDefault(require("../elements/ProviderLink"));

var _GitHubLink = _interopRequireDefault(require("./GitHubLink"));

var _Header = _interopRequireDefault(require("./Header.Style"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

//import PropTypes from 'prop-types';
var toggleLayout = _handlers["default"].toggleLayout,
    showSettings = _handlers["default"].showSettings;
var TITLE = "Weather v0.2.0";
var CL = {
  TITLE: 'header__title',
  LINK_PREF: 'header__link-pref',
  LINK: 'header__link-provider',
  GITHUB: 'header__github-link'
};
var S = {
  BT_CIRCLE: {
    width: '1.8rem',
    height: '1.8rem',
    lineHeight: '1rem',
    marginLeft: '1rem',
    paddingTop: '0.3rem'
  }
};

var Header = function Header(_ref) {
  var style = _ref.style;

  var _STYLE = (0, _useTheme["default"])(_Header["default"]);

  return /*#__PURE__*/_react["default"].createElement("header", {
    role: "banner",
    style: (0, _extends2["default"])({}, style, _STYLE.HEADER)
  }, /*#__PURE__*/_react["default"].createElement(_ProgressLoading["default"], null), /*#__PURE__*/_react["default"].createElement(_HamburgerButton["default"], {
    storeKey: "isPushMenu",
    onClick: toggleLayout
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: CL.TITLE
  }, TITLE), /*#__PURE__*/_react["default"].createElement(_ButtonCircle["default"], {
    style: S.BT_CIRCLE,
    caption: "F",
    title: "Toggle Forecast Popup",
    storeKey: "isPopupForecast",
    onClick: toggleLayout
  }), /*#__PURE__*/_react["default"].createElement(_ButtonCircle["default"], {
    style: S.BT_CIRCLE,
    caption: "S",
    title: "Open Settings Dialog",
    storeKey: "isSettings",
    onClick: showSettings
  }), /*#__PURE__*/_react["default"].createElement(_ProviderLink["default"], {
    className: CL.LINK,
    prefixCL: CL.LINK_PREF
  }), /*#__PURE__*/_react["default"].createElement(_GitHubLink["default"], {
    className: CL.GITHUB,
    title: "GitHub Repository",
    href: "https://github.com/zhnzhn/weather-forecast"
  }));
};

var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=Header.js.map