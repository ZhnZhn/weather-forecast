'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var styleConfig = {
  _themeName: undefined,
  _style: {},
  _createStyle: function _createStyle(C) {
    return {
      ROOT_DIV: _extends({
        position: 'fixed',
        top: '3rem',
        left: '0',
        bottom: '0',
        borderRight: '1px solid #999',
        transform: 'translateX(-100%)',
        transition: 'transform .3s',
        fill: C.BG_MARK.backgroundColor
      }, C.BG, {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxWidth: '100%'
      }),
      C_BG_MARK: C.BG_MARK.backgroundColor,
      C_BG_UNMARK: C.BG.backgroundColor
    };
  }
};

exports.default = styleConfig;
//# sourceMappingURL=LeftPushMenu.Style.js.map