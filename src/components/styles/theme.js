
const P = {};
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

export const COLOR = {
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
}

const _crBg = conf => {
  conf.BG.backgroundColor = P.BG
};
const _crBgMark = conf => {
  conf.BG_MARK.backgroundColor = P.BG_MARK
};
const _crDialog = conf => {
  conf.DIALOG.backgroundColor = P.BG_DIALOG
}
const FN_STYLES = [
  _crBg, _crBgMark, _crDialog
];
const _setStyleTo = conf => {
  FN_STYLES.forEach(fn => fn(conf))
};

const _stylePopup = () => {
  [...document.querySelectorAll('.leaflet-popup-content-wrapper')]
    .forEach(node => node.style.backgroundColor = P.BG)
}

const _setTheme = {
  [THEME_NAME.GREY]: () => {
    Object.assign(P, TH_GREY)
    _setStyleTo(COLOR)
    _stylePopup()
  },
  [THEME_NAME.SAND]: () => {
    Object.assign(P, TH_SAND)
    _setStyleTo(COLOR)
    _stylePopup()
  },
  [THEME_NAME.WHITE]: () => {
    //#eceae0
    Object.assign(P, TH_WHITE)
    _setStyleTo(COLOR)
    _stylePopup()
  }
}

const theme = {
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
  },
  createStyle(config){
     if (this.themeName !== config._themeName){
      config._style = config._createStyle(COLOR, this.themeName)
      config._themeName = this.themeName
     }
     return config._style;
  }
}
theme._init();

export default theme

export const POPUP = {
  CHART: {
    backgroundColor: '#787878',
    border: '1px solid #999',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px'
  }
}
