"use strict";

exports.__esModule = true;
exports.uiTheme = exports.THEME_NAME = exports.TEMP_NIGHT_COLOR = exports.TEMP_DAY_COLOR = exports.LABEL_COLOR = exports.DAY_COLOR = exports.CHART_POPUP = void 0;
let P = {};
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
const LABEL_COLOR = exports.LABEL_COLOR = '#795548';
const DAY_COLOR = exports.DAY_COLOR = '#8bc34a';
const TEMP_DAY_COLOR = exports.TEMP_DAY_COLOR = '#ff9800';
const TEMP_NIGHT_COLOR = exports.TEMP_NIGHT_COLOR = '#434348';
const _setCustomPropertiesFrom = P => {
  const _style = document.body.style;
  _style.setProperty("--bg", P.BG);
  _style.setProperty("--bg-mark", P.BG_MARK);
  _style.setProperty("--bg-dialog", P.BG_DIALOG);
};
const _setTheme = {
  [THEME_NAME.GREY]: () => {
    P = TH_GREY;
  },
  [THEME_NAME.SAND]: () => {
    P = TH_SAND;
  },
  [THEME_NAME.WHITE]: () => {
    //#eceae0
    P = TH_WHITE;
  }
};
const uiTheme = exports.uiTheme = {
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
  }
};
uiTheme._init();
const CHART_POPUP = exports.CHART_POPUP = {
  backgroundColor: 'var(--bg, grey)',
  border: '1px solid #999',
  borderRadius: '12px',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
};
//# sourceMappingURL=uiTheme.js.map