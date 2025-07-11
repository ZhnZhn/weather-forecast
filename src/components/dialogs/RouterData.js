
import {
  setSettings,
  setAir
} from '../../flux/settings/actions'
import {
  toggleLayout,
  setThemeName
} from '../../flux/layout/actions'

import { setUiTheme } from '../styles/uiTheme';

const RouterData = {
  getData: (store, type) => {
    switch(type){
      case 'SETTINGS':
        return {
          onSet: (apiKey) => {
            store.dispatch(setSettings(apiKey))
          },
          onUiTheme: (uiThemeId) => {
            setUiTheme(uiThemeId)
            store.dispatch(setThemeName(uiThemeId))
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
