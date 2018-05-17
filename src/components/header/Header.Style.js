

const styleConfig = {
  _themeName : undefined,
  _style : undefined,

  _createStyle : (C) => {
    return {
      HEADER : {
        ...C.BG,        
        //boxShadow: 'rgba(0,0,0, 0.14) 0px 0px 4px, rgba(0,0,0, 0.6) 0px 4px 8px'
      }
    }
  }
};

export default styleConfig
