"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _actions = require("../../flux/settings/actions");

var _actions2 = require("../../flux/layout/actions");

var RouterData = {
  getData: function getData(store, type) {
    switch (type) {
      case 'SETTINGS':
        return {
          onSet: function onSet(apiKey) {
            store.dispatch((0, _actions.setSettings)(apiKey));
          },
          onSetTheme: function onSetTheme(theme, themeName) {
            theme.setThemeName(themeName);
            store.dispatch((0, _actions2.setThemeName)(themeName));
          },
          onAir: function onAir(is) {
            store.dispatch((0, _actions.setAir)(is));
          },
          onBeforeClose: function onBeforeClose() {
            store.dispatch((0, _actions2.toggleLayout)('isSettings'));
          }
        };

      default:
        return;
    }
  }
};
var _default = RouterData;
exports["default"] = _default;
//# sourceMappingURL=RouterData.js.map