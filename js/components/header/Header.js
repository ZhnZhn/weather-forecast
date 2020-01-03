"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _HamburgerButton = _interopRequireDefault(require("../zhn-atoms/HamburgerButton"));

var _ButtonCircle = _interopRequireDefault(require("../zhn-atoms/ButtonCircle"));

var _ProviderLink = _interopRequireDefault(require("../elements/ProviderLink"));

var _GitHubLink = _interopRequireDefault(require("./GitHubLink"));

var _Header = _interopRequireDefault(require("./Header.Style"));

var _actions = require("../../flux/layout/actions");

var _actions2 = require("../../flux/modal/actions");

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
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

var Header =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Header, _Component);

  function Header() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hForecast = function (storeKey) {
      var store = _this.props.store,
          dispatch = store.dispatch;
      dispatch((0, _actions.toggleLayout)(storeKey));
    };

    _this._hSettings = function (storeKey) {
      var store = _this.props.store,
          dispatch = store.dispatch;
      dispatch((0, _actions.toggleLayout)(storeKey));
      dispatch((0, _actions2.showModal)('SETTINGS'));
    };

    return _this;
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        store = _this$props.store,
        theme = _this$props.theme,
        _STYLE = theme.createStyle(_Header["default"]);

    return _react["default"].createElement("header", {
      role: "banner",
      style: (0, _extends2["default"])({}, rootStyle, {}, _STYLE.HEADER)
    }, _react["default"].createElement(_ProgressLoading["default"], {
      store: store
    }), _react["default"].createElement(_HamburgerButton["default"], {
      store: store,
      storeKey: "isPushMenu",
      onClick: _actions.toggleLayout
    }), _react["default"].createElement("span", {
      className: CL.TITLE
    }, TITLE), _react["default"].createElement(_ButtonCircle["default"], {
      style: S.BT_CIRCLE,
      caption: "F",
      title: "Toggle Forecast Popup",
      store: store,
      storeKey: "isPopupForecast",
      onClick: this._hForecast
    }), _react["default"].createElement(_ButtonCircle["default"], {
      style: S.BT_CIRCLE,
      caption: "S",
      title: "Open Settings Dialog",
      store: store,
      storeKey: "isSettings",
      onClick: this._hSettings
    }), _react["default"].createElement(_ProviderLink["default"], {
      className: CL.LINK,
      prefixCL: CL.LINK_PREF
    }), _react["default"].createElement(_GitHubLink["default"], {
      className: CL.GITHUB,
      title: "GitHub Repository",
      href: "https://github.com/zhnzhn/weather-forecast"
    }));
  };

  return Header;
}(Component);

var _default = (0, _withTheme["default"])(Header);

exports["default"] = _default;
//# sourceMappingURL=Header.js.map