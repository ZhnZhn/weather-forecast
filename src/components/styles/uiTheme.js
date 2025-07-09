
let P = {};
const TH_GREY = {
  BG: 'grey',
  BG_MARK: '#646464',
  BG_DIALOG: '#4d4d4d'
}
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

export const THEME_NAME = {
  DF: 'GREY',
  GREY: 'GREY',
  SAND: 'SAND',
  WHITE: 'WHITE'
};

export const LABEL_COLOR = '#795548'
export const DAY_COLOR = '#8bc34a'
export const TEMP_DAY_COLOR = '#ff9800'
export const TEMP_NIGHT_COLOR = '#434348'

const _setCustomPropertiesFrom = (P) => {
  const _style = document.body.style;

  _style.setProperty("--bg", P.BG)
  _style.setProperty("--bg-mark", P.BG_MARK)
  _style.setProperty("--bg-dialog", P.BG_DIALOG)
};

const _setTheme = {
  [THEME_NAME.GREY]: () => {
    P = TH_GREY
  },
  [THEME_NAME.SAND]: () => {
    P = TH_SAND
  },
  [THEME_NAME.WHITE]: () => {
    //#eceae0
    P = TH_WHITE
  }
}

export const uiTheme = {
  themeName: THEME_NAME.DF,
  _init(){
    this.setThemeName(THEME_NAME.DF)
  },
  getThemeName(){
    return this.themeName
  },
  setThemeName(themeName){
    this.themeName = themeName
    _setTheme[themeName]()
    _setCustomPropertiesFrom(P)
  }
}
uiTheme._init();

export const CHART_POPUP = {
  backgroundColor: 'var(--bg, grey)',
  border: '1px solid #999',
  borderRadius: '12px',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
}
