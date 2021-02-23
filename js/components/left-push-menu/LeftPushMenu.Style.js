"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var styleConfig = {
  _themeName: undefined,
  _style: {},
  _createStyle: function _createStyle(C) {
    return {
      ROOT_DIV: (0, _extends2["default"])({
        position: 'fixed',
        top: '3rem',
        left: '0',
        bottom: '0',
        borderRight: '1px solid #999',
        transform: 'translateX(-100%)',
        transition: 'transform .3s',
        fill: C.BG_MARK.backgroundColor
      }, C.BG, {
        //overflowY : 'auto',
        //overflowX : 'hidden',
        //maxWidth : '100%',
        width: 665
      }),
      C_BG_MARK: C.BG_MARK.backgroundColor,
      C_BG_UNMARK: C.BG.backgroundColor
    };
  }
};
var _default = styleConfig;
exports["default"] = _default;
//# sourceMappingURL=LeftPushMenu.Style.js.map