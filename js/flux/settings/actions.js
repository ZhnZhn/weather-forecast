'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  SETTINGS_SET: 'SETTINGS_SET',
  SETTINGS_SET_APIKEY: 'SETTINGS_SET_APIKEY'
};

var setSettings = exports.setSettings = function setSettings(apiKey) {
  return {
    type: ACTION.SETTINGS_SET, apiKey: apiKey
  };
};

var setApiKey = exports.setApiKey = function setApiKey() {
  return {
    type: ACTION.SETTINGS_SET_APIKEY
  };
};

var actions = {
  setSettings: setSettings,
  setApiKey: setApiKey
};

exports.default = actions;
//# sourceMappingURL=actions.js.map