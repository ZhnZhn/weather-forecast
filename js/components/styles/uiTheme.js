"use strict";

exports.__esModule = true;
exports.setUiTheme = exports.UI_THEME_OPTIONS = exports.TEMP_NIGHT_COLOR = exports.TEMP_DAY_COLOR = exports.LABEL_COLOR = exports.DAY_COLOR = exports.CHART_POPUP = void 0;
const LABEL_COLOR = exports.LABEL_COLOR = '#795548';
const DAY_COLOR = exports.DAY_COLOR = '#8bc34a';
const TEMP_DAY_COLOR = exports.TEMP_DAY_COLOR = '#ff9800';
const TEMP_NIGHT_COLOR = exports.TEMP_NIGHT_COLOR = '#434348';
const _crRgba = (v, a) => `rgba(${v}, ${v}, ${v}, ${a})`;
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
const THEME_GREY_ID = 'Grey',
  THEME_SAND_ID = 'Sand',
  THEME_WHITE_ID = 'White';
const UI_THEME_OPTIONS = exports.UI_THEME_OPTIONS = [THEME_GREY_ID, THEME_SAND_ID, THEME_WHITE_ID];
const DF_UI_THEME_ID = THEME_GREY_ID;
let currentUIThemeId = DF_UI_THEME_ID;
const HP_UI_THEME = {
  [THEME_GREY_ID]: TH_GREY,
  [THEME_SAND_ID]: TH_SAND,
  [THEME_WHITE_ID]: TH_WHITE
};
const _setCustomPropertiesFrom = P => {
  const _style = document.body.style,
    _setProperty = _style.setProperty.bind(_style);
  _setProperty("--bg", P.BG);
  _setProperty("--bg-mark", P.BG_MARK);
  _setProperty("--bg-dialog", P.BG_DIALOG);
  _setProperty("--mso-bg", P.BG_OPTIONS);
  _setProperty("--msi-c", P.MSI_C);
  _setProperty("--msi-fh", P.MSI_FH);
};
const setUiTheme = uiThemeId => {
  if (UI_THEME_OPTIONS.indexOf(uiThemeId) !== -1) {
    const _nextUiThemePallete = HP_UI_THEME[uiThemeId];
    if (_nextUiThemePallete && currentUIThemeId !== uiThemeId) {
      _setCustomPropertiesFrom(HP_UI_THEME[uiThemeId]);
      currentUIThemeId = uiThemeId;
    }
  }
};
exports.setUiTheme = setUiTheme;
const CHART_POPUP = exports.CHART_POPUP = {
  backgroundColor: 'var(--bg, grey)',
  border: '1px solid #999',
  borderRadius: '12px',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
};
//# sourceMappingURL=uiTheme.js.map