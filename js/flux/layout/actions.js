"use strict";

exports.__esModule = true;
exports["default"] = exports.setThemeName = exports.toggleLayout = exports.ACTION = void 0;
var ACTION = {
  TOGGLE_LAYOUT: 'TOGGLE_LAYOUT',
  SET_THEME_NAME: 'SET_THEME_NAME'
};
exports.ACTION = ACTION;

var toggleLayout = function toggleLayout(key) {
  return {
    type: ACTION.TOGGLE_LAYOUT,
    key: key
  };
};

exports.toggleLayout = toggleLayout;

var setThemeName = function setThemeName(themeName) {
  return {
    type: ACTION.SET_THEME_NAME,
    themeName: themeName
  };
};

exports.setThemeName = setThemeName;
var actions = {
  toggleLayout: toggleLayout,
  setThemeName: setThemeName
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map