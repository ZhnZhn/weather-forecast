'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  TOGGLE_LAYOUT: 'TOGGLE_LAYOUT',
  SET_THEME_NAME: 'SET_THEME_NAME'
};

var toggleLayout = exports.toggleLayout = function toggleLayout(key) {
  return {
    type: ACTION.TOGGLE_LAYOUT,
    key: key
  };
};

var setThemeName = exports.setThemeName = function setThemeName(themeName) {
  return {
    type: ACTION.SET_THEME_NAME,
    themeName: themeName
  };
};

var actions = {
  toggleLayout: toggleLayout,
  setThemeName: setThemeName
};

exports.default = actions;
//# sourceMappingURL=actions.js.map