
import {
  setSettings,
  setAir
} from '../../flux/settings/actions'
import {
  toggleLayout,
  setThemeName
} from '../../flux/layout/actions'

const RouterData = {
  getData: (store, type) => {
    switch(type){
      case 'SETTINGS':
        return {
          onSet: (apiKey) => {
            store.dispatch(setSettings(apiKey))
          },
          onSetTheme: (uiTheme, uiThemeName) => {
            uiTheme.setThemeName(uiThemeName)
            store.dispatch(setThemeName(uiThemeName))
          },
          onAir: (is) => {
            store.dispatch(setAir(is))
          },
          onBeforeClose: () => {
            store.dispatch(toggleLayout('isSettings'))
          }

        };
      default: return;
    }
  }
}

export default RouterData
