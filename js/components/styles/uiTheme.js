"use strict";

exports.__esModule = true;
exports.uiTheme = exports.THEME_NAME = exports.TEMP_NIGHT_COLOR = exports.TEMP_DAY_COLOR = exports.LABEL_COLOR = exports.DAY_COLOR = exports.CHART_POPUP = void 0;
const _crRgba = (v, a) => `rgba(${v}, ${v}, ${v}, ${a})`;
let P = {};
const TH_GREY = {
  BG: 'grey',
  BG_MARK: '#646464',
  BG_DIALOG: '#4d4d4d',
  BG_OPTIONS: '#404040',
  MSI_C: '#f8f8ff',
  MSI_FH: _crRgba(255, 0.1)
};
const TH_SAND = {
  BG: '#e8e0cb',
  BG_MARK: 'grey',
  BG_DIALOG: '#e8e0cb',
  BG_OPTIONS: '#c6bda5',
  MSI_C: '#303030',
  MSI_FH: _crRgba(255, 0.4)
};
const TH_WHITE = {
  BG: 'white',
  BG_MARK: 'grey',
  BG_DIALOG: 'white',
  BG_OPTIONS: '#dfe4e7',
  MSI_C: '#303030',
  MSI_FH: _crRgba(255, 0.4)
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
  _style.setProperty("--mso-bg", P.BG_OPTIONS);
  _style.setProperty("--msi-c", P.MSI_C);
  _style.setProperty("--msi-fh", P.MSI_FH);
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