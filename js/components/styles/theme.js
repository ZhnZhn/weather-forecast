"use strict";

exports.__esModule = true;
exports.default = exports.THEME_NAME = exports.POPUP = exports.COLOR = void 0;
const _assign = Object.assign;
const P = {};
const TH_GREY = {
  BG: 'grey',
  BG_MARK: '#646464',
  BG_DIALOG: '#4d4d4d'
};
const TH_SAND = {
  BG: '#e8e0cb',
  BG_MARK: 'grey',
  BG_DIALOG: '#e8e0cb'
};
const TH_WHITE = {
  BG: 'white',
  BG_MARK: 'grey',
  BG_DIALOG: 'white'
};
const THEME_NAME = exports.THEME_NAME = {
  DF: 'GREY',
  GREY: 'GREY',
  SAND: 'SAND',
  WHITE: 'WHITE'
};
const COLOR = exports.COLOR = {
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
const _setCustomPropertiesFrom = P => {
  const _style = document.body.style;
  _style.setProperty("--bg", P.BG);
  _style.setProperty("--bg-mark", P.BG_MARK);
  _style.setProperty("--bg-dialog", P.BG_DIALOG);
};
const _crBg = conf => {
  conf.BG.backgroundColor = P.BG;
};
const _crBgMark = conf => {
  conf.BG_MARK.backgroundColor = P.BG_MARK;
};
const _crDialog = conf => {
  conf.DIALOG.backgroundColor = P.BG_DIALOG;
};
const FN_STYLES = [_crBg, _crBgMark, _crDialog];
const _setStyleTo = conf => {
  FN_STYLES.forEach(fn => fn(conf));
};
const _stylePopup = () => {
  [...document.querySelectorAll('.leaflet-popup-content-wrapper')].forEach(node => {
    if (node && node.style) {
      node.style.backgroundColor = P.BG;
    }
  });
};
const _setTheme = {
  [THEME_NAME.GREY]: () => {
    _assign(P, TH_GREY);
    _setStyleTo(COLOR);
    _stylePopup();
  },
  [THEME_NAME.SAND]: () => {
    _assign(P, TH_SAND);
    _setStyleTo(COLOR);
    _stylePopup();
  },
  [THEME_NAME.WHITE]: () => {
    //#eceae0
    _assign(P, TH_WHITE);
    _setStyleTo(COLOR);
    _stylePopup();
  }
};
const theme = {
  themeName: THEME_NAME.DF,
  _init() {
    this.setThemeName(THEME_NAME.DF);
  },
  getThemeName() {
    return this.themeName;
  },
  setThemeName(themeName) {
    this.themeName = themeName;
    _setTheme[themeName]();
    _setCustomPropertiesFrom(P);
  },
  createStyle(config) {
    if (this.themeName !== config._themeName) {
      config._style = config._createStyle(COLOR, this.themeName);
      config._themeName = this.themeName;
    }
    return config._style;
  }
};
theme._init();
var _default = exports.default = theme;
const POPUP = exports.POPUP = {
  CHART: {
    backgroundColor: '#787878',
    border: '1px solid #999',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
  }
};
//# sourceMappingURL=theme.js.map