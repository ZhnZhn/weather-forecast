
export const ACTION = {
  TOGGLE_LAYOUT: 'TOGGLE_LAYOUT',
  SET_THEME_NAME: 'SET_THEME_NAME'
};

export const toggleLayout = (key) => ({
  type: ACTION.TOGGLE_LAYOUT,
  key
});

export const setThemeName = (themeName) => ({
  type: ACTION.SET_THEME_NAME,
  themeName
});

const actions = {
  toggleLayout,
  setThemeName
};

export default actions
