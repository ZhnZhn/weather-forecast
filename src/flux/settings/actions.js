
export const ACTION_SETTINGS_SET = 'SETTINGS_SET'
export const ACTION_SETTINGS_SET_APIKEY = 'SETTINGS_SET_APIKEY'
export const ACTION_SETTINGS_SET_AIR = 'SETTINGS_SET_AIR'

export const setSettings = (apiKey) => ({
  type: ACTION_SETTINGS_SET, apiKey
})

export const setApiKey = () => ({
  type: ACTION_SETTINGS_SET_APIKEY
})

export const setAir = (is) => ({
  type: ACTION_SETTINGS_SET_AIR, is
})

const actions = {
  setSettings,
  setApiKey
};

export default actions
