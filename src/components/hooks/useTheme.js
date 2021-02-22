import React from '../_react'
import ThemeContext from '../hoc/ThemeContext'

const { useContext } = React

const useTheme = styleConfig => useContext(ThemeContext)
  .createStyle(styleConfig);

export default useTheme
