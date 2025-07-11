"use strict";

exports.__esModule = true;
exports.default = void 0;
var _actions = require("../../flux/settings/actions");
var _actions2 = require("../../flux/layout/actions");
var _uiTheme = require("../styles/uiTheme");
const RouterData = {
  getData: (store, type) => {
    switch (type) {
      case 'SETTINGS':
        return {
          onSet: apiKey => {
            store.dispatch((0, _actions.setSettings)(apiKey));
          },
          onUiTheme: uiThemeId => {
            (0, _uiTheme.setUiTheme)(uiThemeId);
            store.dispatch((0, _actions2.setThemeName)(uiThemeId));
          },
          onAir: is => {
            store.dispatch((0, _actions.setAir)(is));
          },
          onBeforeClose: () => {
            store.dispatch((0, _actions2.toggleLayout)('isSettings'));
          }
        };
      default:
        return;
    }
  }
};
var _default = exports.default = RouterData;
//# sourceMappingURL=RouterData.js.map