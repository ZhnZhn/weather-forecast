'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../../flux/settings/actions');

var _actions2 = require('../../flux/layout/actions');

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
          onBeforeClose: function onBeforeClose() {
            store.dispatch((0, _actions2.toggleLayout)('isSettings'));
          }

        };
      default:
        return undefined;
    }
  }
};

exports.default = RouterData;
//# sourceMappingURL=RouterData.js.map