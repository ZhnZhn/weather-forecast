
export const ACTION = {
  SETTINGS_SET: 'SETTINGS_SET',
  SETTINGS_SET_APIKEY: 'SETTINGS_SET_APIKEY'
};

export const setSettings = (apiKey) => ({
  type: ACTION.SETTINGS_SET, apiKey
})

export const setApiKey = () => ({
  type: ACTION.SETTINGS_SET_APIKEY
})

const actions = {
  setSettings: setSettings,
  setApiKey: setApiKey
};

export default actions
