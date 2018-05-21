'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setTheme2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var P = {};
var TH_GREY = {
  BG: 'grey',
  BG_MARK: '#646464',
  BG_DIALOG: '#4d4d4d'
};
var TH_SAND = {
  BG: '#e8e0cb',
  BG_MARK: 'grey',
  BG_DIALOG: '#e8e0cb'
};
var TH_WHITE = {
  BG: 'white',
  BG_MARK: 'grey',
  BG_DIALOG: 'white'
};

var THEME_NAME = exports.THEME_NAME = {
  DF: 'GREY',
  GREY: 'GREY',
  SAND: 'SAND',
  WHITE: 'WHITE'
};

var COLOR = exports.COLOR = {
  BG: {},
  BG_MARK: {},
  DIALOG: {},

  LABEL: {
    color: '#795548'
  },
  DAY: {
    color: '#8bc34a'
  },
  TEMP_DAY: {
    color: '#ff9800'
  },
  TEMP_NIGHT: {
    color: '#434348'
  }
};

var _crBg = function _crBg(conf) {
  conf.BG.backgroundColor = P.BG;
};
var _crBgMark = function _crBgMark(conf) {
  conf.BG_MARK.backgroundColor = P.BG_MARK;
};
var _crDialog = function _crDialog(conf) {
  conf.DIALOG.backgroundColor = P.BG_DIALOG;
};
var FN_STYLES = [_crBg, _crBgMark, _crDialog];
var _setStyleTo = function _setStyleTo(conf) {
  FN_STYLES.forEach(function (fn) {
    return fn(conf);
  });
};

var _stylePopup = function _stylePopup() {
  [].concat(_toConsumableArray(document.querySelectorAll('.leaflet-popup-content-wrapper'))).forEach(function (node) {
    return node.style.backgroundColor = P.BG;
  });
};

var _setTheme = (_setTheme2 = {}, _defineProperty(_setTheme2, THEME_NAME.GREY, function () {
  Object.assign(P, TH_GREY);
  _setStyleTo(COLOR);
  _stylePopup();
}), _defineProperty(_setTheme2, THEME_NAME.SAND, function () {
  Object.assign(P, TH_SAND);
  _setStyleTo(COLOR);
  _stylePopup();
}), _defineProperty(_setTheme2, THEME_NAME.WHITE, function () {
  //#eceae0
  Object.assign(P, TH_WHITE);
  _setStyleTo(COLOR);
  _stylePopup();
}), _setTheme2);

var theme = {
  themeName: THEME_NAME.DF,
  _init: function _init() {
    this.setThemeName(THEME_NAME.DF);
  },
  getThemeName: function getThemeName() {
    return this.themeName;
  },
  setThemeName: function setThemeName(themeName) {
    this.themeName = themeName;
    _setTheme[themeName]();
  },
  createStyle: function createStyle(config) {
    if (this.themeName !== config._themeName) {
      config._style = config._createStyle(COLOR, this.themeName);
      config._themeName = this.themeName;
    }
    return config._style;
  }
};
theme._init();

exports.default = theme;
var POPUP = exports.POPUP = {
  CHART: {
    backgroundColor: '#787878',
    border: '1px solid #999',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
  }
};
//# sourceMappingURL=theme.js.map