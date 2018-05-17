
const styleConfig = {
  _themeName : undefined,
  _style : {},
  _createStyle : (C) => {
    return {
      ROOT_DIV : {
        ...C.BG
      }
    }
  }
}

export default styleConfig
