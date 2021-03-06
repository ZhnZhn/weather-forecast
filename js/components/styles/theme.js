"use strict";

exports.__esModule = true;
exports.POPUP = exports["default"] = exports.COLOR = exports.THEME_NAME = void 0;

var _setTheme2;

var _assign = Object.assign;
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
var THEME_NAME = {
  DF: 'GREY',
  GREY: 'GREY',
  SAND: 'SAND',
  WHITE: 'WHITE'
};
exports.THEME_NAME = THEME_NAME;
var COLOR = {
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
exports.COLOR = COLOR;

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
  [].concat(document.querySelectorAll('.leaflet-popup-content-wrapper')).forEach(function (node) {
    if (node && node.style) {
      node.style.backgroundColor = P.BG;
    }
  });
};

var _setTheme = (_setTheme2 = {}, _setTheme2[THEME_NAME.GREY] = function () {
  _assign(P, TH_GREY);

  _setStyleTo(COLOR);

  _stylePopup();
}, _setTheme2[THEME_NAME.SAND] = function () {
  _assign(P, TH_SAND);

  _setStyleTo(COLOR);

  _stylePopup();
}, _setTheme2[THEME_NAME.WHITE] = function () {
  //#eceae0
  _assign(P, TH_WHITE);

  _setStyleTo(COLOR);

  _stylePopup();
}, _setTheme2);

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

var _default = theme;
exports["default"] = _default;
var POPUP = {
  CHART: {
    backgroundColor: '#787878',
    border: '1px solid #999',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
  }
};
exports.POPUP = POPUP;
//# sourceMappingURL=theme.js.map