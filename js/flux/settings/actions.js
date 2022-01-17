"use strict";

exports.__esModule = true;
exports.setSettings = exports.setApiKey = exports.setAir = exports["default"] = exports.ACTION_SETTINGS_SET_APIKEY = exports.ACTION_SETTINGS_SET_AIR = exports.ACTION_SETTINGS_SET = void 0;
var ACTION_SETTINGS_SET = 'SETTINGS_SET';
exports.ACTION_SETTINGS_SET = ACTION_SETTINGS_SET;
var ACTION_SETTINGS_SET_APIKEY = 'SETTINGS_SET_APIKEY';
exports.ACTION_SETTINGS_SET_APIKEY = ACTION_SETTINGS_SET_APIKEY;
var ACTION_SETTINGS_SET_AIR = 'SETTINGS_SET_AIR';
exports.ACTION_SETTINGS_SET_AIR = ACTION_SETTINGS_SET_AIR;

var setSettings = function setSettings(apiKey) {
  return {
    type: ACTION_SETTINGS_SET,
    apiKey: apiKey
  };
};

exports.setSettings = setSettings;

var setApiKey = function setApiKey() {
  return {
    type: ACTION_SETTINGS_SET_APIKEY
  };
};

exports.setApiKey = setApiKey;

var setAir = function setAir(is) {
  return {
    type: ACTION_SETTINGS_SET_AIR,
    is: is
  };
};

exports.setAir = setAir;
var actions = {
  setSettings: setSettings,
  setApiKey: setApiKey
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map